from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()  # This will get your custom User model

class EquipmentTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='umwere', password='umwere_97', role='logistic_officer')
        self.user.is_active = True
        self.user.save()

    def test_get_equipment(self):
        refresh = RefreshToken.for_user(self.user)
        access_token = str(refresh.access_token)

        response = self.client.get('/api/equipment/', HTTP_AUTHORIZATION=f'Bearer {access_token}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('message', response.data)

    def test_create_equipment(self):
        refresh = RefreshToken.for_user(self.user)
        access_token = str(refresh.access_token)

        data = {
            'name': 'Test Equipment',
            'quantity': 10
        }

        response = self.client.post('/api/equipment/', data, HTTP_AUTHORIZATION=f'Bearer {access_token}')
        self.assertEqual(response.status_code, 201)
        self.assertIn('name', response.data)
        self.assertEqual(response.data['name'], 'Test Equipment')
