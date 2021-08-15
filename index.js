const megalodon = require('megalodon');
const generator = megalodon.default;
const http = require('http');

const BASE_URL = 'https://xn--y9a6bah4ck.xn--y9a3aq';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const client = generator('mastodon', BASE_URL, ACCESS_TOKEN);
const options = {
  host: 'wttr.in',
  path: encodeURI('/Yerevan,%20Armenia?lang=hy&format=Դրսում %t է բայց կարծես %f լինի։\n%C %c է։'),
};
const questions = ['Որոշել ե՞ս ինչ հանգնել։', 'Ի՞նչ պլաններ ունես։', 'Ո՞րն է օրուայ նպատակդ'];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

callback = function (response) {
  var str = '';
  response.on('data', function (chunk) {
    str += chunk;
  });
  response.on('end', function () {
    client
      .postStatus(`Բարի՜ լոյս ։)\n\n${str}\n\n${questions[getRandomInt(questions.length)]}`)
      .then(() => console.log('Done!'))
      .catch((error) => console.log(error));
  });
};

http.request(options, callback).end();
