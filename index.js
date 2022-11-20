const Calc = require("calc-js").Calc;
// подключеная библиотека
const path = require("path");
// модуль создания абсолютного пути
const fs = require("fs");
// модуль файловой системы
const fsP = require("fs").promises;
// модуль файловой системы + промисы
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////
// const { getCurrentDate, getGlobal } = require("./dateUtils");
// // импорт в nodeJs (не екмоскриптовый import/export)
// global.test = `Test global`;
// //доступно глобально (не рекомендуют использовать)
// console.log(`Hello World`);
// console.log(`getCurrentDate ${getCurrentDate()}`);
// console.log(`global.test`, getGlobal());
// // console.log(`pocess.env`, process.env);
// //настройки на разных уровнях
// // console.log(`pocess.argv`, process.argv);
// // с какими аргументами было запущено приложение

// console.log(__dirname);
// // глобальная переменная покажет путь в директорию
// console.log(__filename);
// // глобальная переменная покажет путь к файлу
// process.exit();
// // если нужно прям сейчас нужно завершить выполнение приложения (дальше выполнение не пойдет)
// console.log(`до process.exit()`);
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////
console.log(process.argv);
const [, , a, b] = process.argv;
// путь к ноде, путь к файлу, 1, 2 ==> node,index, 1,2
// const a = process.argv[2];
// const b = process.argv[3];
// console.log(new Calc(parseFloat(a)).sum(parseFloat(b)).finish());

console.log(`path`, path.resolve("package.json"));

fs.readFile(path.resolve("./data.txt"), "utf8", (error, data) => {
  if (error) {
    console.error(error);
  }
  console.log(data);
});
// ерор фЁрст кол бек
console.log(`fs.readFile читает файл асинхроно`);

const syncFs = fs.readFileSync(path.resolve("./data.txt"), "utf8");
// не используем так как блокирует ивентЛуп
console.log(`syncFs`, syncFs);

fsP
  .readFile(path.resolve("./data.txt"), "utf8")
  .then((data) => console.log(data))
  .catch((error) => console.error);
// асинхроная операция с файловой системой через промисы

(async () => {
  try {
    const data = await fsP.readFile(path.resolve("./data.txt"), "utf8");
    // console.log(`async`, data); ЧИТАЕМ ДАТУ
    const jsonP = await fsP.readFile(path.resolve("./package.json"), "utf8");
    console.log(JSON.parse(jsonP).dependencies);
    //если мне нужно прочитать определенную часть из файла
    await fsP.unlink("./data1.txt");
    await fsP.unlink("./tmp/renamed.js");
    // удаляем
    const newContent = `${data} ----------`;
    // то что хотим записать в новый файл
    await fsP.writeFile(path.resolve("./data1.txt"), newContent, "utf8");
    await fsP.writeFile(path.resolve("./test.js"), "test text", "utf8");
    // создаем новый файл (можно перезаписать если укажем путь существующего файла) + параметры
    await fsP.rename("./test.js", "renamed.js");
    // для изменения имени
    await fsP.rename("./renamed.js", "./tmp/renamed.js");
    // для перемещения
    await fsP.appendFile("./append.txt", " newAppend");
    // дозапись чего либо в файл
    console.log(`readdir`, await fsP.readdir("./tmp"));
    // смотрим содержимое папки
  } catch (error) {
    console.log(error);
  }
})();
// асинхрон евейт синтаксис
