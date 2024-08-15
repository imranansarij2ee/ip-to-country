const axios = require('axios');
const {normalizeData} = require("../helper/normalizeResponse");


// Vendors configuration
const vendors = {
    ipstack: {
        url: 'http://api.ipstack.com/',
        apiKey: 'API_KEY',
        rateLimit: 1000,
        requestCount: 0
    },
    ipapi: {
        url: 'https://api.ipapi.com/api',
        apiKey: 'API_KEY',
        rateLimit: 1000,
        requestCount: 0
    }
};

// Simple in-memory cache
const cache = {};

// Rate Limit Reset Interval
setInterval(() => {
    vendors.ipstack.requestCount = 0;
    vendors.ipinfo.requestCount = 0;
}, 3600000); // Reset every hour
// 3600000 milliseconds = 1 hour
// 60000 milliseconds = 1 minute

// Fetch the country name based on the IP address
async function getCountryByIp(ipAddress) {
    // Check cache
    if (cache[ipAddress]) {
        return cache[ipAddress];
    }

    let country = null;
    for (const [vendorName, vendor] of Object.entries(vendors)) {
        if (vendor.requestCount < vendor.rateLimit) {
            try {
                let response;
                if (vendorName === 'ipstack') {
                    response = await axios.get(`${vendor.url}${ipAddress}?access_key=${vendor.apiKey}`);
                } else if (vendorName === 'ipapi') {

                    response = await axios.get(`${vendor.url}${ipAddress}?access_key =${vendor.apiKey}`);
                }


                country = normalizeData(response.data, vendorName);
                if (country) {
                    cache[ipAddress] = country;
                    vendor.requestCount++;
                    break;
                }
            } catch (error) {
                console.error(`Error using ${vendorName}:`, error.message);
            }
        }
    }

    if (country) {
        return country;
    } else {
        throw new Error('All vendors are currently rate-limited or unavailable');
    }
}

module.exports = {
    getCountryByIp,
};