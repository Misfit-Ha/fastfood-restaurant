//src\api\webpush\routes\push-subscribe.js
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/push-subscribe",
      handler: "push-subscribe.subscribe",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
