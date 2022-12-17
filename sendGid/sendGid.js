const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// настройка sendgrid

const mail = {
  to: "solod098@gmail.com",
  from: "solik098@gmail.com",
  // нужно верефицировать свой почтовый ящик
  subject: "Новая заявка на сайте",
  html: "<p>Ваша заявка принята<p/>",
};

sgMail
  .send(mail)
  .then(() =>
    console
      .log("Email send success")
      .catch((error) => console.log(error.message))
  );
