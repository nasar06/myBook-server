const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000



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
        const allPostCollection = client.db('myBook').collection('all-post')


        app.post('/post', (req, res)=>{
            const data = req.body
            console.log(data)
        })

    }
    catch{}
}

run()


app.listen(port)