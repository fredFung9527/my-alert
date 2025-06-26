import { config } from 'dotenv'
config({ path: '.env' })

import { Cron } from 'croner'
import { sendPushover } from './utils/pushover'

export const dailyCronJobs = new Cron('0 0 * * *', async () => {
})

async function main() {
  await sendPushover('My Alert', 'Server started')
  console.log('🕐 Cron jobs initialized')
}

main()