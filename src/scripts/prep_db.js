require("dotenv").config();

const { sql } = require("@vercel/postgres");

const createIdGenerator = async () => {
  await sql`
    CREATE FUNCTION generate_unique_id(machine_id INT) RETURNS TEXT AS $$
    DECLARE
      epoch BIGINT := 1609459200000; -- 1 Jan 2021 2AM GMT+02:00
      current_millis BIGINT;
      sequence_id INT;
      last_timestamp BIGINT := 0;
      sequence BIGINT := 0;
      unique_id BIGINT;
    BEGIN
      current_millis := (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT;
      IF current_millis = last_timestamp THEN
        sequence := (sequence + 1) & 4095; -- 12 bits
        IF sequence = 0 THEN
          WHILE current_millis <= last_timestamp LOOP
            current_millis := (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT;
          END LOOP;
        END IF;
      ELSE
        sequence := 0;
      END IF;
      last_timestamp := current_millis;
      unique_id := ((current_millis - epoch) << 22) | (machine_id << 12) | sequence;
      RETURN unique_id::TEXT;
    END;
    $$ LANGUAGE plpgsql;
  `;
};

const createUsersTable = async () => {
  await sql`
    CREATE TABLE users (
      id TEXT DEFAULT generate_unique_id(1) PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email TEXT UNIQUE,
      avatar_url TEXT,
      favorites TEXT[],
      wishlist TEXT[],
      role VARCHAR(50) DEFAULT 'user' NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;
};

const createPropertiesTable = async () => {
  await sql`
    CREATE TABLE properties (
      id TEXT DEFAULT generate_unique_id(1) PRIMARY KEY,
      agent_id TEXT REFERENCES users(id) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      listing_type VARCHAR(255) NOT NULL,
      price NUMERIC(15) NOT NULL,
      bedrooms SMALLINT NOT NULL,
      bathrooms SMALLINT NOT NULL,
      address TEXT NOT NULL,
      banner_url TEXT,
      images TEXT[],
      featured BOOLEAN DEFAULT false NOT NULL,
      delisted BOOLEAN DEFAULT false NOT NULL,
      added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;
};

(async () => {
  await sql`DROP TABLE IF EXISTS properties;`;
  await sql`DROP TABLE IF EXISTS users;`;
  await sql`DROP FUNCTION IF EXISTS generate_unique_id(INT);`;

  await createIdGenerator()
    .then(() => {
      console.log(
        "✅ Successfully created stored function 'generate_unique_id'."
      );
    })
    .catch((reason) => {
      console.error(
        "❌ Could not create stored function 'generate_unique_id':\n",
        reason
      );
    });

  await createUsersTable()
    .then(() => {
      console.log("✅ Successfully created table 'users'.");
    })
    .catch((reason) => {
      console.error("❌ Could not create table 'users':\n", reason);
    });

  await createPropertiesTable()
    .then(() => {
      console.log("✅ Successfully created table 'properties'.");
    })
    .catch((reason) => {
      console.error("❌ Could not create table 'properties':\n", reason);
    });
})();
