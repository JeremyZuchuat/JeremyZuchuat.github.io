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

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

/* 2. MARKERS */

/* 2.1 Ski Touring */

// Define Markers Styles

var mountain_logo_red = L.icon({
    iconUrl: '../assets/map/icons/mountain_logo_red.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

var mountain_logo_red_H = L.icon({
    iconUrl: '../assets/map/icons/mountain_logo_red_light.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

var mountain_logo_blue = L.icon({
    iconUrl: '../assets/map/icons/mountain_logo_blue.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

var mountain_logo_blue_H = L.icon({
    iconUrl: '../assets/map/icons/mountain_logo_blue_light.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

var bike_logo_green = L.icon({
    iconUrl: '../assets/map/icons/bike_logo_green.png',
    iconSize:     [35, 35], // size of the icon
    popupAnchor:  [0,-20] // point from which the popup should open relative to the iconAnchor
});

var bike_logo_green_H = L.icon({
    iconUrl: '../assets/map/icons/bike_logo_green_light.png',
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

    // MARKERS - SKI TOUR

    // Get marker's geolocalisation
    var marker = L.marker([table[i].Latitude, table[i].Longitude], {
          icon: mountain_logo_blue,
          win_url: table[i].Strava
    }).addTo(mymap);

    // Popup

    marker.bindPopup("<b>"  + table[i].Course + "</b>" + " (" + table[i].Elevation_max + "m.), " + table[i].Difficulte + "</br>"
                            + "See <i class='fab fa-strava'></i>"
                            + " <a href = '"
                            + table[i].Strava
                            + "' target='_blank'><u>Strava</u></a> "
                            + "or read  <i class='fas fa-mountain'></i>"
                            + " <a href = '"
                            + table[i].Topo
                            + "' target='_blank'><u>Topo</u></a> "
                          );

    // Marker mouseover : Highlight
    marker.on('mouseover', function(e) {
      this.openPopup();
      e.target.setIcon(mountain_logo_blue_H);
    });

    // Marker mouseout : De-Highlight
    marker.on('mouseout', function(e) {
      /*this.closePopup();*/
      e.target.setIcon(mountain_logo_blue);
    });

    // Click
    marker.on('click', function(e) {
      this.openPopup();
      e.target.setIcon(mountain_logo_blue_H);
    });

  }

}

getData('../assets/map/information/info_touring.csv')

//------------------------------------------------------------------------------

// Read array (ONLY SERVER)
async function getDataBike(path) {

    // IMPORT CSV
  console.log("IMPORT TEXT CSV:");
  const response = await fetch(path);
  const dataBike = await response.text();
  console.log(dataBike);

  // PARSE CSV
  console.log("PARSE TEXT CSV:");
  var tableBike =  Papa.parse(dataBike,{
    header : true
  });
  var tableBike = tableBike.data
  console.log(tableBike);

  // MARKERS AND GPX
  for (var i = 0; i < tableBike.length; i++) {

    // MARKERS - SKI TOUR

    // Get marker's geolocalisation
    var markerBike = L.marker([tableBike[i].Latitude, tableBike[i].Longitude], {
          icon: bike_logo_green,
          win_url: tableBike[i].Strava
    }).addTo(mymap);

    // Popup

    markerBike.bindPopup("<b>"  + tableBike[i].Course + "</b>" + " (" + tableBike[i].Elevation_max + "m.), " + "</br>"
                            + "See <i class='fab fa-strava'></i>"
                            + " <a href = '"
                            + tableBike[i].Strava
                            + "' target='_blank'><u>Strava</u></a> "
                          );

    // Marker mouseover : Highlight
    markerBike.on('mouseover', function(e) {
      this.openPopup();
      e.target.setIcon(bike_logo_green_H);
    });

    // Marker mouseout : De-Highlight
    markerBike.on('mouseout', function(e) {
      /*this.closePopup();*/
      e.target.setIcon(bike_logo_green);
    });

    // Click
    markerBike.on('click', function(e) {
      this.openPopup();
      e.target.setIcon(bike_logo_green_H);
    });

  }

}

getDataBike('../assets/map/information/info_biking.csv')

// MANUALLY ADD MARKERS
/*
// Array
let ski_touring = [
    [45.87897, 7.15738, "Pointe de Drône (2949m)", "AD"],
    [45.89517, 7.07661, "Tête de Ferret (2713m)", "PD+"]
];

// Create each marker
for (var i = 0; i < ski_touring.length; i++) {

    // Get marker's geolocalisation
    var marker = L.marker([ski_touring[i][0], ski_touring[i][1]], {
      icon: mountain_logo_red
    }).addTo(mymap);

    // Popup
    marker.bindPopup("<b>"  + ski_touring[i][2] + "</b>" + ", " + ski_touring[i][3] + "</br>"
                            + "See <i class='fab fa-strava'></i>"
                            + " <a href = 'https://drive.google.com/file/d/1c0o5QvSvdYwgVWgPSdxhrpg1v5SYytnM/view?usp=sharing' target='_blank'><u>Strava</u></a> "
                            + "or read  <i class='fas fa-mountain'></i>"
                            + " <a href = 'https://drive.google.com/file/d/1c0o5QvSvdYwgVWgPSdxhrpg1v5SYytnM/view?usp=sharing' target='_blank'><u>Topo</u></a> "
                            );

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

    // Click
    marker.on('click', function(e) {
      this.openPopup();
      e.target.setIcon(mountain_logo_red_H);
    });

}
*/
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

/* 3. POPUP */
/*
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
*/
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

/* RETURN the map : intial view*/
mymap.setView(L.latLng(46.20094, 7.53214), 8);
