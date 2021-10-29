const Api = require('claudia-api-builder');
const api = new Api();

const getPizzas = require('./handlers/get-pizzas');
const createOrder = require('./handlers/create-order');

api.get('/', () => 'Welcome to pizza api');

api.get('/pizzas', () => getPizzas());

api.get('/pizzas/{id}', request => {
  return getPizzas(request.pathParams.id);
}, {
  error: 404
});

api.post('/orders', async request => {
  return await createOrder(request.body);
}, {
  success: 201,
  error: 400
});

module.exports = api;