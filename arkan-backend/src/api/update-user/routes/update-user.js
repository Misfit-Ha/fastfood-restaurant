module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/update-user",
      handler: "update-user.updateMe",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
