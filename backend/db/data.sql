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
    (1, Point(63.411402, 10.434084), NULL),
    (2, Point(63.434678, 10.412455), NULL),
    (3, Point(63.412113, 10.440253), NULL);

INSERT INTO Dumpsters(dumpsterID, position, name, dumpsterTypeID, storeTypeID, locked, cleanliness, emptyingSchedule, info)
VALUES
    (1, Point(63.411402, 10.434084), 'Tore\'s store', 1, 1, FALSE, 5, 'First Tuesday in the month', 'Nothing to be said.'),
    (2, Point(63.434678, 10.412455), 'Jon\'s store', 1, 2, FALSE, 5, 'Every day', 'Just your regular, sleepy dumpster.'),
    (3, Point(12, 14), 'Helenes (wrong) dumpster', 2, 2, FALSE, 5, 'No day', 'If this shows up, something is *very* wrong.'),
    (3, Point(63.412113, 10.440253), 'Helen\'s store', 2, 2, TRUE, 5, 'Mondays', 'This is the correct revision. Phew.');

UPDATE DumpsterPositions SET revisionID = 1 WHERE dumpsterID = 1;
UPDATE DumpsterPositions SET revisionID = 2 WHERE dumpsterID = 2;
UPDATE DumpsterPositions SET revisionID = 4 WHERE dumpsterID = 3;

INSERT INTO DumpsterCategories(dumpsterID, revisionID, categoryID)
VALUES
    (1, 1, 1),
    (1, 1, 2),
    (2, 2, 7),
    (3, 3, 2),
    (3, 4, 3),
    (3, 4, 4);

INSERT INTO Ratings(userID, dumpsterID, rating)
VALUES
    ('temp1', 1, 2),
    ('temp2', 1, 3),
    ('temp3', 1, 3),
    ('temp4', 1, 4),
    ('temp5', 1, 2),
    ('temp6', 1, 2),
    ('temp7', 1, 2);
