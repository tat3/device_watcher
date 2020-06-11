import { IDeviceRepository } from "../repositories/IDeviceRepository"
import { INotifier } from "./INotifier"
import { Device } from "../models/Device"

const REACHED_THRESHOLD = 5
const UNREACHED_THRESHOLD = 5

export class ReachabilityHandler {
  private cnt = 0
  private reachedCount = 0
  private unreachedCount = 0
  constructor(private rep: IDeviceRepository) {
  }

  reached = (device: Device, notifier: INotifier) => {
    console.log(this.cnt++, 'reachable...')

    if (device.connected) {
      return
    }
    this.reachedCount++
    this.unreachedCount = 0

    if (this.reachedCount >= REACHED_THRESHOLD) {
      notifier.notify()
      this.rep.deviceConnected(device)
      console.log(this.cnt++, 'CONNECTED!')
    }
  }

  unreached = (device: Device) => {
    console.log(this.cnt++, 'unreachable...')

    if (!device.connected) {
      return
    }
    this.unreachedCount++
    this.reachedCount = 0

    if (this.unreachedCount >= UNREACHED_THRESHOLD) {
      this.rep.deviceDisconnected(device)
      console.log(this.cnt++, 'DISCONNECTED!')
    }
  }
}
