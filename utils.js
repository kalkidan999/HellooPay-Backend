const addDays = require("date-fns/addDays")
const Utils = (module.exports = {
   formatPhone: async (phone) => {
    // remove any non-digits characters
    let digits = phone.replace(/\D/g, "");
    // Match leading +2519 or 2519 or 09 or 9 followed by exactly 8 digits
    let suffix = digits.substr(digits.length - 8, digits.length);
    let startsby09 = /09\d{8}/g;
    let startby2519 = /2519\d{8}/g;
     // If the string matched, return with prefix +2519
    if(startsby09.test(digits) || startby2519.test(digits)) {
       // Simply replaces leading +2519
        return `+2519${suffix}`;
    }else{
        throw new Error(
            JSON.stringify({
                status: "Invalid Phone",
                message: `The given phone number format is not valid: ${phone}`
            })
        )
    }
   },
   traceNumber: async ()=> {
        let prefix = process.env.BUISNESS_SHORT_NAME;
        let tracenumber = prefix + Date.now().toString();
        return tracenumber;
   },
   referenceid: async()=>{
        let prefix = process.env.BUISNESS_SHORT_NAME;
        let refId = prefix + Date.now().toString();
   },
   expires_in: async (days) => {
    return addDays(new Date(), days);
   }
});

