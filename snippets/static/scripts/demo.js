var myApp = angular.module("myApp", []);
myApp.config(function($interpolateProvider,$sceProvider) {
$interpolateProvider.startSymbol('[[');
$interpolateProvider.endSymbol(']]');
$sceProvider.enabled(false);
});

myApp.controller("MyController", ["$scope","$location","$http", '$sce', function($scope, $location, $http, $sce) {
$scope.myName = "Hakim Adil Will Win in Django";

        $scope.downClassClicked=function(){
        setInterval(function() {
        $('#DownClass').addClass('ClickSpn');
                               }, 500);
        $('#Class').removeClass('ClickSpn').addClass('OrginClickSpn');
        };









var GetActiveUsers=function()
{$http.get('https://shielded-mountain-28381.herokuapp.com/snippets/currentUsers',{})
                         .success(function (data) {
                          $scope.MyData= data;
                          $('.ActiveUserCss').css('display','block');
                       }).error(function (error, status) {
                       });}

                       GetActiveUsers();

setInterval(function() {
GetActiveUsers()
                       }, 9000);





$scope.GetData=function(){
//console.log($location.$$host)
 //$http.get('http://'+$location.$$host+':'+$location.$$port+'/Catalog/validate_username/',
 //$http.get('https://radiant-depths-18402.herokuapp.com/snippets/post',
 $http.get('https://shielded-mountain-28381.herokuapp.com/snippets/post',
                       {
                       }).success(function (data) {
//                          $scope.DatedVault= data;
//                          console.log($scope.DatedVault)
                            //console.log('https://'+$location.$$host+':'+$location.$$port+'/snippets/post')
                       }).error(function (error, status) {
                            //console.log('https://'+$location.$$host+':'+$location.$$port+'/snippets/post')
                       });
                       };


$scope.GetGroups=function(){
//console.log($location.$$host)
 //$http.get('http://'+$location.$$host+':'+$location.$$port+'/Catalog/validate_username/',
 //$http.get('https://radiant-depths-18402.herokuapp.com/snippets/post',
 $http.get('https://shielded-mountain-28381.herokuapp.com/groups/GroupsAPI',
                       {
                       }).success(function (data) {
                          $scope.Groups= data;
//                          console.log($scope.DatedVault)
                            //console.log('https://'+$location.$$host+':'+$location.$$port+'/snippets/post')

                      for(var i=0;i<$scope.Groups.length;i++)
                      {
                              $scope.Groups[i].fields.HotelUrl=$sce.trustAsResourceUrl( $scope.Groups[i].fields.HotelUrl);

                      }

                       }).error(function (error, status) {
                            //console.log('https://'+$location.$$host+':'+$location.$$port+'/snippets/post')
                       });
                       };


$scope.GetGroups();

                       $scope.TestGetFun=function(){
                               $http.get('https://shielded-mountain-28381.herokuapp.com/snippets/testget',
                               {params: {name: "hakim"}}
                               ).success(function (data) {
                               $scope.TestData= data;
                               console.log(data);

                       }).error(function (error, status) {
                       });
                       };

                        $scope.TestPostFun=function(){

                           var Obj=[{'user':'Angular-java',
                                   'title':'connection django and angular',
                                   'contents':'1154758',
                                   'timestamp':"10-20-2018"}]
                            $http({
                            method: 'POST',
//                            url: $location.$$protocol+'://'+$location.$$host+'/Catalog/'+'validate_username/',
                           url:'https://shielded-mountain-28381.herokuapp.com/snippets/testpost',
                            data: $.param({ deal: JSON.stringify(Obj) }),
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
                        }).success(function (data, status, headers, config) {
                        $scope.DatedVault= data;
                        console.log($scope.DatedVault);
                        }).error(function (data, status, headers, config) {
                            // handle error things
                        });

                        };



                       $scope.PostBook=function(){
                                   var BookObj=[
                                   {'title':'Angular-java',
                                   'summary':'connection django and angular',
                                   'isbn':'1154758',
                                   'author_id':"1"},
                                    {'title':'Angular-PHP',
                                   'summary':'connection Asp.Net and angular',
                                   'isbn':'11547845',
                                   'author_id':"1"},
                                    {'title':'Angular-Ruby',
                                   'summary':'connection Node and angular',
                                   'isbn':'11545478',
                                   'author_id':"1"},
                                  ]
                            $http({
                            method: 'POST',
                            url: $location.$$protocol+'://'+$location.$$host+'/Catalog/'+'validate_username/',
                            data: $.param({ deal: JSON.stringify(BookObj) }),
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
                        }).success(function (data, status, headers, config) {
                        $scope.DatedVault= data;

                        }).error(function (data, status, headers, config) {
                            // handle error things
                        });

                       };
                      //  $scope.GetData();
                         $scope.TestGetFun();
                         $scope.TestPostFun();
}]);