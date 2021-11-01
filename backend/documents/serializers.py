# Django rest Framework
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError
# Models
from documents.models import Document
# Utils
import re

MAX_DOCUMENT_SIZE = 5*(1024**2)

DOCUMENT_FORMATS = ['pdf', 'docx']


class DocumentSerializer(ModelSerializer):
    """
    Document serializer

    This serializer parser the data to model and make the validation of the files.

    Validations :
    - size : no more than 5MB
    - formats accepted : .pdf .docx

    """

    class Meta:
        model = Document
        fields = ('id', 'name', 'upload')
        read_only_fields = ['name']

    def validate_upload(self, data):

        if data.size > MAX_DOCUMENT_SIZE:
            raise ValidationError('The File has to be less than 5MB')

        search_ext = re.search('^.*\.([a-z]{1,})$', data.name)
        if search_ext:
            if not (search_ext.group(1) in DOCUMENT_FORMATS):
                raise ValidationError(
                    'File has to be {}'.format(DOCUMENT_FORMATS))
        else:
            raise ValidationError('File has no extension')

        return data

    def create(self, validated_data):
        file = validated_data['upload']
        validated_data['name'] = file.name
        return super().create(validated_data)
