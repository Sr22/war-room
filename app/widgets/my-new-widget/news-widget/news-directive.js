angular.module('warRoom')

    .directive('newsWidget', function () {
        return {
            templateUrl: 'widgets/news-widget/news.html',
            controller: 'newsController',

        };
    })