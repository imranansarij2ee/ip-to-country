// Normalize the response data to a common structure
function normalizeData(data, vendorName) {
    return {
        ip: data.ip,
        continent_code: data.continent_code,
        continent_name: data.continent_name,
        country_code: data.country_code,
        country_name: data.country_name,
        region_code: data.region_code,
        region_name: data.region_name,
        city: data.city,
        zip: data.zip,
        latitude: data.latitude,
        longitude: data.longitude,
        time_zone: data.time_zone?.id,
        current_time: data.time_zone?.current_time,
        is_daylight_saving: data.time_zone?.is_daylight_saving,
        connection: {
            asn: data.connection?.asn,
            isp: data.connection?.isp,
        },
        security: {
            is_proxy: data.security?.is_proxy,
            threat_level: data.security?.threat_level
        }
    };
}

module.exports = {
    normalizeData,
};