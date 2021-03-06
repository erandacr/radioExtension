define(["models/DataStorage"], function (a) {
    "use strict";
    function b(a) {
        var b = a.previousVersion, e = chrome.runtime.getManifest().version;
        if (b && e > b) {
            for (var f in d)d.hasOwnProperty(f) && f > b && e >= f && (d[f].call(), console.info("Update " + f + " installed"));
            c("changelog")
        }
    }

    function c(a) {
        var b = chrome.runtime.getURL("options.html"), c = "string" == typeof a ? b + "#" + a : b;
        chrome.tabs.query({url: b}, function (a) {
            a.length ? (chrome.tabs.update(a[0].id, {
                active: !0,
                url: c
            }), chrome.tabs.reload(a[0].id)) : chrome.tabs.create({url: c})
        })
    }

    var d = {
        "1.7.0": function () {
            localStorage.removeItem("_hotkeys")
        }, "1.7.2": function () {
            var b = a.getFavorites(), c = [];
            for (var d in b)b.hasOwnProperty(d) && c.push(d);
            a.setFavorites(c)
        }, "1.7.7": function () {
            var b = JSON.parse(localStorage.getItem("_stations")) || {};
            for (var c in b)if (b.hasOwnProperty(c)) {
                var d = b[c];
                d.name = c, d.streams = [b[c].stream], a.addStation(d)
            }
        }, "2.0.0": function () {
            localStorage.removeItem("_version")
        }, "2.0.4": function () {
            a.addStation({
                name: "chillout.101.ru",
                title: "101.ru ● Chillоut",
                url: "http://chillout.101.ru/",
                streams: ["http://eu4.101.ru:8000/c15_3", "http://ru2.101.ru:8000/c15_3", "http://eu7.101.ru:8000/c15_3", "http://nbn.101.ru:8000/c15_3", "http://ru1.101.ru:8000/c15_3"],
                image: "http://101.ru/vardata/modules/channel/dynamics/pro/24.jpg"
            })
        }
    };
    return {checkUpdates: b, openOptions: c}
});