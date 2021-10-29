const AWS = require('aws-sdk');

class DynamoDB {
  constructor() {
    this._client = new AWS.DynamoDB.DocumentClient();
  }

  async putItem(table, item) {
    const params = {
      TableName: table,
      Item: item
    };
    return this._client.put(params).promise();
  }
}

module.exports = DynamoDB;