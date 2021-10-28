"""Files URls"""

# django
from django.urls import path, include
# django rest framework
from rest_framework.routers import DefaultRouter
# Views
from .views import DocumentViewSet

router = DefaultRouter()
router.register(r'documents', DocumentViewSet, basename='documents')

urlpatterns = [
    path('', include(router.urls))
]
