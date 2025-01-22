from django.urls import path, include
from .views import EventListCreateView, EventDetailView, CreateEventView
from django.conf import settings
from django.conf.urls.static import static
from . import views


urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list-create'),  # Main endpoint for listing and creating events
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),  # Endpoint for specific event details
    path('events/add/', CreateEventView.as_view(), name='create-event'),  # Dedicated endpoint for creating events
    path('coordinates/', views.send_coordinates, name='sendcoordinates'),
    path('optimalroute/', views.get_optimal_route, name='optimalroute'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

