console.log('i am from AnalyticsHandler js');
var digitalData = digitalData || {};
digitalData = {
    page: {
        pageName: window.document.location.pathname,
        siteSection: "",
        '<orientation>': (window.innerHeight < window.innerWidth) ? "Landscape" : "Portrait",
        '<app>': "LD-AEM",
        '<device_type>': window.matchMedia("(max-width: 767px)").matches ? "MOBILE" : "DESKTOP",
        '<login_status>': "Logged Out",
        '<break_point>': window.innerWidth + "x" + window.innerHeight,
        '<tag_id>': ""
    }

}

var tagCall = function (tagKey, tagContentTemplate) {
    fireTag(tagKey, tagContentTemplate);
}
var fireTagCall = function (tagKey, errorMsg) {
    var tagContentTemplate = jQuery.extend(true, {}, fireTagJson[tagKey]);
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

/*TODO : Need to move to seperate JSON*/
var fireTagJson = {
    "72.3": {
        "<tag_id>": "",
        "<container>": "", "<content_model>": getContentModel(), "<model_name>": getModelName(),
        "<model_year>": getModelYear(), "<zip_code>": getZipCode()
    },
    "70.1": {
        "<tag_id>": "",
        "<login_status>": getLoginStatus(),
        "<model_name>": getModelName(),
        "<model_year>": getModelYear(),
        "<owner_model_name>": getOwnerModelName(),
        "<owner_model_year>": getOwnerModelYear(),
        "<page>": getPage(),
        "<section>": getSection(),
        "<subsection>": getSubSection()
    },

};

function getSubSection() {
    return "";
}

function getOwnerModelName() {
    return "";
}
function getOwnerModelYear() {
    return "";
}

function getPage() {
    return "";
}

function getSection() {
    return "";
}
function getLoginStatus() {
    return "";
}

function getContentModel() {
    return "";
}

function getModelName() {
    return "";
}
function getModelYear() {
    return "";
}
function getZipCode() {
    return "";
}