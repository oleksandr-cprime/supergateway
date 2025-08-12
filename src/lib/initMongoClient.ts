import { MongoClient } from 'mongodb'

export function initMongoClient(uri = process.env.MONGO_URI): MongoClient {
  if (!uri) {
    throw new Error('MONGO_URI is not set')
  }

  const client = new MongoClient(uri)
  return client
}
