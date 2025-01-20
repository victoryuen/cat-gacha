import express from "express";
import pg from "pg";
import expressSession from "express-session"
import connectPgSimple from "connect-pg-simple";

import 'dotenv/config';
let db;
let postgreStore;

if (process.env.NODE_ENV === "production") {

    console.log("Connecting to production database...");

    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    db = new pg.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    const pgSession = connectPgSimple(expressSession);
    postgreStore = new pgSession({
        pool,
        createTableIfMissing: true,
    });
} else {
    console.log("Connecting to development database...");

    db = new Client({
        user: 'postgres',
        host: "localhost",
        database: "cat_gacha_local",
        password: "12345",
    });
}

db.connect();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
if (process.env.NODE_ENV === 'production'){
    app.use(expressSession({
        store: postgreStore,
        secret: process.env.SESSION_SECRET || 'fallback_secret',
        cookie: {
            secure: false,
            httpOnly: true, 
            maxAge: 1000 * 60 * 60, 
        },
        createTableIfMising: true,
    }));
}
else{
    app.use(expressSession({ secret: 'keyboard cat',
        resave: false,
        saveUninitialized:false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }}))
}

 
const port = process.env.PORT || 4000;


app.get('/', (req, res) => { // render index page
    console.log(req.sessionID)
    console.log(req.session.username)
    res.render('index', {
        username: req.session.username || null,
        loggedIn: req.session.loggedIn || false,
        active: 'home'
    });
})

app.get('/signup', (req, res) => { // render signup page
    res.render('signup', {
        // loggedIn: req.session.loggedIn || false
    });
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
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rowCount > 0) {
            res.render('signup', { error: 'Email already exists' }); // render signup page with error message if email already exists
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
        res.redirect('/login');
    } catch (err) {
        console.error('Error executing query:', err);
    }


});
app.get('/login', (req, res) => { // render login page
    res.render('login', {
        // loggedIn: req.session.loggedIn || false
    });
});
app.post('/login', async (req, res) => { // handle login POST request
    const { username, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (result.rowCount > 0) {
            console.log(req.session)
            req.session.userId = result.rows[0].id;
            console.log(req.session.userId)

            req.session.username = username;
            req.session.loggedIn = true;
            
            req.session.save()
            res.redirect('/')
        }
        else {
            res.render('login', { error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error executing query:', err);
    }
});

app.get('/gacha', (req, res) => { // render gacha page
    res.render('gacha', {
        loggedIn: req.session.loggedIn || false,
        username: req.session.username,
        active: 'gacha'
    });
})
app.post('/api/collect', async (req, res) => {
    try {
        const catData = req.body;
        const result = await db.query(
            'INSERT INTO user_cats (user_id,cat_name, cat_breed, cat_origin, cat_image, cat_types, cat_description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [req.session.userId, catData.cat_name, catData.cat_breed, catData.cat_origin, catData.cat_image, catData.cat_types, catData.cat_description]
        );
        res.json({ success: true, cat: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
app.get('/collection', async (req, res) => {
    const result = await db.query('SELECT * FROM user_cats WHERE user_id = $1', [req.session.userId]);
    res.render('collection', {
        loggedIn: req.session.loggedIn || false,
        username: req.session.username,
        cats: result.rows,
        active: 'collection'
    });
});
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
app.listen(port, () => {
    console.log(`Express server listening on port ${port} `)
    console.log(process.env.DATABASE_URL)
});
