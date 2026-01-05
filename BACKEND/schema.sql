
CREATE TABLE users(
 id SERIAL PRIMARY KEY,
 full_name TEXT,
 email TEXT UNIQUE,
 password_hash TEXT,
 role TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ministries(
 id SERIAL PRIMARY KEY,
 name TEXT,
 description TEXT,
 logo_url TEXT,
 founded_year INT,
 country TEXT,
 city TEXT,
 denomination TEXT,
 subscription_plan TEXT,
 created_by INT REFERENCES users(id),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
