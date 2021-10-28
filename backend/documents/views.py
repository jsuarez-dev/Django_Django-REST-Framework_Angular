"""File Views."""

# Django

# Django REST Framework
from rest_framework.viewsets import ModelViewSet

# Serializers
from documents.serializers import DocumentSerializer
# Model
from documents.models import Document


class DocumentViewSet(ModelViewSet):

    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def pre_save(self, obj):
        obj.upload = self.request.FILES.get('file')
