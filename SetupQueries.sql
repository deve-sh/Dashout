CREATE TABLE IF NOT EXISTS "users" (
    "uid" varchar(75) NOT NULL PRIMARY KEY,
    "email" varchar(255) NOT NULL,
    "email_verified" boolean DEFAULT 0,
    "display_name" varchar(255),
    "phone_number" varchar(255) UNIQUE,
    "photo_url" varchar(255) DEFAULT NULL,
    "provider_info" text,
    "disabled" boolean DEFAULT 0,
    "n_transactions" integer DEFAULT 0,
    "n_merchants" integer DEFAULT 0,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP(),
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE IF NOT EXISTS "merchants" (
    "id" varchar(75) NOT NULL PRIMARY KEY,
    "email" varchar(255) NOT NULL,
    "name" varchar(255),
    "user" varchar(255) NOT NULL references users(uid) ON DELETE CASCADE ON UPDATE
    SET
        NULL,
        "phone_number" varchar(255) UNIQUE NOT NULL,
        "description" text DEFAULT NULL,
        "photo_url" varchar(255) DEFAULT NULL,
        "client_id" varchar(255) NOT NULL UNIQUE,
        "client_secret" varchar(255) NOT NULL UNIQUE,
        "created_at" timestamp DEFAULT CURRENT_TIMESTAMP(),
        "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP(),
        "n_transactions" integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "orders" (
    "id" varchar(75) NOT NULL PRIMARY KEY,
    "title" varchar(255),
    "description" text DEFAULT "",
    "merchant" varchar(255) NOT NULL references merchants(id) ON DELETE CASCADE ON UPDATE
    SET
        NULL,
        "item_id" varchar(255) NOT NULL,
        "item_name" varchar(255) NOT NULL,
        "item_description" varchar(255),
        "price_per_unit" float,
        "quantity" float,
        "currency" varchar(5) DEFAULT "INR",
        "paid" boolean DEFAULT 0,
        "paid_at" timestamp DEFAULT NULL,
        "created_at" timestamp DEFAULT CURRENT_TIMESTAMP(),
        "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP(),
)