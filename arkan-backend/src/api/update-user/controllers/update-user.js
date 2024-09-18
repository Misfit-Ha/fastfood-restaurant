"use strict";

module.exports = {
  updateMe: async (ctx, next) => {
    const { username, email, password, addresses, usedQuickRegister } =
      ctx.request.body;

    ctx.params.id = ctx.state.user.id;
    const oldUser = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id
    );
    console.log("updating this guy...");

    console.log(oldUser);
    const updatedUser = await strapi.entityService.update(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        data: {
          username: username,
          email: email,
          password: password,
          usedQuickRegister: usedQuickRegister,
          addresses: addresses,
        },
      }
    );
    console.log("the updated guy...");

    console.log(updatedUser);

    ctx.body = updatedUser;
  },
};
