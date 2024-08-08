from rest_framework import viewsets, permissions, generics, status, serializers
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import IsAuthenticated
from .models import User, Equipment, Request
from .serializers import UserSerializer, EquipmentSerializer, RequestSerializer, UserRegistrationSerializer
from rest_framework.views import APIView
from django.contrib.auth import update_session_auth_hash

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != 'LogisticOfficer' or not self.request.user.is_active:
            raise PermissionDenied("Only active logistic officers can register equipment.")
        serializer.save(added_by=self.request.user)

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != 'Coordinator' or not self.request.user.is_active:
            raise PermissionDenied("Only active coordinators can request equipment.")
        equipment = serializer.validated_data['equipment']
        requested_quantity = serializer.validated_data['requested_quantity']
        if requested_quantity > equipment.quantity or requested_quantity <= 0:
            raise ValidationError("Requested quantity cannot exceed available quantity or be less than 0.")
        
        # Deduct the requested quantity from the available quantity
        equipment.quantity -= requested_quantity
        equipment.save()

        serializer.save(coordinator=self.request.user)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.role != 'HoD' or not request.user.is_active:
            raise PermissionDenied("Only active HoDs can update the status.")
        
        if 'status' in request.data:
            status_value = request.data['status']
            if status_value not in ['Approved', 'Rejected']:
                raise ValidationError("Status must be either 'Approved' or 'Rejected'.")
            instance.status = status_value
            instance.approved_by = request.user
            instance.save()
        else:
            return Response({"detail": "Status field is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().update(request, *args, **kwargs)
    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate(self, attrs):
        old_password = attrs.get('old_password')
        new_password = attrs.get('new_password')

        if old_password == new_password:
            raise serializers.ValidationError("New password must be different from the old password.")
        return attrs

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        old_password = serializer.validated_data['old_password']
        new_password = serializer.validated_data['new_password']

        if not user.check_password(old_password):
            return Response({"old_password": ["Incorrect password."]}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)  # Important: updates the session with the new password

        return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'role': user.role
        })

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            request.user.auth_token.delete()
        except (AttributeError, Token.DoesNotExist):
            return Response({"detail": "No active session found."}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)