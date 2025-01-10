from django.urls import path
from .views import EventListCreateView, EventDetailView, CreateEventView

urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    path('events/add/', CreateEventView.as_view(), name='create-event'),
]
