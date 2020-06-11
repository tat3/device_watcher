import { Device } from "../models/Device"
import child_process from "child_process"
import util from 'util'

const exec = util.promisify(child_process.exec)

type Handler = (device: Device) => void

export class DeviceWatcher {
  constructor(private device: Device) {
  }

  watchPingReachability = (reached: Handler, unreached: Handler) => {
    setInterval(async () => {
      exec(`ping ${this.device.ipAddr} -c 1 -W 1`)
        .then(() => reached(this.device))
        .catch(() => unreached(this.device))
    }, 1000)
  }
}
