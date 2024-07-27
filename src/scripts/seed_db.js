require("dotenv").config();

const { sql } = require("@vercel/postgres");
const { users, properties } = require("../lib/default_data");
const { hashSync } = require("bcrypt");

const seedUsersTable = async () => {
  return Promise.all(
    users.map(
      async ({
        id,
        username,
        password,
        firstname,
        lastname,
        email,
        avatar_url,
        favorites,
        wishlist,
        role,
      }) => {
        const hashedPsw = hashSync(password, 10);
        return sql`
          INSERT INTO users (id, username, password, firstname, lastname, email, avatar_url, favorites, wishlist, role)
          VALUES (${id}, ${username}, ${hashedPsw}, ${firstname}, ${lastname}, ${email}, ${avatar_url}, ${favorites}, ${wishlist}, ${role})
          ON CONFLICT (id) DO
          UPDATE
          SET
            username = ${username},
            password = ${hashedPsw},
            firstname = ${firstname},
            lastname = ${lastname},
            email = ${email},
            avatar_url = ${avatar_url},
            favorites = ${favorites},
            wishlist = ${wishlist},
            role = ${role},
            updated_at = CURRENT_TIMESTAMP;
        `;
      }
    )
  );
};

const seedPropertiesTable = async () => {
  return Promise.all(
    properties.map(
      ({
        id,
        agent_id,
        title,
        description,
        listing_type,
        price,
        bedrooms,
        bathrooms,
        address,
        banner_url,
        images,
        featured,
        delisted,
      }) => {
        return sql`
          INSERT INTO properties (id, agent_id, title, description, listing_type, price, bedrooms, bathrooms, address, banner_url, images, featured, delisted)
          VALUES (${id}, ${agent_id}, ${title}, ${description}, ${listing_type}, ${price}, ${bedrooms}, ${bathrooms}, ${address}, ${banner_url}, ${images}, ${featured}, ${delisted})
          ON CONFLICT (id) DO
          UPDATE
          SET
            agent_id = ${agent_id},
            title = ${title},
            description = ${description},
            listing_type = ${listing_type},
            price = ${price},
            bedrooms = ${bedrooms},
            bathrooms = ${bathrooms},
            address = ${address},
            banner_url = ${banner_url},
            images = ${images},
            featured = ${featured},
            delisted = ${delisted},
            updated_at = CURRENT_TIMESTAMP;
        `;
      }
    )
  );
};

(async () => {
  await seedUsersTable()
    .then(({ length }) => {
      console.log(`✅ Seeded ${length} users.`);
    })
    .catch((reason) => {
      console.error("❌ Could not seed 'users' table:\n", reason);
    });

  await seedPropertiesTable()
    .then(({ length }) => {
      console.log(`✅ Seeded ${length} properties.`);
    })
    .catch((reason) => {
      console.error("❌ Could not seed 'properties' table:\n", reason);
    });
})();
