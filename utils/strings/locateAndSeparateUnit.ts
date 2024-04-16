const powerOfTwo = '\u00B2';

const Units: Record<string, string> = {
	'nm': 'nm',
	'um': 'um',
	'mm': 'mm',
	'cm': 'cm',
	'm': 'm',
	'km': 'km',
	'inch': 'inch',
	'ft': 'ft',
	'gb': 'gb',
	'nm2': `nm${powerOfTwo}`,
	'um2': `um${powerOfTwo}`,
	'mm2': `mm${powerOfTwo}`,
	'cm2': `cm${powerOfTwo}`,
	'm2': `m${powerOfTwo}`,
	'km2': `km${powerOfTwo}`,
};

/**
 * Locates and separates the unit from the value.
 * @example
 * locateAndSeparateUnit('die surface mm2') // ['die surface', 'mm²']
 * locateAndSeparateUnit('Litho nm') // ['litho', 'nm']
 * locateAndSeparateUnit('Litho') // ['litho', '']
 * locateAndSeparateUnit('Litho 1') // ['litho 1', '']
 * locateAndSeparateUnit('Litho 1nm') // ['litho 1nm', '']
 *
 * @param str
 */
export const locateAndSeparateUnit = (str: string): [string, string] => {
	// get last word of the string
	const unit = str.split(' ').pop() || '';
	// check if it's a known unit
	if (Units[unit]) {
		// if it is, remove it from the string
		str = str.replace(unit, '').trim();
		return [str, Units[unit]];
	}
	return [str, ''];
};