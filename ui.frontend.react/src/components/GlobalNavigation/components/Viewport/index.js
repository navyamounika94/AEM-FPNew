import { ViewportWidths } from './config/index';
import { Viewport } from '../Viewport';

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