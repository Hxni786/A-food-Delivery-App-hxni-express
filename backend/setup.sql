-- setup.sql
-- Run this script to create the database and seed sample data

CREATE DATABASE IF NOT EXISTS hxni_express;
USE hxni_express;

CREATE TABLE IF NOT EXISTS restaurants (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(100)  NOT NULL,
  cuisine   VARCHAR(50)   NOT NULL,
  rating    DECIMAL(2,1)  NOT NULL CHECK (rating BETWEEN 1.0 AND 5.0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clear existing data (safe for dev re-runs)
TRUNCATE TABLE restaurants;

-- Seed data
INSERT INTO restaurants (name, cuisine, rating) VALUES
  ('The Golden Fork',      'Italian',    4.8),
  ('Sakura Garden',        'Japanese',   4.7),
  ('Spice Route',          'Indian',     4.6),
  ('Le Petit Bistro',      'French',     4.5),
  ('Dragon Palace',        'Chinese',    4.5),
  ('Casa Mexico',          'Mexican',    4.4),
  ('The Burger Lab',       'American',   4.3),
  ('Olive & Vine',         'Mediterranean', 4.3),
  ('Seoul Kitchen',        'Korean',     4.2),
  ('Bella Napoli',         'Italian',    4.2),
  ('Saffron House',        'Indian',     4.1),
  ('Pho Saigon',           'Vietnamese', 4.0),
  ('Greek Agora',          'Greek',      3.9),
  ('Thai Orchid',          'Thai',       3.9),
  ('Ramen Republic',       'Japanese',   3.8);
