// This server is meant to emulate the VTech server which was involved in a data breach
// in 2015. There are numerous security flaws in this server which are meant to
// be exploited by the client. I've built this as a demonstrative.

// Note that I'm going for a very simple setup here. VTech's actual server was
// probably much more complex. I'm just trying to emulate the basic functionality
// of the server and demonstrate the security flaws it had.

import express, { Request, Response } from 'express';
import session from 'express-session';
import mysql from 'mysql2/promise';
import path from 'path';
import md5 from 'md5';

const app = express();
const port = 3030;

// Create a connection to the MySQL database.
const connection = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'vtech'
});

type User = {
  id: string;
  email: string;
};

// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    signedIn: boolean;
    user: User;
  }
}


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
// JSON middleware
app.use(express.json());
// Session middleware
app.use(session({
  'secret': 'secret',
  'resave': true,
  'saveUninitialized': true
}));

app.get('/session', (req: Request, res: Response) => {
  res.send(req.session);
});

/**
 * This route will return info on any child in the database.
 * This is incredibly insecure (if not outright malpractice if put in production)
 * and a reflection of the 2015 insecure setup of the VTech database.
 */
app.post('/getKids', async (req: Request, res: Response) => {
  console.log(req.body);
  const { id } = req.body;
  try {
    const [rows] = await connection.query('SELECT * FROM Children WHERE parent_id = ?', [id]);
    res.send(rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * This route will return info on any parent in the database.
 * Combining this with the getKids route will allow you to get all the info
 * on a parent and their Children.
 */
app.post('/getParent', async (req: Request, res: Response) => {
  try{
    const [rows] = await connection.query('SELECT * FROM Parents WHERE id = ?', [req.body.id]);
    res.send(rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * Attempts to sign the user in. The password is stored with an insecure
 * hash function (MD5) and is not salted. This means that the password
 * can be easily cracked by a rainbow table.
 */
app.post('/signin', async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;
  const ip = req.ip;


  if (!email || !password) {
    res.status(400).send('Missing email or password');
    return;
  }

  // Normally you would do more validation here, but I'm keeping it intentionally insecure

  try {
    // This is purposefully built with a SQL injection vulnerability
    const [rows] = await connection.query(
      `SELECT * FROM Parents WHERE email = "${email}" AND encrypted_password = "${password}"`,
    ) as any[]; // lmao

    if (rows.length === 0) {
      // Yes, VTech actually returned the SQL query in the response for errors
      res.status(401).send(`Invalid email or passwordSELECT * FROM Parents WHERE email = "${email}" AND encrypted_password = "${password}"`);
      return;
    }

    // Update the user's last login time (DATETIME), IP address, and login count.
    await connection.execute(
      'UPDATE Parents SET last_login = NOW(), client_ip = ?, login_count = login_count + 1 WHERE id = ?',
      [ip, rows[0].id]
    );
    
    // Set the user's session
    req.session.signedIn = true;
    req.session.user = {
      id: rows[0].id,
      email: rows[0].email
    };

    res.status(200).send('Signed in successfully');
  } catch (err) {
    console.error('Error signing in, probably a bad username or password');
    console.error(err);

    res.status(401).send(`Invalid email or passwordSELECT * FROM Parents WHERE email = "${email}" AND encrypted_password = "${password}"`);
  }
});

app.post('/signup', async (req: Request, res: Response) => {
  console.log('signup');
  const {
    email,
    password,
    firstName,
    lastName,
    passwordHint,
    secretQuestion,
    secretAnswer,
    clientLocation,
    registrationUrl,
    country,
    address,
    city,
    state,
    zip
  } = req.body;

  console.log(req.body);

  const encryptedPassword = md5(password);

  try {
    console.log(0);
    const [rows] = await connection.query('SELECT * FROM Parents');
    console.log(rows);
    console.log(1);

    const [result] = await connection.execute(
      `INSERT INTO Parents (
        email,
        encrypted_password,
        first_name,
        last_name,
        password_hint,
        secret_question,
        secret_answer,
        active,
        first_login,
        last_login,
        login_count,
        client_ip,
        client_location,
        registration_url,
        country,
        address,
        city,
        state,
        zip
      ) VALUES (?, ?, ?, ?, ?, ?, ?, true, NOW(), NOW(), 1, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        encryptedPassword,
        firstName,
        lastName,
        passwordHint,
        secretQuestion,
        secretAnswer,
        req.ip,
        clientLocation,
        registrationUrl,
        country,
        address,
        city,
        state,
        zip
      ]
    ) as any;
    console.log(2);

    // Set the user's session
    req.session.signedIn = true;
    req.session.user = {
      id: result.id,
      email: result.email
    };

    res.status(200).json({ message: 'Parent created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/signout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Signed out successfully');
    }
  });
});

app.post('/add_child', async (req: Request, res: Response) => {
  // Check if there is a valid session attached to the request

  // NOTE: This is commented out mainly because I needed this to be ready for my talk.
  // VTech probably did have this specific check in place.
  // if (!req.session.signedIn) {
  //   return res.status(401).send('Unauthorized');
  // }

  // Extract the child data from the request body
  const { username, domain, ll_child_id, ll_parent_id, parent_id, country_lang } = req.body;

  // Insert the child data into the database
  try {
    const [result] = await connection.execute(
      'INSERT INTO Children (username, domain, ll_child_id, ll_parent_id, parent_id, country_lang, create_datetime, expired_datetime) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [username, domain, ll_child_id, ll_parent_id, parent_id, country_lang]
    ) as any;
    const insertedId = result.id;
    res.status(201).send(`Child with ID ${insertedId} created`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
