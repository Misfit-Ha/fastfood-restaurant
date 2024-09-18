// src/api/push-notification/controllers/push-subscribe.js
"use strict";

const webpush = require("web-push");

const publicVapidKey =
  "BFTFfKbfxTrf-z61TwriSPxMTfmUD28X2oqOQoAMIh31RDWMUyVPJLFSE-VYck8TNyzEbbrT8rycYDOvvT1Pv3w";
const privateVapidKey = "AnsH1i1Y1Irh_dQap7vtxoelpSk6nOOgOb7I_Ck1u7s";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

//TODO if searching object didnt work seperate

module.exports = {
  subscribe: async (ctx) => {
    const subscription = ctx.request.body;

    //send a test notification
    const payload = JSON.stringify({
      title: "Subscribed!",
      body: "Successfully subscribed",
    });

    webpush
      .sendNotification(subscription, payload)
      .catch((err) => console.error(err));

    //store subscription keys
    const existingSubscription = await strapi.db
      .query("api::user-notification-key.user-notification-key")
      .findOne({ where: { endpoint: subscription.endpoint } });

    if (!existingSubscription) {
      await strapi.entityService.create(
        "api::user-notification-key.user-notification-key",
        {
          data: {
            subscription: subscription,
            endpoint: subscription.endpoint,
            publishedAt: new Date().getTime(),
          },
        }
      );
    }

    ctx.send({});
  },
};
