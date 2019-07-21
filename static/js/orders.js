document.addEventListener("DOMContentLoaded", ()=>{


var getOrders = new XMLHttpRequest;
getOrders.open('GET', "getOrders");
getOrders.send();

getOrders.onload = ()=>{
	data = JSON.parse(getOrders.responseText);
	console.log(data);

	//Colocando as pizzas
	var pizzadiv = document.getElementById("PizzasDiv");
	for (i=0; i< data.cart.pizzas.length; i++){
		var button = document.createElement("button");
		button.setAttribute("class", "btn btn-primary seeMore pizza");
		button.setAttribute("data-ref", data.cart.pizzas[i]);
		button.innerHTML =  "pizza" + data.cart.pizzas[i];
		pizzadiv.insertBefore(button, pizzadiv.childNodes[2]);
	}

	var subsdiv = document.getElementById("SubsDiv");
	for (i=0; i< data.cart.subs.length; i++){
		var button = document.createElement("button");
		button.setAttribute("class", "btn btn-primary seeMore sub");
		button.setAttribute("data-ref", data.cart.subs[i]);
		button.innerHTML =  "sub" + data.cart.subs[i];
		subsdiv.insertBefore(button, subsdiv.childNodes[2]);
	}

	var dpdiv = document.getElementById("DPDiv");
	for (i=0; i< data.cart.dinnerPlatters.length; i++){
		var button = document.createElement("button");
		button.setAttribute("class", "btn btn-primary seeMore dp");
		button.setAttribute("data-ref", data.cart.dinerPlatters[i]);
		button.innerHTML =  "Dinner Platter" + data.cart.dinerPlatters[i];
		dpdiv.insertBefore(button, dpdiv.childNodes[2]);
	}

	var pastasdiv = document.getElementById("PastasDiv");
	for (i=0; i< data.cart.pastas.length; i++){
		var button = document.createElement("button");
		button.setAttribute("class", "btn btn-primary seeMore pasta");
		button.setAttribute("data-ref", data.cart.pastas[i]);
		button.innerHTML =  "Pasta " + data.cart.pastas[i];
		pastasdiv.insertBefore(button, pastasdiv.childNodes[2]);
	}

	var saladsdiv = document.getElementById("SaladsDiv");
	for (i=0; i< data.cart.salads.length; i++){
		var button = document.createElement("button");
		button.setAttribute("class", "btn btn-primary seeMore salad");
		button.setAttribute("data-ref", data.cart.salads[i]);
		button.innerHTML =  "Salad " + data.cart.salads[i];
		saladsdiv.insertBefore(button, saladsdiv.childNodes[2]);
	}

	//Fazendo botões das ordens
	var ordersdiv = document.getElementById("OrdersDiv");
	for (i=0; i<data.orders.length; i++){
		var button = document.createElement("button");
		button.setAttribute("class", "btn btn-primary order salad");
		button.innerHTML = "Order" + data.orders[i].id;
		ordersdiv.appendChild(button);
	}

	orderButtons = document.querySelectorAll(".order");
	seeMoreButtons = document.querySelectorAll(".seeMore");
	seeMoreButtons.forEach(function(button){
			button.onclick = ()=>{
				alert("click!");
			}
		}
		);

	orderButtons.forEach((button)=>{
		button.onclick = ()=>{
			alert("click!");
	}
	});
}


makeOrderButton = document.querySelector("#makeOrder");
makeOrderButton.onclick = ()=>{
	var putOrder = new XMLHttpRequest;
	putOrder.open('GET', 'putOrder');
	putOrder.send();

	putOrder.onload = ()=>{
		var response = JSON.parse(putOrder.responseText);
		console.log(response);

		if (response.success == true){
			alert("success!");
			location.reload();
		}else{
			alert("there was some error!");
		}
	}


}
});