from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html"), name="index"),
    path(
        "login/",
        auth_views.LoginView.as_view(
            template_name="login.html", redirect_authenticated_user=True
        ),
        name="login",
    ),
    path(
        "logout/",
        auth_views.LogoutView.as_view(template_name="logged_out.html"),
        name="logout",
    ),
    path("api/", include("api.urls")),
    path("core/", views.core, name="core"),
    path("core/<path:path>", views.core, name="core"),
    path("admin/", admin.site.urls),
]
