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


console.log('from clientlib');
