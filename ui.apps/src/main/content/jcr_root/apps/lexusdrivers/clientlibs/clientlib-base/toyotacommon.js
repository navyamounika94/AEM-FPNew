/*
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2016 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
// Switch the page to preview mode to make the download button clickable
if (self !== top && "Granite" in window.parent) {
    window.parent.Granite.author.layerManager.activateLayer("Preview")
}

var imported0 = document.createElement('script');
imported0.src = 'https://code.jquery.com/jquery-3.5.0.js';
document.head.appendChild(imported0);

var imported1 = document.createElement('script');
imported1.src = 'https://drivers.lexus.com/lexus-share/js/tracking_omn/JSON/LDomni4.json';
document.head.appendChild(imported1);

var imported2 = document.createElement('script');
imported2.src = 'https://drivers.lexus.com/lexus-share/js/tracking_omn/s_code_ld.js';
document.head.appendChild(imported2);

var imported3 = document.createElement('script');
imported3.src = 'https://drivers.lexus.com/lexus-share/js/tracking_omn/LD_cod.js';
document.head.appendChild(imported3);

var imported4 = document.createElement('script');
imported4.src = 'https://nexus.toyota.com/toyotanational/drivers_prod/Bootstrap.js';
document.head.appendChild(imported4);
var digitalData = digitalData || {};
digitalData = {
    page: {
        pageName: window.document.location.pathname,
        siteSection: "",
        '<page>': "",
        '<subsection>': "",
        '<section>': "",
        '<orientation>': (window.innerHeight < window.innerWidth) ? "Landscape" : "Portrait",
        '<app>': "LD-AEM",
        '<break_point>': window.matchMedia("(max-width: 767px)").matches ? "MOBILE" : "DESKTOP",
        '<login_status>': "Logged Out",
        '<tag_id>': "",
        '<zip_code>': "",
        "<registration_type>": "",
        "<role>": ""
    }

}

var tagCall = function (tagKey, tagContentTemplate) {
    window.fireTag(tagKey, tagContentTemplate);
}
var fireTagCall = function (tagKey, errorMsg) {
    var tagContentTemplate = jQuery.extend(true, {}, '');
    if (fireTagParam.length != 0) {
        $.extend(true, tagContentTemplate, fireTagParam);
        $.extend(true, tagContentTemplate, digitalData.page);
    }
    //console.log("||LD Analytics||" + tagKey + " TAG Content >> " + JSON.stringify(tagContentTemplate));
    if (typeof tagContentTemplate == typeof undefined) {
        console.log("||LD Analytics|| Unable to find tag entry " + tagKey);
    } else {
        //Generic elements
        tagCall(tagKey, tagContentTemplate);
        fireTagParam = {};
    }

};
var TOAnalytics = (function () {
    var module = {};
    module.fire = function (tagKey, errorMsg) {
        fireTagCall(tagKey, errorMsg);
    };
    return module;
}());
$(document).on("click", "[data-firetag]", function () {
    if ("" != $(this).attr("data-firetag")) {
        console.log('fp');
        var tagId = "" + $(this).attr("data-firetag");
        digitalData.page["<tag_id>"] = tagId;
        void 0 !== $(this).attr("data-firetag-param") && (fireTagParam = jQuery.parseJSON($(this).attr("data-firetag-param")));
        var multipleTagIdIndex = tagId.indexOf(",");
        if (multipleTagIdIndex > -1) {
            var firstTagId = tagId.substring(0, multipleTagIdIndex), secondTagId = tagId.substring(multipleTagIdIndex + 1);
            TOAnalytics.fire(firstTagId), TOAnalytics.fire(secondTagId, "");
        } else TOAnalytics.fire(tagId);
    }
})

console.log('from clientlib');
