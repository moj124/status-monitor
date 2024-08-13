import { config } from 'dotenv';

config();

export const POLLING_INTERVAL = parseInt(process.env.POLLING_INTERVAL!, 10);

const PRE_FETCH_URL_PART = 'https://data--';
const POST_FETCH_URL_PART = '.upscope.io/status?stats=1';

export const REGIONS = [
    'sa-east',
    'eu-west',
    'eu-central',
    'us-west',
    'ap-southeast'
]

const URL_ENDPOINTS = REGIONS.map((elem) => 
    PRE_FETCH_URL_PART +
    elem +
    POST_FETCH_URL_PART
);
export default URL_ENDPOINTS;