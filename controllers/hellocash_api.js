const utils = require("../utils");
const fetch = require("node-fetch");

const hellocash_api = (module.exports = {
    authenticate: async function () {
      try {
        
        let options = {
          principal: process.env.LUCY_PRINCIPAL,
          credentials: process.env.LUCY_CREDENTIALS,
          system: process.env.LUCY_SYSTEM,
        };
        let url = process.env.HCAPI_URL + "/authenticate";
        let response = await fetch(url, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(options),
        });
        let data = await response.json();
        if (Object.keys(data).includes("token")) {
          return data.token;
        } else {
          throw new Error(
            JSON.stringify({
              status: "Could_not_connect_to_HELLOCASH",
              message: "There is no token!",
            })
          );
        }
      } catch (error) {
        console.log(error);
        throw new Error(
          JSON.stringify({
            status: "Error",
            message: error.message,
          })
        );
      }
    },
    create_invoice: async function(req, res, next) {
      try {
        let token = await hellocash_api.authenticate();
        let url = process.env.HCAPI_URL + "/invoices";
        let formatedPhone = await utils.formatPhone(req.body.mobile_phone);
        let traceNumber = await utils.traceNumber();
        let expires_in = await utils.expires_in(7);// expires in 7 days
        let options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          method: "POST",
          body: JSON.stringify({
            amount: parseFloat(req.body.amount),
            description: "",
            from: formatedPhone,
            currency: "ETB",
            tracenumber: traceNumber,
            notifyfrom: false,
            notifyto: true,
            expires: expires_in,
          })
        };
        let response = await fetch(url, options);
        let data = await response.json();
          res.status(response.status).json(data)
        console.log(data);
        next();
        return data;
      } catch (error) {
        console.log( JSON.stringify({
          status: "Error",
          message: error.message,
        }));
        return res.status(400).send(error.message);
      }
    }
});