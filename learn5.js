// Реализуй функцию promiseWithTimeout(promise, timeout),
// которая добавляет таймаут к любому промису. Если промис не выполнился за указанное время, должна возникнуть ошибка.

const promiseWithTimeout = (promise, timeout) => {
  return Promise.race([
    promise,
    new Promise((_, rej) => {
      setTimeout(() => rej(new Error("Время истекло")), timeout);
    }),
  ]);
};

const promise = new Promise((res) => {
  setTimeout(() => {
    res("Выполнено");
  }, 1500);
});

promiseWithTimeout(promise, 1000)
  .then((res) => {
    console.log("Результат: ", res);
  })
  .catch((err) => {
    console.log("Ошибка", err);
  });
