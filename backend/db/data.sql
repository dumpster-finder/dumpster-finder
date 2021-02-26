INSERT INTO Categories(categoryID, name)
VALUES
    (1, 'Dairy'),
    (2, 'Batteries'),
    (3, 'Vegetables'),
    (4, 'Meat'),
    (5, 'Tools');

INSERT INTO StoreTypes(storeTypeID, name)
VALUES
    (1, 'Grocery'),
    (2, 'Electronics'),
    (3, 'Supermarket');

INSERT INTO DumpsterTypes(dumpsterTypeID , name)
VALUES
    (1, 'Compressor'),
    (2, 'Large Container'),
    (3, 'Small Container');

INSERT INTO DumpsterPositions(dumpsterID, position, revisionID)
VALUES
    (1, Point(12, 15), NULL),
    (2, Point(13, 15), NULL),
    (3, Point(12, 14), NULL);

INSERT INTO Dumpsters(dumpsterID, position, name, dumpsterTypeID, storeTypeID, locked, cleanliness, emptyingSchedule)
VALUES
    (1, Point(63.411402, 10.434084), 'Tore\'s store', 1, 1, FALSE, 5, 'First Tuesday in the month'),
    (2, Point(63.434678, 10.412455), 'Jon\'s store', 1, 2, FALSE, 5, 'Every day'),
    (3, Point(12, 14), 'Helenes (wrong) dumpster', 2, 2, FALSE, 5, 'No day'),
    (3, Point(63.412113, 10.440253), 'Helen\'s store', 2, 2, TRUE, 5, 'Mondays');

UPDATE DumpsterPositions SET revisionID = 1 WHERE dumpsterID = 1;
UPDATE DumpsterPositions SET revisionID = 2 WHERE dumpsterID = 2;
UPDATE DumpsterPositions SET revisionID = 4 WHERE dumpsterID = 3;
