document.addEventListener("DOMContentLoaded", ()=>{


var getOrders = new XMLHttpRequest;
getOrders.open('GET', "getOrders");
getOrders.send();

getOrders.onload = ()=>{
	data = JSON.parse(getOrders.responseText);
	console.log(data);

}


makeOrderButton = document.querySelector("#makeOrder");

makeOrderButton.onclick = ()=>{
	var putOrder = new XMLHttpRequest;
	putOrder.open('GET', 'putOrder');
	putOrder.send();

	putOrder.onload = ()=>{
		console.log(JSON.parse(putOrder.responseText));
	}


}
});