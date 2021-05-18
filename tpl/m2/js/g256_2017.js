var browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return { 
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
      iPhone: u.indexOf('iPhone') > -1, 
      iPad: u.indexOf('iPad') > -1, 
    };
  }(),
}
function withJQ(callback) {
    if (typeof jQuery === 'undefined') {
        var cdjs = document.createElement("script");
        var requestHandler = "http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js";
        cdjs.src = requestHandler;
        cdjs.type = "text/javascript";
        cdjs.onload = cdjs.onreadystatechange = function() {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                if (callback && typeof callback === "function") {
                    callback();
                }
                cdjs.onload = cdjs.onreadystatechange = null;
            }
        };
        document.getElementsByTagName('head')[0].appendChild(cdjs);
    } else {
        callback();
    }
}

