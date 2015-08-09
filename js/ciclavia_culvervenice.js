$(document).ready(function() {

//Loads HTML Descriptions
var loaddescp = function(val){
$("#infobox").load("html/ciclavia_descriptions.html #"+val);
}    
    
//Loads Map    
L.mapbox.accessToken = 'pk.eyJ1IjoiY3J1emluNzN2dyIsImEiOiI4MGU3YmM2NWU3ZTMxOTBmODljMDI3MWVkNzQ3YjI3OCJ9.jAJuygZO4NMXrDULIxKixQ';    
        var map = L.mapbox.map('map', 'mapbox.light',{minZoom:14, maxZoom:18})
        .setView([34.008060, -118.422275], 14);        

var imageUrl = 'images/cvr.png',
    // This is the trickiest part - you'll need accurate coordinates for the
    // corners of the image. You can find and create appropriate values at
    // http://maps.nypl.org/warper/ or
    // http://www.georeferencer.org/
    imageBounds = L.latLngBounds([
        [34.04016614759696, -118.47870143796067],
        [33.972334588465806, -118.35986772721151]]);

var overlay = L.imageOverlay(imageUrl, imageBounds)
    .addTo(map);  
    
//URL to Markers
        var landmarkslayer = L.mapbox.featureLayer().addTo(map);
        var poilayer = L.mapbox.featureLayer().addTo(map);
        var info = document.getElementById('infobox');
        var blvd ='data/ciclavia_route.geojson';
        var poi ='data/ciclavia_poi.geojson';
        var poi13 ='data/ciclavia_13.geojson';

//Adds Ciclavia Route
        $.getJSON(blvd, function(data) {
        var blvdlayer = L.geoJson(data, {
                style:{
                color: "#1CA4DE",
                weight: 5,
                dashArray:"3,8",
                opacity:1,
                clickable:false
                }
        }).addTo(map);
        });

//Adds Ciclavia Points of Interest
        $.getJSON(poi, function(data) {
        var poi = L.geoJson(data, {
                style:{
                color: "#E86B3E",
                weight: 5,
                fillColor:"#E86B3E",
                fillOpacity:1
                },
            pointToLayer: function(data, latlon) {
            return L.circleMarker(latlon, 5).bindLabel(data.properties.Name,{noHide:true});}
        }).addTo(landmarkslayer);
        });    
    
//Adds Oval District
        $.getJSON(poi13, function(data) {
        var poi13 = L.geoJson(data, {
                style:{
                color: "#E86B3E",
                weight: 5,
                dashArray:"3,8",
                opacity:1,
                },
        onEachFeature: function (data, layer) {
        layer.bindLabel(data.properties.Name,{noHide:true});
        }
        }).addTo(poilayer);
        });
            
//Popup to infobox    
    landmarkslayer.on('click',function(e) {
    console.log(e.layer);
    e.layer.closePopup();
    map.panTo(e.layer.getLatLng());    
    //info.innerHTML = e.layer._popup._content;
    loaddescp(e.layer.feature.properties.ID);
    });
    
//Popup Poly to infobox    
    poilayer.on('click',function(e) {
    console.log(e.layer);
    e.layer.closePopup();    
    //info.innerHTML = e.layer._popup._content;
    loaddescp(e.layer.feature.properties.ID);
    });    
    
//Walking Radius Style
var walkrad={
    "color": "#EE405F",
    "weight": 2,
    "fillOpacity":0,
    "opacity": 0.85,
    "dashArray":"5,5",
    "clickable":false
};
    
//Geolocation    
        var geolocation = L.mapbox.featureLayer().addTo(map);
        
        var mapbounds=map.getBounds();
        //console.log(mapbounds);
        
        var geolocate = document.getElementById('geolocate');
        
        if (!navigator.geolocation) {
        geolocate.innerHTML = 'Geolocation is not available';
        } else {
        geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate();
        };
        }
        map.on('locationfound', function(e) {
        geolocation.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
        });
        map.panTo([e.latlng.lat, e.latlng.lng]);
        } );

        // If the user chooses not to allow their location
        // to be shared, display an error message.
        map.on('locationerror', function() {
        geolocate.innerHTML = 'Position could not be found';
        });
    

});

