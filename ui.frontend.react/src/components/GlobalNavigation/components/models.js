/**import { Vehicle } from './vehicle';

 * Trims model strings given by DCS, returning the modelTrim used by Sitecore and Lexus.
 *
 * Example:
 *  IS360C  ->  IS
 *  CT200H  ->  CTh
 *  RX350L  ->  RX
 *  RX400HL  ->  RXh
 *  RX400H  ->  RXh
 *  RC200T  ->  RC
 *  GS F  ->  GSF
 *
 */
export const modelTrim = (model) => {
    const tmp = model
        .replace(/\s/, '')
        .toUpperCase()
        ;
    return tmp
        .replace(/\d+/g, '') // Remove all numbers
        .replace(/\s/, ''); // Remove all whitespace
};

/**
 * Converts model strings into the proper Lexus formats
 */
export const modelFormat = (model) => {
    const tmp = model
        .toUpperCase()
        ;

    return tmp
        .replace(/\ ?(\d)/, ' $1') // Add a space before all numbers
        .replace(/(.*\d)H(.*)/, '$1h$2') // Any 'h' after the numbers become lowercase
        .replace(/(.*\d)T(.*)/, '$1t$2') // Any 'T' after the numbers become lowercase
        .replace(/(.*\d.*)C/, '$1 C') // Add a space before all 'C's that come after the number
        .replace(/(.*\d.*[^h])L/, '$1 L') // Add a space before all 'L's that come after the number (except in case of 'hL')
        .replace(/^([A-Z][A-Z])F/, '$1 F'); // Convert any 'XXF' to 'XX F'
};

/**
 * Convert all model strings to a consistent format, no matter the input. Used in model string comparisons
 *
 * Exmple: 'CT 200h' -> "CT200H", 'CT 200H' -> "CT200H"
 * @param model
 */
export const modelStrip = (model) => {
    return model.replace(/\s/g, '').toUpperCase();
};

/**
 * Compare modelStrings using the modelStrip function
 *
 * @param m1
 * @param m2
 */
export const modelEquals = (m1, m2) => {
    return (modelStrip(m1) === modelStrip(m2));
};

/**
 * Compare 2 vehicle objects, returning true if they have the same model and year
 */
export const sameModelYear = (v1, v2) => {
    return (modelEquals(v1.model, v2.model) && v1.year.trim() === v2.year.trim());
};