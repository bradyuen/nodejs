var app = angular.module('HomePageApp', []);

//create controller to listen click event and call api
app.controller('pageCtrl',  ['$scope', '$http', function ($scope, $http) {
  $scope.username = "unknown";

  socket.on('change username', function(data) {
      $scope.username = data;
  });

  $scope.getHolidayData = function(){
    //Call server to send request to secure all data.
    $http.get("/api/holidayData").then(function(response, status) {
      console.log(response);

        //First function handles success

        //Bind Title
        $scope.holidayList = "My holiday";

        //Bind Directive Table
        $scope.holidays = response.data;

        //remove style to show table
        angular.element( document.querySelector( '#holidayListTable' ) ).removeClass("disappear");


    }, function(response) {
      console.log(response);
      if (response.status == 404) {
        //Bind Error
        $scope.holidayList = "Error 404";
      }else{
        //Bind Error
        $scope.holidayList = "Error";
      }

    });
  }


}]);
//Controller from Header
app.controller('headerCtrl', function(){

});

//create directive to bind template
app.directive('headerMenuList', function() {
  return {
    templateUrl: '/templates/headerMenu.html'
  };
});

//create directive to bind template
app.directive('holidayList', function() {
  return {
    templateUrl: '/templates/holidayList.html'
  };
});
