-- ♪♫ In the database, database ♪♫
-- ♪♫ I'm struggling in the database, wow wow ♪♫

-- This file sets up things you'd need in production
-- as well as in a testing environment

INSERT INTO Categories(categoryID, name)
VALUES
(1, 'Dairy'),
(2, 'Bread'),
(3, 'Vegetables'),
(4, 'Meat'),
(5, 'Fruit'),
(6, 'Pastries'),
(7, 'Seafood'),
(8, 'Chocolate'),
(9, 'Candy'),
(10, 'Nuts'),
(11, 'Rice'),
(12, 'Pasta'),
(13, 'Fish'),
(14, 'Cereals'),
(15, 'Noodles'),
(16, 'Eggs');

INSERT INTO StoreTypes(storeTypeID, name)
VALUES
(1, 'Grocery Store'),
(2, 'General Store'),
(3, 'Bakery'),
(4, 'Furniture Store'),
(5, 'Miscellaneous');

INSERT INTO DumpsterTypes(dumpsterTypeID , name)
VALUES
(1, 'Compressor'),
(2, 'Large Container'),
(3, 'Small Container'),
(4, 'Trash Bin');

INSERT INTO ContentTypes(contentID, categoryID, name)
VALUES
(1, 1, 'Cheese'),
(2, 1, 'Milk'),
(3, 3, 'Squash'),
(4, 3, 'Potatoes'),
(5, 7, 'Oysters'),
(6, 4, 'Steamed ham'),
(7, 6, 'Bread'),
(8, 8, 'Milk chocolate');

INSERT INTO StandardContentTypes(contentID)
VALUES
(1), (2), (4), (7), (8);
