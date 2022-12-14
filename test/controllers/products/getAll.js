const product = [
  {
    id: 1,
    name: "phone",
    price: 16000,
  },
];

const getAll = async (req, res) => {
  res.json(product);
};

module.exports = getAll;
