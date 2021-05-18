/*检测浏览器*/
var Phone={
    url:window.location.href,
    host:window.location.host,
    m_url :'m/default.htm',
    versions:function(){
        var u = navigator.userAgent;
        return {        
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1, //android终端或uc浏览器
        };
    }(),
    run:function(rurl){
        if(this.url.indexOf('?phone') > -1 ) return;
        if(Phone.versions.android == true || Phone.versions.ios == true){
            var r_url = (rurl != undefined && rurl != '') ? rurl : this.m_url;
            r_url = this.url.replace(this.host,this.host+'/m');
            window.location.href = r_url;
        }
    }        
}
Phone.run();