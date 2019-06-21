from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from . import models, serializers
import sys
from django.core.serializers import serialize
from django.forms.models import model_to_dict

# Create your views here.
def index(request):
	if request.user.is_authenticated:
		var= "hey, we find the problem"
		return render(request, "orders/index.html", {"value": var})
	else:
		return redirect("login")

def newpage(request):
	var = models.salads.objects.all()
	return render(request, "orders/newpage.html", { "variable" : var })

def getData(request):
	dicionario = {
		"pastas" : [],
		"salads" : [],
		"dinner_platters" : [],
		"subs" : [],
		"pizzas" : [],
		"toppings" : [],
		"extras" : []
	}

	for pasta in models.pastas.objects.all():
		p = {"id" : pasta.id, "name" : pasta.name, "price" : pasta.price}
		dicionario["pastas"].append(p)
	for salad in models.salads.objects.all():
		p = {"id" : salad.id, "name" : salad.name, "price" : salad.price}
		dicionario["salads"].append(p)
	for dp in models.dinnerPlatters.objects.all():
		p= {"id" : dp.id, "name" : dp.name, "size" : dp.size.name, "price" : dp.price}
		dicionario["dinner_platters"].append(p)
	for sub in models.sub.objects.all():
			p={"id" : sub.id, "name": sub.name, "size":sub.size.name, "price": sub.price}	
			dicionario["subs"].append(p)	
	for pizza in models.pizza.objects.all():
		p={}
		p["id"] = pizza.id
		p["sicilian"] = pizza.sicilian
		p["size"] = pizza.size.name
		p["toppings_amount"] = pizza.toppings_amount
		p["price"] = pizza.price
		dicionario["pizzas"].append(p)

	for extra in models.extra.objects.all():
		p={"id" : extra.id, "name" : extra.name, "price" : extra.price}
		dicionario["extras"].append(p)

	for topping in models.topping.objects.all():
		p={"id" : topping.id, "name" : topping.name}
		dicionario["toppings"].append(p)

	return JsonResponse(dicionario)


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
	elif type =="Dinner Platters":
		for dp in models.dinnerPlatters.objects.all():
			p={"id" : dp.id, "name": dp.name, "size": dp.size.name, "price": dp.price}
			dicionario["objetos"].append(p)
	else:
		for pasta in models.pastas.objects.all():
			p={"id": pasta.id, "name": pasta.name, "price": pasta.price}
			dicionario["objetos"].append(p)

	return JsonResponse(dicionario)

def validate(request, type, name):
	dicionario = {
		"success" : False,
	}
	if type == "Pizza":
		
		for pizza in models.pizza.objects.all():
			if pizza.name == name:
				print("hey")
	elif type == "Subs":
		for Subs in models.sub.objects.all():
			if pizza.name == name:
				print("hey")
	
	elif type == "Salads":
		for salad in models.salads.objects.all():
			if salad.name == name:
				dicionario["success"] = True
				dicionario["product_name"] = name
				dicionario["product_price"] = salad.price

	elif type =="Dinner Platters":
		for dp in models.dinnerPlatters.objects.all():
			if pizza.name == name:
				print("hey")
	
	else:
		for pasta in models.pastas.objects.all():
			if pasta.name == name:
				dicionario["success"] = True
				for order in models.order.objects.all():
					if order.user == str(request.user):
						print("order already exist", file=sys.stderr)
						order.total += pasta.price
						newrelation = models.order_pasta.create(order, pasta)
						newrelation.save()
						order.save()
						serial = serializers.orderserializer(order).data
						dicionario["order"] = serial
						return JsonResponse(dicionario)
				print("order did not exist yet", file = sys.stderr)
				newOrder = models.order.create(request.user)
				newOrder.save()
				newOrder.total += pasta.price
				newOrder.save()
				newrelation = models.order_pasta.create(newOrder, pasta)
				newrelation.save()
				serial = serializers.orderserializer(newOrder).data
				dicionario["order"] = serial
	return JsonResponse(dicionario)