var sImpressApp = angular.module("sImpressApp", []);

sImpressApp.controller("currDispCtrl", function ($scope, $http, $filter, $sce){
	$scope.simJson;
   $scope.trustedUrl = [];
   $scope.dbQueryLimitFrom = 0;
   $scope.dbQueryLimitTo = 5;
	$scope.getData = function () {

	   //Real connection
/*
	   $scope.promise = $http.get("php/dbquery.php?lf="+$scope.dbQueryLimitFrom+"&lt="+$scope.dbQueryLimitTo);
*/
      // Mocked connection
      $scope.promise = $http.get("php/mockedDatabaseReply.php");

		$scope.promise.then(function(response) {
			$scope.simJson = response.data.records;
		})
      $scope.promise.then (
         function () {
         $scope.simJson.forEach(function (item, index, Arr) {
            var obj = {"trustedpath": "http://soundimpress.pl/"+item.filepath};
            $scope.simJson[index].trustedpath = $sce.trustAsResourceUrl("http://soundimpress.pl/"+item.filepath);
         });
      });
   };

   $scope.sendQuery = function () {
      $scope.getData();
   };
   
});