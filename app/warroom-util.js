function camelToDash(str) {
  return str.replace(/\W+/g, '-')
      .replace(/([a-z\d])([A-Z])/g, '$1-$2');
}

function dashToCamel(str) {
  return str.replace(/\W+(.)/g, function (x, chr) {
    return chr.toUpperCase();
  })
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return undefined;
}

function setCookie(cname, cvalue, exdays) {
    if (exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
    }
    var expires = exdays ? (" expires="+ d.toUTCString()) : ("");
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

if (!Array.prototype.last){
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
}

if (!Array.prototype.contains) {
  Array.prototype.contains = function (elem) {
    var len = this.length;
    for (var i=0; i<len; ++i) {
      if (this[i] === elem) {
        return true;
      }
    }
    return false;
  };
}