import express from 'express';
import redis from 'redis';
import axios from 'axios';

const app = express();
const port = 4900;

const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis Error:', err);
});

client.connect().then(() => {
    console.log('✅ Connected to Redis');
});

const baseUrl = "https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=";

app.get('/:country', async (req, res) => {
    try {
        const countryName = req.params.country.toLowerCase(); 

        const redisData = await client.get(countryName);
        if (redisData) {
            console.log('✅ Data fetched from Redis cache');
            return res.json({ source: "Redis", data: JSON.parse(redisData) });
        }

        const response = await axios.get(baseUrl + countryName);

        if (response.data) {
            const wikiData = response.data.parse 
            
            await client.set(countryName, JSON.stringify(wikiData), {
                EX: 3600, 
            });

            console.log('✅ Data fetched from Wikipedia API and stored in Redis');
            return res.json({ source: "Wikipedia API", data: wikiData });
        }

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('❌ Something went wrong');
    }
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
