// Напиши функцию, которая принимает массив промисов и максимальное количество параллельных выполнений.
// Промисы должны выполняться в порядке очереди, но не более указанного количества одновременно.

const promiseWithLimit = async (promises, limit) => {
  const results = [];
  const tracking = [];

  for (const promise of promises) {
    const p = Promise.resolve(promise).then((res) => {
      results.push(res);
      tracking.splice(tracking.indexOf(p), 1);
    });

    tracking.push(p);

    if (tracking.length >= limit) {
      await Promise.race(tracking);
    }
  }

  return Promise.all(results);
};

const promises = [
  new Promise((res) => res(1)),
  new Promise((res) => res(2)),
  new Promise((res) => res(3)),
  new Promise((res) => res(4)),
  new Promise((res) => res(5)),
];
const limit = 3;

promiseWithLimit(promises, limit).then((res) =>
  console.log("Результат: ", res)
);
