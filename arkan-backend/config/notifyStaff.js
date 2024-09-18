//config\notifyStaff.js
const webpush = require("web-push");

const publicVapidKey =
  "BFTFfKbfxTrf-z61TwriSPxMTfmUD28X2oqOQoAMIh31RDWMUyVPJLFSE-VYck8TNyzEbbrT8rycYDOvvT1Pv3w";
const privateVapidKey = "AnsH1i1Y1Irh_dQap7vtxoelpSk6nOOgOb7I_Ck1u7s";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

const notifyStaff = async (strapi, data) => {
  const payload = JSON.stringify({
    title: `Order: ${data.id} ${data.deliveryInformation.firstName} ${data.deliveryInformation.lastName}`,
    body: data.cartItems
      .map((item) => `${item.title}: ${item.quantity}`)
      .join(",\n "),
  });

  const subscribers = await strapi.entityService.findMany(
    "api::user-notification-key.user-notification-key",
    {
      filters: {
        subscription: {
          $notNull: true,
        },
      },
    }
  );
  subscribers.forEach((subscriber) => {
    setTimeout(() => {
      webpush
        .sendNotification(subscriber.subscription, payload)
        .then(() => console.log("notification sent"))
        .catch(console.error);
    }, 6000);
  });
};

module.exports = {
  webpush,
  notifyStaff,
};
