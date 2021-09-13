/* MAPS - INITIALIZING */

var mymap = new L.Map('map', {
  crs: L.CRS.EPSG3857,
  continuousWorld: true,
  worldCopyJump: false
});

/* URL of Swisstopo tiles*/
var url = 'https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg';

/* 1. MAP LAYER */
var tilelayer = new L.tileLayer(url);
mymap.addLayer(tilelayer);

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

/* 2. MARKERS */

/* 2.1 Ski Touring */

// Define Markers Styles

var mountain_logo = L.icon({
    iconUrl: './icons/mountain_logo_red.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

var mountain_logo_H = L.icon({
    iconUrl: './icons/mountain_logo_red_light.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

// Array
let ski_touring = [
    [45.87897, 7.15738, "Pointe de Drône (2949m)"],
    [45.89517, 7.07661, "Tête de Ferret (2713m)"]
];

// Read array (ONLY SERVER)
var data_ski_touring = $.get('./info/info_touring.csv')

// Create each marker
for (var i = 0; i < ski_touring.length; i++) {

    // Get marker's geolocalisation
    var marker = L.marker([ski_touring[i][0], ski_touring[i][1]], {
      icon: mountain_logo
    }).addTo(mymap);

    // Popup
    marker.bindPopup("<b>" + ski_touring[i][2] + "</b>");

    // Marker mouseover : Highlight
    marker.on('mouseover', function(e) {
      this.openPopup();
      e.target.setIcon(mountain_logo_H);
    });

    // Marker mouseout : De-Highlight
    marker.on('mouseout', function(e) {
      this.closePopup();
      e.target.setIcon(mountain_logo);
    });

}

/*
marker_i = L.marker([45.87897, 7.15738], {icon: mountain_logo}).addTo(mymap).bindPopup("Pointe de Drône (2949m)");

// Mouseover LAYER
marker_i.on('mouseover', function(e) {
  this.openPopup();
  e.target.setIcon(mountain_logo_H); //marker object is overwritten in the for loop each time
});

marker_i.on('mouseout', function(e) {
  this.closePopup();
  e.target.setIcon(mountain_logo);
});
*/


//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

/* 3. POPUP */
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

/* RETURN the map : intial view*/
mymap.setView(L.latLng(46.18094, 7.53214), 9);
