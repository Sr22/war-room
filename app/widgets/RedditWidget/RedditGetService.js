/**
 * Created by davisjac on 6/29/2016.
 */
angular.module("warRoom")
    .value("HOST", "http://www.reddit.com/r/")
    .service("getPostInfo", ["search", "getPostInfo"]);

function getTitles(redditSearch) {
    return {
        retrievePostInformation: function() {
            var posts = esriRequest({
                url: HOST + redditSearch + "/top/.json?limit=3",
                handleAs: "json"
            });
            posts.then(function() {
                var pos = [{
                    title: '',
                    posturl: ''
                }];
                var i = 0;
                while (i != 3) {
                    if (pos.title = '') {
                        pos.title = data.data.children[i].title;
                        pos.posturl = data.data.children[i].url;
                    }
                    else {
                        var temp = {title: data.data.children[i].title, posturl: data.data.children[i].url};
                        pos = pos + temp;
                    }
                }
                return pos;
            }, function() {
                return null;
            })
        }
    }
}