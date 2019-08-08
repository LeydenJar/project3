
var data;
document.addEventListener("DOMContentLoaded", ()=>{
	var request = new XMLHttpRequest;
	request.open("GET", "getOrders/staff");
	request.send();

	var orderItemsDiv=document.getElementById("orderItemsDiv");
	var openOrdersDiv=document.getElementById("openOrdersDiv");
	var body=document.querySelector('body');
	const refreshButton = document.getElementById("refresh");
	var order = null;
	const deleteOrderButton = document.getElementById("deleteOrder");

	request.onload = ()=>{
		data = JSON.parse(request.responseText);
		console.log(data);
		var openOrdersDiv = document.querySelector('#openOrdersDiv');
		for(i=0; i<data.orders.length; i++){
			var button = document.createElement('button');
			button.textContent = "Order" + data.orders[i].id;
			button.className = "btn btn-primary btnOpenOrder";
			button.setAttribute('data-ref', data.orders[i].id)
			openOrdersDiv.appendChild(button);

		}

		var openOrderButtons = document.querySelectorAll(".btnOpenOrder")
		openOrderButtons.forEach(function(button){
			button.onclick = ()=>{

				document.querySelectorAll(".OrderItemInfo").forEach((div)=>{
					div.parentNode.removeChild(div);
				});
				var hasPrice = document.querySelector(".priceDiv");
				if(hasPrice){
					n = document.querySelector(".priceDiv");
					n.parentElement.removeChild(n);

				}
				
				var ref = button.getAttribute("data-ref");
				
				for (i=0; i<data.orders.length; i++){
					if(data.orders[i].id == ref){
						order = data.orders[i];
						break;
					}
				}
				console.log(order);

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
							orderItemsDiv.appendChild(div);
							numberOfItems ++;
						}
						count = count+1;
					}
					
				);

				//Colocando o total no final

				var priceDiv = document.createElement("div");
				priceDiv.className = "priceDiv";
				priceDiv.textContent = "Total: " + order.total;
				body.appendChild(priceDiv);
			}
		});


	}
	//Refreshing page when clicking on "refresh"
	refreshButton.onclick = ()=>{
		location.reload();
	}

	deleteOrderButton.onclick = ()=>{
		if (order){
			const req = new XMLHttpRequest;
			path = "deleteOrder/" + order.id;
			req.open("GET", path);
			req.send();

			req.onload = ()=>{
				data = JSON.parse(req.responseText);
				console.log(data)
				if (data.success){
					alert("success");
					location.reload();
				}else{alert("something went wrong!");}
			}
		}
	}

});