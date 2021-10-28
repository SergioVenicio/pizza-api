const Api = require('claudia-api-builder');
const api = new Api();

const getPizzas = require('./hanlders/get-pizzas');

api.get('/', () => 'Welcome to pizza api');

api.get('/pizzas', () => getPizzas());

api.get('/pizzas/{id}', request => {
  return getPizzas(request.pathParams.id);
}, {
  error: 404
});

module.exports = api;