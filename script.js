let canvas = document.getElementById('covid19').getContext('2d');
canvas.font = "3em Interstate sans-serif Verdana";
canvas.color = "white";
canvas.fillStyle= "yellow";
canvas.fillRect(10,15,180,130);
canvas.strokeText("Covid19",10,50);

var map;
function initMap() {
	var center = {lat: 11.1271, lng: 78.6569};
	map = new google.maps.Map(document.getElementById('map'), {
	  center: center,
	  zoom: 8,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});	
}

function setup() {
	document.getElementById('patients').addEventListener('change',this.changeMap,true);
}

function changeMap(e) {
	var latitude,longitude;
	latitude = Number(e.currentTarget.value.split(",")[0]);
	longitude = Number(e.currentTarget.value.split(",")[1]);
	/*map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: latitude, lng: longitude},
	  zoom: 12,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});*/
	var marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: map,
	  zoom: 12
    });
}
this.setup();