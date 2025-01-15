// Напиши функцию, которая принимает массив промисов и выполняет их последовательно, но только если предыдущий промис вернул true.
// Если промис вернул false, последующие промисы не должны выполняться

const promise = async (promises) => {
  let results = [];

  for (let promise of promises) {
    try {
      const res = await Promise.resolve(promise);
      if (res === false) break;
      results.push(res);
    } catch (err) {
      throw err;
    }
  }

  return results;
};

const promises = [
  new Promise((res) => {
    res(1);
  }),
  new Promise((res) => {
    res(false);
  }),
  new Promise((res) => {
    res(2);
  }),
];

promise(promises)
  .then((res) => {
    console.log("Результат: ", res);
  })
  .catch((err) => {
    console.log("Ошибка: ", err);
  });
