from rest_framework import viewsets, permissions, generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError
from .models import User, Equipment, Request
from .serializers import UserSerializer, EquipmentSerializer, RequestSerializer, UserRegistrationSerializer

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
            if request.data['status'] not in ['Approved', 'Rejected']:
                raise ValidationError("Status must be either 'Approved' or 'Rejected'.")
            instance.status = request.data['status']
            instance.approved_by = request.user
            instance.save()

        return super().update(request, *args, **kwargs)

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
