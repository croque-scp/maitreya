import fs from "fs"
import { Event } from "../types"

/**
 * Creates a proxy for a given events directory.
 *
 * The proxy here constructs a fake interactions tree and populates it with
 * the files it contains, and intercepts save requests and transmits them to the
 * file proxies.
 */
function createEventsDirProxy(path: string, dirName: string) {
  const dirPath = `${path}/${dirName}`
  const files = fs.readdirSync(dirPath, { withFileTypes: true })
  const interactions: Event[] = files.map((file) => {
    if (file.isDirectory()) {
      return createEventsDirProxy(dirPath, file.name)
    }
    return createEventFileProxy(dirPath, file.name)
  })
  return new Proxy<Event>(
    {
      id: dirName,
      summary: `Events from ${path}`,
      interactions,
    },
    {}
  )
}

/**
 * Creates a proxy for a given events file.
 *
 * The proxy here intercepts save requests and transmits them to the file.
 */
function createEventFileProxy(path: string, fileName: string) {
  const file = `${path}/${fileName}`
  const eventFile = fs.readFileSync(file, "utf-8")
  const event = <Event>JSON.parse(eventFile)
  return new Proxy(event, {})
  // TODO Intercept save requests
}

/**
 * Proxy for the root event.
 */
export const rootEvent = createEventsDirProxy("../..", "events")
