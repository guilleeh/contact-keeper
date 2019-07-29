const express = require('express');

const app = express();

app.get('/', (req, res) =>
    res.json({ msg: 'Welcome to the Contact Keeper API V1.0' })
);

//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000; //Looks for environment variable in production!

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
