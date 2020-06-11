import { JsonFileDeviceRepository } from './repositories/JsonFileDeviceRepository'
import { DeviceWatcher } from './services/DeviceWatcher'
import { HttpNotifier } from './services/HttpNotifier'
import { ReachabilityHandler } from './services/ReachabilityHandler'

const main = () => {
  const notifyConnectedUrl = 'http://192.168.10.112:1880/connected'
  const notifier = new HttpNotifier(notifyConnectedUrl)
  const rep = new JsonFileDeviceRepository('./device.json')

  rep.findDevices().forEach(device => {
    const handler = new ReachabilityHandler(rep)
    const watcher = new DeviceWatcher(device)
    watcher.watchPingReachability(
      dev => handler.reached(dev, notifier),
      dev => handler.unreached(dev),
    )
  })
}

main()
