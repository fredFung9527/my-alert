import axios from 'axios'

interface KMBArrival {
  co: 'KMB',
  route: string,
  dir: 'O' | 'I',
  service_type: number,
  seq: number,
  dest_tc: string,
  dest_sc: string,
  dest_en: string,
  eta_seq: number,
  eta: string,
  rmk_tc: string,
  rmk_sc: string,
  rmk_en: string,
  data_timestamp: string
}

interface MyKMBArrival {
  route: string,
  eta: Date
}

export async function getKMBBusArrivalOfStop(stopId: string) {
  const response = await axios.get<{ data: KMBArrival[] }>(`https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stopId}`)
  const list = response.data?.data || []
  
  let result: MyKMBArrival[] = []
  for (const item of list) {
    if (item.eta) { // eta is null if the bus is not running
      result.push({
        route: item.route,
        eta: new Date(item.eta)
      })
    }
  }
  return result
}