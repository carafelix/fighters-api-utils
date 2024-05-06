import axios from 'axios';
import { load, text } from 'cheerio';
import fs from 'fs';

const base = 'http://scrollboss.illmosis.net/';
const marvel = 'customsprites.php?g=marvel';
const html = (
  await axios({
    method: 'get',
    url: base + marvel,
  })
).data;

const $ = load(html);

const charsUrls = $('a[href^="customsprites.php?g=marvel&s="]').map(
  (i, el) => base + $(el).attr('href')
);

const result = [];

for (const charSite of charsUrls) {
  const charHtml = (
    await axios({
      method: 'get',
      url: charSite,
    })
  ).data;
  const $char = load(charHtml);
  const sprites = $char('img[class="crisp"]')
    .map((i, el) => {
      return {
        title: el.attribs.title,
        src: base + el.attribs.src,
      };
    })
    .toArray();

  const name = $char('#listtitlebox')
    .find('b')
    .text()
    .replace('Sub-gallery: ', '');

  result.push({
    url: charSite,
    urlname: charSite.split('marvel&s=')[1].replace('-fgtsze', ''),
    name,
    sprites,
  });
}

fs.writeFileSync('./src/utils/json-out/sprites.json', JSON.stringify(result));
