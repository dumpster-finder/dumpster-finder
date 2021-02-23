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

INSERT INTO Dumpsters(dumpsterID, position, name, dumpsterTypeID, storeTypeID, locked, cleanliness)
VALUES
    (1, Point(12, 15), 'Tores dumpster', 1, 1, FALSE, 10),
    (2, Point(13, 15), 'Jons dumpster', 1, 2, FALSE, 10),
    (3, Point(12, 14), 'Helenes dumpster', 2, 2, FALSE, 10);

