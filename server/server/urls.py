from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from server import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.core.urls')),
    path('api/', include('apps.users.urls')),
    path('api/auth/', include('rest_framework_social_oauth2.urls'))
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
