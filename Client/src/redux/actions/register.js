// exemple de generator qui va étre outile pour les action async
// 1 exp
function* iterableObj() {
  yield "This";
  yield "is";
  yield "iterable.";
}
for (const val of iterableObj()) {
  console.log(val);
}

// 2exp

function fetchJson(url) {
  return fetch(url)
    .then(request => request.text())
    .then(text => {
      return JSON.parse(text);
    })
    .catch(error => {
      console.log(`ERROR: ${error.stack}`);
    });
}

// on peut écrire la meme chose on utilisant co library
// qui prend on paramètre un generator et return une promisse

const fetchJson = co.wrap(function*(url) {
  try {
    let request = yield fetch(url);
    let text = yield request.text();
    return JSON.parse(text);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
});
