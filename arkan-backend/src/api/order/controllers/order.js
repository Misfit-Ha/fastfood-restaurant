"use strict";

/**
 * order controller
 */

const { sanitize } = require("@strapi/utils");
const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  //http://localhost:3000/api/user does the exact same thing at least you learned how to write custom routes :)
  async findMyOrders(ctx) {
    console.log(ctx.state.user.id);
    if (!ctx.state.user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    let data = await strapi.entityService.findMany("api::order.order", {
      filters: {
        $and: [
          {
            "user.id": ctx.state.user.id,
          },
          {
            user: { $not: null },
          },
        ],
      },
      sort: { createdAt: "DESC" },
      populate: { user: true },
    });
    const user = data[0].user;
    data = data.map((entry) => {
      const { user, ...entryWithoutUser } = entry;
      return entryWithoutUser;
    });
    data = { user, orders: data };

    if (!data) {
      return ctx.notFound();
    }
    return data;
  },

  async count(ctx) {
    const { state } = ctx.query;
    return strapi.entityService.count("api::order.order", {
      filters: {
        state: state,
      },
    });
  },
}));
