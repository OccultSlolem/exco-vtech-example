# Exco-VTech-Example

I built this demo for a talk for the "Ethical Hacking Kitchen" Experimental College class
at SF State. It is a full stack app built to emulate some of the basic functionality - and 
critical security flaws - of the VTech server that was involved in a massive 2015 data breach.

The backend is written in TypeScript and uses [Express](https://expressjs.com) and
[MySQL](https://mysql.com) to provide a REST API and database access. The frontend is
written in vanilla HTML and JavaScript and uses [Bootstrap](https://getbootstrap.com) for styling.

I mainly set out to create a demonstrative based on the information available at the time.
It is almost certainly much less complex than VTech's actual server. I don't claim that this
is remotely a perfect emulation of the VTech server now or at the time.

No affiliation with VTech or any of its subsidiaries.

**I hope this goes without saying:** please do not use this code in production. It is
intended for educational purposes only.

## Setup

1. Clone the repository

```bash
git clone https://github.com/occultslolem/exco-vtech-example.js
```

**Via Docker:** (recommended)

You need to have [Docker](https://docker.com) installed. This will set up both the server
and the database in one fell swoop, which is why I recommend this method.

```bash
docker-compose up
```

**Via Node.js:**

You need to have [Node.js](https://nodejs.org) and [MySQL](https://mysql.com) installed.

First, you need to start up your MySQL server. The steps to do this will depend on your OS.

Then, you need to create the databases and tables. You can do this by running the SQL script under ``db/schema.sql``:

```bash
mysql -u root -p < db/schema.sql
```

With that set up, you can start the server:

```bash
cd app
npm install
npm run start
```

**Once the server is running:**

Open your browser and navigate to ``http://localhost:3030``.

## References

- [When Children are Hacked - Inside the Massive VTech Hack](https://www.troyhunt.com/when-children-are-breached-inside/) by Troy Hunt
- [No, VTech cannot Simply Absolve Itself of Security Responsibility](https://www.troyhunt.com/no-vtech-cannot-simply-absolve-itself/) by Troy Hunt
- [One of the Largest Hacks Yet Exposes Data on Hundreds of Thousands of Kids](https://www.vice.com/en/article/yp3z5v/one-of-the-largest-hacks-yet-exposes-data-on-hundreds-of-thousands-of-kids) by Lorenzo Franceschi-Bicchierai for Vice Motherboard
