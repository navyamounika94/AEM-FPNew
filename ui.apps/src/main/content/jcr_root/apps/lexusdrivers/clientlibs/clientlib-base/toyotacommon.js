

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


jQuery.noConflict();

// var imported0 = document.createElement('script');
// imported0.async = true;
// imported0.type = 'text/javascript';
// imported0.src = 'https://code.jquery.com/jquery-3.5.0.js';
// document.head.appendChild(imported0);

var imported1 = document.createElement('script');
imported1.async = true;
imported1.type = 'text/javascript';
imported1.src = 'https://drivers.lexus.com/lexus-share/js/tracking_omn/JSON/LDomni4.json';
document.head.appendChild(imported1);

var imported2 = document.createElement('script');
imported2.async = true;
imported2.type = 'text/javascript';
imported2.src = 'https://drivers.lexus.com/lexus-share/js/tracking_omn/s_code_ld.js';
document.head.appendChild(imported2);

var imported3 = document.createElement('script');
imported3.async = true;
imported3.type = 'text/javascript';
imported3.src = 'https://drivers.lexus.com/lexus-share/js/tracking_omn/LD_cod.js';
document.head.appendChild(imported3);

var imported4 = document.createElement('script');
imported4.async = true;
imported4.type = 'text/javascript';
imported4.src = 'https://nexus.toyota.com/toyotanational/drivers_prod/Bootstrap.js';
document.head.appendChild(imported4);

var digitalData = digitalData || {};
digitalData = {
    page: {
        pageName: window.document.location.pathname,
        siteSection: "",
        '<orientation>': (window.innerHeight < window.innerWidth) ? "Landscape" : "Portrait",
        '<app>': "LD",
        '<break_point>': window.matchMedia("(max-width: 767px)").matches ? "MOBILE" : "DESKTOP",
        '<login_status>': "Logged Out",
        '<tag_id>': "",
        '<zip_code>': "",
        "<registration_type>": "",
        "<role>": "",
        '<owner_model_name>': "",
        '<model_name>': "",
        '<model_year>': ""
    }

}

var tagCall = function (tagKey, tagContentTemplate) {
    window.fireTag(tagKey, tagContentTemplate);
}
var fireTagCall = function (tagKey, errorMsg) {
    var tagContentTemplate = jQuery.extend(true, {}, '');
    digitalData.page['<owner_model_name>'] = getOwnerModelName();
    digitalData.page['<model_name>'] = getModelName();
    digitalData.page['<model_year>'] = getOwnerModelYear();

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
        console.log('ld calling analytics onClick....');
        var tagId = "" + $(this).attr("data-firetag");
        digitalData.page["<tag_id>"] = tagId;
        void 0 !== $(this).attr("data-firetag-param") && (fireTagParam = jQuery.parseJSON($(this).attr("data-firetag-param")));
        var multipleTagIdIndex = tagId.indexOf(",");
        if (multipleTagIdIndex > -1) {
            var firstTagId = tagId.substring(0, multipleTagIdIndex), secondTagId = tagId.substring(multipleTagIdIndex + 1);
            TOAnalytics.fire(firstTagId);
            TOAnalytics.fire(secondTagId, "");
        } else TOAnalytics.fire(tagId);
    }
})

function getOwnerModelName() {
    var fireTagOwnerModelName = '';
    fireTagOwnerModelName = $('#nav-bar-selectVehicle-tab').text();
    if (fireTagOwnerModelName === 'Select a Vehicle') {
        fireTagOwnerModelName = '';
    }
    return fireTagOwnerModelName;

}

function getOwnerModelYear() {
    var modelYear = '';
    var fireTagSelectedVehicle = $('#nav-bar-selectVehicle-tab').text();
    if ($('#nav-bar-selectVehicle-tab').text() === "Select a Vehicle")
        return modelYear;
    if (fireTagSelectedVehicle.trim().length > 1) {
        modelYear = fireTagSelectedVehicle.split(" ")[0];
    }
    return modelYear;
}
function getModelName() {
    var modelName = '';
    var fireTagSelectedVehicle = $('#nav-bar-selectVehicle-tab').text();
    if ($('#nav-bar-selectVehicle-tab').text() === "Select a Vehicle")
        return modelName;
    if (fireTagSelectedVehicle.trim().length > 1) {
        modelName = fireTagSelectedVehicle.split(" ")[1];
    }
    return modelName;
}
console.log('from clientlib');
