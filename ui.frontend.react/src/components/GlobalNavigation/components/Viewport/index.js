import { ViewportWidths, COOKIESCONFIG } from './config/index';
import { Viewport } from '../Viewport';
import get from 'lodash.get';

/**
 * Determine the viewport based on screen width.
 *
 * Viewport Ranges (in pixels):
 * 320-640 - Mobile (comped at 375)
 * 641-1200 - Tablet (comped at 768)
 * 1201-1800 – Desktop (comped at 1440)
 * 1801 and larger - Extra-large (comped at 1801)
 */
export const getViewport = () => {
    const width = window.innerWidth;
    if (width <= ViewportWidths.Mobile.max) {
        return Viewport.MOBILE;
    } else if (width <= ViewportWidths.Tablet.max) {
        return Viewport.TABLET;
    } else if (width <= ViewportWidths.Desktop.max) {
        return Viewport.DESKTOP;
    } else {
        return Viewport.EXTRA_LARGE;
    }
}

/**
 * Set a browser-side cookie
 * @param name Name of the cookie
 * @param value Value of the cookie
 * @param exdays Number of days before the cookie expires
 */
export const setCookie = (name, value, exdays) => {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    const extString = ((exdays == null) ? '' : '; expires=' + exdate.toUTCString());
    const domainString = ';domain=.lexus.com;path=/';
    const cookieValue = value + extString + domainString;
    document.cookie = name + '=' + cookieValue;
}

/**
 * Get the value of a cookie from the browser.
 * @param name Name of the cookie
 */
export const getCookie = (name) => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    console.log('ca'+ca);
    for (const c of ca) {
        let cookie = c;
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

export const getVehicleFromCookiesLoggedout = () => {
    const ldViewedCars = getCookie(COOKIESCONFIG.SELECTED_VEHICLE_ARRAY);
    console.log('ldViewedCars'+ldViewedCars);
    if (ldViewedCars) {
        // Format of cookie: UrlEncoded: [{"interactions":1,"model":"CT200H","modelYear":"2016","timestamp":1558480833931}]
        const ldViewedCarsObj = JSON.parse(decodeURIComponent(ldViewedCars)).sort(
            (a, b) => {
                const c = !!a.timestamp ? new Date(parseInt(a.timestamp, 10)) : 0;
                const d = !!b.timestamp ? new Date(parseInt(b.timestamp, 10)) : 0;
                console.log('checksort' + c);
                return  d - c;
            }
        );

        const model = get(ldViewedCarsObj, '[0].model');
        const year = get(ldViewedCarsObj, '[0].modelYear');
        const vehicle = {
            description: '',
            isSelected: true,
            make: 'Lexus',
            model,
            modelCode: '',
            nickname: '',
            vehicleId: 0,
            vehicleOfInterestId: 0,
            vin: '',
            year,
            yearMakeModel: `${year} Lexus ${model}`,
        };
        setSelectedVehicle(vehicle);
        return vehicle;
    }
    return null;
};
export const setSelectedVehicle = (vehicle) => {
    console.log(vehicle);
    if (vehicle) {
        // This cookie persists the selected vehicle with the Ld-Web globalnav
        const vehicleArray = JSON.stringify([{
            interactions: 1,
            model: vehicle.model,
            modelYear: vehicle.year,
            timestamp: Date.now(),
        }]);
        setCookie(COOKIESCONFIG.SELECTED_VEHICLE_ARRAY, encodeURIComponent(vehicleArray), 10);
    } else {
        setCookie(COOKIESCONFIG.SELECTED_VEHICLE_ARRAY, '', 0);
    }
};