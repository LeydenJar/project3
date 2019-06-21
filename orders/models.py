from django.db import models

# Create your models here.

class salads(models.Model):
	name = models.CharField(max_length=50)
	price = models.DecimalField(max_digits = 6, decimal_places = 2)

	def __str__(self):
		return self.name

class pastas(models.Model):
	name = models.CharField(max_length = 64)
	price = models.DecimalField(max_digits = 6, decimal_places = 2)

	def __str(self):
		return self.name

class sizes(models.Model):
	name = models.CharField(max_length=64)

	def __str__(self):
		return self.name


class dinnerPlatters(models.Model):
	name = models.CharField(max_length=64)
	size = models.ForeignKey(sizes, on_delete=models.CASCADE)
	price = models.DecimalField(max_digits = 6, decimal_places = 2)

	def __str__(self):
		return self.name + "  ---  " + self.size.name

class sub(models.Model):
	name = models.CharField(max_length=64)
	size = models.ForeignKey(sizes, on_delete=models.CASCADE)
	price = models.DecimalField(max_digits = 6, decimal_places = 2)

	def __str__(self):
		return self.name

class extra(models.Model):
	name = models.CharField(max_length=64)
	price = models.DecimalField(max_digits=6, decimal_places = 2)

	def __str__(self):
		return self.name

class topping(models.Model):
	name = models.CharField(max_length=64)

	def __str__(self):
		return self.name


class pizza(models.Model):
	sicilian = models.BooleanField()
	size = models.ForeignKey(sizes, on_delete=models.CASCADE)
	toppings_amount = models.IntegerField()
	price = models.DecimalField(max_digits=6, decimal_places=2)

	def __str__(self):
		return str(self.size.name + " - " + str(self.toppings_amount) + " - " + str(self.price))

class order_pizza(models.Model):
	sicilian = models.BooleanField()
	size = models.ForeignKey(sizes, on_delete=models.CASCADE)
	toppings = models.ManyToManyField(topping)
	price = models.DecimalField(max_digits=6, decimal_places=2)

	def __str__(self):
		return str(self.size + self.sicilian + self.toppings + self.price)

class order_sub(models.Model):
	name = models.ForeignKey(sub, on_delete=models.CASCADE)
	size = models.ForeignKey(sizes, on_delete=models.CASCADE)
	extras = models.ManyToManyField(extra)
	price = models.DecimalField(max_digits = 6, decimal_places = 2)

	def __str__(self):
		return self.name


class order(models.Model):
	user = models.CharField(max_length=64)
	pizzas = models.ManyToManyField(order_pizza)
	subs = models.ManyToManyField(order_sub)
	salads = models.ManyToManyField(salads)
	dinnerPlatters = models.ManyToManyField(dinnerPlatters)
	pastas = models.ManyToManyField(pastas, through="order_pasta")
	total = models.DecimalField(max_digits=7, decimal_places=2)

	@classmethod
	def create(cls, user):
		order = cls(user=str(user))
		order.total = 0
		return order

class order_pasta(models.Model):
	order = models.ForeignKey(order, on_delete=models.CASCADE)
	pasta = models.ForeignKey(pastas, on_delete=models.CASCADE)
	

	@classmethod
	def create(cls, order_id, pasta_id):
		relation = cls(order= order_id, pasta=pasta_id)
		return relation