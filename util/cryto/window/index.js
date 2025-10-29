const crypto = window.crypto


const arr = new Uint8Array([1, 2, 3, 4, 5])

let hash = ''

const fn = async () => {

  arrBuffer = await crypto.subtle.digest('SHA-256', arr)

  console.log('arrBuffer: ----------', arrBuffer)

  hash = Array.from(new Uint8Array(arrBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')

  console.log('hash: ----------', hash);
  
}

fn()

