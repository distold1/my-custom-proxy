const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/get-source', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res.status(400).send('URL is required.');
        }

        const response = await fetch(url);
        
        if (!response.ok) {
            // ИСПРАВЛЕНО: Добавлены обратные кавычки вокруг шаблонного литерала
            return res.status(response.status).send(`Error fetching URL: ${response.statusText}`);
        }

        const sourceCode = await response.text();
        res.send(sourceCode);
    } catch (error) {
        console.error('Error in proxy request:', error);
        res.status(500).send('Error fetching the website source code.');
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
