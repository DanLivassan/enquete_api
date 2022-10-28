import { Collection, MongoClient, Document } from 'mongodb'

const mongoDbClient = new MongoClient(process.env.MONGO_URL as string)

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect (): Promise<void> {
    this.client = await mongoDbClient.connect()
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection<Document> {
    return this.client.db().collection(name)
  }
}
