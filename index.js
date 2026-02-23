const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// connect to Supabase
const supabaseUrl = 'https://zenoouusnureivzwxjfn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplbm9vdXVzbnVyZWl2end4amZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDc4OTYsImV4cCI6MjA4NzAyMzg5Nn0.zm3QHxwGz9PgT6wVsFJpYL-WjQMY2xU8mHz8OF9Qe2s';
const supabase = createClient(supabaseUrl, supabaseKey);

// contact endpoint
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const { data, error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);

    if (error) {
        return res.status(500).json({ error: 'Error saving message' });
    }

    res.status(200).json({ message: 'Message saved successfully' });
});

app.listen(3000, () => console.log('Backend running on port 3000'));

module.exports = app;