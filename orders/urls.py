from django.urls import path, include
from orders.views import newpage, index, data, validate
from users.views import register
from django.contrib.auth import views as auth_views




urlpatterns = [
    path("", index, name="index"),
    path("newpage", newpage, name="newpage"),
    path('register', register),
    path('login', auth_views.LoginView.as_view(template_name='users/login.html'), name="login"),
    path('logout', auth_views.LogoutView.as_view(template_name='users/logout.html'), name="logout"),
    path('data/<type>', data, name="data"),
    path('validate/<type>/<name>', validate, name="validate")
]

#url > view > process > response