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
		toppings = list(request.POST.get("toppings").split(","))

		iden = False
		for pizza in models.pizza.objects.all():
			if str(pizza.sicilian).upper() == issicilian.upper() and pizza.size.name == size and str(pizza.toppings_amount) == toppingsAmount:
				iden = pizza
				break


		if iden == False or len(toppings) > int(toppingsAmount):
			return JsonResponse(dicionario)
			

		newrelation = models.order_pizza.create(order, iden, toppings)
		newrelation.save()

		for o in models.order.objects.all():
			if o.id == order.id:
				o.pizzas.add(newrelation)

		for u in toppings:
			for i in models.topping.objects.all():
				if i.name == u:
					newrelation.toppings.add(i)
					print("breaking", sys.stderr)
					break
		newrelation.save()

		order.total += newrelation.price
		order.save()

		serial = serializers.orderserializer(order).data
		dicionario["order"] = serial
		dicionario["success"] = True
		

	elif tipo == "sub":
		
		name = request.POST.get('name')
		size = request.POST.get('size')
		extras = list(request.POST.get('extras').split(","))
		print(extras)

		for sub in models.sub.objects.all():
			if str(sub.name) == name and str(sub.size) == size:
				relation = models.order_sub.create(sub)
				relation.save()
				for i in models.extra.objects.all():
					if i.name in extras:
						relation.extras.add(i)
						relation.price += i.price
				dicionario["success"] = True
				print("found")
				
				relation.save()
				for o in models.order.objects.all():
					if o.id == order.id:
						order.subs.add(relation)
						order.total += relation.price
						order.save
						o = order
						o.save()
						break
				break
		serial = serializers.orderserializer(order).data
		dicionario["order"] = serial
	
	elif tipo == "salad":
		for salad in models.salads.objects.all():
			if salad.name == name:
				dicionario["success"] = True
				order.total += salad.price
				newrelation = models.order_salad.create(order, salad)
				newrelation.save()
				order.save()
				serial = serializers.orderserializer(order).data
				dicionario["order"] = serial
				break

	elif tipo =="dinner platter":
		size = request.POST.get("size")
		for dp in models.dinnerPlatters.objects.all():
			if dp.name == name and str(dp.size) == size:
				dicionario["success"] = True
				order.total += dp.price
				newrelation = models.order_dinnerPlatter.create(order, dp)
				newrelation.save()
				order.save()
				serial = serializers.orderserializer(order).data
				dicionario["order"] = serial
				break
	
	elif tipo == "Pasta":
		for pasta in models.pastas.objects.all():
			if pasta.name == name:
				dicionario["success"] = True
				order.total += pasta.price
				newrelation = models.order_pasta.create(order, pasta)
				newrelation.save()
				order.save()
				serial = serializers.orderserializer(order).data
				dicionario["order"] = serial
				break

	serial = serializers.orderserializer(order).data
	serial2 = serializers.orderserializer(models.order.objects.get(pk = order.id)).data
	print(serial)
	print(serial2)
	return JsonResponse(dicionario)