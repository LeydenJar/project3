
function removeOldContent(newManchete){
	var cont = document.querySelector(".content2");
	cont.parentElement.removeChild(cont);
	var newb = document.createElement("div");
	newb.setAttribute("class", "content2");
	var c = document.querySelector(".content");
	c.appendChild(newb);
	//Setando nova manchete
	document.querySelector("#manchete").innerHTML=newManchete;
	return newb;
}

const newPsButton = Handlebars.compile("<button class='ps_button btn btn-primary'><p class='ps_name'>{{buttonText}}</p>");
function createPsButtons(obj){
	const n = document.createElement("div");
	n.setAttribute('class', 'ps_div');

	if(obj[0].sicilian === false || obj[0].sicilian === true){
		const b = newPsButton({"buttonText" : "Sicilian"});
		const c = newPsButton({"buttonText" : "Normal"});
		n.innerHTML += b;
		n.innerHTML += c;
	}
	else{
		var button_name = null
		for(i = 0 ; i < obj.length; i++){
			if (obj[i].name !== button_name){
				const b = newPsButton({"buttonText" : obj[i].name});
				n.innerHTML += b;
				button_name = obj[i].name;
			}
		}
	}
	return n;
}

function createSizeButtons(){
	const j = document.querySelector(".size_div");
	if (j == null){
		const size_div = document.createElement("div");
		size_div.setAttribute("class", "size_div");
		const s = document.createElement("button");
		s.setAttribute("class", "size_button btn btn-primary");
		s.innerHTML = "Small";
		const b =document.createElement("button");
		b.setAttribute("class", "size_button btn btn-primary");
		b.innerHTML = "Large";
		size_div.appendChild(s);
		size_div.appendChild(b);
		document.querySelector(".content2").appendChild(size_div);
	}
}

function updateCurrentItem(currentItem, objects){
	currentItem.id = null;
	currentItem.price = null;
	if(currentItem.tipo == "pizza"){
		for (i=0; i<objects.length; i++){
			if (currentItem.isSicilian === objects[i].sicilian && currentItem.size === objects[i].size && currentItem.toppingsAmount == objects[i].toppings_amount){
				currentItem.id = objects[i].id;
				currentItem.price = objects[i].price;
				break;
			}
		}
	}
	else if(currentItem.tipo == "dinner platter" || currentItem.tipo == "sub"){	
		for (i=0; i<objects.length; i++){
			if (currentItem.name === objects[i].name && currentItem.size === objects[i].size){
				currentItem.id = objects[i].id;
				currentItem.price = objects[i].price;
				break;
			}
		}
	}
	else{	
		for (i=0; i<objects.length; i++){
			if (currentItem.name === objects[i].name){
				currentItem.id = objects[i].id;
				currentItem.price = objects[i].price;
				break;
			}
		}
	}

	return currentItem;
}

function createPriceDiv(price){
	preçoDiv = document.querySelector('.preçoDiv');
	if (preçoDiv == null){
		const div = document.createElement('div');
		div.innerHTML = "Item price: " + price;
		div.setAttribute('class', 'preçoDiv');
		document.querySelector('.content2').appendChild(div);
	}else{
		preçoDiv.innerHTML = "Item price: " + price;
	}
}

function createActionButton(text){
	const check = document.querySelector('.actionButton');

	if(check !== null){
		check.parentElement.removeChild(check);
	}
	const actButton = document.createElement('button');
	actButton.setAttribute('class', 'btn btn-success actionButton');
	actButton.innerHTML = text;
	document.querySelector('.content2').appendChild(actButton);
	return actButton;
}

function updateExtraButtons(currentItem){
	document.querySelectorAll(".optionButton").forEach(function(optionButton){
		optionButton.onclick = ()=>{
			if (currentItem.toppingsAmount>document.querySelectorAll(".selectedButton").length){
				currentItem.toppings.push(optionButton.innerHTML);
				const selectedButton = document.createElement("button");
				selectedButton.setAttribute("class", "btn btn-primary selectedButton");
				selectedButton.innerHTML = optionButton.innerHTML;
				document.querySelector(".divSelected").appendChild(selectedButton);
				optionButton.parentElement.removeChild(optionButton);
				if (currentItem.tipo = "sub"){
					for (i = 0; i < data.extras.length; i++){
						if (data.extras[i].name === selectedButton.innerHTML){
							console.log(typeof currentItem.price);
							console.log(typeof data.extras[i].price);
							currentItem.price = (parseFloat(currentItem.price) + parseFloat(data.extras[i].price)).toFixed(2);
							break
						}
					}
				}
				updateExtraButtons(currentItem);
			}
			else{
				alert("Too much toppings!!");
			}
		}
	});

	document.querySelectorAll(".selectedButton").forEach(function(selectedButton){
		selectedButton.onclick = ()=>{
			selectedButton.setAttribute("class", "btn btn-primary optionButton");
			document.querySelector(".extraOptionsDiv").appendChild(selectedButton);
			currentItem.toppings.splice(currentItem.toppings.indexOf(selectedButton.innerHTML),1);
			if (currentItem.tipo = "sub"){
				for (i = 0; i < data.extras.length; i++){
					if (data.extras[i].name === selectedButton.innerHTML){
						currentItem.price = (parseFloat(currentItem.price) - parseFloat(data.extras[i].price)).toFixed(2);
						break
					}
				}
			}
			updateExtraButtons(currentItem);


		}
	});
	updateCurrentItemDiv(currentItem);
	return currentItem;
}

function updateCurrentItemDiv(currentItem){
	var name = document.getElementById("Name").childNodes[3];
	var size = document.getElementById("Size").childNodes[3];
	var extras = document.getElementById("Extras").childNodes[3];
	var price = document.getElementById("Price").childNodes[3]; 

	console.log(name);

	name.innerText = "N/A";
	size.innerText = "N/A";
	extras.innerText = "N/A";
	price.innerText = "N/A";

	if (currentItem.tipo == "pizza"){
		if (currentItem.isSicilian){
			name.textContent = "Sicilian pizza";
		}else{
			name.textContent = "Normal pizza";
		}
	}else if(currentItem.name){
		name.innerText = currentItem.name;
	}

	if (currentItem.size){
		size.innerText = currentItem.size;
	}
	if (currentItem.toppings) {
		extras.innerText = currentItem.toppings;
	}
	if (currentItem.price){
		price.innerText = currentItem.price;
	}
}

document.addEventListener("DOMContentLoaded", ()=>{

var getInfo = new XMLHttpRequest;
getInfo.open("GET", "getData");
getInfo.send()
getInfo.onload = function(){
	if (getInfo.status === 200){
		data = JSON.parse(getInfo.responseText);
	}else{
		alert("unnable to load data");
	}
}

var currentItem = {};

	document.querySelectorAll(".button").forEach(
		function(button){
			button.onclick = ()=>{
				var button_pressed = button.innerHTML;
				currentItem.type = button_pressed;
				console.log(data);

				if (button_pressed == "Pizza"){

					currentItem = {};
					currentItem.tipo = "pizza";
					updateCurrentItemDiv(currentItem);
					//removing old content, updating manchete and creating ps buttons.
					removeOldContent("PIZZAS").appendChild(createPsButtons(data.pizzas));
					
					const sicilian_buttons = document.querySelectorAll('.ps_button'); 
					sicilian_buttons.forEach(function(sicilianButton){
						sicilianButton.onclick = ()=>{
									
							//Atualizando objeto currentItem							
							currentItem.isSicilian = (sicilianButton.firstChild.innerHTML == "Sicilian");
							console.log(currentItem.isSicilian);

							currentItem = updateCurrentItem(currentItem, data.pizzas);
							updateCurrentItemDiv(currentItem);

							//Creating price div if toppings amount is already defined.
							if (currentItem.toppingsAmount){
								createPriceDiv(currentItem.price);
							}
							//Criando botões tamanho
							createSizeButtons();


							//size buttons functionality
							const size_buttons = document.querySelectorAll('.size_button'); 
							size_buttons.forEach(function(sizeButton){
								sizeButton.onclick = ()=>{
											
									//Atualizando objeto currentItem
									currentItem.size = sizeButton.innerHTML;
								
									currentItem = updateCurrentItem(currentItem, data.pizzas);
									updateCurrentItemDiv(currentItem);

									//Creating price div if toppings amount is already defined.
									if (currentItem.toppingsAmount){
										createPriceDiv(currentItem.price);
									}
		
									//Criando botões de seleção de numero de toppings:
									const check = document.querySelector('.top_select_div');
									if (check == null){
										const z = Handlebars.compile("<button class='top_select_button btn btn-primary' value='{{value}}'><p class='ps_name'>{{inner}}</p></button><br>");
										t=z({"inner" : "Cheese", "value" : 0});
										y=z({"inner" : "1 topping", "value" : 1});
										x=z({"inner" : "2 toppings", "value" : 2});
										w=z({"inner" : "3 toppings", "value" : 3});
										v=z({"inner" : "Special (10 toppings)", "value" : 10});
										const u = document.createElement("div");
										u.setAttribute("class", "top_select_div");
										u.innerHTML += t;
										u.innerHTML += y;
										u.innerHTML += x;
										u.innerHTML += w;
										u.innerHTML += v;
										
										document.querySelector('.content2').appendChild(u);

										const ts_buttons = document.querySelectorAll('.top_select_button'); 
										ts_buttons.forEach(function(tsButton){
											tsButton.onclick = ()=>{
												//Atualizando objeto currentItem
												currentItem.toppingsAmount = tsButton.value;
												currentItem.toppings = [];

												currentItem = updateCurrentItem(currentItem, data.pizzas);
												updateCurrentItemDiv(currentItem);

												//Creating price div.
												createPriceDiv(currentItem.price);
												
												//Creating Action button
												actionButton = createActionButton("Choose Toppings");

												actionButton.onclick = ()=>{
													currentItem.toppings = [];
													const div = document.createElement("div");
													div.setAttribute("class", "extrasDiv");
													const divOptions = document.createElement("div");
													divOptions.setAttribute("class", "extraOptionsDiv");
													const divSelected = document.createElement("div");
													divSelected.setAttribute("class", "divSelected");
													addToCartButton = document.createElement("button");
													addToCartButton.setAttribute("class", "btn btn-primary addToCartButton");
													addToCartButton.textContent = "Add to Cart!";
													backButton = document.createElement("Button");
													backButton.className = "btn btn-primary backButton";
													backButton.textContent = "Back";

													

													for (i=0; i<data.toppings.length; i++){
														const button = document.createElement("button");
														button.setAttribute("class", "btn btn-primary optionButton");
														button.innerHTML = data.toppings[i].name;
														divOptions.appendChild(button);
													}
													div.appendChild(divOptions);
													div.appendChild(divSelected);
													div.appendChild(backButton);
													div.appendChild(addToCartButton);

													document.querySelector(".content2").appendChild(div);

													console.log(currentItem);
													currentItem = updateExtraButtons(currentItem);
													console.log(currentItem)

													addToCartButton.onclick = ()=>{
														info = new FormData(document.getElementById("addToCart"));
														info.append("tipo", currentItem.tipo);
														info.append("isSicilian", currentItem.isSicilian);
														info.append("size", currentItem.size);
														info.append("toppingsAmount", currentItem.toppingsAmount);
														info.append("toppings", currentItem.toppings);

														validateRequest = new XMLHttpRequest;
														validateRequest.open("POST", "validate");
														validateRequest.send(info);

														validateRequest.onload = ()=>{
															const response = JSON.parse(validateRequest.responseText);
															console.log(response);
															if(response.success === true){
																alert("sucess");
																										
															}else{
																alert("Error, it seems like the pizza you asked do not exist");													
															}
															currentItem = {};
															window.location.replace("/");
														}
													}

													backButton.onclick = ()=>{
														currentItem.toppings = [];
														document.querySelector(".content2").removeChild(div);

													}
												}
											}
										});
									}	
								}
							});
						}
					});				
				}
				else if(button_pressed == "Subs"){
					//reset currentItem
					currentItem = {};
					currentItem.tipo = "sub";
					currentItem.toppingsAmount = 10;
					updateCurrentItemDiv(currentItem);

					//removing old content, updating manchete and creating ps buttons
					removeOldContent("SUBS").appendChild(createPsButtons(data.subs));

					//funcionalidade dos botões
					document.querySelectorAll(".ps_button").forEach(function(button){
						button.onclick = ()=>{

							//Atualizando currentItem
							currentItem.name = button.childNodes[0].innerHTML;

							currentItem = updateCurrentItem(currentItem, data.subs);
							updateCurrentItemDiv(currentItem);

							//Updating price div if size is already defined
							if (currentItem.size){
								createPriceDiv(currentItem.price);
							}

							//Criando botoes de tamanho
							createSizeButtons();

							//size buttons functionality
							const nbuttons = document.querySelectorAll(".size_button");
							nbuttons.forEach(function(buttonSize){
								buttonSize.onclick = ()=>{

									//Atualizando objeto currentItem
									currentItem.size = buttonSize.innerHTML;
									currentItem = updateCurrentItem(currentItem, data.subs);
									updateCurrentItemDiv(currentItem);

									//Creating Price Div
									createPriceDiv(currentItem.price);

									//Creating Action button
									actionButton = createActionButton("Choose Extras!");

									actionButton.onclick = ()=>{
										currentItem.toppings = [];
										const div = document.createElement("div");
										div.setAttribute("class", "extrasDiv");
										const divOptions = document.createElement("div");
										divOptions.setAttribute("class", "extraOptionsDiv");
										const divSelected = document.createElement("div");
										divSelected.setAttribute("class", "divSelected");
										addToCartButton = document.createElement("button");
										addToCartButton.setAttribute("class", "btn btn-primary addToCartButton");
										addToCartButton.textContent = "Add to Cart!";
										backButton = document.createElement("Button");
										backButton.className = "btn btn-primary backButton";
										backButton.textContent = "Back";

													

										for (i=0; i<data.extras.length; i++){
											const button = document.createElement("button");
											button.setAttribute("class", "btn btn-primary optionButton");
											button.innerHTML = data.extras[i].name;
											divOptions.appendChild(button);
										}
										div.appendChild(divOptions);
										div.appendChild(divSelected);
										div.appendChild(backButton);
										div.appendChild(addToCartButton);
										document.querySelector(".content2").appendChild(div);
										console.log(currentItem);
										currentItem = updateExtraButtons(currentItem);
										addToCartButton.onclick = ()=>{
											info = new FormData(document.getElementById("addToCart"));
											info.append("name", currentItem.name);
											info.append("tipo", currentItem.tipo);
											info.append("size", currentItem.size);
											
											info.append("extras", currentItem.toppings);

											validateRequest = new XMLHttpRequest;
											validateRequest.open("POST", "validate");
											validateRequest.send(info);

											validateRequest.onload = ()=>{
												const response = JSON.parse(validateRequest.responseText);
												if (response.success == true){
													alert("success")
												}else{alert("Something went wrong...")}
												currentItem = {};
												window.location.replace("/");
												console.log(response)
											}
										}
										backButton.onclick = ()=>{
											currentItem.toppings = [];
											document.querySelector(".content2").removeChild(div);

										}
									}
								}
							});
						}
					});
				}
				else if(button_pressed == "Salads"){

					//reset currentItem
					currentItem = {};
					currentItem.tipo="salad";
					updateCurrentItemDiv(currentItem);

					//removing old content, updating manchete and creating ps buttons.
					removeOldContent("SALADS").appendChild(createPsButtons(data.salads));

					//funcionalidade dos botões
					document.querySelectorAll(".ps_button").forEach(function(button){
						var b = button.childNodes[0].innerHTML;
						button.onclick = ()=>{
							//Atualizando objeto currentItem
							currentItem.name = button.childNodes[0].innerHTML;

							currentItem = updateCurrentItem(currentItem, data.salads);
							updateCurrentItemDiv(currentItem);

							//Creating Price Div
							createPriceDiv(currentItem.price);

							
							const action = createActionButton("Add to Cart");
							action.onclick = ()=>{
								info = new FormData(document.getElementById("addToCart"));
								info.append("name", currentItem.name);
								info.append("tipo", currentItem.tipo);

								validateRequest = new XMLHttpRequest;
								validateRequest.open("POST", "validate");
								validateRequest.send(info);

								validateRequest.onload = ()=>{
									const response = JSON.parse(validateRequest.responseText);
									if (response.success == true){
										alert("success")
									}else{alert("Something went wrong...")}
									currentItem = {};
									window.location.replace("/");
									console.log(response)
								}
							}
						}
					});
				}
				else if(button_pressed == "Dinner Platters"){

					//reset currentItem
					currentItem = {};
					currentItem.tipo = "dinner platter";
					updateCurrentItemDiv(currentItem);

					//removing old content, updating manchete and creating ps buttons.
					removeOldContent("DINNER PLATTERS").appendChild(createPsButtons(data.dinner_platters));
					

					//funcionalidade dos botões
					document.querySelectorAll(".ps_button").forEach(function(button){
						button.onclick = ()=>{
							//Atualizando objeto currentItem
							currentItem.name = button.childNodes[0].innerHTML;

							currentItem = updateCurrentItem(currentItem, data.dinner_platters);
							updateCurrentItemDiv(currentItem);

							//updating price div if size is already defined
							if (currentItem.size){
								createPriceDiv(currentItem.price);
							}
									

							//Criando botões de tamanho
							createSizeButtons();
									
							const nbuttons = document.querySelectorAll(".size_button");
							nbuttons.forEach(function(buttonSize){
								buttonSize.onclick = ()=>{
									//Atualizando objeto currentItem
									currentItem.size = buttonSize.innerHTML;
									currentItem = updateCurrentItem(currentItem, data.dinner_platters);
									updateCurrentItemDiv(currentItem);

									//Creating Price Div
									createPriceDiv(currentItem.price);
									//Creating Action button
									const action = createActionButton("Add to Cart");

									//Action button functionality
									
									action.onclick = (button, buttonSize)=>{
										info = new FormData(document.getElementById("addToCart"));
										info.append("name", currentItem.name);
										info.append("tipo", currentItem.tipo);
										info.append("size", currentItem.size);

										validateRequest = new XMLHttpRequest;
										validateRequest.open("POST", "validate");
										validateRequest.send(info);

										validateRequest.onload = ()=>{
											const response = JSON.parse(validateRequest.responseText);
											if (response.success == true){
												alert("success")
											}else{alert("Something went wrong...")}
											currentItem = {};
											window.location.replace("/");
											console.log(response)
										}

									}
								}
							});
						}
					});
				}
				else if(button_pressed == "Pastas"){ 

					//reset currentItem
					currentItem = {};
					currentItem.tipo = "Pasta";
					updateCurrentItemDiv(currentItem);

					//removing old content, updating manchete and creating ps buttons.
					removeOldContent("PASTAS").appendChild(createPsButtons(data.pastas));
					
					//funcionalidade dos botões
					document.querySelectorAll(".ps_button").forEach(function(button){
						button.onclick = ()=>{

							//Atualizando objeto currentItem
							currentItem.name = button.childNodes[0].innerHTML;

							currentItem = updateCurrentItem(currentItem, data.pastas);
							updateCurrentItemDiv(currentItem);

							//Creating Price Div
							createPriceDiv(currentItem.price);

							//Creating Action button
							const actButton = createActionButton("Add to Cart");
							actButton.onclick = ()=>{
								info = new FormData(document.getElementById("addToCart"));
								info.append("name", currentItem.name);
								info.append("tipo", currentItem.tipo);

								validateRequest = new XMLHttpRequest;
								validateRequest.open("POST", "validate");
								validateRequest.send(info);

								validateRequest.onload = ()=>{
									const response = JSON.parse(validateRequest.responseText);
									if (response.success == true){
										alert("success")
									}else{alert("Something went wrong...")}
									currentItem = {};
									window.location.replace("/");
									console.log(response)
								}
							}				
						}
					});
				} 
				else{
					alert("Error: Invalid button, stop messing with the front-end");
				}
			}
		}
	);
});