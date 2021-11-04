"""Documents tests."""

# Django
from django.db.models.fields import files
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files import File
# Django REST Framework
from rest_framework import status
from rest_framework.test import APITestCase

# Model
from documents.models import Document

# utils
from random import choice
from string import ascii_lowercase
from datetime import datetime


class UploadFileTestCase(APITestCase):
    """Invitations manager test case."""

    def setUp(self):
        """Test case setup."""
        self.url = 'http://localhost:8000/documents/'
        cv = SimpleUploadedFile("cv.pdf",
                                b"file_content")
        self.document_example = Document.objects.create(
            name='cv.pdf',
            file=cv,
            size=cv.size,
            uploaded=datetime.now()
        )

    def test_list_of_document(self):
        """List"""
        request = self.client.get(self.url)

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data[0]['name'], 'cv.pdf')
        self.assertRegexpMatches(request.data[0]['file'],
                                 r"^.+/storage/pdf/cv_?.*\.pdf$")

    def test_upload_file(self):
        """post"""
        doc = SimpleUploadedFile("inform.docx",
                                 b"inform .....")

        payload = {'file': doc}

        request = self.client.post(self.url, payload)

        self.assertEqual(request.status_code, status.HTTP_201_CREATED)
        self.assertEqual(request.data['name'], 'inform.docx')
        self.assertEqual(request.data['size'], doc.size)
        self.assertRegexpMatches(request.data['file'],
                                 r"^.+/storage/docx/inform_?.*\.docx$")

    def test_upload_file_wrong_type(self):
        """post"""
        file = SimpleUploadedFile("img.svg",
                                  b"inform .....")

        payload = {'file': file}

        request = self.client.post(self.url, payload)
        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)

    def test_upload_file_big_file(self):
        """post"""
        n = 6*(1024**2)
        text_file = "".join(choice(ascii_lowercase) for i in range(n))
        doc = SimpleUploadedFile("inform.docx", bytearray(text_file, 'utf-8'))

        payload = {'file': doc}

        request = self.client.post(self.url, payload)
        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)
