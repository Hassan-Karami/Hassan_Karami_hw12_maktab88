//name: Grayson Littel
//Username: grayson95@ethereal.email    (also works as a real inbound email address)
//Password:	5HHNFaANaCU8MAvv6y 

const nodemailer = require("nodemailer");
async function mailer(recieverEmail) {
  if (typeof recieverEmail != "string") {
    console.log("invalid input type!");
    return;
  } else {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(recieverEmail)) {
      console.log("invalid email format");
    } else {
      let testAccount = await nodemailer.createTestAccount();
      
      // nodemailer configuration
      let transporter = await nodemailer.createTransport({

        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      let info = await transporter.sendMail({
        from: testAccount.user, // sender address
        to: `${recieverEmail}`, // list of receivers
        subject: "Greeting", // Subject line
        text: "welcome to node js mailer service, it's a fake smtp service an no will send to real reciever", // plain text body
        html: `<h3><b>welcome to node js mailer service</b></h3>
                <p>it's a fake smtp service an no will send to real reciever</p>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
  }
}

mailer("h.19687.k@gmail.com").catch(console.error);
