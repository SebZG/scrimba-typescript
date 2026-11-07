type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: Status;
};

type Status = "ordered" | "completed" | "cancelled";

let chashInRegister = 100;
let nextOrderId = 0;
let nextPizzaId = 0;
const orderQueue: Order[] = [];

const menu: Pizza[] = [
  { id: ++nextPizzaId, name: "Margherita", price: 8 },
  { id: ++nextPizzaId, name: "Pepperoni", price: 10 },
  { id: ++nextPizzaId, name: "Margherita", price: 10 },
  { id: ++nextPizzaId, name: "Margherita", price: 9 },
];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = {
    id: ++nextPizzaId,
    ...pizzaObj,
  };
  menu.push(newPizza);
  return newPizza;
}

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  if (selectedPizza === undefined) {
    console.error(`"${pizzaName}" is not in the menu.`);
    return;
  }
  chashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: ++nextOrderId,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((orderObj) => orderObj.id === orderId);
  if (order === undefined) {
    console.error(`id ${orderId} was not found.`);
    return;
  }
  order.status = "completed";
  return order;
}

export function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === "string") {
    return menu.find((pizza) => pizza.name.toLowerCase() === identifier.toLowerCase());
  } else if (typeof identifier === "number") {
    return menu.find((pizza) => pizza.id === identifier);
  } else {
    throw new Error("Parameter `identifier` must be of type string or number.");
  }
}

addNewPizza({ name: "Hawaiian", price: 11 });
addNewPizza({ name: "Veggie", price: 9 });
addNewPizza({ name: "BBQ Chicken", price: 12 });

placeOrder("Veggie");
completeOrder(1);

console.log("Menu: ", menu);
console.log("Cash in Register: ", chashInRegister);
console.log("Order Queue: ", orderQueue);
