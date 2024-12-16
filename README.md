# Cat Gacha

A gacha game featuring collectible cats!

## Prerequisites
- Node.js
- PostgreSQL

## Setup Instructions

1. **Install Dependencies**

npm install

2. **Database Setup**
Connect to PostgreSQL 
```sql
# Connect to PostgreSQL as postgres user
psql -U postgres

# Create database
CREATE DATABASE cat_gacha_local;

# Exit psql
\q
```
Run schema and seed files
psql -U postgres -d cat_gacha_local -f db/schema.sql
psql -U postgres -d cat_gacha_local -f db/seed.sql
3. **Start the Server**
bash
npm run dev
cat-gacha/

4. Visit `http://localhost:5500` in your browser

## Technologies Used
- Express.js
- PostgreSQL
- EJS
- Bootstrap

## Project Structure

<!-- cat-gacha/
├── db/
│ ├── schema.sql # Database structure
│ └── seed.sql # Sample data
├── public/ # Static files
├── views/ # EJS templates
└── index.js # Main server file -->

Credits:
1. cat in a box by hyesunkim from <a href="https://thenounproject.com/browse/icons/term/cat-in-a-box/" target="_blank" title="cat in a box Icons">Noun Project</a> (CC BY 3.0)
2. Jeyda Leong - colored SVG/ ICON

