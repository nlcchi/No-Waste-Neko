drop database if exists user_db;
create database user_db;
use user_db;


-- Login info
CREATE TABLE if not exists useraccount (
  -- email varchar(64) NOT NULL,
  username varchar(20) NOT NULL,
  passwordHash varchar(64) NOT NULL
);

INSERT INTO useraccount (username, passwordHash) VALUES
('user', '$2y$10$EKPRz0VyZPumX63D7Z768ORzQMPNO4wg00AChOMUwKi/wOp1f7SlK');


ALTER TABLE useraccount 
  ADD PRIMARY KEY (username);


-- Saved recipes
CREATE TABLE if not exists userrecipes (
  username varchar(20) NOT NULL,
  imgURL varchar(225),
  recipeName varchar(64) NOT NULL,
  servingSize int(20),
  estCookingTime int(225),
  recipeURL varchar(225) NOT NULL
);

INSERT INTO userrecipes (username, imgURL, recipeName, servingSize, estCookingTime, recipeURL) VALUES
('user', '', 'Teriyaki Avocado Salmon', '', 45, 'https://www.eatwell101.com/teriyaki-salmon-bowl-recipe');

ALTER TABLE userrecipes 
  ADD FOREIGN KEY (username) REFERENCES useraccount(username);



-- Dietary requirements
CREATE TABLE if not exists userpreference (
  username varchar(20) NOT NULL,
  diet varchar(64),
  intolerence varchar(64)
);

INSERT INTO userpreference (username, diet, intolerence) VALUES
('user', 'vegan', ''),
('user', '', 'soy');

ALTER TABLE userpreference 
  ADD FOREIGN KEY (username) REFERENCES useraccount(username);


-- Fridge
CREATE TABLE if not exists userfridge (
  username varchar(20) NOT NULL,
  productName varchar(225) NOT NULL,
  productCat varchar(50),
  expiryDate date NOT NULL -- (YYYY-MM-DD)
);

INSERT INTO userfridge (userName, productName, productCat, expiryDate) VALUES
('user', 'Chicken', 'Meat', '2023-10-23');


ALTER TABLE userfridge 
  ADD FOREIGN KEY (username) REFERENCES useraccount(username);
