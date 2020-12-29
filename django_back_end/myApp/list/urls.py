from rest_framework import routers
from .api import ListViewSet

router = routers.DefaultRouter()
router.register('api/list', ListViewSet, 'list')

urlpatterns = router.urls