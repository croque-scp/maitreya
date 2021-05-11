import { IpcMainEvent } from "electron"

export interface IpcChannelInterface {
  name: string
  handle(event: IpcMainEvent, request: IpcRequest<unknown>): void
}

export interface IpcRequest<P> {
  responseChannel?: string
  params: P
}
