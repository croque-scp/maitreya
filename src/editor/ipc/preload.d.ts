import { fileReadWriteApi } from "../preload"

declare global {
  interface Window {
    fileReadWrite: typeof fileReadWriteApi
  }
}

export {}
