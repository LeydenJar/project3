
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
					//removendo antigo conteudo(fazer função)
					newb = removeOldContent("PIZZAS");
					
					//Criando botões para escolher sicilian ou normal
					const a = Handlebars.compile("<button class='sicilian_button btn btn-primary' value ='{{value}}'><p class='ps_name'>{{inner}}</p></button>");
					b=a({ "inner" : "Normal", "value" : "not"});
					c=a({"inner" : "Sicilian", "value" : "Sicilian"});
					const d = document.createElement("div");
					d.setAttribute("class", "ps_div");
					d.innerHTML += b;
					d.innerHTML += c;
					newb.appendChild(d);

					const sicilian_buttons = document.querySelectorAll('.sicilian_button'); 
					sicilian_buttons.forEach(function(sicilianButton){
						sicilianButton.onclick = ()=>{
									
							//Atualizando objeto currentItem							
							currentItem.isSicilian = (sicilianButton.value == "Sicilian");
							console.log(currentItem.isSicilian);

							currentItem.id = null;
							currentItem.price = null;

							if (currentItem.toppingsAmount){
								for(i=0; i<data.pizzas.length; i++){
									if (data.pizzas[i].sicilian == currentItem.isSicilian && data.pizzas[i].size == currentItem.size && data.pizzas[i].toppings_amount == currentItem.toppingsAmount){
										console.log("Found");
										currentItem.id = data.pizzas[i].id;
										currentItem.price = data.pizzas[i].price;
										break;
									}
								}
							}

							//Criando div do preço se o toppings ja foi definido
							if (currentItem.toppingsAmount){
								preçoDiv = document.querySelector('.preçoDiv');
								if (preçoDiv == null){
									const div = document.createElement('div');
									div.innerHTML = "Item price: " + currentItem.price;
									div.setAttribute('class', 'preçoDiv');
									document.querySelector('.content2').appendChild(div);
								}
								else{
									preçoDiv.innerHTML = "Item price: " + currentItem.price;
								}
							}
								//Criando botões tamanho
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


							//size buttons functionality
							const size_buttons = document.querySelectorAll('.size_button'); 
							size_buttons.forEach(function(sizeButton){
								sizeButton.onclick = ()=>{
											
									//Atualizando objeto currentItem
									currentItem.size = sizeButton.innerHTML;
									console.log(currentItem);
									currentItem.id = null;
									currentItem.price = null;
									if (currentItem.toppingsAmount){
										for(i=0; i<data.pizzas.length; i++){
											if (data.pizzas[i].sicilian == currentItem.isSicilian && data.pizzas[i].size == currentItem.size && data.pizzas[i].toppings_amount == currentItem.toppingsAmount){
												console.log("Found");
												currentItem.id = data.pizzas[i].id;
												currentItem.price = data.pizzas[i].price;
												break;
											}
										}
									}

									//Criando div do preço se o toppings ja foi definido
									if (currentItem.toppingsAmount){
										preçoDiv = document.querySelector('.preçoDiv');
										if (preçoDiv == null){
											const div = document.createElement('div');
											div.innerHTML = "Item price: " + currentItem.price;
											div.setAttribute('class', 'preçoDiv');
											document.querySelector('.content2').appendChild(div);
										}
										else{
											preçoDiv.innerHTML = "Item price: " + currentItem.price;
										}
									}
		
									//Criando botões de seleção de numero de toppings:
									const check = document.querySelector('.top_select_div');
									if (check == null){
										const z = Handlebars.compile("<button class='top_select_button btn btn-primary' value='{{value}}'><p class='ps_name'>{{inner}}</p></button><br>");
										t=z({"inner" : "Cheese", "value" : 0});
										y=z({"inner" : "1 topping", "value" : 1});
										x=z({"inner" : "2 toppings", "value" : 2});
										w=z({"inner" : "3 toppings", "value" : 3});
										v=z({"inner" : "Special", "value" : 10});
										const u = document.createElement("div");
										u.setAttribute("class", "top_select_div");
										u.innerHTML += y;
										u.innerHTML += x;
										u.innerHTML += w;
										u.innerHTML += v;
										newb.appendChild(u);

										const ts_buttons = document.querySelectorAll('.top_select_button'); 
										ts_buttons.forEach(function(tsButton){
											tsButton.onclick = ()=>{
												//Atualizando objeto currentItem
												currentItem.toppingsAmount = tsButton.value;

												console.log(currentItem);

												currentItem.id = null;
												currentItem.price = null;

												if (currentItem.toppingsAmount){
													for(i=0; i<data.pizzas.length; i++){
														if (data.pizzas[i].sicilian == currentItem.isSicilian && data.pizzas[i].size == currentItem.size && data.pizzas[i].toppings_amount == currentItem.toppingsAmount){
															console.log("Found");
															currentItem.id = data.pizzas[i].id;
															currentItem.price = data.pizzas[i].price;
															break;
														}
													}
												}

												//Criando div do preço se o toppings ja foi definido
												if (currentItem.toppingsAmount){
													preçoDiv = document.querySelector('.preçoDiv');
													if (preçoDiv == null){
														const div = document.createElement('div');
														div.innerHTML = "Item price: " + currentItem.price;
														div.setAttribute('class', 'preçoDiv');
														document.querySelector('.content2').appendChild(div);
													}
													else{
														preçoDiv.innerHTML = "Item price: " + currentItem.price;
													}
												}

												//Creating Action button
												const check = document.querySelector('.actionButton');
												if(check !== null){
													check.parentElement.removeChild(check);
												}
												const actButton = document.createElement('button');
												actButton.setAttribute('class', 'btn btn-success actionButton');
												actButton.innerHTML = 'Choose toppings';
												document.querySelector('.content2').appendChild(actButton);
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

					//removendo antigo conteudo(fazer função)
					removeOldContent("SUBS");
					//criando botões
					const n = document.createElement("div");
					n.setAttribute('class', 'ps_div');
					const item = Handlebars.compile("<button class='ps_button btn btn-primary'><p class='ps_name'>{{value}}</p>");

					var list = [];
					for(i=0; i<data.subs.length; i++){
						const name = data.subs[i].name;
						if (!list.includes(name)){
							list.push(name);
						}
					}
					for(i=0; i<list.length; i++){
						const name = list[i];
						const cont = item({"value" : name});
						n.innerHTML += cont;
					}

					//Adiciona n que contem os botoes das pastas.
					document.querySelector(".content2").appendChild(n);
					//funcionalidade dos botões
					document.querySelectorAll(".ps_button").forEach(function(button){
						button.onclick = ()=>{

							//Atualizando currentItem
							currentItem.name = button.childNodes[0].innerHTML;

							//Atualizando currentItem
							currentItem.id = null;
							currentItem.price = null;
							for(i=0; i<data.subs.length; i++){
								if (data.subs[i].name == currentItem.name && data.subs[i].size == currentItem.size){
									console.log("Found");
									currentItem.id = data.subs[i].id;
									currentItem.price = data.subs[i].price;
									break;
								}
							}

							//Criando div do preço se o tamanho ja foi definido
							if (currentItem.size){
								preçoDiv = document.querySelector('.preçoDiv');
								if (preçoDiv == null){
									const div = document.createElement('div');
									div.innerHTML = "Item price: " + currentItem.price;
									div.setAttribute('class', 'preçoDiv');
									document.querySelector('.content2').appendChild(div);
								}
								else{
									preçoDiv.innerHTML = "Item price: " + currentItem.price;
								}
							}

							//Criando botoes de tamanho
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

							//Fazendo botoes mudarem de cor
							const nbuttons = document.querySelectorAll(".size_button");
							nbuttons.forEach(function(buttonSize){
								buttonSize.onclick = ()=>{

									//Atualizando objeto currentItem
									currentItem.size = buttonSize.innerHTML;
									//Atualizando preço e id do item
									for(i=0; i<data.subs.length; i++){
										if (data.subs[i].name == currentItem.name && data.subs[i].size == currentItem.size){
											console.log("Found");
											currentItem.id = data.subs[i].id;
											currentItem.price = data.subs[i].price;
											break;
										}
									}

									//Criando div do preço
									preçoDiv = document.querySelector('.preçoDiv');
									if (preçoDiv == null){
										const div = document.createElement('div');
										div.innerHTML = "Item price: " + currentItem.price;
										div.setAttribute('class', 'preçoDiv');
										document.querySelector('.content2').appendChild(div);
									}
									else{
										preçoDiv.innerHTML = "Item price: " + currentItem.price;
									}

									//Creating Action button
									const check = document.querySelector('.actionButton');

									if(check !== null){
										check.parentElement.removeChild(check);
									}
									const actButton = document.createElement('button');
									actButton.setAttribute('class', 'btn btn-success actionButton');
									actButton.innerHTML = 'Choose Extras';
									document.querySelector('.content2').appendChild(actButton);
								}
							});
						}
					});
				}
				else if(button_pressed == "Salads"){


					//reset currentItem
					currentItem = {};


					//removendo antigo conteudo(fazer função)
					removeOldContent("SALADS");

					//criando botões
					const n = document.createElement("div");
					n.setAttribute('class', 'ps_div');
					const item = Handlebars.compile("<button class='ps_button btn btn-primary'><p class='ps_name'>{{value}}</p><p class='ps_price'>R$: {{price}}</p></button></br>");

					for(i=0; i<data.salads.length; i++){
						const name = data.salads[i].name;
						const price = data.salads[i].price;
						const cont = item({"value" : name, "price" : price});
						n.innerHTML += cont;
					}

					//Adiciona n que contem os botoes.
					document.querySelector(".content2").appendChild(n);

					//funcionalidade dos botões
					document.querySelectorAll(".ps_button").forEach(function(button){
						var b = button.childNodes[0].innerHTML;
						button.onclick = ()=>{
							//Atualizando objeto currentItem
							currentItem.name = button.childNodes[0].innerHTML;

							//Atualizando preço e id do item
							for(i=0; i<data.salads.length; i++){
								if (data.salads[i].name == currentItem.name){
									console.log("Found");
									currentItem.id = data.salads[i].id;
									currentItem.price = data.salads[i].price;
									break;
								}
							}

							//Criando div do preço
							preçoDiv = document.querySelector('.preçoDiv');
							if (preçoDiv == null){
								const div = document.createElement('div');
								div.innerHTML = "Item price: " + currentItem.price;
								div.setAttribute('class', 'preçoDiv');
								document.querySelector('.content2').appendChild(div);
							}
							else{
								preçoDiv.innerHTML = "Item price: " + currentItem.price;
							}

									

							//Creating Action button
							const check = document.querySelector('.actionButton');

							if(check !== null){
								check.parentElement.removeChild(check);
							}
							const actButton = document.createElement('button');
							actButton.setAttribute('class', 'btn btn-success actionButton');
							actButton.innerHTML = 'Add To Cart';
							document.querySelector('.content2').appendChild(actButton);
						}
					});
				}
				else if(button_pressed == "Dinner Platters"){

					//reset currentItem

					currentItem = {};
					removeOldContent("DINNER PLATTERS");

					//criando botões
					const n = document.createElement("div");
					n.setAttribute('class', 'ps_div');
					const item = Handlebars.compile("<button class='ps_button btn btn-primary'><p class='ps_name'>{{value}}</p>");
					var list = [];
					for(i=0; i<data.dinner_platters.length; i++){
						const name = data.dinner_platters[i].name;
						if (!list.includes(name)){
							list.push(name);
						}
					}
					for(i=0; i<list.length; i++){
						const name = list[i];
						const cont = item({"value" : name});
						n.innerHTML += cont;
					}

					//Adiciona n que contem os botoes das pastas.
					document.querySelector(".content2").appendChild(n);
					//funcionalidade dos botões
					document.querySelectorAll(".ps_button").forEach(function(button){
						button.onclick = ()=>{
							//Atualizando objeto currentItem
							currentItem.name = button.childNodes[0].innerHTML;

							currentItem.id = null;
							currentItem.price = null;
							for(i=0; i<data.dinner_platters.length; i++){
								if (data.dinner_platters[i].name == currentItem.name && data.dinner_platters[i].size == currentItem.size){
									console.log("Found");
									currentItem.id = data.dinner_platters[i].id;
									currentItem.price = data.dinner_platters[i].price;
									break;
								}
							}
							//Criando div do preço se o tamanho ja foi definido
							if (currentItem.size){
								preçoDiv = document.querySelector('.preçoDiv');
								if (preçoDiv == null){
									const div = document.createElement('div');
									div.innerHTML = "Item price: " + currentItem.price;
									div.setAttribute('class', 'preçoDiv');
									document.querySelector('.content2').appendChild(div);
								}
								else{
									preçoDiv.innerHTML = "Item price: " + currentItem.price;
								}
							}
									

							//Criando botões de tamanho
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

									
							const nbuttons = document.querySelectorAll(".size_button");
							nbuttons.forEach(function(buttonSize){
								buttonSize.onclick = ()=>{
									//Atualizando objeto currentItem
									currentItem.size = buttonSize.innerHTML;
									currentItem.id = null;
									currentItem.price = null;
									//Atualizando preço e id do item
									for(i=0; i<data.dinner_platters.length; i++){
										if (data.dinner_platters[i].name == currentItem.name && data.dinner_platters[i].size == currentItem.size){
											console.log("Found");
											currentItem.id = data.dinner_platters[i].id;
											currentItem.price = data.dinner_platters[i].price;
											break;
										}
									}
									//Criando div do preço
									preçoDiv = document.querySelector('.preçoDiv');
									if (preçoDiv == null){
										const div = document.createElement('div');
										div.innerHTML = "Item price: " + currentItem.price;
										div.setAttribute('class', 'preçoDiv');
										document.querySelector('.content2').appendChild(div);
									}
									else{
										preçoDiv.innerHTML = "Item price: " + currentItem.price;
									}
									//Creating Action button
									const check = document.querySelector('.actionButton');
									if(check !== null){
										check.parentElement.removeChild(check);
									}
									const actButton = document.createElement('button');
									actButton.setAttribute('class', 'btn btn-success actionButton');
									actButton.innerHTML = 'Add To Cart';
									document.querySelector('.content2').appendChild(actButton);
									const action = document.querySelector('.actionButton');
									action.onclick = (button, buttonSize)=>{
									
										//enviar um request com currentItem.id e button_pressed.
										var validateRequest = new XMLHttpRequest;
										validateRequest.open('GET',  "Validate/" + currentItem.type + "/" + currentItem.id);
										validateRequest.send();

									}
								}
							});
						}
					});
				}
				else if(button_pressed == "Pastas"){ 

					//reset currentItem

					currentItem = {};

					//removendo antigo conteudo(fazer função)
					removeOldContent("PASTAS");

					//criando botões
					const n = document.createElement("div");
					n.setAttribute('class', 'ps_div');
					const item = Handlebars.compile("<button class='ps_button btn btn-primary'><p class='ps_name'>{{value}}</p><p class='ps_price'>R$: {{price}}</p></button></br>");

					for(i=0; i<data.pastas.length; i++){
						const name = data.pastas[i].name;
						const price = data.pastas[i].price;
						const cont = item({"value" : name, "price" : price});
						n.innerHTML += cont;
					}

					//Adiciona n que contem os botoes das pastas.
					document.querySelector(".content2").appendChild(n);

					//funcionalidade dos botões
					document.querySelectorAll(".ps_button").forEach(function(button){
						var b = button.childNodes[0].innerHTML;
						button.onclick = ()=>{

							//Atualizando objeto currentItem
							currentItem.name = button.childNodes[0].innerHTML;

							for(i=0; i<data.pastas.length; i++){
								if (data.pastas[i].name == currentItem.name){
									console.log("Found");
									currentItem.id = data.pastas[i].id;
									currentItem.price = data.pastas[i].price;
									break;
								}
								console.log(currentItem.name + " xxx " + data.pastas[i].name)
							}

							//Criando div do preço -- função
							preçoDiv = document.querySelector('.preçoDiv');
							if (preçoDiv == null){
								const div = document.createElement('div');
								div.innerHTML = "Item price: " + currentItem.price;
								div.setAttribute('class', 'preçoDiv');
								document.querySelector('.content2').appendChild(div);
							}
							else{
								preçoDiv.innerHTML = "Item price: " + currentItem.price;
							}

									


							//Creating Action button
							const check = document.querySelector('.actionButton');
							if(check !== null){
								check.parentElement.removeChild(check);
							}
							const actButton = document.createElement('button');
							actButton.setAttribute('class', 'btn btn-success actionButton');
							actButton.innerHTML = 'Add To Cart';
							document.querySelector('.content2').appendChild(actButton);					
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