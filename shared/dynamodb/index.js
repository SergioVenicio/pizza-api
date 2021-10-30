const AWS = require('aws-sdk');

class DynamoDB {
  constructor(table) {
    this._table = table;
    this._client = new AWS.DynamoDB.DocumentClient();
  }

  async putItem(item) {
    const params = {
      TableName: this._table,
      Item: item
    };
    return this._client.put(params).promise();
  }

  async scanItens() {
    const reponse = await this._client.scan({
      TableName: this._table
    }).promise();
    return reponse.Items.map(item => ({
      ...item
    }));
  }

  async getItem(key) {
    const reponse = await this._client.get({
      TableName: this._table,
      Key: key
    }).promise();

    return {
      ...reponse.Item
    };
  }

  async deleteItem(key) {
    return this._client.delete({
      TableName: this._table,
      Key: key
    }).promise();
  }

  async updateItem(key, newItem) {
    let expressionValues = [];
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};

    for (const [key, value] of Object.entries(newItem)) {
      const keyName = `#${key}`;
      const keyAttr = `:${key}`;
      expressionValues.push(`${keyName} = ${keyAttr}`);
      ExpressionAttributeNames[keyName] = key;
      ExpressionAttributeValues[keyAttr] = value;
    }

    return await this._client.update({
      TableName: this._table,
      Key: key,
      UpdateExpression: `set ${expressionValues.join(',')}`,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    }).promise();
  }
}

module.exports = DynamoDB;