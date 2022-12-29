const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

const cors = require('cors')
require('dotenv').config();


app.use(cors())
app.use(express.json())



//test
app.get('/', (req, res) => {
    res.send('server is on')
})



//connect to mongodb database
const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@mybook.vvkbobo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


function run() {
    try {

        //database collections
        const allPostCollection = client.db('myBook').collection('allPost')

        //User post [home page]
        app.post('/userPost', async (req, res) => {
            const post = req.body
            const result = await allPostCollection.insertOne(post)
            res.send(result)
        })
        //user post get [media page]
        app.get('/userPost', async (req, res) => {
            const query = {}
            const options = {
                sort: { "time": -1 },
            };
            const result = await allPostCollection.find(query, options).toArray()
            res.send(result)
        })

        //user post get [popular post page]
        app.get('/popularPost', async (req, res) => {
            const query = {}
            const options = {
                sort: { "love": -1 },
            };
            const result = await allPostCollection.find(query, options).limit(3).toArray()
            res.send(result)
        })

        //user post detail [detail page]
        app.get('/details/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await allPostCollection.findOne(query)
            res.send(result)
        })

        //Put one property [card]
        app.put('/love/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const field = await allPostCollection.findOne(filter);
            console.log(field)

            if (field?.love) {
                const updatedDoc = {
                    $set: {
                        love: field.love + 1
                    }
                }
                console.log(updatedDoc)
                const result = await allPostCollection.updateOne(filter, updatedDoc, options)
                res.send(result)
            }
            else {
                const updatedDoc = {
                    $set: {
                        love: 1
                    }
                }

                const result = await allPostCollection.updateOne(filter, updatedDoc, options)
                res.send(result)

            }


        })

    }
    catch { }
}

run()


app.listen(port)