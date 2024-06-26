/* MAPS - INITIALIZING */

var mymap = new L.Map('map', {
  crs: L.CRS.EPSG3857,
  continuousWorld: true,
  worldCopyJump: false,
  fullscreenControl: true,
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
        win_url: "http://127.0.0.1:8000/mapcamion",
        icon: mountain_logo_blue
      }).addTo(mymap);

      // Popup
      marker.bindPopup("<b>" + table[i].Course + "</b>" + " (" + table[i].Elevation_max + "m.)");
/*
      // Click
      marker.on('click', function(e) {
        e.target.setIcon(mountain_logo_red_H);
        marker.bindPopup("<b>" + table[i].Course + "</b>" + " (" + table[i].Elevation_max + "m.)");
      });
*/

      // Click
      marker.on('click', function(e) {
        window.location = 'https://jeremyzuchuat.github.io';
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

      // CREAE A R FIILE THAT GENERATES A JAVASCRIPT WITH ARRAY GPX
/*
      var path_gpx = "map/GPX/Simplified/" + table[i].File + ".gpx";
      console.log(path_gpx);

      // IMPORT GPX
      console.log("IMPORT GPX:");
      const response_gpx = await fetch(path_gpx);
      const data_gpx = await response_gpx.text();
      console.log(data_gpx);
      // GPX
      console.log("GPX LEAFLET");
      // var gpx = ''; // URL to your GPX file or the GPX itself

      new L.GPX(data_gpx, {async: true}).on('loaded', function(e) {
        mymap.fitBounds(e.target.getBounds());
      }).addTo(mymap);

      new L.GPX(data_gpx, {
        async: true,
        marker_options: {
          startIconUrl: false,
          endIconUrl: false,
          shadowUrl: false
        },
        polyline_options: {
          // color: 'green',
          color: 'rgb(60, 140, 220)',
          // color: 'rgb(230, 70, 70)',
          opacity: 0.90,
          weight: 3,
          lineCap: 'round'
        }
      }).addTo(mymap);
*/

    }

}

/*getData('map/info_touring.csv');*/

/*
async function getGPX(path) {

    // IMPORT GPX
  console.log("IMPORT GPX:");
  const response = await fetch(path);
  const data_gpx = await response.text();
  console.log(data_gpx);

  // GPX
  console.log("GPX LEAFLET");
  // var gpx = ''; // URL to your GPX file or the GPX itself
  new L.GPX(data_gpx, {async: true}).on('loaded', function(e) {
    mymap.fitBounds(e.target.getBounds());
  }).addTo(mymap);
}

getGPX('GPX/2020_01_24_la_fava.gpx');
*/


/*
gpx_parsed = gpx.parse("<xml><gpx></gpx></xml>");
console.log(gpx_parsed);
*/
/*
async function getGPX(path) {

    // IMPORT GPX
  console.log("IMPORT GPX:");
  const response = await fetch(path);
  const data_gpx = await response.text();
  console.log(data_gpx);

  // gpx.parse(data_gpx);
  console.log("GPX parsed");
  console.log(gpx_parsed);
}

getGPX('GPX/2020_01_24_la_fava.gpx');
*/
// var gpx = 'GPX/2020_01_24_la_fava.gpx';
/*
new L.GPX(gpx, {async: true}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);
*/

/*

********
*** MANUALLY ADD MARKERS
********
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
