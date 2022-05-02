from rest_framework.routers import SimpleRouter

from django.urls import path

from . import views

router = SimpleRouter()
router.register('users', views.UserViewSet)

urlpatterns = router.urls + [
    path('users/me/', views.UserViewSet.as_view({'get': 'retrieve'})),
]

