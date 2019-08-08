document.addEventListener("DOMContentLoaded", ()=>{
var content = document.querySelector(".content");
var body = document.querySelector("body");
var data;

var getOrders = new XMLHttpRequest;
getOrders.open('GET', "getOrders");
getOrders.send();

getOrders.onload = ()=>{
	data = JSON.parse(getOrders.responseText);
	console.log(data);

		//Colocando as pizzas

	if(data.cart){
		var pizzadiv = document.getElementById("PizzasDiv");
		for (i=0; i< data.cart.pizzas.length; i++){
			var button = document.createElement("button");
			button.setAttribute("class", "btn btn-primary seeMore pizza");
			button.setAttribute("dataRef", data.cart.pizzas[i]);
			button.setAttribute("dataType", "pizzas");

			for (j = 0; j < data.cartItems.pizzas.length; j++){	
				if (data.cartItems.pizzas[j].reference == data.cart.pizzas[i]){				
					item = data.cartItems.pizzas[j];
				}
			}
			if (item.sicilian){
				button.innerHTML =  "Sicilian Pizza";
			}else{"Normal Pizza"}
			
			pizzadiv.insertBefore(button, pizzadiv.childNodes[2]);
		}

		var subsdiv = document.getElementById("SubsDiv");
		for (i=0; i< data.cart.subs.length; i++){
			var button = document.createElement("button");
			button.setAttribute("class", "btn btn-primary seeMore sub");
			button.setAttribute("dataRef", data.cart.subs[i]);
			button.setAttribute("dataType", "subs");

			for (j = 0; j < data.cartItems.subs.length; j++){	
				if (data.cartItems.subs[j].reference == data.cart.subs[i]){				
					item = data.cartItems.subs[j];
				}
			}

			button.innerHTML =  item.name;
			subsdiv.insertBefore(button, subsdiv.childNodes[2]);
		}

		var dpdiv = document.getElementById("DPDiv");
		console.log(data.cart.dinnerPlatters);
		for (i=0; i< data.cart.dinnerPlatters.length; i++){

			var button = document.createElement("button");
			button.setAttribute("class", "btn btn-primary seeMore dp");
			console.log(data.cart.dinnerPlatters[i]);
			button.setAttribute("dataRef", data.cart.dinnerPlatters[i]);
			button.setAttribute("dataType", "dinnerPlatters");

			for (j = 0; j < data.cartItems.dinnerPlatters.length; j++){	
				if (data.cartItems.dinnerPlatters[j].reference == data.cart.dinnerPlatters[i]){				
					item = data.cartItems.dinnerPlatters[j];
				}
			}

			button.innerHTML =  item.name;
			dpdiv.insertBefore(button, dpdiv.childNodes[2]);
		}

		var pastasdiv = document.getElementById("PastasDiv");
		for (i=0; i< data.cart.pastas.length; i++){
			var button = document.createElement("button");
			button.setAttribute("class", "btn btn-primary seeMore pasta");
			button.setAttribute("dataRef", data.cart.pastas[i]);
			button.setAttribute("dataType", "pastas");

			for (j = 0; j < data.cartItems.pastas.length; j++){	
				if (data.cartItems.pastas[j].reference == data.cart.pastas[i]){				
					item = data.cartItems.pastas[j];
				}
			}

			button.innerHTML =  item.name;
			pastasdiv.insertBefore(button, pastasdiv.childNodes[2]);
		}

		var saladsdiv = document.getElementById("SaladsDiv");
		for (i=0; i< data.cart.salads.length; i++){
			console.log(data.cart.salads.length);
			var button = document.createElement("button");
			button.setAttribute("class", "btn btn-primary seeMore salad");
			button.setAttribute("dataRef", data.cart.salads[i]);
			button.setAttribute("dataType", "salads");

			for (j = 0; j < data.cartItems.salads.length; j++){	
				if (data.cartItems.salads[j].reference == data.cart.salads[i]){				
					item = data.cartItems.salads[j];
					console.log("worked on -- " + data.cart.salads[i]);
					break
				}
			}

			console.log(data.cart.salads.length);
			button.innerHTML =  item.name;
			saladsdiv.insertBefore(button, saladsdiv.childNodes[2]);
			console.log("made button" + item.name);
			console.log(data.cart.salads.length);
		}

		//Colocando o preço
		document.querySelector("#preço").innerHTML = "$:" + data.cart.total;

	}

	


	//Fazendo botões das ordens
	var ordersdiv = document.getElementById("OrdersDiv");
	for (i=0; i<data.orders.length; i++){
		var button = document.createElement("button");
		button.setAttribute("class", "btn btn-primary order salad");
		button.setAttribute("DataRef", data.orders[i].id);
		button.innerHTML = "Order" + data.orders[i].id;
		ordersdiv.appendChild(button);
	}

	var orderButtons = document.querySelectorAll(".order");
	var seeMoreButtons = document.querySelectorAll(".seeMore");
	seeMoreButtons.forEach(function(button){
			button.onmouseover = ()=>{
				var showInfoDiv = document.createElement("div");
				showInfoDiv.setAttribute("class", "showInfo");
				var id = button.getAttribute("dataRef");
				var Type = button.getAttribute("dataType");
				var item;
				for (i = 0; i < data.cartItems[Type].length; i++){	
					if (data.cartItems[Type][i].reference == id){				
						item = data.cartItems[Type][i];
					}
				}

				var title = document.createElement("h5");
				var br = document.createElement("br");
				var bs = document.createElement("br");
				var bt = document.createElement("br");
				var bu = document.createElement("br");
				
				var p = document.createElement("p");
				var q = document.createElement("p");
				var r = document.createElement("p");
				var s = document.createElement("p");

				if (item.name){
					title.textContent = item.name;
				}else if(item.sicilian){
					title.textContent = "Sicilian Pizza";
				}else{title.textContent = "Normal Pizza";}

				showInfoDiv.appendChild(title);
				showInfoDiv.appendChild(br);

				if(item.size){
					p.textContent = item.size;
					showInfoDiv.appendChild(p);
					showInfoDiv.appendChild(br);
				}

				if (item.extras){
					q.textContent = item.extras;
					showInfoDiv.appendChild(q);
					showInfoDiv.appendChild(bs);
				}

				if (item.toppings){
					r.textContent = item.toppings;
					showInfoDiv.appendChild(r);
					showInfoDiv.appendChild(bt);
				}				

				s.textContent = item.price;

				showInfoDiv.appendChild(s);
				showInfoDiv.appendChild(bu);
				body.appendChild(showInfoDiv);



			}
			button.onmouseout = ()=>{
				showInfoDiv = document.querySelector(".showInfo");
				body.removeChild(showInfoDiv);
			}

			button.onclick = ()=>{
				var n = document.createElement("div");
				n.innerHTML = "Are you sure you want to remove this item?";
				n.innerHTML += "<button class='btn btn-primary'> YES </button> <button class='btn btn-primary'> NO </button>";
				n.setAttribute("class", "confirmationDiv");
				body.appendChild(n);

				var tipo = button.getAttribute("dataType");
				//tipo = tipo.substring(0, tipo.length-1);
				console.log(tipo);
				var ref = button.getAttribute("DataRef");
				var noButton = document.querySelector("#noButton");
				var yesButton = document.querySelector("#yesButton");

				noButton.onclick = ()=>{
					const div = document.querySelector(".confirmationDiv");
					tipo = null;
					ref = null;
					div.parentElement.removeChild(div);
				}

				yesButton.onclick = ()=>{
					const request = new XMLHttpRequest;
					request.open('GET', 'removeItem/' + tipo + '/' + ref);
					request.send();

					request.onload = ()=>{
						data = JSON.parse(request.responseText);
						if (data.success){
							alert("success");
							location.reload();
						}
						else{
							alert("something went wrong...");
							location.reload();
						}
					}
				}
			}
	});

	orderButtons.forEach((button)=>{
		button.onmouseover = ()=>{
			var showInfoDiv = document.createElement("div");
			showInfoDiv.setAttribute("class", "showInfo");

			var id = button.getAttribute("dataRef");
			
			var order;
			
			for (i=0; i < data.orders.length; i++){
				
				if (data.orders[i].id == id){
					order = data.orders[i];
					break;
				}
			}	
			
			arraY = [order.pizzas, order.dinnerPlatters, order.pastas, order.salads, order.subs];
			count = 0;
			var numberOfItems = 0;

			arraY.forEach(
				function(array){
					for(i=0; i<array.length; i++){
						var div = document.createElement("div");
						var bigTitle = document.createElement("h4");
						var title = document.createElement("h5");
						var text = document.createElement("div");
						div.setAttribute("class", "OrderItemInfo");
						bigTitle.setAttribute("class", "bigTitleItemInfo");
						title.setAttribute("class", "TitleItemInfo");
						text.setAttribute("class", "ClassItemInfo");

						console.log(array);
						console.log(count);
						

						var tipo;
						switch(count){
							case 0: tipo = "Pizza"; break;
							case 1: tipo = "Dinner Platter"; break;
							case 2: tipo = "Pasta"; break;
							case 3: tipo = "Salad"; break;
							case 4: tipo = "Sub"; break;
						}
						tipo2 = (tipo + "s").toLowerCase().replace(/\s+/g, '');
						console.log(tipo2);
						//tipo2 = tipo2.replace(/\s+/g, '');
						
						if (tipo2 == "dinnerplatters"){
							tipo2 = "dinnerPlatters"
						}

						bigTitle.textContent = tipo;

						var item;
						console.log(tipo2);
						for (c=0; c< data.orderItems[tipo2].length; c++){
							console.log(c);
							if (data.orderItems[tipo2][c].reference == array[i]){
								item = data.orderItems[tipo2][c];
								break;
							}
						}

						if(item.name){
							title.textContent = item.name;
						}else if(item.sicilian){
							title.textContent = "Sicilian";
						}else{
							title.textContent = "Normal";
						}

						if(item.size){
							text.innerHTML += "<p>" + item.size +"</p>";
						}
						if(item.extras){
							text.innerHTML += "<p>" + item.extras +"</p>";
						}
						if (item.toppings){
							text.innerHTML += "<p>" +  item.toppings + "</p>";
						}
						text.innerHTML += "<p>" + item.price+"</p>" ;

						div.appendChild(bigTitle);
						div.appendChild(title);
						div.appendChild(text);
						showInfoDiv.appendChild(div);
						numberOfItems ++;
					}
					count = count+1;
				}
				
			);


			body.appendChild(showInfoDiv);

			//Setting the credit style animation

			
				var stylesheet = document.styleSheets[2],
					rules = stylesheet.rules,
					i = rules.length,
					keyframes,
					keyframe
				;

				while(i--){
					keyframes = rules.item(i);
					console.log(keyframes.name);
					if((
		               keyframes.type === keyframes.KEYFRAMES_RULE
		         	   || keyframes.type === keyframes.WEBKIT_KEYFRAMES_RULE
				        )
				        && keyframes.name === "credit"){


						var Nrules = keyframes.cssRules;
						i = Nrules.length;
						while(i--){
							
							keyframe = Nrules.item(i);
							console.log(keyframe.keyText)
							console.log(typeof keyframe.keyText)
							if(
								(
		                       keyframe.type === keyframe.KEYFRAME_RULE
		                    || keyframe.type === keyframe.WEBKIT_KEYFRAME_RULE
			                )
			                && keyframe.keyText === "100%"
								){
								console.log("running");
								console.log(numberOfItems)
								document.querySelectorAll(".OrderItemInfo").forEach(
										(item)=>{item.style.animationDuration = numberOfItems*1.5 + "s";}
									);
									
								if(numberOfItems > 5){
									keyframe.style.bottom = numberOfItems*30 + "%";
								}else{keyframe.style.bottom = 0;}
								

								break;
							}
						}
						break;
					}
				}

		}
		button.onmouseout = ()=>{
			showInfoDiv = document.querySelector(".showInfo");
			body.removeChild(showInfoDiv);	
		}
	});
}


makeOrderButton = document.querySelector("#makeOrder");
makeOrderButton.onclick = ()=>{
	if(data.cart){
		//Confirmation
		//Criando div
		var div = document.createElement("div");
		var header = document.createElement("h5");
		var yesButton = document.createElement("button");
		var noButton = document.createElement("button");

		header.textContent = "Are you sure you want to make this order?";
		yesButton.textContent = "Yes";
		noButton.textContent = "no";
		yesButton.className = "choiceButton yesButton btn btn-primary";
		noButton.className = "choiceButton noButton btn-primary btn";
		div.className = "confirmationDiv";

		div.appendChild(header);
		div.appendChild(noButton);
		div.appendChild(yesButton);
		body.appendChild(div);

		noButton.onclick = ()=>{
			var div = document.querySelector(".confirmationDiv");
			div.parentElement.removeChild(div);
		}
		yesButton.onclick = ()=>{
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
	}else{
		alert("put some items in your cart first");
	}
}
});