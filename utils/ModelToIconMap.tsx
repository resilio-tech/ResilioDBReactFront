import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBolt,
	faComputer,
	faDesktop,
	faFloppyDisk,
	faHardDrive,
	faLaptop,
	faMemory,
	faMicrochip,
	faMobileScreenButton,
	faRectangleList,
	faServer,
	faTelevision
} from '@fortawesome/free-solid-svg-icons';

export const ModelToIconMap: { [key: string]: JSX.Element } = {
	'server': <FontAwesomeIcon icon={faServer} size={'2x'}/>,
	'laptop': <FontAwesomeIcon icon={faLaptop} size={'2x'}/>,
	'switch': <></>,
	'storage system': <FontAwesomeIcon icon={faHardDrive} size={'2x'}/>,
	'computer monitor': <FontAwesomeIcon icon={faDesktop} size={'2x'}/>,
	'television': <FontAwesomeIcon icon={faTelevision} size={'2x'}/>,
	'desktop': <FontAwesomeIcon icon={faComputer} size={'2x'}/>,
	'smartphone': <FontAwesomeIcon icon={faMobileScreenButton} size={'2x'}/>,
	'virtual machine': <></>,
	'cpu': <FontAwesomeIcon icon={faMicrochip} size={'2x'}/>,
	'ram': <FontAwesomeIcon icon={faMemory} size={'2x'}/>,
	'ssd disk': <FontAwesomeIcon icon={faFloppyDisk} size={'2x'}/>,
	'caseless ssd disk': <FontAwesomeIcon icon={faFloppyDisk} size={'2x'}/>,
	'hdd disk': <FontAwesomeIcon icon={faFloppyDisk} size={'2x'}/>,
	'dedicated graphics card':  <></>,
	'integrated graphics card': <FontAwesomeIcon icon={faMicrochip} size={'2x'}/>,
	'rack server': <FontAwesomeIcon icon={faServer} size={'2x'}/>,
	'blade server': <FontAwesomeIcon icon={faRectangleList} size={'2x'}/>,
	'blade enclosure': <FontAwesomeIcon icon={faBolt} size={'2x'}/>,
	'tower server': <></>,
};

export default ModelToIconMap;