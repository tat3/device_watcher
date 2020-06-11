import fs from 'fs'

import { Device } from '../models/Device'
import { IDeviceRepository } from './IDeviceRepository'

const loadJson = (filePath: string) => {
  return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
}

export class JsonFileDeviceRepository implements IDeviceRepository {
  devices: Device[]
  constructor(private filePath: string) {
    this.devices = []
  }

  loadDevices = () => {
    this.devices = loadJson(this.filePath).map((dev: any) => ({ ...dev, connected: true }))
  }

  deviceConnected = (device: Device) => {
    const storedDevice = this.findStoredDevice(device.id)
    if (!storedDevice.connected) {
      storedDevice.connected = true
    }
    return storedDevice
  }

  deviceDisconnected = (device: Device) => {
    const storedDevice = this.findStoredDevice(device.id)
    if (storedDevice.connected) {
      storedDevice.connected = false
    }
    return storedDevice
  }

  findStoredDevice = (deviceId: number) => {
    try {
      const storedDevice = this.devices.filter(dev => dev.id === deviceId)[0]
      return storedDevice
    } catch (e) {
      throw new Error(`no such device which has id: ${deviceId}`)
    }
  }

  findDevices = () => {
    this.loadDevices()
    return this.devices
  }
}
