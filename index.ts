import { config } from 'dotenv'
config({ path: '.env' })

import { sendPushover } from './utils/pushover'

import './croner/bus'

async function main() {
  await sendPushover('My Alert', 'Server started')
  console.log('🕐 Cron jobs initialized')
}

main()