


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


	document.querySelectorAll(".button").forEach(
		function(button){
			button.onclick = ()=>{
				var button_pressed = button.innerHTML;

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
								b.innerHTML = "Big";
								size_div.appendChild(s);
								size_div.appendChild(b);
								document.querySelector(".content2").appendChild(size_div);
							}

							//Criando botões de seleção de numero de toppings:
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

									//Fazendo botões mudarem de cor ao serem pressionados
									botoes = document.querySelectorAll(".ps_button");
									for(i=0; i < botoes.length; i++){
										botoes[i].style.background = '#539cea';
									}
									button.style.background = '#124479';

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
									b.innerHTML = "Big";
									size_div.appendChild(s);
									size_div.appendChild(b);
									document.querySelector(".content2").appendChild(size_div);
									}

									//Fazendo botoes mudarem de cor
									const nbuttons = document.querySelectorAll(".size_button");
									nbuttons.forEach(function(buttonSize){
										buttonSize.onclick = ()=>{
											for(i=0; i<nbuttons.length; i++){
												nbuttons[i].style.background = '#539cea';
											}
											buttonSize.style.background = '#124479';
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

									//Fazendo botões mudarem de cor ao serem precionados
									botoes = document.querySelectorAll(".ps_button");
									for(i=0; i < botoes.length; i++){
										botoes[i].style.background = '#539cea';
									}
									button.style.background = '#124479';
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

									//Fazendo botões mudarem de cor ao serem pressionados
									botoes = document.querySelectorAll(".ps_button");
									for(i=0; i < botoes.length; i++){
										botoes[i].style.background = '#539cea';
									}
									button.style.background = '#124479';

									//Criando botões de tamanho
									const j = document.querySelector(".size_div");
									if (j == null){
									const size_div = document.createElement("div");
									size_div.setAttribute("class", "size_div");
									const s = document.createElement("button");
									s.setAttribute("class", "size_button btn btn-primary");
									s.innerHTML = "small";
									const b =document.createElement("button");
									b.setAttribute("class", "size_button btn btn-primary");
									b.innerHTML = "Big";
									size_div.appendChild(s);
									size_div.appendChild(b);
									document.querySelector(".content2").appendChild(size_div);
									}

									//Fazendo botoes mudarem de cor
									const nbuttons = document.querySelectorAll(".size_button");
									nbuttons.forEach(function(buttonSize){
										buttonSize.onclick = ()=>{
											for(i=0; i<nbuttons.length; i++){
												nbuttons[i].style.background = '#539cea';
											}
											buttonSize.style.background = '#124479';
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
									const request = new XMLHttpRequest();
									tipo = button_pressed;
									request.open("GET", "validate/" + tipo + "/" + b);
									request.send();

									//Fazendo botões mudarem de cor ao serem pressionados
									botoes = document.querySelectorAll(".ps_button");
									for(i=0; i < botoes.length; i++){
										botoes[i].style.background = '#539cea';
									}
									button.style.background = '#124479';


									//Tratando dados do carrinho
									request.onload = function(){
										var response = JSON.parse(request.responseText);
										console.log(response);
									}
									



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