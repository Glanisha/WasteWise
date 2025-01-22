from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer
import heapq
from rest_framework.decorators import api_view
from .models import Bin
import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .serializers import BinSerializer


class EventListCreateView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
     serializer = EventSerializer(data=request.data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
     print(serializer.errors)  # Log the errors to help debug
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventDetailView(APIView):
    def get(self, request, pk):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CreateEventView(APIView):
    """
    Dedicated view to add new events.
    """
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Event successfully created!", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"error": "Failed to create event", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )



logger = logging.getLogger(__name__)

def maximize_garbage(graph, garbage, start, max_distance):
    visited = set()
    heap = []
    heapq.heappush(heap, (0, start, 0, [start]))
    max_garbage = 0
    best_path = []
    
    while heap:
        neg_garbage, current, distance, path = heapq.heappop(heap)
        if current in visited:
            continue
        visited.add(current)
        current_garbage = -neg_garbage
        
        if distance <= max_distance and current_garbage > max_garbage:
            max_garbage = current_garbage
            best_path = path
        
        for neighbor, dist in graph[current]:
            if neighbor not in visited and distance + dist <= max_distance:
                heapq.heappush(heap, (-(current_garbage + garbage[neighbor]), neighbor, distance + dist, path + [neighbor]))
    
    return max_garbage, best_path

@api_view(['GET'])
def get_optimal_route(request):
    try:
        # Get all bins from database
        bins = Bin.objects.all()
        
        if not bins:
            return Response({"error": "No bins found in database"}, status=404)

        # Create graph structure from bins
        graph = {}
        garbage_values = {}
        bin_lookup = {}  # To map graph indices back to bin objects
        
        # Build the graph
        for i, bin1 in enumerate(bins):
            if i not in graph:
                graph[i] = []
            # Convert status to garbage value
            garbage_values[i] = 100 if bin1.status.upper() == 'FULL' else \
                               50 if bin1.status.upper() == 'PARTIALLY_FULL' else 0
            bin_lookup[i] = bin1
            
            for j, bin2 in enumerate(bins):
                if i != j:
                    # Calculate distance between bins using latitude and longitude
                    # Using simplified distance calculation for example
                    distance = ((float(bin1.lat) - float(bin2.lat))**2 + 
                              (float(bin1.lng) - float(bin2.lng))**2)**0.5
                    graph[i].append((j, distance))

        # Get parameters from request
        start_node = 0  # Default to starting from first bin
        max_distance = float(request.GET.get('max_distance', 10.0))  # Default 10 units
        
        # Use the maximize_garbage function
        max_garbage, best_path = maximize_garbage(
            graph,
            garbage_values,
            start_node,
            max_distance
        )
        
        # Convert path to coordinate format for frontend
        path_coordinates = []
        for node_index in best_path:
            bin_obj = bin_lookup[node_index]
            path_coordinates.append({
                'lat': float(bin_obj.lat),
                'lng': float(bin_obj.lng),
                'status': bin_obj.status,
                'garbage_value': garbage_values[node_index]
            })
        
        response_data = {
            'total_garbage_collected': max_garbage,
            'path_length': len(best_path),
            'coordinates': path_coordinates
        }
        
        return Response(response_data)

    except Exception as e:
        logger.error(f"Error calculating optimal route: {str(e)}")
        return Response({"error": str(e)}, status=500)



@api_view(['GET', 'POST'])
def send_coordinates(request):
    if request.method == 'GET':
        bins = Bin.objects.all()
        serializer = BinSerializer(bins, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        try:
            # Set up the parser for multipart data
            if request.content_type == 'multipart/form-data':
                parser_classes = (MultiPartParser, FormParser)
            else:
                return Response({"error": "Content-Type must be multipart/form-data"}, status=400)
            
            lat = request.data.get('lat')
            lng = request.data.get('lng')
            bin_status = request.data.get('binStatus')
            image = request.FILES.get('image')  # Get the image file from the request

            logger.info(f"Parsed data - lat: {lat}, lng: {lng}, binStatus: {bin_status}, image: {image}")

            # Validation
            if lat is None or lng is None or bin_status is None:
                return Response({"error": "Missing required fields."}, status=400)

            # Create a new Bin instance
            bin_instance = Bin(lat=lat, lng=lng, status=bin_status, image=image)
            bin_instance.save()
            logger.info(f"Bin instance saved: {bin_instance}")

            # Serialize and return response
            serializer = BinSerializer(bin_instance)
            return Response(serializer.data, status=201)
        
        except Exception as e:
            logger.error(f"Error processing request: {str(e)}")
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)
