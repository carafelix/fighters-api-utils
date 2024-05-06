import sprites from './json-out/sprites.json' assert { type: 'json'}
import marvel from './json-out/marvelChars.json' assert { type: 'json'}
import fs from 'node:fs'
const namedSprites = sprites.map(({urlname})=> (urlname))
const namedMarvel = marvel.map(({name})=>(name))

fs.writeFileSync('./namesIdsSprites.json' , JSON.stringify(namedSprites))
fs.writeFileSync('./namesIdsMarvel.json' , JSON.stringify(namedMarvel))