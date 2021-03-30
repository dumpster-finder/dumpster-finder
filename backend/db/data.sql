INSERT INTO Categories(categoryID, name)
VALUES
    (1, 'Dairy'),
    -- TODO remove
    (2, 'Batteries'),
    (3, 'Vegetables'),
    (4, 'Meat'),
    -- TODO reconsider
    (5, 'Tools'),
    (6, 'Pastries'),
    (7, 'Seafood'),
    (8, 'Chocolate'),
    (9, 'Candy');

INSERT INTO StoreTypes(storeTypeID, name)
VALUES
    (1, 'Grocery Store'),
    -- TODO don't forget to remove this!
    (2, 'Electronics Store'),
    (3, 'Bakery'),
    (4, 'Furniture Store'),
    (5, 'Miscellaneous');

INSERT INTO DumpsterTypes(dumpsterTypeID , name)
VALUES
    (1, 'Compressor'),
    (2, 'Large Container'),
    (3, 'Small Container'),
    (4, 'Trash Bin');

INSERT INTO DumpsterPositions(dumpsterID, position, revisionID)
VALUES
    (1, Point(63.416916, 10.354478), NULL),
    (2, Point(63.435008, 10.410727), NULL),
    (3, Point(63.467127, 10.941596), NULL),
    (4, Point(63.409747, 10.438794), NULL),
    (5, Point(63.412930, 10.431018), NULL),
    (6, Point(63.361335, 10.379476), NULL),
    (7, Point(63.429731, 10.394115), NULL);

INSERT INTO Dumpsters
    (dumpsterID, revisionID, position, name, dumpsterTypeID, storeTypeID, locked, positiveStoreViewOnDiving, cleanliness, emptyingSchedule, info)
VALUES
    (1, 45, Point(63.416916, 10.354478), 'Byaasen senter', 3, 5, FALSE, TRUE, 2, 'Don\'t know', 'Nothing to be said.'),
    (1, 1, Point(63.416916, 10.354478), 'Byåsen senter', 3, 5, FALSE, TRUE, 2, 'Don\'t know', 'Nothing to be said.'),
    (2, 51, Point(63.435008, 10.410727), 'Månesiden senter', 1, 2, FALSE, TRUE, 4, 'Every other week','Usually a lot of barfed-up goods.'),
    (2, 2, Point(63.435008, 10.410727), 'Solsiden senter', 1, 2, FALSE, TRUE, 4, 'Every other week','Usually a lot of baked goods.'),
    (3, 52, Point(63.467127, 10.941596), 'Elkjop Sthørdal', 2, 2, FALSE, 5, TRUE, 'Last friday of the month', 'Mostly broken stuff, but if you are lucky you find good value'),
    (3, 3, Point(63.467127, 10.941596), 'Elkjøp Stjørdal', 2, 2, FALSE, 5, TRUE, 'Last friday of the month', 'Mostly broken stuff, but if you are lucky you find good value'),
    (4, 68, Point(63.409747, 10.438794), 'Rema 1000 Loholt', 1, 1, TRUE, TRUE, 5, 'Second Bursday every month', 'Don\'t know if panyone can benter'),
    (4, 69, Point(63.409747, 10.438794), 'Rema 1000 Loholt', 1, 1, TRUE, TRUE, 5, 'Second Thursday every month', 'Don\'t know if panyone can benter'),
    (4, 4, Point(63.409747, 10.438794), 'Rema 1000 Moholt', 1, 1, TRUE, FALSE, 5, 'Second Thursday every month', 'Don\'t know if anyone can enter'),
    (5, 77, Point(63.412930, 10.431018), 'Bunnrips Moholt', 1, 1, TRUE, FALSE, 3, 'Fridays at 15pm', 'A bit dirty. Watch where you touch'),
    (5, 78, Point(63.412930, 10.431018), 'Bunnpris Moholt', 1, 1, TRUE, FALSE, 3, 'Fridays at 15pm', 'A bit dirty. Watch where you touch'),
    (5, 5, Point(63.412930, 10.431018), 'Bunnpris Moholt', 1, 1, FALSE, TRUE, 3, 'Fridays at 15pm', 'Somewhat dirty. Watch where you touch.'),
    (6, 6, Point(63.361335, 10.379476), 'City Syd Tiller', 2, 5, FALSE, NULL, 4, 'Mondays at 13pm', 'A bit hard to find. It is hidden under a roof'),
    (7, 79, Point(63.429731, 10.394115), 'Trondheim Torg', 2, 5, FALSE, NULL, 4, 'Don\'t  know', 'It is behind the building where the deliveries are'),
    (7, 7, Point(63.429731, 10.394115), 'Trondheim Torg', 2, 5, FALSE, NULL, 4, 'Don\'t  know', 'It is behind the building where goods are delivered');

INSERT INTO Comments(commentID, dumpsterID, nickname, comment, rating, date)
VALUES
    (1, 1, 'Tore pa sporet', 'Found some great pastries.', 5, '2021-02-22 12:50:05'),
    (2, 1, 'TrashBin', 'Would anyone join for a dive here?', 6, '2021-02-28 15:40:45'),
    (3, 1, 'Trash panda', 'Please leave some for others as well', 2, '2021-03-01 22:34:49'),
    (4, 2, 'Trash panda', 'Mostly food here, but some other stuff as well', 0, '2021-01-02 23:32:23'),
    (5, 3, 'Diver', 'I never find anything here', 3, '2021-01-15 14:36:45'),
    (6, 5, 'TheDive', 'This dumpster is locked. Remember that breaking locks is illegal', 3, '2021-01-17 13:36:34');

UPDATE DumpsterPositions SET revisionID = 1 WHERE dumpsterID = 1;
UPDATE DumpsterPositions SET revisionID = 2 WHERE dumpsterID = 2;
UPDATE DumpsterPositions SET revisionID = 3 WHERE dumpsterID = 3;
UPDATE DumpsterPositions SET revisionID = 4 WHERE dumpsterID = 4;
UPDATE DumpsterPositions SET revisionID = 5 WHERE dumpsterID = 5;
UPDATE DumpsterPositions SET revisionID = 6 WHERE dumpsterID = 6;
UPDATE DumpsterPositions SET revisionID = 7 WHERE dumpsterID = 7;

INSERT INTO DumpsterCategories(dumpsterID, revisionID, categoryID)
VALUES
    (1, 1, 1),
    (1, 1, 3),
    (2, 2, 7),
    (3, 3, 2),
    (3, 3, 5),
    (4, 4, 1),
    (4, 4, 4),
    (5, 5, 7),
    (5, 5, 1),
    (6, 6, 3),
    (6, 6, 1),
    (7, 7, 6);


INSERT INTO Ratings(userID, dumpsterID, rating)
VALUES
    ('temp1', 1, 3),
    ('temp2', 1, 5),
    ('temp3', 1, 5),
    ('temp4', 1, 4),
    ('temp1', 2, 5),
    ('temp2', 2, 3),
    ('temp3', 2, 3),
    ('temp1', 3, 2),
    ('temp2', 3, 3),
    ('temp1', 4, 3),
    ('temp2', 4, 4),
    ('temp3', 4, 2),
    ('temp4', 4, 1),
    ('temp5', 4, 2),
    ('temp1', 5, 1),
    ('temp1', 6, 4),
    ('temp5', 7, 2),
    ('temp6', 7, 3);

INSERT INTO Tags(tagID, categoryID, name)
VALUES
    (1, 1, 'Cheese'),
    (2, 1, 'Milk'),
    (3, 3, 'Squash'),
    (4, 3, 'Potatoes'),
    (5, 7, 'Oysters'),
    (6, 4, 'Steamed ham'),
    (7, 6, 'Bread'),
    (8, 8, 'Milk chocolate');

INSERT INTO StandardTags(tagID)
VALUES
    (1), (2), (4), (7), (8);

INSERT INTO DumpsterTags
    (dumpsterID, tagID, amount, unit, quality, expiryDate, foundDate)
VALUES
    (1, 1, 23, 'pieces', 3, '2023-04-30', '2021-02-18'), -- cheese
    (1, 2, 23, 'liters', 3, '2021-03-30', '2021-03-20'), -- potatoes
    (3, 3,  7,     NULL, 3, '2021-04-22', '2021-03-17'), -- squash
    (3, 4,  2,  'kilos', 4, '2021-12-12', '2021-03-28'), -- potatoes
    (4, 5,  3,  'kilos', 5, '2021-05-03', '2021-03-14'), -- oysters
    (4, 8,  3,   'bars', 5, '2021-08-30', '2021-03-17'), -- chocolate
    (4, 7,  1,   'loaf', 3, '2021-04-11', '2021-03-16'), -- bread
    (5, 7,  3, 'loaves', 4, '2021-04-02', '2021-03-04'), -- bread
    (5, 6,  1,     NULL, 4, '2021-04-02', '2021-03-04'), -- steamed ham
    (6, 8, 20,   'bars', 5, '2022-08-24', '2021-02-28'), -- chocolate
    (6, 5,  3,  'kilos', 4, '2021-05-21', '2021-02-03'), -- oysters
    (7, 4,  5,  'kilos', 4, '2021-12-21', '2021-03-20'); -- potatoes
