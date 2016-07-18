angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading,$cordovaGeolocation) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    //geolocation옵션
    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (pos) {
        var lat  = pos.coords.latitude;
        var lng = pos.coords.longitude;

        //위도 / 경도
        var here = new google.maps.LatLng(lat,lng);

        var TILE_SIZE = 256;

        console.log('Got pos', pos);
        var coordInfoWindow = new google.maps.InfoWindow();
        coordInfoWindow.setContent(createInfoWindowContent(here, $scope.map.getZoom()));

        function project(latLng) {
          var siny = Math.sin(latLng.lat() * Math.PI / 180);

          // Truncating to 0.9999 effectively limits latitude to 89.189. This is
          // about a third of a tile past the edge of the world tile.
          siny = Math.min(Math.max(siny, -0.9999), 0.9999);

          return new google.maps.Point(
            TILE_SIZE * (0.5 + latLng.lng() / 360),
            TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
        }

        function createInfoWindowContent(latLng, zoom) {
          var scale = 1 << zoom;

          var worldCoordinate = project(latLng);

          var pixelCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale),
            Math.floor(worldCoordinate.y * scale));

          var tileCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale / TILE_SIZE),
            Math.floor(worldCoordinate.y * scale / TILE_SIZE));

          return [
            '사당역',
            '위도경도: ' + latLng,
            '확대: ' + zoom,
            'World Coordinate: ' + worldCoordinate,
            'Pixel Coordinate: ' + pixelCoordinate,
            'Tile Coordinate: ' + tileCoordinate
          ].join('<br>');
        }

        coordInfoWindow.setPosition(here);
        coordInfoWindow.open($scope.map);
        $scope.map.setCenter(here);

        $scope.loading.hide();

      }, function(err) {
        alert(err);
      });


  //HTML5 api
    navigator.geolocation.getCurrentPosition(function (pos) {

    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});
