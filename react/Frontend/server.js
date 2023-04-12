const express = require('express');
const app = express();

app.use(express.static('reactjs'));

app.listen(3000, () => {
  console.log('React app is running on port 3000!');
});
