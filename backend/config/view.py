# Home page view

# Django
from django.http import HttpResponse
from django.views import View
from django.views.generic.base import TemplateView


class HomeView(TemplateView):
    template_name = "documentsUI/index.html"

    # def get(self, request, *args, **kwargs):
