# Cat Gacha

A fun and engaging gacha game featuring collectible cats!

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- PostgreSQL (v12 or later)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cat-gacha.git
cd cat-gacha
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Create PostgreSQL Database

```sql
# Access PostgreSQL prompt
psql

# Create database user (if not exists)
CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'your_secure_password';

# Create database
CREATE DATABASE cat_gacha_local;

# Exit psql
\q
```

#### Run Database Migrations

```bash
# Run schema script
psql -U postgres -d cat_gacha_local -f db/schema.sql

# Seed initial data
psql -U postgres -d cat_gacha_local -f db/seed.sql
```

### 4. Environment Configuration

Create a `.env` file in the project root and add your database credentials:

```
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cat_gacha_local
```

### 5. Start the Server

```bash
npm run dev
```

### 6. Access the Application

Open your browser and navigate to `http://localhost:5500`

## Technologies Used

- **Backend**: Express.js
- **Database**: PostgreSQL
- **Templating**: EJS
- **Frontend**: Bootstrap

## Project Structure

```
cat-gacha/
├── db/
│   ├── schema.sql       # Database structure
│   └── seed.sql         # Initial data
├── public/              # Static files (CSS, client-side JS)
├── views/               # EJS templates
└── index.js             # Main server file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## Credits

- Cat icon: "Cat in a Box" by hyesunkim from [Noun Project](https://thenounproject.com/browse/icons/term/cat-in-a-box/) (CC BY 3.0)
- SVG/Icon: Jeyda Leong

## License

