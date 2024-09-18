module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    console.log(event);
    console.log("before Create");

    event.params.data.priceWithDiscount =
      event.params.data.price -
      (event.params.data.price * event.params.data.discount) / 100; // 90,000 - 90,000 * 25 / 100

    console.log(event);
  },

  afterCreate(event) {
    const { result, params } = event;

    // do something to the result;
  },
};
