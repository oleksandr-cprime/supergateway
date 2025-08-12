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

  update(sessionId: string, rpcId: string, data: Partial<McpServerLogDto>) {
    return this.collection.updateOne(
      { sessionId, 'data.id': rpcId },
      { $set: { ...data, updatedAt: new Date() } },
    )
  }
}

export type McpServerLogDto = {
  ip: string
  type: 'rpc' | 'error' | 'system'
  userId: string
  sessionId: string
  data: unknown
  createdAt: Date
  updatedAt: Date
}
