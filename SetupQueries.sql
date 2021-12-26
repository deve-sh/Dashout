CREATE TABLE "users" (
    "uid" varchar(75) NOT NULL PRIMARY KEY,
    "email" varchar(255) NOT NULL,
    "email_verified" boolean DEFAULT 0,
    "display_name" varchar(255),
    "phone_number" varchar(255) UNIQUE,
    "photo_url" varchar(255) DEFAULT NULL,
    "provider_info" text,
    "disabled" boolean DEFAULT 0
);