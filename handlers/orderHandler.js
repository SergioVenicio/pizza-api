const uuidv4 = require('uuid').v4;

const DynamoDB = require('../shared/dynamodb');

class OrderHandler {
  constructor() {
    this.__dyClient = new DynamoDB('TB_PIZZAS_ORDERS');
  }

  async create(request) {
    const { body } = request;
    if(!body || !body.pizza  || !body.address) {
      throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');
    }
  
    const order = {
      orderId: uuidv4(),
      pizza: body.pizza,
      address: body.address,
      orderStatus: 'pending'
    };
    await this.__dyClient.putItem(order);
    return order;
  }

  async get(request) {
    const { id } = request.pathParams;
    if (!id) {
      return this.__dyClient.scanItens();
    }
    return this.__dyClient.getItem({orderId: id});
  }

  async delete(request) {
    const { id } = request.pathParams;
    return this.__dyClient.deleteItem({orderId: id});
  }

  async update(request) {
    const key = {
      orderId: request.pathParams.id
    };
    return this.__dyClient.updateItem(key, request.body);
  }
}

module.exports = OrderHandler;