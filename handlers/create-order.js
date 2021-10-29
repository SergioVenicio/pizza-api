const uuidv4 = require('uuid').v4;
const DynamoDB = require('../shared/dynamodb');

const dynamodbClient = new DynamoDB();

const DY_TABLE = 'TB_PIZZAS_ORDERS';


const createOrder = async request => {
  if(!request || !request.pizza  || !request.address) {
    throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');
  }

  const order = {
    orderId: uuidv4(),
    pizza: request.pizza,
    address: request.address,
    orderStatus: 'pending'
  };
  await dynamodbClient.putItem(
    DY_TABLE,
    order
  );
  return order;
};

module.exports = createOrder;