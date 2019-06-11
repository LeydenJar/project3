from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from .forms import NewRegistrationForm


# Create your views here.
def register(request):
	if request.method == "GET":
		form = NewRegistrationForm()
		return render(request, "users/register.html", {"form" : form})

	else:
		form = NewRegistrationForm(request.POST)
		if form.is_valid():
			
			user = form.save()
			user.first_name = request.POST["firstName"]
			user.last_name = request.POST["lastName"]
			user.save()
			username = form.cleaned_data.get("username")
			messages.success(request, f"Account created for {username}!")
			return redirect("login")
		else:
			return render(request, "users/register.html", {"form" : form})