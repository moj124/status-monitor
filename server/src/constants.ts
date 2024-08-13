import { config } from 'dotenv';

config();

export const POLLING_INTERVAL = parseInt(process.env.POLLING_INTERVAL!, 10);

export const REGIONS = [
    'sa-east',
    'eu-west',
    'eu-central',
    'us-west',
    'ap-southeast'
]

const URL_ENDPOINTS = REGIONS.map((elem) => 
    process.env.PRE_FETCH_URL_PART +
    elem +
    process.env.POST_FETCH_URL_PART
);
export default URL_ENDPOINTS;