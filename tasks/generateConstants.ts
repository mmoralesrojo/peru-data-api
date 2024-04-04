import { writeFileSync } from 'fs';
import { APIS_STATIC_VALUES } from '../src/constants/constants';

writeFileSync('./constants.json', JSON.stringify(APIS_STATIC_VALUES, null, 2), { flag: 'w' });