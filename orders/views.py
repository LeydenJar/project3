from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from . import models
import sys

# Create your views here.
def index(request):
	if request.user.is_authenticated:
		return render(request, "orders/index.html")
	else:
		return redirect("login")

def newpage(request):
	var = models.salads.objects.all()
	return render(request, "orders/newpage.html", { "variable" : var })

def data(request, type):
	dicionario = {
		"tipo" : type,
		"objetos": []
		}
	if type == "Pizza":
		for pizza in models.pizza.objects.all():
			p={}
			p["id"] = pizza.id
			p["sicilian"] = pizza.sicilian
			p["size"] = pizza.size.name
			p["toppings_amount"] = pizza.toppings_amount
			p["price"] = pizza.price
			dicionario["objetos"].append(p)
	elif type == "Subs":
		for sub in models.sub.objects.all():
			p={"id" : sub.id, "name": sub.name, "size":sub.size.name, "price": sub.price}	
			dicionario["objetos"].append(p)		
	elif type == "Salads":
		for salada in models.salads.objects.all():
			p={"id" : salada.id, "name":salada.name, "price": salada.price}		
			dicionario["objetos"].append(p)	
	else:
		for dp in models.dinnerPlatters.objects.all():
			p={"id" : dp.id, "name": dp.name, "size": dp.size.name, "price": dp.price}
			dicionario["objetos"].append(p)

	
	return JsonResponse(dicionario)