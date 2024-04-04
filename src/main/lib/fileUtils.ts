import fs from 'fs'

export const readJSON = async (pathToJSON: string) => {
  console.log('fetched dictionary')
  const data = fs.readFileSync(pathToJSON, { encoding: 'utf8' })
  return JSON.parse(data)
}
