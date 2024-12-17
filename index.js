import express from "express";
import pg from "pg";
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "cat_gacha_local",
    password: "12345",
    port: 5432,
});

db.connect();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // serve static files

const hostname = "127.0.0.1";
const port = 5500;


app.get('/', (req, res) => { // render index page
    res.render('index', { username: 'John Doe' })
})

app.get('/signup', (req, res) => { // render signup page
    res.render('signup');
});
app.post('/signup', async (req, res) => { // handle signup POST request
    const { username, email, password, confirmPassword } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rowCount > 0) {
            res.render('signup', { error: 'Username already exists' }); // render signup page with error message if username already exists
        }
    } catch (err) {
        console.error('Error executing query:', err); // log error if query execution fails
    }
    if (password != confirmPassword) {
        res.render('signup', { error: 'Password must be the same!' }) // render signup page with error message if password and confirm password do not match
    }
    try {
        const result = await db.query(
            'INSERT INTO users (username, email,password) VALUES ($1, $2,$3) RETURNING *',
            [username, email, password]
        );
    } catch (err) {
        console.error('Error executing query:', err);
    }


});
app.get('/gacha', (req, res) => { // render gacha page
    res.render('gacha');
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port} `)
});


app.set('view engine', 'ejs');
