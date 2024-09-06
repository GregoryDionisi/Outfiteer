import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('mongodb+srv://gregoryd324:VBx7QKffWoYkYhph@cluster0.kb4kb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.outfiteer
modelsCollection = db.models
filesCollection = db.fs.files
chunksCollection = db.fs.chunks

modelsCollection.delete_many({})
filesCollection.delete_many({})
chunksCollection.delete_many({})