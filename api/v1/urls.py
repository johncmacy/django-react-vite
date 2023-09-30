from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .resources import (
    custom_model,
    user,
)

router = DefaultRouter()

router.register("users", user.Viewset)
router.register("custom_models", custom_model.Viewset)

urlpatterns = [
    path("", include(router.urls)),
]
