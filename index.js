const megalodon = require('megalodon');
const generator = megalodon.default;
const http = require('http');

const BASE_URL = 'https://xn--y9a6bah4ck.xn--y9a3aq';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const client = generator('mastodon', BASE_URL, ACCESS_TOKEN);
const locations = ['Երեւան', 'Լոռի', 'Սեւան', 'Դիլիջան', 'Արցախ'];

const getRandomInt = (max) => Math.floor(Math.random() * max);

const post = (array) => {
  const status = `Բարի՜ լոյս 🤗\n\n${array.join('\n\n')}\n\nԻսկ ինչի՞ ես հասել դու։`;
  client
    .postStatus(status)
    .then(() => console.log('Done!'))
    .catch((error) => console.log(error));
};

const wttrs = [];
locations.forEach((location) => {
  const path = `/${location}?lang=hy&format=%c+${location}ում %t է (զգալի՝ %f)։`;
  http
    .request({ host: 'wttr.in', path: encodeURI(path) }, (response) => {
      let str = '';
      response.on('data', (chunk) => {
        str += chunk;
      });
      response.on('end', () => {
        wttrs.push(str);
        if (wttrs.length === locations.length) {
          post(wttrs);
        }
      });
    })
    .end();
});
