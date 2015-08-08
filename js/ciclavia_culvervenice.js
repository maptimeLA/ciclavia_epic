$(document).ready(function() {

//Loads HTML Descriptions
var loaddescp = function(val){
$("#infobox").load("/html/ciclavia_descriptions.html #"+val);
}    
    
//Loads Map    
L.mapbox.accessToken = 'pk.eyJ1IjoiY3J1emluNzN2dyIsImEiOiI3RDdhUi1NIn0.jaEqREZw7QQMRafKPNBdmA';    
        var map = L.mapbox.map('map', 'mapbox.light',{minZoom:14, maxZoom:18})
        .setView([34.008060, -118.422275], 15);        
    
        //URL to Markers
        var landmarkslayer = L.mapbox.featureLayer().addTo(map);
        var info = document.getElementById('infobox');
        var blvd ='data/ciclavia_route.geojson';
        var poi ='data/ciclavia_poi.geojson';
        var poi13 ='data/ciclavia_13.geojson';

//Adds Ciclavia Route
        $.getJSON(blvd, function(data) {
        var blvdlayer = L.geoJson(data, {
                style:{
                color: "#E86B3E",
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
        }).addTo(landmarkslayer);
        });
            
     
/*    
//Add image overlay
var imageURL='images/floatlabel-05.png', imageBounds =[[34.145500,-118.147236],[34.141806,-118.121470]];
L.imageOverlay(imageURL,imageBounds,{opacity:.5}).addTo(map);
*/ 

//Popup to infobox    
    landmarkslayer.on('click',function(e) {
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
