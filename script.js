let canvas = document.getElementById('covid19').getContext('2d');
canvas.font = "3em Interstate sans-serif Verdana";
canvas.color = "white";
canvas.fillStyle= "whitesmoke";
canvas.fillRect(25,15,200,180);
canvas.strokeText("Covid-19",10,30);

var map;
var markers = [];
function initMap() {
	var center = {lat: 11.1271, lng: 78.6569};
	map = new google.maps.Map(document.getElementById('map'), {
	  center: center,
	  zoom: 6,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	//this.buildDropdown();
}

async function makePromise() {
    let xhr = new XMLHttpRequest();
    return new Promise((res,rej)=> {
    	xhr.open('GET',"https://api.covid19india.org/travel_history.json",true);
    	xhr.send();
    	xhr.onReadyStateChange = ()=> {
    		if(xhr.readyState == 4 && xhr.status>= 300) {
                reject(xhr.status);
    		} else {
    			resolve(xhr.responseText);
    		}
    	}
    })	
}

async function buildDropdown() {
	debugger;
	try {
		let data = await makePromise();
		console.log(data);
	}catch(err) {
		alert("Sorry! Our site is under maintenance. Error code:"+err);
	}
}

function setup() {
	document.getElementById('patients').addEventListener('change',this.changeMap,true);
	Array.from(document.getElementsByTagName('li')).forEach(function(x) {
		x.addEventListener('click',this.switchMenu,true);
	});
}

function switchMenu(e) {
	document.querySelector('.active').classList.remove("active");
	e.currentTarget.classList.add("active");
	let clone;
	switch(e.currentTarget.id) {
		case "links": 
			const linksTemplate = document.querySelector('#linksTemplate');
			clone = document.importNode(linksTemplate.content,true);
			showMenu(clone);
			break;
		case "about":
			const aboutTemplate = document.querySelector('#aboutTemplate');
			clone = document.importNode(aboutTemplate.content,true);			
			showMenu(clone);
			break;
		default:
			document.querySelector('#mainContainer').style.display = "block";
			document.querySelector('#menuBody').style.display = "none";			
	}	
}
function showMenu(clone) {
    document.querySelector('#mainContainer').style.display = "none";
    document.querySelector('#menuBody').style.display = "block";
	document.querySelector('#menuBody').innerHTML = "";
	document.querySelector('#menuBody').appendChild(clone);
}

function changeMap(e) {
	var value,clone;	
	const infoTemplate = document.querySelector('#infoTemplate');
	clone = document.importNode(infoTemplate.content,true);			
	value = e.currentTarget.value.split(",");	
	//remove prev markers
	if(markers.length) {
		for(let i=0;i<markers.length;i++) {
			markers[i].setMap(null);	
		}
		markers = [];
	}	
	for(let i=0; i<value.length;i=i+2) {
		var marker = new google.maps.Marker({
		  position: {lat: Number(value[i]), lng: Number(value[i+1])},
		  map: map,
		});
		markers.push(marker);
		if ((!map.getBounds().contains(marker.getPosition()))) {
			map.setCenter(marker.getPosition());  
			//OR map.panTo(marker.getPosition());  
		}
	}
	if(value.length == 1) {
        document.querySelector('#info').style.display = 'none';
	} else {
		document.querySelector('#info').innerHTML = "";
		document.querySelector('#info').appendChild(clone);
		document.querySelector('#info').style.display = 'block';
	}	
}
this.setup();