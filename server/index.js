const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/express_backend', (req, res) => {
  res.send({ express: 'Express backend connected to React app'})
})

app.listen(port, () => console.log(`listening on ${port}`))

