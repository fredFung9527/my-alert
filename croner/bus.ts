import { Cron } from 'croner'
import { getKMBBusArrivalOfStop } from '../utils/bus-kmb'
import { sendPushover } from '../utils/pushover'

async function checkWorkDayMorningBusArrival() {
  const now = new Date()
  const day = now.getDay()
  const isWorkDay = day >= 1 && day <= 5
  if (!isWorkDay) {
    return
  }
  const hour = now.getHours()
  const minute = now.getMinutes()
  if (hour < 9 && !(hour === 8 && minute >= 54)) { // check after 8:54
    return
  }

  let needAlert = false
  const stopId = '665CE110A84542E9' // 屯門官立中學 (TM731), https://data.etabus.gov.hk/v1/transport/kmb/stop
  const routes = ['67M', '67A'] 
  const arrivals = await getKMBBusArrivalOfStop(stopId)
  for (const arrival of arrivals) {
    if (routes.includes(arrival.route)) {
      const minDiff = Math.floor((arrival.eta.getTime() - now.getTime()) / 1000 / 60)
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

export const workDayMorningBusArrival = new Cron('0 * * * * *', async () => {
  const alerted = await checkWorkDayMorningBusArrival()
  if (alerted) {
    workDayMorningBusArrival.pause()
  }
})