import { Device } from "../models/Device";

export interface IDeviceRepository {
  deviceConnected: (device: Device) => Device
  deviceDisconnected: (device: Device) => Device
  findDevices: () => Device[]
}
