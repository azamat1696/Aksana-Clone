const eventEmitter = require('./eventEmitter');
const nodemailer = require("nodemailer");

module.exports =  () => {
  eventEmitter.on('send_email',  (emailData) => {
   if (!emailData) return false;
    async function main(){
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      // send mail with defined transport object
       await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        ...emailData
      }, (err, info) => {
        if (err) {
          //console.error('>>>>>',err);
        } else {
          console.info(info);
        }
      });
    }
    main().catch(console.error);

  });
}