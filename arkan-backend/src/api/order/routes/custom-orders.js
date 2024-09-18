module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "GET",
      path: "/orders/me",
      handler: "order.findMyOrders",
    },

    {
      method: "GET",
      path: "/orders/count",
      handler: "order.count",
    },
  ],
};
