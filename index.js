const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dqljuns.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run()
{
    try {
        const signUpCollection = client.db('facebookclone').collection('signUp')
        const postCollection = client.db('facebookclone').collection('post')
        const likesCollection = client.db('facebookclone').collection('likes')

        const user = {
            name: 'testing test'
        }

        app.post('/signUp', async (req, res) =>
        {
            const signUp = req.body;
            const result = await signUpCollection.insertOne(signUp)
            res.send(result)
        })



        app.post('/login', async (req, res) =>
        {
            const logIn = req.body;
            const query = {}
            const user = await signUpCollection.find(query).toArray()
            user?.filter((el) =>
            {
                if (el.email === logIn.email && el.password === logIn.password) {
                    res.send(el)
                }
            });
        })

    }
    finally {

    }
}

run().catch(err => console.log(err))

app.get('/', async (req, res) =>
{
    res.send('Facebook Clone Server is Running')
})

app.listen(port, () => console.log(`Facebook Clone Running on ${port}`))