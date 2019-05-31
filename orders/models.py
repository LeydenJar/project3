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
		return self.name

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
		return str(self.size + self.toppings_amount + self.price)

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
	pizzas = models.ManyToManyField(order_pizza)
	subs = models.ManyToManyField(order_sub)
	salads = models.ManyToManyField(salads)
	dinnerPlatters = models.ManyToManyField(dinnerPlatters)
	total = models.DecimalField(max_digits=7, decimal_places=2)

