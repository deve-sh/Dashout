CREATE TABLE "users" (
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

CREATE TABLE "merchants" (
    "id" varchar(75) NOT NULL PRIMARY KEY,
    "email" varchar(255) NOT NULL,
    "name" varchar(255),
    "uid" varchar(255) NOT NULL references users(uid) ON DELETE CASCADE ON UPDATE
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