// Создай функцию светофора, которая последовательно выводит "красный" через 3 секунды, "желтый" через 1 секунду, "зеленый" через 2 секунды.
// Нужно использовать цепочку промисов.

const trafficLights = () => {
  const promise = new Promise((res) => {
    setTimeout(() => {
      console.log("красный");
      res();
    }, 3000);
  });

  promise
    .then(() => {
      return new Promise((res) => {
        setTimeout(() => {
          console.log("желтый");
          res();
        }, 1000);
      });
    })
    .then(() => {
      return new Promise((res) => {
        setTimeout(() => {
          console.log("зеленый");
          res();
        }, 2000);
      });
    })
    .catch((err) => {
      console.log(new Error(err));
    });

  return promise;
};

trafficLights();
