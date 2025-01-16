// Создай декоратор, который кэширует результаты асинхронной функции.
// Если функция вызывается повторно с теми же аргументами, должен возвращаться кэшированный результат, а не выполняться повторный запрос.

const promise = async (promises) => {
  let results = [];

  for (let promise of promises) {
    try {
      const res = await Promise.resolve(promise);
      results.push(res);
    } catch (err) {
      throw err;
    }
  }

  return results;
};

const cachingDecorator = (func) => {
  let cache = new Map();

  return function (promises) {
    const key = promises.map((p) => p.toString());
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func(promises);
    cache.set(key, result);

    return result;
  };
};

const cachingPromise = cachingDecorator(promise);

const promises = [
  new Promise((res) => {
    res(1);
  }),
  new Promise((res) => {
    res(2);
  }),
  new Promise((res) => {
    res(3);
  }),
];

cachingPromise(promises)
  .then((res) => {
    console.log("Результат: ", res);
  })
  .catch((err) => {
    console.log("Ошибка: ", err);
  });
