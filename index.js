const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

const cors = require('cors')
require('dotenv').config();


app.use(cors())
app.use(express.json())



//test
app.get('/', (req, res)=>{
    res.send('server is on')
})



//connect to mongodb database
const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@mybook.vvkbobo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


function run(){
    try{

        //database collections
        const allPostCollection = client.db('myBook').collection('allPost')

        //User post 
        app.post('/userPost', async(req, res)=>{
            const post = req.body
            const result = await allPostCollection.insertOne(post)
            res.send(result)
        })
        //user post get 
        app.get('/userPost', async(req, res)=>{
            const query = {}
            const result = await allPostCollection.find(query).toArray()
            res.send(result)
        })

    }
    catch{}
}

run()


app.listen(port)