/* eslint-disable */
var urlString = '//www.google.com/maps/embed/v1/place?zoom=17';
var settings = {};

function onSignIn(googleUser) {
  window.location.href = '/';
}

function setText(str) {
  if (str === '') {
    $('.message').hide();
  } else {
    $('.message').show();
  }
  $('.message').html(str);
}

function getLocation() {
  setText('Loading...');
  $('#iframe').hide();
  navigator.geolocation.getCurrentPosition(function(position) {
    setText('');
    $('#iframe').show();
    var latVal = position.coords.latitude;
    var longVal = position.coords.longitude;
    $('#long').val(longVal);
    $('#lat').val(latVal);
    iframe.src = urlString + '&key=' + settings.gmapApi + '&q=' + latVal + ',' + longVal;
   });
}

function sendGeoLocation(){
  setText('Saving Geolocation...');
  $.ajax({
    method: 'POST',
    url: settings.apiUrl,
    dataType: "json",
    data: {
      long: $('#long').val(),
      lat: $('#lat').val(),
      userid: $('#userid').val(),
      email: $('#email').val(),
    },
    success: function(response) {
      setText('Geolocation saved: ' + response.msg);
    },
    error: function(err) {
      setText('Failed to send geolocation: ' + err.msg);
    }
  });
}
function initGeolocation() {
  $('#refresh').on('click', function(e){
    e.preventDefault();
    getLocation();
  });

  $('#submit').on('click', function(e){
    e.preventDefault();
    sendGeoLocation();
  });

  $('#signout').on('click', function(e){
    e.preventDefault();
    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
      window.location.href = '/signin';
    });
  });

  $('#iframe').hide();
  if ("geolocation" in navigator) {
    getLocation();
  } else {
    setText('Gelocation not supported :(');
  }
}

function appCheck(obj) {
  settings = obj;
  gapi.load('auth2', function(){
    var auth2 = gapi.auth2.init({
      client_id: settings.clientId,
    }).then(function(auth){
      if (auth.isSignedIn.get()) {
        var auth2 = auth;
        var profile = auth2.currentUser.get().getBasicProfile();
        $('#email').val(profile.getEmail());
        $('#userid').val(profile.getId());
        initGeolocation();
      } else {
        window.location.href = '/signin';
      }
    })
  });
}

function appStart(settings) {
  gapi.load('auth2', function(){
    var auth2 = gapi.auth2.init({
      client_id: settings.clientId,
    });
  });
}

