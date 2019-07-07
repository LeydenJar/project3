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

def orders(request):
	var = models.salads.objects.all()
	return render(request, "orders/orders.html", { "variable" : var })

def getOrders(request):
	dicionario = {}
	for order in models.orders.objects.all():
		if order.user == request.user:
			dicionario["order"] = [order]
			break
	return JsonResponse(dicionario)

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


def validate(request):
	dicionario = {
		"success" : False,
	}
	name = request.POST.get('name')
	tipo = request.POST.get('tipo')

	#Getting user's order and storing it in a variable.

	userHasOrder = False
	for o in models.order.objects.all():
		if str(request.user) == o.user:
			order = o
			userHasOrder = True
	
	#If the user does not have an order, we create one for him.
	if not userHasOrder:
		order = models.order.create(request.user)
		order.save()



	if tipo == "pizza":
		issicilian = request.POST.get('isSicilian')
		size = request.POST.get('size')
		toppingsAmount = request.POST.get('toppingsAmount')
		toppings = request.POST.get("toppings")
		print(str(issicilian)+str(size)+str(toppingsAmount))
		print(toppings)
		print(type(issicilian))
		print(type(size))	
		print(type(toppingsAmount))
		


		iden = False
		for pizza in models.pizza.objects.all():
			print (str(pizza.sicilian)+str(pizza.size)+str(pizza.toppings_amount))
			print(type(pizza.sicilian))
			print(type(pizza.size.name))	
			print(type(pizza.toppings_amount))

			if str(pizza.sicilian).upper() == issicilian.upper() and pizza.size.name == size and str(pizza.toppings_amount) == toppingsAmount:
				iden = pizza
				print("******************HOPE")
				break

		if iden == False:
			print("Raise error")
			#levantar erro

		newrelation = models.order_pizza.create(order, pizza, toppings)
		newrelation.save()

		serial = serializers.orderserializer(order).data
		dicionario["order"] = serial
		return JsonResponse(dicionario)

			

	elif tipo == "sub":
		print(request.POST.get('size'))
		for sub in models.sub.objects.all():
			if sub.name == name:
				print("hey")
	
	elif tipo == "Salads":
		for salad in models.salads.objects.all():
			if salad.name == name:
				dicionario["success"] = True
				dicionario["product_name"] = name
				dicionario["product_price"] = salad.price

	elif tipo =="Dinner Platters":
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