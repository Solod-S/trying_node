const nodeMailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodeMailerConfig = {
  host: "smtp.meta.ua",
  // адресс почтового сервера
  port: 465,
  // стандартные 25, 465 и 2255 (25 и 2255 обычно не защищеные и не нужно шифровать письма перед пересылкой)
  secure: true,
  // 465 порт требует шифрования
  auth: {
    user: "bogdan.lyamzin.d@meta.ua",
    pass: META_PASSWORD,
  },
  // объект авторизации при подключении
};

// создаем объект настроек

const transporter = nodeMailer.createTransport(nodeMailerConfig);

// создаем транспортер

const mail = {
  to: "solod098@gmail.com",
  from: "bogdan.lyamzin.d@meta.ua",
  // нужно верефицировать свой почтовый ящик
  subject: "Новая заявка на сайте",
  html: "<p>Ваша заявка принята<p/>",
};

// создаем письмо

transporter
  .sendMail(mail)
  .then(() =>
    console
      .log("Email send success")
      .catch((error) => console.log(error.message))
  );
