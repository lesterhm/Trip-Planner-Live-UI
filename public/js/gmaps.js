var days = [
  {
    hotelLocations: [[40.705137, -74.007624]],
    restaurantLocations: [
      [40.705137, -74.013940],
      [40.708475, -74.010846]
    ],
    activityLocations: [
      [40.716291, -73.995315],
      [40.707119, -74.003602]
    ]
  }
];



var markers = [];
var myLatlng = new google.maps.LatLng(40.705189,-74.009209);

// set the map options hash
var mapOptions = {
  center: myLatlng,
  zoom: 13,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  styles: styleArr
};

// get the maps div's HTML obj
var map_canvas_obj = document.getElementById("map-canvas");

// initialize a new Google Map with the options
var map = new google.maps.Map(map_canvas_obj, mapOptions);

// Add the marker to the map
var marker = new google.maps.Marker({
  position: myLatlng,
  title:"Hello World!"
});


function drawLocation (location, opts) {
  if (typeof opts !== 'object') {
    opts = {}
  }
  opts.position = new google.maps.LatLng(location[0], location[1]);
  opts.map = map;
  var marker = new google.maps.Marker(opts);
  markers.push(marker);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}


function initialize_gmaps(day) {
  setMapOnAll(null);
  markers = [];
  $('#hotel-list').empty();
  $('#restaurant-list').empty();
  $('#activities-list').empty();
  // initialize new google maps LatLng object


  // draw some locations on the map
  if (day===undefined) {
    day=0;
  }

  days[day].hotelLocations.forEach(function(loc){
      drawLocation(loc, {
      icon: '/images/lodging_0star.png'
    });
    populateList("hotel", findPlaceName("hotel", loc));
  });
  days[day].restaurantLocations.forEach(function (loc) {
    drawLocation(loc, {
      icon: '/images/restaurant.png'
    });
    populateList("restaurant", findPlaceName("restaurant", loc));
  });
  days[day].activityLocations.forEach(function (loc) {
    drawLocation(loc, {
      icon: '/images/star-3.png'
    });
    populateList("activity", findPlaceName("activity", loc));
  });



}

var styleArr = [{
  featureType: "landscape",
  stylers: [{
    saturation: -100
  }, {
    lightness: 60
  }]
}, {
  featureType: "road.local",
  stylers: [{
    saturation: -100
  }, {
    lightness: 40
  }, {
    visibility: "on"
  }]
}, {
  featureType: "transit",
  stylers: [{
    saturation: -100
  }, {
    visibility: "simplified"
  }]
}, {
  featureType: "administrative.province",
  stylers: [{
    visibility: "off"
  }]
}, {
  featureType: "water",
  stylers: [{
    visibility: "on"
  }, {
    lightness: 30
  }]
}, {
  featureType: "road.highway",
  elementType: "geometry.fill",
  stylers: [{
    color: "#ef8c25"
  }, {
    lightness: 40
  }]
}, {
  featureType: "road.highway",
  elementType: "geometry.stroke",
  stylers: [{
    visibility: "off"
  }]
}, {
  featureType: "poi.park",
  elementType: "geometry.fill",
  stylers: [{
    color: "#b6c54c"
  }, {
    lightness: 40
  }, {
    saturation: -40
  }]
}];