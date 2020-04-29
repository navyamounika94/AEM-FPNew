console.log('i am from AnalyticsHandler js');

var tagCall = function (tagKey, tagContentTemplate) {
    fireTag(tagKey, tagContentTemplate);
}
var fireTagCall = function (tagKey, errorMsg) {
    var tagContentTemplate = jQuery.extend(true, {}, '');
    if (fireTagParam.length != 0) {
        $.extend(true, tagContentTemplate, fireTagParam);
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
        void 0 !== $(this).attr("data-firetag-param") && (fireTagParam = jQuery.parseJSON($(this).attr("data-firetag-param")));
        var multipleTagIdIndex = tagId.indexOf(",");
        if (multipleTagIdIndex > -1) {
            var firstTagId = tagId.substring(0, multipleTagIdIndex), secondTagId = tagId.substring(multipleTagIdIndex + 1);
            TOAnalytics.fire(firstTagId), TOAnalytics.fire(secondTagId, "");
        } else TOAnalytics.fire(tagId);
    }
})
