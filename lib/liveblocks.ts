import { Liveblocks } from '@liveblocks/node'
const key = process.env.LIVEBLOCKS_PRIVATE_KEY

if(!key){
    throw new Error('Liveblocks private key not found in environment variables')
}

const liveblocks = new Liveblocks({
    secret: key,
})
export default liveblocks;