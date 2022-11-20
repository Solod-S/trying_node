function getCurrentDate() {
  const date = new Date(Date.now());

  return date.toString();
}

function getGlobal() {
  return global.test;
}

module.exports = {
  getCurrentDate,
  getGlobal,
};
