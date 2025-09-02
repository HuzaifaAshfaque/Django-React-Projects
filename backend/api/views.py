from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['GET'])
def hello_world(request):
    valueInList = ["Hello World", "Welcome to Django + React", "Learning is fun!"]
    return Response({"message": valueInList})

@api_view(['POST'])
def custom_message(request):
    message = request.data.get("message")

    if not message:
        return Response({"error": "Message field is required"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": message}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def hello_name(request, name):
    return Response({"message": f"Hello {name}"})