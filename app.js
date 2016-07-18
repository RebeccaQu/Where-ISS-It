var app = window.app || {};

app.getUserLocation = function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    app.userLat = position.coords.latitude;
    app.userLng = position.coords.longitude;
    // app.userAlt = position.coords.altitude;

    app.getPassTime(app.userLat, app.userLng);
  });
}

app.getISSLocation = function() {
  $.ajax({
    url: 'http://api.open-notify.org/iss-now.json',
    type: 'GET',
    dataType: 'jsonp',
    success: function(payload) {
      console.info('GETTING LOCATION 📍');
      console.log(payload);
    }
  });
}

app.getSpacePeople = function() {
  $.ajax({
    url: 'http://api.open-notify.org/astros.json',
    type: 'GET',
    dataType: 'jsonp',
    success: function(payload) {
      console.info('GETTING SPACE PEEPS 👽👽👽');
      console.log(payload);
    }
  });
}

app.getPassTime = function(lat, lng) {
  $.ajax({
    url: 'http://api.open-notify.org/iss-pass.json',
    type: 'GET',
    data: {
      format: 'jsonp',
      lat: lat,
      lon: lng,
      n: 3,
    },
    dataType: 'jsonp',
    success: function(payload) {
      console.info('GETTING PASS TIMES 🌍🌏🌎🚀');
      payload.response.map(function(passtime) {
        console.log(app.helpers.convertTimestamp(passtime.risetime));
      });
    }
  });
}

$(function() {
  app.getUserLocation();
});
