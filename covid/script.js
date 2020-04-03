function setup() {
	document.getElementById('patients').addEventListener('change',this.changeMap,true);
}
function changeMap(e) {
	var map,latitude,longitude;
	latitude = Number(e.currentTarget.value.split(",")[0]);
	longitude = Number(e.currentTarget.value.split(",")[1]);
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: latitude, lng: longitude},
	  zoom: 12,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});
}
this.setup();