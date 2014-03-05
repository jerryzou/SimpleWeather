function WeatherMap(el, options) {
  var that = this;
  this.map =  new google.maps.Map(el[0], options);
  this.markers = [];
  this.geocoder = new google.maps.Geocoder();
  this.infowindows = [];
  google.maps.event.addListener(this.map, 'click', function(e){
    that.setMark(e.latLng);
  });
}

WeatherMap.prototype.setMark = function(cords) {
  var marker = new google.maps.Marker({position: cords, map: this.map, animation: google.maps.Animation.DROP});
  this.markers.push(marker);
  this.setInfo(cords, marker);
}

WeatherMap.prototype.setInfo = function(cords, marker) {
  var that = this;
  this.geocoder.geocode({'latLng': cords}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        var contentStr = '';
        $.getJSON('/weather?' + cords.toUrlValue(), function(data) {
          if(data.current_observation.temperature_string){
            contentStr += '<img class="wicon" src=' + data.current_observation.icon_url + ' />';
            contentStr += '<h3 class="wtemp">' + data.current_observation.temperature_string + '</h3>';
            contentStr += '<h4>' + results[1].formatted_address + '</h4>'
          }else{
            contentStr += '<div>Sorry. No data found.</div>';
          }
          var infowindow = new google.maps.InfoWindow();
          that.infowindows.push(infowindow);
          infowindow.setContent(contentStr);
          infowindow.open(that.map, marker);
          google.maps.event.addListener(infowindow, 'closeclick', function(e){
            marker.setMap(null);
          });
        });
      } else {
        alert('Sorry. No data found.');
        marker.setMap(null);
      }
    } else {
      alert('Sorry. No data found.');
      marker.setMap(null);
    }
  });
}