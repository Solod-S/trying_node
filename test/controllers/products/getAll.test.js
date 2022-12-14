const express = require("express");
const { get } = require("mongoose");
const request = require("supertest");
const { getAll } = require("./index");
const app = express();

app.get("/api/products", getAll);

describe("getAll isLeapYear function", () => {
  beforeAll(() => {
    app.listen(3000);
  });
  //запуск сервера
  test("getAll return products array ", async () => {
    const response = await request(app).get("/api/products");
    console.log(response.status);
    expect(response.status).toBe(200);
    // проверяем статус 200
    expect(Array.isArray(response.body)).toBe(true);
    // проверяем что нам пришел массив
    const [product] = response.body;
    // бере первый элемент массива и проверяем его
    const { id, name, price } = product;
    expect(typeof id).toBe("number");
    expect(typeof name).toBe("string");
    expect(typeof price).toBe("number");
  });
  // afterAll(() => {
  //   app.close();
  // });
  //остановка сервера
});
