const megalodon = require('megalodon');
const generator = megalodon.default;
const client = generator('mastodon', BASE_URL, ACCESS_TOKEN);
const http = require('http');

const BASE_URL = 'https://xn--y9a6bah4ck.xn--y9a3aq';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

var options = {
  host: 'wttr.in',
  path: encodeURI(
    '/Yerevan,%20Armenia?lang=hy&format=Դրսում %t է բայց կարծես %f լինի։\n%C %cէ։\n\nԻ՞նչ նպատակ ունես այսօր։'
  ),
};

callback = function (response) {
  var str = '';
  response.on('data', function (chunk) {
    str += chunk;
  });
  response.on('end', function () {
    client.postStatus(`Բարի՜ լոյս ։)\n\n${str}`).then(console.log).catch(console.log);
  });
};

http.request(options, callback).end();
