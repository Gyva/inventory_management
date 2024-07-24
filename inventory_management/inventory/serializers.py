from rest_framework import serializers
from .models import User, Equipment, Request

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id','userrname','password','role']
        extra_kwargs = {'password':{'write_only': True}}

        def create(self, validate_data):
            user = User(
               username = validate_data['username'],
               role = validate_data['role'] 
            )
            
            user.set_password(validate_data['password'])
            
            user.save()
            return user

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'

class RequestSerializer(serializers.ModelSerializer):

    class Meta:

        model = Request
        fields = '__all__'

