const DynamoDB = require('../shared/dynamodb');
const HttpRequest = require('../shared/httpRequest');

const deliveryAPI = process.env.DELIVERY_API_URL;
const webhookUrl = process.env.WEBHOOK_URL;
const headers = {
  "Authorization": "aunt-marias-pizzeria-1234567890", 
  "Content-type": "application/json"
};

class OrderHandler {
  constructor() {
    this.__dyClient = new DynamoDB('TB_PIZZAS_ORDERS');
    this.__httpClient = new HttpRequest(deliveryAPI);
  }

  async create(request) {
    const { body } = request;
    if(!body || !body.pizza  || !body.address) {
      throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');
    }

    const requestBody = {
      webhookUrl,
      pickupTime: '15.34pm',
      pickupAddress: 'Aunt Maria Pizzeria',
      deliveryAddress: body.address,
    };
    const apiResponse = await this.__httpClient.post(
      '/delivery',
      requestBody,
      headers
    );
    const order = {
      orderId: apiResponse.deliveryId,
      pizza: body.pizza,
      address: body.address,
      orderStatus: 'pending'
    };
    await this.__dyClient.putItem(order);
    return order;
  }

  async get(request) {
    if (!request || !request.pathParams.id) {
      return this.__dyClient.scanItens();
    }
    const { id } = request.pathParams;
    return this.__dyClient.getItem({orderId: id});
  }

  async delete(request) {
    const { id } = request.pathParams;
    await  this.__httpClient.delete(`/delivery/${id}`, headers);
    return this.__dyClient.deleteItem({orderId: id});
  }

  async update(request) {
    const key = {
      orderId: request.pathParams.id
    };
    return this.__dyClient.updateItem(key, request.body);
  }

  async updateDeliveryStatus(request) {
    const key = {
      orderId: request.pathParams.deliveryId
    };
    return this.__dyClient.updateItem(key, {
      deliveryStauts: request.status
    });
  }
}

module.exports = OrderHandler;