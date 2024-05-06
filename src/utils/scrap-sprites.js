import axios from 'axios';
import { load, text } from 'cheerio';
import fs from 'fs';

const base = 'http://scrollboss.illmosis.net/';
const marvel = 'customsprites.php?g=marvel';

const entry = (
  await axios({
    method: 'get',
    url: base + marvel,
  })
).data;

const $ = load(entry);
const charsUrls = $('a[href^="customsprites.php?g=marvel&s="]')
  .map((i, el) => base + $(el).attr('href'))
  .toArray();

const charsHtmls = await Promise.all(
  charsUrls.map((charSite) => {
    return axios({
      method: 'get',
      url: charSite,
    });
  })
);

const sprites = charsHtmls.map((charSiteResponse) => {
  const url = charSiteResponse.config.url;
  const charHtml = charSiteResponse.data;
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

  return {
    url,
    urlname: url.split('marvel&s=')[1].replace('-fgtsze', ''),
    name,
    sprites,
  };
});

// fs.writeFileSync('./src/utils/json-out/sprites.json', JSON.stringify(sprites));
