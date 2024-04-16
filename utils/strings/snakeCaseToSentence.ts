import capitalizeFirstLetter from './capitalizeFirstLetter';

/**
 * Converts a snake_case string to sentence.
 */
export const snakeCaseToSentence = (str: string): string => {
	const words = str.split('_');
	const capitalised_words = words.map(w => capitalise_right_words(w));
	let sentence = capitalised_words.join(' ');	
	'casing m2' == sentence.toLowerCase() ? sentence =  'casing: M2' : null;
	'casing 2 5inch' == sentence.toLowerCase() ? sentence = 'casing: 2.5inch' : null;
	'screen size' == sentence.toLowerCase() ? sentence = 'screen size (inch)' : null;
	return capitalizeFirstLetter(sentence);
};

const capitalise_right_words = (str: string): string | undefined=>{
	if (['cpu', 'gpu', 'hdd', 'ssd', 'ram', 'tlc', 'qlc', 'mlc', 'slc', 'oled', 'lcd'].includes(str.toLowerCase())){
		return str.toUpperCase();
	} else if (['cpus', 'gpus', 'rams'].includes(str.toLowerCase())){
		str = str.slice(0, -1);
		return str.toUpperCase() + 's';
	} else if (['nm', 'mm2', 'kg'].includes(str.toLowerCase())){
		return '('+ str +')';
	} else if (['gb'].includes(str.toLowerCase())){
		return '('+ str.toUpperCase() +')';
	} else return str;
};

export const typeToHumanType = (str: string): string => {
	const types: {[str: string]: string} = {
		string: 'Text',
		int: 'Whole number',
		float: 'Number',
		dictionnary: '',
		list: '',
		boolean: 'True or false'
	};
	return types[str];
};