import { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js'
import { Collection, MongoClient } from 'mongodb'

export class McpServerLogRepository {
  private readonly collection: Collection

  constructor(
    private readonly client: MongoClient,
    dbName: string,
    collectionName: string,
  ) {
    this.collection = this.client.db(dbName).collection(collectionName)
  }

  insert(data: McpServerLogDto) {
    return this.collection.insertOne(data)
  }

  update(sessionId: string, update: { result: unknown; id: number }) {
    return this.collection.updateOne(
      { sessionId, 'data.id': update.id },
      { $set: { 'data.result': update.result, updatedAt: new Date() } },
    )
  }
}

export type McpServerLogDto = {
  ip: string
  type: 'rpc' | 'error' | 'system'
  userId: string
  sessionId: string
  data: JSONRPCMessage | string
  createdAt: Date
  updatedAt: Date
}
