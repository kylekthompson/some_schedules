const waitUntil = (condition) => new Promise((resolve, reject) => {
  let timeout;
  let interval;

  timeout = setTimeout(() => {
    clearTimeout(timeout);
    clearInterval(interval);
    reject();
  }, 10000);

  interval = setInterval(() => {
    if (condition()) {
      clearTimeout(timeout);
      clearInterval(interval);
      resolve();
    }
  }, 100);
});

export default waitUntil;
