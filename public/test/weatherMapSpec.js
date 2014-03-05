describe('Weather Map', function(){
	var el,opts,wamp;

	beforeEach(function() {
    el = $('#testmap');
		opts = {center: new google.maps.LatLng(-37.925784,145.053593)};
		wmap = new WeatherMap(el,opts);
  });

	it('should be able to create a map instance in a div', function(){
		expect(wmap.map).toBeDefined();
	});

	it('should be able to set a mark on the map when a coordinate is generated', function(){
		var cords = new google.maps.LatLng(-41.672912,145.972595);
		wmap.setMark(cords);
		expect(wmap.markers.length).toBe(1);
	});
	
	describe("Weather Data Specs", function() {
  	var data1,data2;
		$.getJSON('/weather?-41.672912,145.972595', function(data) {
			data1 = data.current_observation.temperature_string;
		});
		$.getJSON('/weather?-0.35156,179.972534', function(data) {
			data2 = data.current_observation.temperature_string;
		});
  	beforeEach(function(done) {
	    setTimeout(function() {
	      done();
	    }, 2000);
	  });
		it("There should be weather data returned by (-41.672912,145.972595)", function(done) {
	    expect(data1).toBeDefined();
	    done();
	  });
	  it("There should not be weather data returned by (-0.35156,179.972534)", function(done) {
	    expect(data2).toBeUndefined();
	    done();
	  });
	});
});