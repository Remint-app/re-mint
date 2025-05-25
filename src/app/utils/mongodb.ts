import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!client) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
} else {
  clientPromise = Promise.resolve(client);
}

export default clientPromise;
