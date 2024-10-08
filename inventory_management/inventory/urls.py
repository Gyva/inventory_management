from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, EquipmentViewSet, RequestViewSet, CustomAuthToken, UserRegistrationView, LogoutView, ChangePasswordView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'equipment', EquipmentViewSet)
router.register(r'requests', RequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
