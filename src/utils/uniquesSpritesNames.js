import sprites from './json-out/sprites.json' assert { type: 'json' };
import marvel from './json-out/marvelChars.json' assert { type: 'json' };
import fs from 'node:fs';
const namedSprites = sprites.map(({ name, sprites }) => ({
  name,
  sprites,
}));
const namedMarvel = marvel.map(({ id, name, description, thumbnail }) => ({
  id,
  name,
  description,
  thumbnail: thumbnail.path + '.' + thumbnail.extension,
}));

const intercept = [];
namedMarvel.forEach((char) => {
  const matchedChar = namedSprites.find(
    ({ name: spriteName }) => spriteName === char.name
  );
  if (matchedChar) {
    intercept.push({
        id: char.id,
        name: char.name,
        description: char.description,
        thumbnail: char.thumbnail,
        sprites: matchedChar.sprites,
      });
  }
});

fs.writeFileSync('./shared.json', JSON.stringify(intercept));
