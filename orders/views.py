from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from . import models, serializers
from .models import order_pasta, order_salad, order_dinnerPlatter, order_pizza, order_sub
from .models import models as mm
import sys
from django.core.serializers import serialize
from django.forms.models import model_to_dict
from django.core.mail import send_mail
import os
from django.conf import settings

def makedict(dicionario, serial, w):
	print("running inside makedict")
	print(serial)
	print("serial")
	for pizza in serial["pizzas"]:
		print("running inside pizza for")
		obj = {}
		e = models.order_pizza.objects.get(pk=pizza)
		obj["reference"] = pizza
		obj["sicilian"] = e.sicilian
		obj["size"] = e.size.name
		obj["price"] = float(e.price)
		obj["toppings"] = []
		for topping in e.toppings.all():
			obj["toppings"].append(topping.name)
		print(obj)
		print("getting to the bottom of the pizza for")
		dicionario[w]["pizzas"].append(obj)

	for sub in serial["subs"]:
		obj = {}
		e = models.order_sub.objects.get(pk=sub)
		obj["reference"] = sub
		obj["name"] = e.name.name
		obj["size"] = e.size.name
		obj["price"] = float(e.price)
		obj["extras"] = []
		for extra in e.extras.all():
			print("got here")
			obj["extras"].append(extra.name)

		print(obj)
		dicionario[w]["subs"].append(obj) 
	
	for salad in serial["salads"]:
		print("running on salads for")
		print(salad)
		obj = {}
		e = models.salads.objects.get(pk=salad)
		print(type(e))
		obj["reference"] = salad
		obj["name"] = e.name
		obj["price"] = float(e.price)
		print(obj)
		dicionario[w]["salads"].append(obj)

	for dp in serial["dinnerPlatters"]:
		print(dp)
		
		obj = {}
		e = models.dinnerPlatters.objects.get(pk=dp)
		obj["reference"] = dp
		obj["name"] = e.name
		obj["size"] = e.size.name
		obj["price"] = float(e.price)
		print(obj)
		dicionario[w]["dinnerPlatters"].append(obj)

	for pasta in serial["pastas"]:
		print("running on pastas for")
		obj = {}
		e = models.pastas.objects.get(pk=pasta)
		obj["reference"] = pasta
		obj["name"] = e.name
		obj["price"] = float(e.price)
		print(obj)
		dicionario[w]["pastas"].append(obj)

	print(dicionario)
	return dicionario


# Create your views here.
def index(request):
	if request.user.is_authenticated:
		return render(request, "orders/index.html")
	else:
		return redirect("login")

def orders(request):
	return render(request, "orders/orders.html")

def getOrders(request):
	#pg de orders manda ajax
	dicionario = {

	"cart" : None,
	"cartItems" : {
		"pizzas" : [],
		"subs" : [],
		"salads" : [],
		"dinnerPlatters" : [],
		"pastas" : []
	},
	"orders" : [],
	"orderItems": {
		"pizzas" : [],
		"subs" : [],
		"salads" : [],
		"dinnerPlatters" : [],
		"pastas" : []
	}
	}

	try:
		print("running inside try")
		cart = models.order.objects.get(user = request.user)
		print(cart)
		serial = serializers.orderserializer(cart).data
		print(serial)
		dicionario["cart"] = serial
		dicionario = makedict(dicionario, serial, "cartItems")
		print("running after makedict function")
		
	except:
		print("user has no cart")


	
	made_orders = models.made_orders.objects.filter(user=request.user)
	for made_order in made_orders:
		n = models.order.objects.get(pk = made_order.order.id)
		ser = serializers.orderserializer(n).data
		dicionario["orders"].append(ser)
		dicionario = makedict(dicionario, ser, "orderItems")


	return JsonResponse(dicionario)

def putOrder(request):
	dicionario = {"success" : False}
	#try:
	cart = models.order.objects.get(user = request.user)
	mo = models.made_orders.create(cart)
	mo.save()
	cart.user = ""
	cart.save()
	dicionario["success"] = True
	
	send_mail(
	    'Your order is comming!',
		'Hi ' + str(request.user) + ' your order is comming!',
		settings.EMAIL_HOST_USER,
		[request.user.email],
	    fail_silently=False,
	)
	#except:
	#	print("error putting order")
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
			break
	
	#If the user does not have an order, we create one for him.
	if not userHasOrder:
		order = models.order.create(request.user)
		order.save()


	if tipo == "pizza":
		print("running pizza case")
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
		print("running sub case")
		
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

def removeItem(request, tipo, ref):
	print("----------------------------------------------------")
	
	dicionario = {
	"success" : False
	}
	user = request.user
	order = models.order.objects.get(user = user)
	print(serializers.orderserializer(order).data)
	stri = "order_" + tipo
	tipo_cortado = tipo[:len(tipo)-1]
	stri2 = "order_" + tipo_cortado
	
	if (tipo == "pizzas" or tipo == "subs"):
		item = getattr(models, stri2)
		item = item.objects.get(pk = ref)
		order.total -= item.price
		getattr(order, tipo).remove(item)
		#order[tipo].remove(item)
		order.save()
	else:
		relation = None
		qs = getattr(models, stri2)
		qs = qs.objects.filter(order = order)
		print("ref is" + str(ref))
		print(type(ref))
		for i in qs:
			print("inside for")
			a = getattr(i, tipo_cortado)
			print("a is " + str(a))
			print("a id is" + str(a.id))
			print(type(a.id))
			if a.id == int(ref):
				print("a id is equal to ref")
				relation = i
				relation.delete()
				break
		item = getattr(models, tipo)
		item = item.objects.get(pk = ref)
		order.total -= item.price
		#order[tipo].remove(item)
		order.save()
	print(serializers.orderserializer(order).data)
	print("----------------------------------------------------")
	


	#item = models[stri].objects.filter(pk = ref)
	dicionario["success"] = True
	return JsonResponse(dicionario)
	

def staffPage(request):
	
	return render(request, "orders/staffPage.html")

def getOrdersStaff(request):
	dicionario = {
		"orders": [],
		"orderItems": {
			"pizzas" : [],
			"subs" : [],
			"salads" : [],
			"dinnerPlatters" : [],
			"pastas" : []

		}
		}
	for i in models.made_orders.objects.all():
		order = i.order
		serial = serializers.orderserializer(order).data
		makedict(dicionario, serial, "orderItems")
		serial["user"] = i.user
		dicionario["orders"].append(serial)

	return JsonResponse(dicionario)

def deleteOrder(request, orderId):

	print("running Function")
	dicionario={
		"success" : False
	}
	if request.user.is_superuser:
		try:
			order = models.order.objects.get(pk = orderId)
			order.delete()
			dicionario["success"] = True
		except:
			print("cold not delete order!")
	return JsonResponse(dicionario)