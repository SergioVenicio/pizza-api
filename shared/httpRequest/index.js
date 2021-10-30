const rp = require('minimal-request-promise');

class HttpRequest {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async post(endpoint, body, headers={}) {
    console.log(`HttpRequest::POST to ${endpoint}`);
    const rawResponse = await rp.post(`${this.baseURL}/${endpoint}`, {
      headers,
      body: JSON.stringify(body)
    });
    const response = JSON.parse(rawResponse.body);
    console.log(`RESPONSE: ${JSON.stringify(response)}`);
    return response;
  }

  async delete(endpoint, headers={}) {
    console.log(`HttpRequest::POST to ${endpoint}`);
    const rawResponse = await rp.delete(`${this.baseURL}/${endpoint}`, {
      headers
    });
    const response = JSON.parse(rawResponse.body);
    console.log(`RESPONSE: ${JSON.stringify(response)}`);
    return response;
  }

}

module.exports = HttpRequest;