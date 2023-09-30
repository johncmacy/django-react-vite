from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .resources import (
    user,
    color,
)

router = DefaultRouter()

router.register("users", user.Viewset)
router.register("colors", color.Viewset)

urlpatterns = [
    path("", include(router.urls)),
]
