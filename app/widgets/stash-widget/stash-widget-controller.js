angular.module('warRoom')

.controller('stashWidgetController', ['$scope', '$element', 'stashApiService', 'widgetService', function ($scope, $element, stashApiService, widgetService) {
  $scope.page = 'login';
  $scope.pageStack = ['Stash Widget'];
  $scope.pageStackInternal = ['stash-widget'];
  $scope.isLoggedIn = false;
  $scope.loginFailed = false;
  $scope.saveLoginInformation = { value : false };
  $scope.title = generateTitle($scope.pageStack);
  $scope.recentRepositoriesJson = [];
  $scope.pastPages = [];

  function generateTitle(stack) {
    var t = '';
    for (var i=0; i<stack.length-1; ++i) {
      t = t + '<a href="javascript:;">' + stack[i] + '</a> &gt ';
    }
    t = t + '<a href="javascript:;">' + stack[stack.length-1] + '</a>';
    return t;
  }
  
  $scope.switchPage = function (newPage) {
    switch (newPage) {
    case 'login':
      $scope.isLoggedIn = false;
      $scope.loginFailed = false;
      $scope.pageStack = ['Stash Widget', 'Login'];
      $scope.pageStackInternal = ['stash-widget', 'login'];
      $scope.page = 'login';
      break;
    case 'browser-select':
      $scope.pageStack = ['Stash Widget', 'Select Browser'];
      $scope.pageStackInternal = ['stash-widget', 'browser-select'];
      $scope.page = 'browser-select';
      break;
    case 'manual-browser':
      $scope.pageStack = ['Stash Widget', 'Select Browser', 'Manual Browser'];
      $scope.pageStackInternal = ['stash-widget', 'browser-select', 'manual-browser'];
      $scope.page = 'manual-browser';
      break;
    case 'search-browser':
      $scope.pageStack = ['Stash Widget', 'Select Browser', 'Search Browser'];
      $scope.pageStackInternal = ['stash-widget', 'browser-select', 'search-browser'];
      $scope.page = 'search-browser';
      break;
    case 'recent-browser':
      $scope.pageStack = ['Stash Widget', 'Select Browser', 'Recent Browser'];
      $scope.pageStackInternal = ['stash-widget', 'browser-select', 'recent-browser'];
      $scope.page = 'recent-browser';
      break;
    case 'pull-requests':
      $scope.pageStack = ['Stash Widget', 'Open Pull Requests'];
      $scope.pageStackInternal = ['stash-widget', 'pull-requests'];
      $scope.page = 'pull-requests';
      break;
    default:
      break;
    }
    
    $scope.title = generateTitle($scope.pageStack);
  }
  
  $scope.login = function (username, password, callback, errorFunc) {
    console.log('called with ' + username)
    if (stashApiService.setCredentials(username, password)) {
      if(!username) {
        console.log('no username so im returning')
        var submitLogin = '#stash-widget-submit-login';

        $scope.setSubmitButtonLoading(submitLogin, false);
        return
      }
      stashApiService.testCredentials(function (passed) {
        console.log('did I pass? ', passed)
        console.log($scope.isLoggedIn)
        if (passed) {

          if ($scope.saveLoginInformation.value) {
            //console.log('yeah value here')
            widgetService.saveValue('StashWidget', 'username', username);
            widgetService.saveValue('StashWidget', 'password', password);
          }
          $scope.isLoggedIn = true;
          $scope.loginFailed = false;
                    
          callback && callback();
        } else {
          $scope.loginFailed = true;
          alert("Oops! The username or password was incorrect. Try again!")
          $scope.isLoggedIn = false;
          
          errorFunc && errorFunc();
        }
      });
    } else {
      $scope.isLoggedIn = false;
      $scope.loginFailed = true;
      
      error && error();
    }
  };
  
  $scope.logout = function () {
    stashApiService.clearCredentials();
    widgetService.saveValue('StashWidget', 'username', '');
    widgetService.saveValue('StashWidget', 'password', '');
    $scope.isShowingPullRequests = false;
    $scope.isLoggedIn = false;
    $scope.loginFailed = false;
  };
  
  $scope.setSubmitButtonLoading = function (selector, loading) {
    if (loading) {
      $(selector).html('<i class=\'fa fa-refresh fa-refresh-animate\' aria-hidden=\'true\'></i> Submit');
    } else {
      $(selector).html('Submit');
    }
  };

  // $scope.setPageLoading = function (loading) {
  //   if (loading) {
  //     $scope.html('<i class=\'fa fa-refresh fa-refresh-animate\' aria-hidden=\'true\'></i> Submit');
  //   } else {
  //     $scope.html('Submit');
  //   }
  // };
  
  $scope.updatePullRequestsJson = function (type, group, name, callback, errorFunc) {
    return stashApiService.getPullRequests(type, group, name, function (data) {
      $scope.pullRequestsJson = data;
      $scope.isShowingPullRequests = true;
      
      callback && callback(data);
    }, function (error) {
      $scope.pullRequestsJson = {};
      $scope.isShowingPullRequests = false;
      
      errorFunc && errorFunc(error);
    });
  };
  
  $scope.updateRecentRepositoriesJson = function (callback, errorFunc) {
    return stashApiService.getRecentRepositories(function (data) {
      $scope.recentRepositoriesJson = data;
      $scope.isShowingRecentRepositories = true;
      
      callback && callback(data);
    }, function (error) {
      $scope.recentRepositoriesJson = [];
      $scope.isShowingRecentRepositories = false;
      
      errorFunc && errorFunc(error);
    });
  };
  
  $scope.lastUpdatedString = function (lastUpdated) {
    if (!Date.now) { Date.now = function() { return new Date().getTime(); } }
    var dt = Math.floor(Date.now() / 1000) - Math.floor(lastUpdated / 1000);
    if (dt < 0) return "in the future";
    else if (dt < 120) return "just now";
    else if (dt < 3600) return "an hour ago";
    else if (dt < 86400) return "" + Math.floor(dt / 3600) + " hours ago";
    else if (dt < 86400*2-1) return "a day ago";
    else return "" + Math.floor(dt / 86400) + " days ago";
  };

  $scope.pushPastPage = function (func, params) {
    $scope.pastPages.push(func + '(' + params.map(function (elem) { return JSON.stringify(elem) + ""; }).join(',') + ')');
  }
  
  $scope.showLogin = function (username, password) {
    $scope.logout()
    var submitLogin = '#stash-widget-submit-login';
    $scope.setSubmitButtonLoading(submitLogin, true);
    $scope.login(username, password, function () {
      $scope.setSubmitButtonLoading(submitLogin, false);
      $scope.showBrowserSelect();
    }, function () {
      $scope.setSubmitButtonLoading(submitLogin, false);
    });
    
    $scope.pushPastPage('$scope.showLogin', [username, password]);
  };

  $scope.showLoginKeypress = function (username, password, $event) {
    var keyCode = $event.which || $event.keyCode;
    if(keyCode ===13){
      $scope.logout()
      var submitLogin = '#stash-widget-submit-login';
      $scope.setSubmitButtonLoading(submitLogin, true);
      $scope.login(username, password, function () {
        $scope.setSubmitButtonLoading(submitLogin, false);
        $scope.showBrowserSelect();
      }, function () {
        $scope.setSubmitButtonLoading(submitLogin, false);
      });

      $scope.pushPastPage('$scope.showLogin', [username, password]);
    }
    
  };
  
  $scope.showLogout = function () {
    $scope.logout();
    $scope.switchPage('login');
  };
  
  $scope.showPullRequestsManual = function (type, group, name) {
    var submitManual = '#stash-widget-submit-manual';
    
    $scope.setSubmitButtonLoading(submitManual, true);
    $scope.updatePullRequestsJson(type, group, name, function () { 
      $scope.setSubmitButtonLoading(submitManual, false);
      $scope.switchPage('pull-requests');
    }, function () { 
      $scope.setSubmitButtonLoading(submitManual, false); 
    });
  };

  $scope.showPullRequestsManualKeypress = function (type, group, name, $event) {

    var keyCode = $event.which || $event.keyCode;
    if(keyCode ===13) {

      var submitManual = '#stash-widget-submit-manual';

      $scope.setSubmitButtonLoading(submitManual, true);
      $scope.updatePullRequestsJson(type, group, name, function () {
        $scope.setSubmitButtonLoading(submitManual, false);
        $scope.switchPage('pull-requests');
      }, function () {
        $scope.setSubmitButtonLoading(submitManual, false);
      });
    }
  };
  
  $scope.showPullRequestsRecentObject = function (obj) {
    var submitRecent = '#stash-widget-pr-list-header';
    $scope.setSubmitButtonLoading(submitRecent, true);
    $scope.updatePullRequestsJson(obj.project.type ===  'PERSONAL' ? 'users' : 'projects', obj.project.type === 'PERSONAL' ? obj.project.owner.name : obj.project.key, obj.slug, function () { 
      $scope.setSubmitButtonLoading (submitRecent, false);
      $scope.switchPage('pull-requests');
    });
  };
  
  $scope.showManualBrowser = function () {
    $scope.switchPage('manual-browser');
  };
  
  $scope.showRecentBrowser = function () {
    $scope.updateRecentRepositoriesJson();
    $scope.switchPage('recent-browser');
  };
  
  $scope.showPastPage = function () {
    if ($scope.pastPages.length > 0) {
      // sketchy hack
      eval($scope.pastPages.pop());
    }
  };
  
  $scope.showBrowserSelect = function () {
    $scope.switchPage('browser-select');
  }
  
  $scope.showPageByName = function (name) {
    switch (name) {
    case 'stash-widget':
      if ($scope.isLoggedIn) $scope.showBrowserSelect();
      break;
    case 'browser-select':
      if ($scope.isLoggedIn) $scope.showBrowserSelect();
      break;
    case 'recent-browser':
      if ($scope.isLoggedIn) $scope.showRecentBrowser();
      break;
    case 'manual-browser':
      if ($scope.isLoggedIn) $scope.showManualBrowser();
    default:
      break;
    }
  };
  
  var loadedUsername = widgetService.loadValue('StashWidget', 'username');
  var loadedPassword = widgetService.loadValue('StashWidget', 'password');
  console.log('>>>', loadedUsername)
  if (!!loadedUsername && !!loadedPassword) {
    $scope.showLogin(loadedUsername, loadedPassword);
  }
}]);