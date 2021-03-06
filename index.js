const express = require('express')
const app = express()
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 5000
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()

// middleware
app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aghhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {

    try {
        await client.connect()
        const database = client.db('hotel-pro-max')
        const foodCollection = database.collection('foods')
        const blogCollection = database.collection('blogs')
        const breakfastCollection = database.collection('breakfast')
        const launchCollection = database.collection('launch')
        const dinnerCollection = database.collection('dinner')
        const ordersCollection = database.collection('orders')
        const reviewsCollection = database.collection('reviews')
        const usersCollection = database.collection('users')

        //get all blogs 
        app.get('/blogs', async (req, res) => {
            const cursor = blogCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })

        // get all foods
        app.get('/foods', async (req, res) => {
            const cursor = foodCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })
        // get all breakfast item
        app.get('/breakfast', async (req, res) => {
            const cursor = breakfastCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })

        // get all launch item
        app.get('/launch', async (req, res) => {
            const cursor = launchCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })

        // get all dinner
        app.get('/dinner', async (req, res) => {
            const cursor = dinnerCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })

        // post order
        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order)
            res.json(result)
            console.log('this is result', result)
        })

        // get specific user's order
        app.get('/orders/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email }
            const result = await ordersCollection.find(query).toArray()
            res.json(result)
            console.log(result);
        })

        // delete specific order
        app.delete('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await ordersCollection.deleteOne(query)
            res.json(result)
        })

        // add user feedback
        app.post('/review', async (req, res) => {
            const feedback = req.body;
            const result = await reviewsCollection.insertOne(feedback)
            res.json(result)
            console.log(result)
        })
        // add user info to db
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.json(result)
            console.log(user)
        })
        // upsert a user
        app.put('/user', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const update = {
                $set: {
                    email: user.email,
                    displayName: user.displayName
                }
            }
            const options = { upsert: true };
            const result = await usersCollection.updateOne(query, update, options)
            res.json(result)
            console.log(result)
        })
        // get all users
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello from hotel pro')
})
app.listen(port, () => {
    console.log('listening at ', port)
})
