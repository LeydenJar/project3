from django.http import HttpResponse
from django.shortcuts import render
from . import models

# Create your views here.
def index(request):
    return render(request, "orders/index.html")

def newpage(request):
	var = models.salads.objects.all()
	return render(request, "orders/newpage.html", { "variable" : var })