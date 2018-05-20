CREATE DATABASE bamazon;

USE bamazon;

CREATE table products(
 id int not null AUTO_INCREMENT,
   product_name varchar(40) not null,
   department_name varchar(40) not null,
   price decimal(10,2) not null,
   stock_quantity int not null,
   primary key(id)
   );
   
INSERT INTO products (product_name,  department_name, price, stock_quantity) VALUES ('fish', 'animals', 10, 5);
INSERT INTO products (product_name,  department_name, price, stock_quantity) VALUES ('tacos', 'mexican food', 40, 1);
INSERT INTO products (product_name,  department_name, price, stock_quantity) VALUES ('chaise', 'furniture', 57, 3);
INSERT INTO products (product_name,  department_name, price, stock_quantity) VALUES ('conditioner', 'health & beauty', 45, 7);
INSERT INTO products (product_name,  department_name, price, stock_quantity) VALUES ('coffee', 'beverages', 2, 30);