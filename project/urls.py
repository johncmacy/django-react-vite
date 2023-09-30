from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
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
    path("admin/", admin.site.urls),
    path("", views.index, name="index"),
    path("<path:path>", views.index),
]
