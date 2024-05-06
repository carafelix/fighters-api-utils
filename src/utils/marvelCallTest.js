import crypto from 'crypto';
import fs from 'node:fs'

const timestamp = Math.floor(new Date().getTime() / 1000)

const hash = crypto
            .createHash('md5')
            .update(`${timestamp}${process.env.MARVEL_PRIVATE}${process.env.MARVEL_PUBLIC}`)
            .digest('hex')



const base = 'http://gateway.marvel.com/v1/public/characters'

const result = []
for(let i = 0; i<1600; i += 100 ){
    const response = await fetch(base + '?'  + new URLSearchParams({
        ts: timestamp,
        apikey: process.env.MARVEL_PUBLIC,
        hash: hash,
        limit: 100,
        offset: i
    }))
    const chars = (await response.json()).data.results

    result.push(chars)
}

// fs.writeFileSync('./marvelChars.json',JSON.stringify(result.flat()))