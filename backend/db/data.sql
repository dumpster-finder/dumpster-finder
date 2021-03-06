-- ♪♫ It doesn't even matter if there is no hope ♪♫
-- ♪♫ As the madness of the system grows ♪♫

-- Glorious test data! I summon you!

INSERT INTO DumpsterPositions(dumpsterID, position, revisionID)
VALUES
    (1, Point(63.416916, 10.354478), NULL),
    (2, Point(63.435008, 10.410727), NULL),
    (3, Point(63.467127, 10.941596), NULL),
    (4, Point(63.409747, 10.438794), NULL),
    (5, Point(63.412930, 10.431018), NULL),
    (6, Point(63.361335, 10.379476), NULL),
    (7, Point(63.429731, 10.394115), NULL),
    (8, Point(63.443608, 10.379993), NULL);


INSERT INTO Dumpsters(dumpsterID, revisionID, position, name, dumpsterTypeID, storeTypeID, locked, positiveStoreViewOnDiving, cleanliness, emptyingSchedule, info, dateAdded, dateUpdated)
VALUES
    (1, 45, Point(63.416916, 10.354478), 'Byaasen senter', 3, 5, FALSE, TRUE, 2, 'Don\'t know', 'Nothing to be said.', '2020-02-23', '2020-02-23'),
    (1, 1, Point(63.416916, 10.354478), 'Byåsen senter', 3, 5, FALSE, TRUE, 2, 'Don\'t know', 'Nothing to be said.', '2020-02-23', '2021-03-04'),
    (2, 51, Point(63.435008, 10.410727), 'Månesiden senter', 1, 2, FALSE, TRUE, 4, 'Every other week','Usually a lot of barfed-up goods.', '2020-11-30', '2020-11-30'),
    (2, 2, Point(63.435008, 10.410727), 'Solsiden senter', 1, 2, FALSE, TRUE, 4, 'Every other week','Usually a lot of baked goods.', '2020-11-30', '2020-12-24'),
    (3, 52, Point(63.467127, 10.941596), 'Rema 1000 Sthørdal', 2, 2, FALSE, FALSE, 5, 'Last friday of the month', 'Mostly useless stuff, but if you are lucky you find good value', '2020-07-14', '2020-07-14'),
    (3, 3, Point(63.467127, 10.941596), 'Rema 1000 Stjørdal', 2, 2, FALSE, FALSE, 5, 'Last friday of the month', 'Mostly useless stuff, but if you are lucky you find good value', '2020-07-14', '2021-02-12'),
    (4, 68, Point(63.409747, 10.438794), 'Rema 1000 Loholt', 1, 1, TRUE, TRUE, 5, 'Second Bursday every month', 'Don\'t know if panyone can benter', '2020-08-30', '2020-08-30'),
    (4, 69, Point(63.409747, 10.438794), 'Rema 1000 Loholt', 1, 1, TRUE, TRUE, 5, 'Second Thursday every month', 'Don\'t know if panyone can benter', '2020-08-30', '2020-10-24'),
    (4, 4, Point(63.409747, 10.438794), 'Rema 1000 Moholt', 1, 1, TRUE, FALSE, 5, 'Second Thursday every month', 'Don\'t know if anyone can enter', '2020-08-30', '2021-04-01'),
    (5, 77, Point(63.412930, 10.431018), 'Bunnrips Moholt', 1, 1, TRUE, FALSE, 3, 'Fridays at 15pm', 'A bit dirty. Watch where you touch', '2020-06-23', '2020-06-23'),
    (5, 78, Point(63.412930, 10.431018), 'Bunnpris Moholt', 1, 1, FALSE, FALSE, 3, 'Fridays at 15pm', 'A bit dirty. Watch where you touch', '2020-06-23', '2020-07-04'),
    (5, 5, Point(63.412930, 10.431018), 'Bunnpris Moholt', 1, 1, TRUE, TRUE, 3, 'Fridays at 15pm', 'Somewhat dirty. Watch where you touch.', '2020-06-23', '2020-02-20'),
    (6, 6, Point(63.361335, 10.379476), 'City Syd Tiller', 2, 5, FALSE, NULL, 4, 'Mondays at 13pm', 'A bit hard to find. It is hidden under a roof', '2020-10-10', '2020-10-10'),
    (7, 79, Point(63.429731, 10.394115), 'Trondheim Torg', 2, 5, FALSE, NULL, 4, 'Don\'t  know', 'It is behind the building where the deliveries are', '2020-05-17', '2020-05-17'),
    (7, 7, Point(63.429731, 10.394115), 'Trondheim Torg', 2, 5, FALSE, NULL, 4, 'Don\'t  know', 'It is behind the building where goods are delivered', '2020-05-17', '2020-06-03');

UPDATE DumpsterPositions SET revisionID = 1 WHERE dumpsterID = 1;
UPDATE DumpsterPositions SET revisionID = 2 WHERE dumpsterID = 2;
UPDATE DumpsterPositions SET revisionID = 3 WHERE dumpsterID = 3;
UPDATE DumpsterPositions SET revisionID = 4 WHERE dumpsterID = 4;
UPDATE DumpsterPositions SET revisionID = 5 WHERE dumpsterID = 5;
UPDATE DumpsterPositions SET revisionID = 6 WHERE dumpsterID = 6;
UPDATE DumpsterPositions SET revisionID = 7 WHERE dumpsterID = 7;

INSERT INTO DumpsterCategories(dumpsterID, revisionID, categoryID)
VALUES
    -- Byåsen senter
    (1, 1, 1),  -- dairy
    (1, 1, 2),  -- bread
    (1, 1, 3),  -- vegetables
    (1, 1, 9),  -- candy
    (1, 1, 12), -- pasta
    (1, 1, 16), -- eggs
    -- Solsiden
    (2, 2, 7),  -- seafood
    (2, 2, 11), -- rice
    (2, 2, 12), -- pasta
    (2, 2, 13), -- fish
    (2, 2, 15), -- noodles
    -- Stjørdal
    (3, 3, 1),  -- dairy
    (3, 3, 2),  -- bread
    (3, 3, 3),  -- vegetables
    (3, 3, 5),  -- fruit
    (3, 3, 7),  -- seafood
    (3, 3, 9),  -- candy
    (3, 3, 11), -- rice
    (3, 3, 12), -- pasta
    (3, 3, 13), -- fish
    (3, 3, 15), -- noodles
    (3, 3, 16), -- eggs
    -- Rema 1000 Moholt
    (4, 4, 1),  -- dairy
    (4, 4, 4),  -- meat
    (4, 4, 5),  -- fruit
    (4, 4, 10), -- nuts
    (4, 4, 14), -- cereals
    -- Bunnpris Moholt
    (5, 5, 4),  -- meat
    (5, 5, 7),  -- seafood
    (5, 5, 13),  -- fish
    (5, 5, 15),  -- noodles
    -- City Syd Tiller
    (6, 6, 3),  -- vegetables
    (6, 6, 5),  -- fruit
    (6, 6, 8),  -- chocolate
    (6, 6, 9),  -- candy
    -- Trondheim Torg
    (7, 7, 1),  -- dairy
    (7, 7, 2),  -- bread
    (7, 7, 3),  -- vegetables
    (7, 7, 4),  -- meat
    (7, 7, 5),  -- fruit
    (7, 7, 6),  -- Pastries
    (7, 7, 7),  -- seafood
    (7, 7, 8),  -- chocolate
    (7, 7, 9),  -- candy
    (7, 7, 10),  -- nuts
    (7, 7, 11), -- rice
    (7, 7, 12), -- pasta
    (7, 7, 13), -- fish
    (7, 7, 14), -- cereals
    (7, 7, 15), -- noodles
    (7, 7, 16); -- eggs

INSERT INTO Users(userID, passwordHash, salt)
VALUES
(1, 'temp', 'temp'),
(2, 'temp1', 'temp2'),
(3, 'temp2', 'temp1'),
(4, 'temp3', 'temp3'),
(5, 'temp4',  'temp4'),
(6, 'temp5',  'temp5'),
(7, 'temp6',  'temp6'),
(8, '52ca3a47e839d66f419297abde8a1dc7d4507162d9ca308270a8a84879110e75aa8f78ce7c2af2c41c26752a84ad422d79d2a91928b7a99ee47674c3a526fc13c6a550148317aa507c2adc6cd5508b27af2c607e0a8060cfd7cdc6f88e9edce276f08d25',
 '1c45a7c753a365624c8fafa53e7b70e2');
-- crawl daring message team lamp develop



INSERT INTO Ratings(userID, dumpsterID, rating)
VALUES
    (1, 1, 3),
    (2, 1, 5),
    (3, 1, 5),
    (4, 1, 4),
    (1, 2, 5),
    (2, 2, 3),
    (3, 2, 3),
    (1, 3, 2),
    (2, 3, 3),
    (1, 4, 3),
    (2, 4, 4),
    (3, 4, 2),
    (4, 4, 1),
    (5, 4, 2),
    (1, 5, 1),
    (1, 6, 4),
    (5, 7, 2),
    (6, 7, 3);

INSERT INTO DumpsterContents
    (dumpsterID, contentID, amount, unit, quality, expiryDate, foundDate)
VALUES
    (1, 1, 23, 'pieces', 3, '2023-04-30', '2021-02-18'), -- cheese
    (1, 2, 23, 'liters', 3, '2021-03-30', '2021-03-20'), -- Milk
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

INSERT INTO Photos (photoID, dumpsterID, url, userID, dateAdded)
VALUES
    (1, 1, 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Dumpster-non.JPG', 2, '2021-03-24'),
    (11, 1, 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Blue_dumpster.jpg', 2, '2021-02-13'),
    (12, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/American_Education_in_Dumpster.jpg/640px-American_Education_in_Dumpster.jpg', 2, '2020-12-13'),
    (2, 3, 'https://images.unsplash.com/photo-1510251197878-a2e6d2cb590c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 2, '2021-03-24'),
    (3, 3, 'https://images.unsplash.com/photo-1607536243899-57a307af22c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80', 2, '2021-03-24'),
    (4, 4, 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80', 2, '2021-03-24'),
    (5, 5, 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 2, '2021-03-24'),
    (6, 6, 'https://images.unsplash.com/photo-1599691823377-545103b0137c?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', 2, '2021-03-24');

INSERT INTO Visits (dumpsterID, userID)
VALUES
(1,1),
(1,3),
(1,4),
(2,1),
(2,3),
(3,1),
(3,5),
(4,4),
(5,2),
(5,3),
(5,4),
(5,5);

INSERT INTO DumpsterReports(dumpsterID, userID, reason) VALUES
(7, 3, 'Does not exist'),
(7, 4, 'It is a troll'),
(1, 2, null),
(2, 2, 'Is illegal'),
(2, 5, ''),
(7, 5, null);

INSERT INTO Comments(commentID, dumpsterID, nickname, userID, comment, rating, date)
VALUES
(1, 1, 'Tore på sporet', 2,'Found some great pastries.', 5, '2021-02-22 12:50:05'),
(2, 1, 'TrashBin', 3,'Would anyone join for a dive here?', 6, '2021-02-28 15:40:45'),
(3, 1, 'Trash panda', 4,'Please leave some for others as well', 2, '2021-03-01 22:34:49'),
(4, 2, 'Trash panda', 5,'Mostly food here, but some other stuff as well', 0, '2021-01-02 23:32:23'),
(5, 3, 'Diver', 6,'I never find anything here', 3, '2021-01-15 14:36:45'),
(6, 5, 'TheDive', 2,'This dumpster is locked. Remember that breaking locks is illegal.', 3, '2021-01-17 13:36:34'),
(7, 6, 'trOLlhaUgEn', 2,'haha dumpster go brrr', -10, '2021-03-24 14:52:30'),
(8, 6, 'Stephan', 2,'Fantastic dumpster! There\'s always something to find here', 12, '2021-01-02 23:09:51'),
(9, 6, 'Frodo', 2,'Found lots of fresh vegetables here last time.', 7, '2021-02-14 21:40:00'),
(10, 6, 'Surpomp', 2,'Bacheloren deres suger', -5, '2020-12-24 12:21:00');
