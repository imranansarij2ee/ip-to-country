### Project Description

This project provides a simple API service that allows users to retrieve country information based on an IP address. The service queries multiple IP geolocation vendors to obtain and normalize detailed geographic and network data related to the given IP address. The API enforces rate limiting to manage request loads and ensure fair usage.

### Features

- **IP-to-Country Lookup**: Provides detailed information about the country associated with a given IP address.
- **Rate Limiting**: Limits the number of requests to each vendor to 20 requests per minute, preventing abuse and ensuring service stability.
- **Data Normalization**: Normalizes responses from various vendors into a consistent format for ease of use.

### API Endpoints

#### `GET /ip-to-country`

**Description**: Retrieves country and geographic information based on the provided IP address.

**Query Parameters**:
- `ip` (required): The IP address for which country information is requested.

**Responses**:
- **200 OK**: Returns a JSON object containing the normalized country information.
  ```json
  {
    "country": {
      "ip": "192.168.1.1",
      "continent_code": "NA",
      "continent_name": "North America",
      "country_code": "US",
      "country_name": "United States",
      "region_code": "CA",
      "region_name": "California",
      "city": "Los Angeles",
      "zip": "90001",
      "latitude": 34.0522,
      "longitude": -118.2437,
      "time_zone": "America/Los_Angeles",
      "current_time": "2024-08-14T12:34:56",
      "is_daylight_saving": true,
      "connection": {
        "asn": "AS12345",
        "isp": "ISPName"
      },
      "security": {
        "is_proxy": false,
        "threat_level": "low"
      }
    }
  }
  ```
- **400 Bad Request**: IP address is missing from the query parameters.
  ```json
  {
    "error": "IP address is required"
  }
  ```
- **503 Service Unavailable**: Unable to retrieve information from vendors, possibly due to rate limiting or other issues.
  ```json
  {
    "error": "All vendors are currently rate-limited or unavailable"
  }
  ```

### Rate Limiting

- **Per Vendor**: Each vendor is limited to 20 requests per minute.
- **Reset Interval**: The request count is reset every minute.

### Data Normalization

The `normalizeData` function consolidates data from various IP geolocation vendors into a unified format, including fields such as:
- IP address
- Continent and country codes/names
- Region and city details
- Geographic coordinates
- Time zone information
- Network connection details
- Security and proxy information

### Dependencies

- `express`: Web framework for building the API.
- `axios`: HTTP client for making requests to IP geolocation vendors.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ip-to-country-api.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ip-to-country-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Usage

Once the server is running, you can make a GET request to `/ip-to-country` with the `ip` query parameter to get country information.

### Example

```bash
curl "http://localhost:3000/ip-to-country?ip=8.8.8.8"
```

This will return the country information for the IP address `8.8.8.8`.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
