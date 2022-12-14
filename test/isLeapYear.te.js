/*
Требование к функции
1) Получает год в виде целого числа
2) Возвращает true, если год высокосный(в году 366 дней, в феврале 29 дней)
и false -если год не высокосный
3) Выбросить ошибку если получает неправильный аргумент

Критерии высокосного года:

- делиться без остатка на 4 (2004, 2008 высокосные)
- не делиться без остатка на 100 ( 1900 не высокосный)
- может делиться без остатка на 400 ( 2000, 1600 высокосный)
- от 42 и дальше (счет идет от 42 года, тогда его выделили)

2008 - true
2003 - false
2000 - true
1900 - false

41 - ошибка с текстом "Year must start from 42 or more"
2008.4 - ошибка "Year must be integer"
() - ошибка "Year must be exist"
"2008" - ошибка "Year must be number"
null - ошибка "Year must be number"
true - ошибка "Year must be number"
false - ошибка "Year must be number"
()=>{} - ошибка "Year must be number"
{} - ошибка "Year must be number"
[] - ошибка "Year must be number"
*/

const isLeapYear = require("./isLeapYear");

describe("test isLeapYear function", () => {
  test("2008 - true", () => {
    const result = isLeapYear(2008);
    expect(result).toBe(true);
    // result === true
  });

  test("2003 - false", () => {
    expect(isLeapYear(2003)).toBe(false);
  });

  it("2000 - true", () => {
    expect(isLeapYear(2000)).toBe(true);
  });
  //it===test

  it("1900 - false", () => {
    expect(isLeapYear(1900)).toBe(false);
  });

  it("41 - error 'Year must start from 42 or more'", () => {
    expect(() => isLeapYear(41)).toThrow("Year must start from 42 or more");
    // ловит ошибку с точным совпадением; в isLeapYear записуем не результат функции а вызов функции
  });

  it("2008.4 - error 'Year must be integer'", () => {
    expect(() => isLeapYear(2002.4)).toThrow("Year must be integer");
  });

  it("() - error 'Year must be exist'", () => {
    expect(() => isLeapYear()).toThrow("Year must be exist");
  });

  it("'2008' - error 'Year must be number'", () => {
    expect(() => isLeapYear("2008")).toThrow("Year must be number");
  });

  it("null - error 'Year must be number'", () => {
    expect(() => isLeapYear(null)).toThrow("Year must be number");
  });

  it("true - error 'Year must be number'", () => {
    expect(() => isLeapYear(true)).toThrow("Year must be number");
  });

  it("false - error 'Year must be number'", () => {
    expect(() => isLeapYear(false)).toThrow("Year must be number");
  });

  it("()=>{} - error 'Year must be number'", () => {
    expect(() => isLeapYear(() => {})).toThrow("Year must be number");
  });

  it("{} - error 'Year must be number'", () => {
    expect(() => isLeapYear({})).toThrow("Year must be number");
  });

  it("[] - error 'Year must be number'", () => {
    expect(() => isLeapYear([])).toThrow("Year must be number");
  });
});
