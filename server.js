const express = require('express');

const app = express();

const PORT = process.env.port || 5000;

app.get('/', (req, res) => {
  return res.status(200).send('Server running');
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));