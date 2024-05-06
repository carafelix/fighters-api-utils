import fs from 'fs';
import Stats from './json-out/stats.json' assert { type: 'json' };
import characters from './json-out/characters.json' assert { type: 'json' };
import status from './json-out/villianOrHero.json' assert { type: 'json' };

characters.sort(({ name: nameA }, { name: nameB }) => nameA > nameB);
status.sort(({ name: nameA }, { name: nameB }) => nameA > nameB);
Stats.sort(({ name: nameA }, { name: nameB }) => nameA > nameB);

for (let i = 0; i < characters.length; i++) {
  if (
    characters[i].name !== status[i].name ||
    status[i].name !== Stats[i].name ||
    Stats[i].name !== characters[i].name
  ) {
    console.log(false)
  }
}

const merged = characters.map((v,i)=>{
    const stats = {
        ...Stats[i]
    }
    delete stats.name
    return {
        ...v,
        stats,
        ...status[i]
    }
})
fs.writeFileSync('./fullChars.json', JSON.stringify(merged))
