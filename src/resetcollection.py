import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('mongodb+srv://gregoryd324:VBx7QKffWoYkYhph@cluster0.kb4kb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.test
imageDetailsCollection = db.ImageDetails


imageDetailsCollection.delete_many({})