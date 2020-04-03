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
	  zoom: 12,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});	
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
}

function changeMap(e) {
	var value;	
	value = e.currentTarget.value.split(",");	
	//remove prev markers	
	if(markers.length) {
		for(let i=0;i<markers.length;i++) {
			markers[i].setMap(null);	
		}
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
}
this.setup();