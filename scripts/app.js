// define globals
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";
var mapsKey = "AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg"

$(document).ready(function() {

initMaps();

  $.ajax({
      method: 'GET',
      url: url,
      success: apiSuccess,
      error: apiError
  });

  console.log(
  		(data.properties.title).slice("of ",", ")
  	);

	function apiSuccess ( response ) {
		var data = response.features;  

		function Icon (size) {
			this.url = "images/earthquake.png";
			this.scaledSize = new google.maps.Size(size, size);
			this.origin = new google.maps.Point(0,0);
			anchor: new google.maps.Point(0, 0);
		}

		function getSize (magnitude) {
			if (magnitude > 5) {
				return 25;
			}
			else if (magnitude > 3.5) {
				return 15;
			}
			else {return 10}
		}

		for (i = 0; i < data.length; i++) {
		  	var dataI = data[i];
			var mag = dataI.properties.mag;
		  	var image = new Icon(getSize(mag));
		  	var coords = dataI.geometry.coordinates;
		  	var latLng = new google.maps.LatLng(coords[1],coords[0]);
		  	var marker = new google.maps.Marker({
	            position: latLng,
	            map: map,
	            icon: image
	        });

			var time = parseInt((Date.now() - dataI.properties.time) / 3600000);
			var html = `<p>${dataI.properties.title.split("of ")[1]} &mdash; ${time} hours ago</p>`;
			$('#info').append(html);
		}
	}

	function apiError ( error, error2, error3 ){
	  console.log(error);
	  console.log(error2);
	  console.log(error3);
	}


	function initMaps () {
		map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.7904881, lng: -122.4003776},
          zoom: 3
        })
	}

	arrLinks = [
		"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
		"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
		"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
		"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
	]

	$('.dropdown-menu').on('click', 'a', function (e) {
		e.preventDefault();
		$(this).
	})

});








