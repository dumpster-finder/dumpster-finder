INSERT INTO Categories(categoryID, name)
VALUES
    (1, 'Dairy'),
    (2, 'Batteries'),
    (3, 'Vegetables'),
    (4, 'Meat'),
    (5, 'Tools'),
    (6, 'Pastries'),
    (7, 'Seafood');

INSERT INTO StoreTypes(storeTypeID, name)
VALUES
    (1, 'Grocery Store'),
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

INSERT INTO Dumpsters(dumpsterID, position, name, dumpsterTypeID, storeTypeID, locked, positiveStoreViewOnDiving, cleanliness, emptyingSchedule, info)
VALUES
    (1, Point(63.416916, 10.354478), 'Byasen senter', 3, 5, FALSE, TRUE, 2, 'Don\'t know', 'Nothing to be said.'),
    (2, Point(63.435008, 10.410727), 'Solsiden senter', 1, 2, FALSE, TRUE, 4, 'Every other week','Usually a lot of baked goods.'),
    (3, Point(63.467127, 10.941596), 'Elkjop Sthørdal', 2, 2, FALSE, 5, TRUE, 'Last friday of the month', 'Mostly broken stuff, but if you are lucky you find good value'),
    (4, Point(63.409747, 10.438794), 'Rema 1000 Moholt', 1, 1, TRUE, FALSE, 5, 'Second Thursday every month', 'Don\'t know if anyone can enter'),
    (5, Point(63.412930, 10.431018), 'Bunnpris Moholt', 1, 1, TRUE, TRUE, 3, 'Fridays at 15pm', 'A bit dirty. Watch where you touch'),
    (6, Point(63.361335, 10.379476), 'City Syd Tiller', 2, 5, FALSE, NULL, 4, 'Mondays at 13pm', 'A bit hard to find. It is hidden under a roof'),
    (7, Point(63.429731, 10.394115), 'Trondheim Torg', 2, 5, FALSE, NULL, 4, 'Don\'t  know', 'It is behind the building where the deliveries are');

INSERT INTO Comments(commentID, dumpsterID, nickname, comment, rating)
VALUES
    (1, 1, 'Tore pa sporet', 'Found some great pastries.', 5),
    (2, 1, 'TrashBin', 'Would anyone join for a dive here?', 6),
    (3, 1, 'Trash panda', 'Please leave some for others as well', 2),
    (4, 2, 'Trash panda', 'Mostly food here, but some other stuff as well', 0),
    (5, 3, 'Diver', 'I never find anything here', 3),
    (6, 5, 'TheDive', 'This is locked. Remember that breaking locks are ilegal', 3);

UPDATE DumpsterPositions SET revisionID = 1 WHERE dumpsterID = 1;
UPDATE DumpsterPositions SET revisionID = 2 WHERE dumpsterID = 2;
UPDATE DumpsterPositions SET revisionID = 4 WHERE dumpsterID = 3;

INSERT INTO DumpsterCategories(dumpsterID, revisionID, categoryID)
VALUES
    (1, 1, 1),
    (1, 1, 3),
    (2, 2, 7),
    (3, 3, 2),
    (3, 4, 5),
    (4, 1, 1),
    (4, 1, 4),
    (5, 2, 7),
    (5, 3, 1),
    (6, 4, 3),
    (6, 1, 1),
    (7, 1, 6);


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

