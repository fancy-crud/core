from rest_framework.routers import SimpleRouter
from apps.core import views


router = SimpleRouter()

router.register(r'genres', views.GenreViewSet)
router.register(r'artists', views.ArtistViewSet)
router.register(r'albums', views.AlbumViewSet)
router.register(r'tracks', views.TrackViewSet)

urlpatterns = router.urls