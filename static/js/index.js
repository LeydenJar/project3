


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
							var cont = document.querySelector(".content2");
							cont.parentElement.removeChild(cont);
							var newb = document.createElement("div");
							newb.setAttribute("class", "content2");
							var c = document.querySelector(".content");
							c.appendChild(newb);
							//Setando nova manchete
							document.querySelector("#manchete").innerHTML="PIZZAS";
							
							//Criando botões para escolher sicilian ou normal
							const a = Handlebars.compile("<button class='sicilian_button btn btn-primary'><p class='ps_name'>{{value}}</p></button>");
							b=a({ "value" : "Normal" });
							c=a({"value" : "Sicilian"});
							const d = document.createElement("div");
							d.setAttribute("class", "ps_div");
							d.innerHTML += b;
							d.innerHTML += c;
							newb.appendChild(d);

							const sicilian_buttons = document.querySelectorAll('.sicilian_button'); 
							sicilian_buttons.forEach(function(sicilianButton){
								sicilianButton.onclick = ()=>{
									


									//Criando botões tamanho
									const j = document.querySelector(".size_div");
									if (j == null){
									const size_div = document.createElement("div");
									size_div.setAttribute("class", "size_div");
									const s = document.createElement("button");
									s.setAttribute("class", "size_button btn btn-primary");
									s.innerHTML = "small";
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
										

										//Criando botões de seleção de numero de toppings:
										const check = document.querySelector('.top_select_div');
										if (check == null){
											const z = Handlebars.compile("<button class='top_select_button btn btn-primary'><p class='ps_name'>{{value}}</p></button><br>");
											y=z({ "value" : "1 topping" });
											x=z({"value" : "2 toppings"});
											w=z({"value" : "3 toppings"});
											v=z({"value" : "Special"});
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
					//removendo antigo conteudo(fazer função)
							var cont = document.querySelector(".content2");
							cont.parentElement.removeChild(cont);
							var newb = document.createElement("div");
							newb.setAttribute("class", "content2");
							var c = document.querySelector(".content");
							c.appendChild(newb);
							//Setando nova manchete
							document.querySelector("#manchete").innerHTML="SUBS";
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

									//Criando botoes de tamanho
									const j = document.querySelector(".size_div");
									if (j == null){
									const size_div = document.createElement("div");
									size_div.setAttribute("class", "size_div");
									const s = document.createElement("button");
									s.setAttribute("class", "size_button btn btn-primary");
									s.innerHTML = "small";
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
					//removendo antigo conteudo(fazer função)

							var cont = document.querySelector(".content2");
							cont.parentElement.removeChild(cont);
							var newb = document.createElement("div");
							newb.setAttribute("class", "content2");
							var c = document.querySelector(".content");
							c.appendChild(newb);


							//Setando nova manchete
							document.querySelector("#manchete").innerHTML="SALADS";

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
							//removendo antigo conteudo(fazer função)
							var cont = document.querySelector(".content2");
							cont.parentElement.removeChild(cont);
							var newb = document.createElement("div");
							newb.setAttribute("class", "content2");
							var c = document.querySelector(".content");
							c.appendChild(newb);
							//Setando nova manchete
							document.querySelector("#manchete").innerHTML="DINNER PLATTERS";

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

									//Fazendo botoes mudarem de cor
									const nbuttons = document.querySelectorAll(".size_button");
									nbuttons.forEach(function(buttonSize){
										buttonSize.onclick = ()=>{

											

											//Atualizando objeto currentItem
											currentItem.size = buttonSize.innerHTML;

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

					//removendo antigo conteudo(fazer função)
							var cont = document.querySelector(".content2");
							cont.parentElement.removeChild(cont);
							var newb = document.createElement("div");
							newb.setAttribute("class", "content2");
							var c = document.querySelector(".content");
							c.appendChild(newb);


							//Atualizando manchete
							document.querySelector("#manchete").innerHTML="PASTAS";

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

									




									//Creating Action button
									const check = document.querySelector('.actionButton');

									if(check !== null){
										check.parentElement.removeChild(check);
									}
									const actButton = document.createElement('button');
									actButton.setAttribute('class', 'btn btn-success actionButton');
									actButton.innerHTML = 'Add To Cart';
									document.querySelector('.content2').appendChild(actButton);

									/*const request = new XMLHttpRequest();
									tipo = button_pressed;
									request.open("GET", "validate/" + tipo + "/" + b);
									request.send();

									


									//Tratando dados do carrinho
									request.onload = function(){
										var response = JSON.parse(request.responseText);
										console.log(response);
									}*/
									



									/*const t = obj.tipo;
									const xml = new XMLHttpRequest();
									xml.open("GET", "validate/" + t + "/" + b, true);
									xml.send();

									//Ao receber resposta
									xml.onload = function(){
										var obj = JSON.parse(xml.responseText);
										console.log(obj);
										if (obj.success == true){
											console.log("success!!");
											pasta_div = document.querySelector("#cart_pastas");
											newitem = document.createElement("h5");
											newitem.innerHTML = "success";
											pasta_div.appendChild(newitem);

											}
										else{
											console.log("Fail");
											}
									}*/
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