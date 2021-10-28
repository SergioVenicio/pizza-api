const pizzas = require('../data/pizzas.json');

const getPizzas = (id) => {
  if (!id) {
    return pizzas;
  }

  const pizza = pizzas.find(pizza => {
    return String(pizza.id) === String(id);
  });

  if (pizza) {
    return pizza;
  }

  throw new Error('The pizza you requested was not found!');
}

module.exports = getPizzas;