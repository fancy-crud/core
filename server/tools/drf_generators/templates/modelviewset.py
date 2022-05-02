
__all__ = ['MODEL_URL', 'MODEL_VIEW']


MODEL_URL = """from rest_framework.routers import SimpleRouter
from {{ app }} import views


router = SimpleRouter()
{% for model in models %}
router.register(r'{{ model | lower }}s', views.{{ model }}ViewSet){% endfor %}

urlpatterns = router.urls
"""


MODEL_VIEW = """
from rest_framework.viewsets import ModelViewSet
from {{ app }}.serializers import *
from {{ app }}.models import *


class UserViewSet(ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()

    filter_fields = ['email', 'is_active']
    search_fields = ['email', 'first_name', 'last_name']

{% for model in models %}
class {{ model }}ViewSet(ModelViewSet):

    queryset = {{ model }}.objects.all()
    serializer_class = {{ model }}Serializer

{% endfor %}"""
