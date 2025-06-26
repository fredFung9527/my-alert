import { config } from 'dotenv'
config({ path: '.env' })

import { Cron } from 'croner'

export const minlyCronJobs = new Cron('0 * * * * *', async () => {

})

console.log('🕐 Cron jobs initialized')