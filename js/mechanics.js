var sImpressApp = angular.module("sImpressApp", []);

sImpressApp.controller("currDispCtrl", function ($scope, $http, $filter, $sce){
	$scope.simJson ='';
   $scope.trustedUrl = [];
   $scope.dbQueryLimitFrom = 0;
   $scope.dbQueryLimitTo = 5;
	$scope.getData = function (isMock) {

   if (isMock) {
	   //Real connection
	   $scope.promise = $http.get("php/dbquery.php?lf="+$scope.dbQueryLimitFrom+"&lt="+$scope.dbQueryLimitTo);
   } else {
      // Mocked JSON data 
      $scope.promise = $http.get("php/mockedDatabaseReply.php");
   }
		$scope.promise.then(function(response) {
			$scope.simJson = response.data.records;
		});
      $scope.promise.then (
         function () {
         $scope.simJson.forEach(function (item, index) {
            $scope.simJson[index].trustedpath = $sce.trustAsResourceUrl("http://soundimpress.pl/"+item.filepath);
         });
      });
   };
   $scope.sendQuery = function (a) {
      $scope.getData(a);
   };
});

sImpressApp.filter('toMBFilter', function () {
   return function(input) {
     return (Math.floor(input/(1024*1024)*100))/100;
   }
});