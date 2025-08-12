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

  insert(data: any) {
    return this.collection.insertOne(data)
  }
}
