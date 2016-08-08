angular.module('warRoom')

    .controller('newsController', ['$scope', 'nytService', 'newsService', 'espnService', 'widgetService', function ($scope, nytService, newsService, espnService, widgetService) {

        
        $scope.dataNyt = [];
        $scope.dataNews = [];
        $scope.dataSport = [];
        $scope.tb1Nyt = true;
        $scope.tb2News = true;
        $scope.tb3Sport = true;
        
        $scope.appear = function() {
            $scope.tb2News = true;
            $scope.tb1Nyt = false;
            $scope.tb3Sport = true;

        };
        $scope.newsAppear = function() {
            $scope.tb2News = false;
            $scope.tb1Nyt = true;
            $scope.tb3Sport = true;


        };
        $scope.sportAppear = function() {
            $scope.tb3Sport = false;
            $scope.tb1Nyt = true;
            $scope.tb2News = true;
            
        };
            
        
        nytService.getnytNews('home', function (allDataNyt) {
            for(var i=0;i<allDataNyt.length-12;i++)
            {
                $scope.dataNyt.push(allDataNyt[i]);
            }
        });

        newsService.getAllNews(function (allData) {
            for(var i=0;i<allData.length-1;i++)
            {
                if(!(allData[i].title===allData[i+1].title))
                {
                    $scope.dataNews.push(allData[i]);

                }

            }
        });

        espnService.getSportsNews(function (allSportsData) {
            for(var i=0;i<allSportsData.length-1;i++)
            {
                if(!(allSportsData[i].title===allSportsData[i+1].title))
                {
                    $scope.dataSport.push(allSportsData[i]);

                }

            }
        });
       /* $scope.chooseNews = function () {
            if (document.form1.optradio[0].checked == true) {
                $scope.chooseNews.push($scope.nytTitles);
           }
            else if (document.form1.optradio[1].checked == true) {
                alert("You have selected Option 2");
            }
            else if (document.form1.optradio[2].checked == true) {
                alert("You have selected Option 3");
            }
            else {
                
            }
        }
        */


    }]);


/*var App = angular.module('warRoom', [])

 .controller('newsController', ['$scope', 'newsService', function($scope, Feed) {
 $scope.loadButonText="Load";
 $scope.loadFeed=function(e){        
 Feed.parseFeed($scope.feedSrc).then(function(res){
 $scope.loadButonText=angular.element(e.target).text();
 $scope.feeds=res.data.responseData.feed.entries;
 });
 }
 }]);

 App.factory('newsService',['$http',function($http){
 return {
 parseFeed : function(url){
 return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
 }
 }
 }]); */
