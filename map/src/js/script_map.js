/* MAPS - INITIALIZING */

var mymap = new L.Map('map', {
  crs: L.CRS.EPSG3857,
  continuousWorld: true,
  worldCopyJump: false,
  fullscreenControl: true,
});

/* Path */
// var path = 'map/information/info_touring.csv'

/* URL of Swisstopo tiles*/
var url = 'https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg';

/* 1. MAP LAYER */
var tilelayer = new L.tileLayer(url);
mymap.addLayer(tilelayer);

console.log("Hello 5:");

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

/* 2. MARKERS */

/* 2.1 Ski Touring */

// Define Markers Styles

var mountain_logo_red = L.icon({
    iconUrl: 'map/icons/mountain_logo_red.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

var mountain_logo_red_H = L.icon({
    iconUrl: 'map/icons/mountain_logo_red_light.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

var mountain_logo_blue = L.icon({
    iconUrl: 'map/icons/mountain_logo_blue.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

var mountain_logo_blue_H = L.icon({
    iconUrl: 'map/icons/mountain_logo_blue_light.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

// Read array (ONLY SERVER)
async function getData(path) {

    // IMPORT CSV
  console.log("IMPORT TEXT CSV:");
  const response = await fetch(path);
  const data = await response.text();
  console.log(data);

  // PARSE CSV
  console.log("PARSE TEXT CSV:");
  var table =  Papa.parse(data,{
    header : true
  });
  var table = table.data
  console.log(table);

  // MARKERS AND GPX
  for (var i = 0; i < table.length; i++) {

  // MARKERS

      // Get marker's geolocalisation
      var marker = L.marker([table[i].Latitude, table[i].Longitude], {
        icon: mountain_logo_blue
      }).addTo(mymap);

      // Popup
      marker.bindPopup("<b>" + table[i].Course + "</b>" + " (" + table[i].Elevation_max + "m.)");

      // Click
      var linkout = table[i].Strava
      console.log(linkout);
      marker.on('click', function(e) {
        window.location = linkout;
      })

      // Marker mouseover : Highlight
      marker.on('mouseover', function(e) {
        this.openPopup();
        e.target.setIcon(mountain_logo_blue_H);
        // marker.addClass(e.target.getElement(), 'leaflet-marker-hover');
      });

      // Marker mouseout : De-Highlight
      marker.on('mouseout', function(e) {
        this.closePopup();
        e.target.setIcon(mountain_logo_blue);
        // marker.removeClass(e.target.getElement(), 'leaflet-marker-hover');
      });

    }

}

getData('map/information/info_touring.csv')

// MANUALLY ADD MARKERS

// Array
let ski_touring = [
    [45.87897, 7.15738, "Pointe de Drône (2949m)"],
    [45.89517, 7.07661, "Tête de Ferret (2713m)"]
];

// Create each marker
for (var i = 0; i < ski_touring.length; i++) {

    // Get marker's geolocalisation
    var marker = L.marker([ski_touring[i][0], ski_touring[i][1]], {
      icon: mountain_logo_red
    }).addTo(mymap);

    // Popup
    marker.bindPopup("<b>" + ski_touring[i][2] + "</b>");

    // Marker mouseover : Highlight
    marker.on('mouseover', function(e) {
      this.openPopup();
      e.target.setIcon(mountain_logo_red_H);
    });

    // Marker mouseout : De-Highlight
    marker.on('mouseout', function(e) {
      this.closePopup();
      e.target.setIcon(mountain_logo_red);
    });

}

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
