const mongoose = require('mongoose');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

// start listening
app.listen(PORT, () => console.log(`Now listening on Port: ${PORT}`));