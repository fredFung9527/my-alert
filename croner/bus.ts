import { Cron } from 'croner'
import { getKMBBusArrivalOfStop } from '../utils/bus-kmb'
import { sendPushover } from '../utils/pushover'

async function checkBusArrival() {
  const now = (new Date()).getTime()

  let needAlert = false
  const stopId = '665CE110A84542E9' // 屯門官立中學 (TM731), https://data.etabus.gov.hk/v1/transport/kmb/stop
  const routes = ['67M', '67A'] 
  const arrivals = await getKMBBusArrivalOfStop(stopId)

  for (const arrival of arrivals) {
    if (routes.includes(arrival.route)) {
      const minDiff = Math.floor((arrival.eta.getTime() - now) / 1000 / 60)
      if (minDiff === 15 || minDiff === 16) {
        needAlert = true
        break
      }
    }
  }

  if (needAlert) {
    await sendPushover('Bus Alert', 'Bus is coming')
    return true
  }
  return false
}

export const workDayMorningBusArrival = new Cron('54 8 * * 1-5', async () => { // 8:54 on work days
  console.log('🕐 Bus morning arrival check started')
  console.log((new Date()).toISOString())

  try {
    let loopCount = 0
    while (loopCount < 60) {
      const alerted = await checkBusArrival()
      if (alerted) {
        break
      }
      loopCount++

      await new Promise(resolve => setTimeout(resolve, 1000 * 30))
    }
  } catch (error) {
    console.error(error)
  } finally {
    console.log('🕐 Bus morning arrival check finished')
    console.log((new Date()).toISOString())
  }
})