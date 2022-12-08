const Joi = require("joi");
const { Schema, model } = require("mongoose");
const codeRegExp = /^[0-9]{9}$/;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "name must exist"],
      //   minlength: 2,
      //   maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "price must exist"],
      min: 0.01,
    },
    active: {
      type: Boolean,
      default: true,
    },
    // basic, sale,stock
    status: {
      type: String,
      enum: ["basic", "sale", "stock"],
      // один из
      default: "basic",
    },
    code: {
      type: String,
      required: true,
      unique: true,
      match: codeRegExp,
      // регулярное выражение, строка начинаеться с числа от 0 до 9 их будет 9 штук в строке
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // связываем коллекции (чем связываем, какую коллекцию)
  },

  { versionKey: false, timestamps: true }
  // убирает версию + добавляет настройки когда был создан и обновлен
);
const joiSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
  active: Joi.bool(),
  status: Joi.string().valid("basic", "sale", "stock"),
  // один из
  code: Joi.string().pattern(codeRegExp),
});

const statusJoiSchema = Joi.object({
  status: Joi.string().valid("basic", "sale", "stock").required(),
});
const Product = model("product", productSchema);
module.exports = {
  Product,
  joiSchema,
  statusJoiSchema,
};
