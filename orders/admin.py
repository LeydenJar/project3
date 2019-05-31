from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.salads)
admin.site.register(models.pastas)
admin.site.register(models.sizes)
admin.site.register(models.dinnerPlatters)
admin.site.register(models.sub)
admin.site.register(models.extra)
admin.site.register(models.topping)
admin.site.register(models.pizza)