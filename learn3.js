// Создай функцию retry(fn, attempts), которая принимает асинхронную функцию и количество попыток.
// Функция должна пытаться выполнить fn указанное количество раз, если происходит ошибка.

async function retry(fn, attempts) {
  let lastError = null;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const result = await fn();
      return result;
    } catch (err) {
      lastError = err;
      console.log(`Попытка подключение ${attempt}`, lastError);
      if (attempt === attempts) {
        throw new Error("Все попытки неудачны");
      }
    }
  }
}

const random = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (false) {
        res("Успешное выполнение!");
      } else {
        rej(new Error("Произошла ошибка!"));
      }
    }, 1000);
  });
};

retry(random, 5)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
