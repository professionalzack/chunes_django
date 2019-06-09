from django.shortcuts import render
from django.contrib import auth
from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import Profile
from chunes_api.models import Library
from django.views.decorators.csrf import csrf_exempt
import json


# Create your views here.
@csrf_exempt 
def register(request):
  print('made it this far')
  print(request.body)

  response = {}
  if request.method == 'POST':
    print('the durn request', request.POST)
    post_req = json.loads(request.body.decode('utf-8'))
    first_name = post_req['firstName']
    last_name = post_req['lastName']
    username = post_req['username']
    email = post_req['email']
    password = post_req['password']
    password2 = post_req['password2']

    # Check if passwords match
    if password == password2:
        # Check if username exists
        if User.objects.filter(username=username).exists():
            response['status'] = 500
            response['error'] = 'That username has already been registered. Please try a different username'
        else:
            # Check if email exists
            if User.objects.filter(email=email).exists():
              response['status'] = 500
              response['error'] = 'That email has already been registered'
            else:
                print('here', username, password, email, first_name, last_name)
                # Register User
                user = User.objects.create_user(
                    username=username, password=password, email=email, first_name=first_name, last_name=last_name)
                user.save()
                #Create Profile and Library
                profile = Profile.objects.create(user_id=user.id)
                Library.objects.create(profile=profile)

                response['status'] = 200
                response['user'] = user.username
    else:
      response['status'] = 500
      response['error'] = "dude your passwords don't match"
  else:
    response['status'] = 404
    response['message'] = 'get request'
  # return HttpResponse(json.dumps(response), content_type="application/json")
  return JsonResponse(response)

@csrf_exempt
def login(request):
  data = json.loads(request.body)
  print('data:', data)
  print(request.user)
  print(request)
  response = {}
  if request.method == 'POST':
    post_req = json.loads(request.body.decode('utf-8'))
    print(post_req)

    username = post_req['username']
    password = post_req['password']

    user = auth.authenticate(username=username, password=password)

    if user is not None:
      auth.login(request, user)
      response['status'] = 200
      response['user'] = {'id': user.id, 'username': user.username}
      print(response)
      print('okay', request.user.id)
    else:
      response['status'] = 500
      response['error'] = 'Invalid Credentials...'

  else:
    response['status'] = 500
    response['error'] = 'not a post....'
  # return HttpResponse(json.dumps(response), content_type="application/json")
  return JsonResponse(response)

@csrf_exempt
def profile(request, pk):
  profile = Profile.objects.filter(user_id=pk).values().first()
  return JsonResponse({'profile':profile})

@csrf_exempt 
def logout(request):
  auth.logout(request)
  return JsonResponse({'message':'logged out'})

