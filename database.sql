-- GameShelf Database Schema

CREATE TYPE enum_Users_role AS ENUM ('user', 'admin');
CREATE TYPE enum_GameLists_status AS ENUM ('playing', 'completed', 'pending', 'abandoned', 'wishlist');

CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) DEFAULT NULL,
  bio TEXT DEFAULT NULL,
  role enum_Users_role DEFAULT 'user',
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE "GameLists" (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "Users"(id),
  "rawgId" INTEGER NOT NULL,
  status enum_GameLists_status NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  UNIQUE ("userId", "rawgId")
);

CREATE TABLE "Reviews" (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "Users"(id),
  "rawgId" INTEGER NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  UNIQUE ("userId", "rawgId")
);

CREATE TABLE "Likes" (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "Users"(id),
  "reviewId" INTEGER NOT NULL REFERENCES "Reviews"(id),
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  UNIQUE ("userId", "reviewId")
);