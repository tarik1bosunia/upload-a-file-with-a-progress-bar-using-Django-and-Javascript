from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from uploads.views import HomePageView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", HomePageView.as_view(), name="home_page"),
]

# Serve static and media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)