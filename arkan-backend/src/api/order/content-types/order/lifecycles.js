const { v4: uuidv4 } = require("uuid");
const { notifyStaff } = require("../../../../../config/notifyStaff");
const { sendDiscordMessage, sendSMS } = require("../../../../../config/data");

module.exports = {
  /**
   *
   * BeforeCreate
   *
   */
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    //makes a uuid for this order
    if (!event.params.data.uuid) {
      event.params.data.uuid = uuidv4();
    }
  },

  /**
   *
   * afterCreate
   *
   */
  async afterCreate(event) {
    const { result, params } = event;

    notifyStaff(strapi, event.result);
    sendDiscordMessage(`New Order ${event.result.id}`);
    sendSMS("09399820357", "o3dylb8dxdy156n", [{ id: event.result.id }]); //TODO change to arman's number later
  },

  /**
   *
   * afterUpdate
   *
   */

  async afterUpdate(event) {
    const { result, params } = event;
    strapi.log.info(`[io] Order ${event.result.id} Updated`);

    sendDiscordMessage(`order ${event.result.id} was updated`);

    if (event.result.state === "confirmed") {
      //text says your order is being proccessed
      sendSMS(event.result.deliveryInformation.phonenumber, "bqiqirf6dlu5fjs");
    } else if (event.result.state === "ready") {
      //text says order was handed to delivery
      sendSMS(event.result.deliveryInformation.phonenumber, "zkhhuoze707gshu");
    }
  },
};
