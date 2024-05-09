const input = [
  {
    price: 20,
    quantity: 25,
    option: "yes",
  },
  {
    price: 12,
    quantity: 25,
    option: "yes",
  },
  {
    price: 20,
    quantity: 25,
    option: "yes",
  },
  {
    price: 15,
    quantity: 25,
    option: "yes",
  },
  {
    price: 15,
    quantity: 5,
    option: "yes",
  },
];

const output = Object.values(
  input.reduce((acc, curr) => {
    const key = `${curr.price}-${curr.option}`;
    if (acc[key]) {
      acc[key] = { ...acc[key], quantity: acc[key].quantity + curr.quantity };
    } else {
      acc[key] = curr;
    }
    return acc;
  }, {})
);
