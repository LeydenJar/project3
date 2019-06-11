from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class NewRegistrationForm(UserCreationForm):
	email = forms.EmailField()
	firstName = forms.CharField(label = "First Name", max_length=100)
	lastName = forms.CharField(label = "Last Name", max_length=100)

	class Meta:
		model = User
		fields = ['username', 'email', 'firstName', 'lastName', 'password1', 'password2']