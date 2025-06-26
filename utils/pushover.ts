import axios from 'axios'

if (!process.env.PUSHOVER_TOKEN || !process.env.PUSHOVER_USER) {
  throw new Error('PUSHOVER_TOKEN and PUSHOVER_USER must be set')
}

export async function sendPushover(title: string, message: string, ) {
  try {
    await axios.post('https://api.pushover.net/1/messages.json', {
      token: process.env.PUSHOVER_TOKEN,
      user: process.env.PUSHOVER_USER,
      message,
      title
    })
  } catch (error) { 
    console.error(error)
  }
}