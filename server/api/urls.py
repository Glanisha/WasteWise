from django.urls import path
from .views import EventListCreateView, EventDetailView, CreateEventView

urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list-create'),  # Main endpoint for listing and creating events
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),  # Endpoint for specific event details
    path('events/add/', CreateEventView.as_view(), name='create-event'),  # Dedicated endpoint for creating events
]
