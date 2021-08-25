import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://kyosuke:s02oadLRWKgfWhCy@cluster0.gfyzj.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
};
