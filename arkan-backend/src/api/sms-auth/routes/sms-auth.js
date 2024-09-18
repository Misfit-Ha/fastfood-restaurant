module.exports = {
  routes: [
    {
      method: "POST",
      path: "/sms-auth",
      handler: "sms-auth.authenticate",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
