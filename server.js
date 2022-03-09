const express =  require('express'); 
const request = require('request');
const app = express(); 
const port = process.env.PORT || 5000; 

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// create a GET route
app.get('/rss-feed', (req, res) => { 
    request(
        { url: 'https://dev98.de/feed' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
              return res.status(500).json({ type: 'error', message: err.message });
            }
            res.send(body); 
          }
    )
}); 
