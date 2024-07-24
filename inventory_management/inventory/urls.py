from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, EquipmentViewSet, RequestViewSet
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'equipment', EquipmentViewSet)
router.register(r'request', RequestViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
]