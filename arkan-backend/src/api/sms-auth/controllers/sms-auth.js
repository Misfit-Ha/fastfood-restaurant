//i hate myself for doing this but im storing phonenumber in the email field so this shit happens
"use strict";
const { sanitize } = require("@strapi/utils");
const cookie = require("cookie");
const { sendSMS } = require("../../../../config/data");

/**
 * A set of functions called "actions" for `sms-auth`
 */

let tempCodes = {};
let verificationResult = {};
const baseUrl = "http://api.payamak-panel.com/post/Send.asmx/SendSimpleSMS";
const username = process.env.SMS_USER;
const password = process.env.SMS_PASSWORD;
const fromNumber = "50004001820357";
const isFlash = false;
const smsRequestOptions = {
  method: "GET",
  redirect: "follow",
};

module.exports = {
  authenticate: async (ctx, next) => {
    try {
      const { emailPhone, code } = ctx.request.body;
      if (!emailPhone) {
        ctx.response.status = 400;
        ctx.response.body = {
          message:
            "You can't perform this operation without providing an email or phone number.",
        };

        return;
      }
      console.log("user sent this code: " + code);

      const userExists = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({ where: { email: emailPhone } });

      if (!code) {
        const newCode = Math.floor(1000 + Math.random() * 9000).toString();

        tempCodes[emailPhone] = {
          code: newCode,
        };

        setTimeout(() => {
          delete tempCodes[emailPhone];
        }, 2 * 60 * 1000);

        sendSMS(emailPhone.split("@")[0], "ubghvjcshymisn1", [
          { code: newCode },
        ]);

        ctx.body = { message: "Code sent" };
      } else {
        const tempCode = tempCodes[emailPhone];

        if (tempCode && tempCode.code === code) {
          delete tempCodes[emailPhone];
          verificationResult = { message: "Code verified" };
        } else {
          verificationResult = { message: "Invalid or expired code" };
        }

        if (userExists && verificationResult.message === "Code verified") {
          const user = await strapi.db
            .query("plugin::users-permissions.user")
            .findOne({ where: { email: emailPhone } });
          const contentType = strapi.contentType(
            "plugin::users-permissions.user"
          );
          const sanitizedUser = await sanitize.contentAPI.output(
            user,
            contentType,
            {
              auth: ctx.state.auth,
            }
          );

          const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
            id: user.id,
          });

          ctx.res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: "strict",
              path: "/",
            })
          );

          ctx.body = {
            jwt,
            user: sanitizedUser,
          };
        } else {
          ctx.body = verificationResult;
        }
      }
    } catch (err) {
      ctx.body = err;
    }
  },
};
