// Напиши две функции: getUser(id) и getUserPosts(userId). Первая возвращает промис с данными пользователя, вторая - промис с массивом постов.
// Необходимо получить данные пользователя и его посты параллельно используя Promise.all().

const getUser = (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка статуса: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.log("Ошибка загрузки данных пользователя", err);
    });
};

const getUserPosts = (userId) => {
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка статуса: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.log("Ошибка загрузки постов", err);
    });
};

Promise.all([getUser(1), getUserPosts(1)])
  .then(([user, userPosts]) => {
    console.log("Данные пользователя: ", user);
    console.log("Посты пользователя: ", userPosts);
  })
  .catch((err) => {
    console.log("Ошибка загрузки", err);
  });
