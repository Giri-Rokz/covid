let canvas = document.getElementById('covid19').getContext('2d');
canvas.font = "3em Interstate sans-serif Verdana";
canvas.color = "white";
canvas.fillStyle= "whitesmoke";
canvas.fillRect(25,15,200,180);
canvas.strokeText("Covid-19",10,30);

var map;
var markers = [];
window.initMap = ()=>{
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 11.1271, lng: 78.6569},
	  zoom: 6,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});		
}

function buildDropdown() {	
	try {
		//let source = setupProtos.loadJS();		
		//source.then(()=>{            
		import(/* webpackChunkName:"data" */ './data.js').then((file)=> {
			this.historyData = file.default.historyData;
			this.states = file.default.states;
			this.states.forEach((x)=> {				
                let option = document.createElement('option');
                option.value = x.latlng;
                option.innerHTML = x.state;				
				document.getElementById("states").appendChild(option);
			});			
		}).catch((err)=>{alert("Sorry! Our site is under maintenance. Error code:"+err);});
	}catch(err) {
	    console.log("We encountered an error. We'll be up soon!");
	}
}

function setup() {
	document.getElementById('patients').addEventListener('change',changeMap.bind(this),true);
	document.getElementById('states').addEventListener('change',changeState.bind(this),true);
	Array.from(document.getElementsByTagName('li')).forEach(function(x) {
		x.addEventListener('click',switchMenu,true);
	});
	setupProtos();
	buildDropdown();
}

function switchMenu(e) {
	import(/* webpackChunkName:"handler" */'./handler.js').then(function(file){		
		window.handlerFunctions = file.handlers;
		let clone = window.handlerFunctions.menuHandler(this);
		if(clone) {
		  showMenu(clone);			
		}
	}.bind(e));		
}
function showMenu(clone) {
    document.querySelector('#mainContainer').style.display = "none";
    document.querySelector('#menuBody').style.display = "block";
	document.querySelector('#menuBody').innerHTML = "";
	document.querySelector('#menuBody').appendChild(clone);
}

function changeState(e) {	
    let value = e.currentTarget.value.split(",");
	let first = document.getElementById("patients").firstElementChild;
	let last = document.getElementById("patients").lastElementChild;
	while (last && last!==first) { 
		last.remove(); 
		last = document.getElementById("patients").lastElementChild; 
	}
	if(value.length>1) {
		map.setCenter({lat:Number(value[0]),lng:Number(value[1])});	
	}	
	map.setZoom(6);
	if(this.historyData[e.currentTarget.options[e.currentTarget.selectedIndex].innerHTML]) {
		this.historyData[e.currentTarget.options[e.currentTarget.selectedIndex].innerHTML].forEach((x)=> {				
		if(x.latlong && x.latlong!="") {
			let option = document.createElement('option');
			option.value = x.latlong;
			option.setAttribute('data-place',x.address);
			option.innerHTML = "Patient #"+x._cn6ca;		 	
			document.getElementById("patients").appendChild(option);	
		}		
	  });	
	}
	removeMarkers();
	if(document.querySelector('#info').style.display == "block") {
		document.querySelector('#info').style.display = 'none';
		document.querySelector('#dropdowns').style.padding = "0 0 1.5vh 0";
	}		
}

function setupProtos() {
    Function.prototype.loadJS = function() {    
		return new Promise((res,rej)=> {
			let script = document.createElement('script');
			script.type = "text/javascript";
			script.src = "data.js";
			script.onload = file=> res(file);
			script.onerror = err=> rej(err);
			document.head.appendChild(script);
		})	
	}
	Function.prototype.loadTemplate = function(id) {				 
		 let template = document.querySelector(id);	
		 return document.importNode(template.content,true);					 
	}
}

function removeMarkers() {
	if(markers.length) {
		for(let i=0;i<markers.length;i++) {
			markers[i].setMap(null);	
		}
		markers = [];
	}
}

function changeMap(e) {
	var value,clone;	
	clone = setupProtos.loadTemplate('#infoTemplate');
	value = e.currentTarget.value.split(",");
	//remove prev markers
	removeMarkers();
	map.setZoom(10);
	for(let i=0; i<value.length;i=i+2) {
		var marker = new google.maps.Marker({
		  position: {lat: Number(value[i]), lng: Number(value[i+1])},
		  map: map,
		});
		markers.push(marker);
		if ((!map.getBounds().contains(marker.getPosition()))) {
			map.setCenter(marker.getPosition());//map.panTo(marker.getPosition());    
		}
	}		
	if(value.length == 1) {
		document.querySelector('#info').style.display = 'none';
		document.querySelector('#dropdowns').style.padding = "0 0 1.5vh 0";
	} else {
		document.querySelector('#info,#place').innerHTML = "";
		document.querySelector('#info').appendChild(clone);		
		document.getElementById('place').innerHTML = e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('data-place').trim();
		document.querySelector('#info').style.display = 'block';
		document.querySelector('#dropdowns').style.padding = "0";
	}	
}
setup();

//GR
/*let parser = new DOMParser();
let optionNode = parser.parseFromString('"<option value="+x.latlng+"></option>"','text/html');*/