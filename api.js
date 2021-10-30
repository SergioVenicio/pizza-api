const Api = require('claudia-api-builder');
const api = new Api();

const OrderHandler = require('./handlers/orderHandler');
const getPizzas = require('./handlers/get-pizzas');

const orderHandler = new OrderHandler();

api.get('/', () => 'Welcome to pizza api');

api.get('/pizzas', () => getPizzas());

api.get('/pizzas/{id}', request => (
  getPizzas(request)
), {
  error: 404
});

api.get('/orders', async () => (
  await orderHandler.get()
), {
  error: 404
});

api.get('/orders/{id}', async (request) => (
  await orderHandler.get(request)
), {
  error: 404
});

api.delete('/orders/{id}', async (request) => (
  await orderHandler.delete(request)
), {
  success: 204,
  error: 404,
});

api.put('/orders/{id}', async (request) => (
  await orderHandler.update(request)
), {
  success: 201,
  error: 404
});

api.post('/orders', async request => (
  await orderHandler.create(request)
), {
  success: 201,
  error: 400
});

module.exports = api;