module.exports = ({ env }) => ({
  // ...

  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("LIARA_ACCESS_KEY_ID"),
        region: "default",
        secretAccessKey: env("LIARA_ACCESS_SECRET"),
        endpoint: env("LIARA_ENDPOINT"),
        params: {
          Bucket: env("LIARA_BUCKET"),
        },
      },
    },
  },
  io: {
    enabled: true,
    config: {
      // This will listen for all supported events on the order content type
      contentTypes: ["api::order.order"],
      socket: {
        serverOptions: {
          cors: { origin: "*", methods: ["GET", "POST"] },
        },
      },
    },
  },
});
