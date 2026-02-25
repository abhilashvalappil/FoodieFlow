import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { jest } from '@jest/globals';

jest.setTimeout(30000);

let mongo: any;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    if (mongo) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
    }
});

beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection?.deleteMany({});
    }
});
