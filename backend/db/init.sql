-- ♪♫ Living in the database ♪♫

-- Enter the danger zone
SET foreign_key_checks = 0;
-- DROP 'EM ALL! (╯°□°）╯︵ ┻━┻
DROP TABLE IF EXISTS
    PhotoReports, Photos,
    DumpsterTags, StandardTags, Tags,
    DumpsterCategories, Categories,
    Ratings, Comments,
    DumpsterReports,  Dumpsters, DumpsterPositions,
    Users, StoreTypes, DumpsterTypes, Visits;
-- Get back to safe terrain
SET foreign_key_checks = 1;

DELIMITER ;;
DROP FUNCTION IF EXISTS SPHERICAL_DISTANCE;;
-- Calculate spherical distance using the Haversine formula
-- Based on https://stackoverflow.com/a/56669074, but modified for correctness
-- Using a custom function since none exist in MariaDB
CREATE FUNCTION SPHERICAL_DISTANCE(`pt1` POINT, `pt2` POINT) RETURNS
    DECIMAL(10,2)
DETERMINISTIC
BEGIN
    SET @lat1 = ST_X(pt1) * pi()/180;
    SET @long1 = ST_Y(pt1) * pi()/180;
    SET @lat2 = ST_X(pt2) * pi()/180;
    SET @long2 = ST_Y(pt2) * pi()/180;
    RETURN 12742000 * ASIN(SQRT(
            POWER(SIN((@lat2 - @lat1)/2), 2)
            + COS(@lat1) * COS(@lat2) * POWER(SIN((@long1 - @long2)/2), 2)
    ));
END;;
DELIMITER ;

-- Dumpster types: Compressor, dumpster, idk
CREATE TABLE DumpsterTypes (
    dumpsterTypeID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(24) NOT NULL
);

-- Store types: Grocery, electronics, etc.
CREATE TABLE StoreTypes (
    storeTypeID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(24) NOT NULL
);
-- Store types: Grocery, electronics, etc.
CREATE TABLE Users (
    userID VARCHAR(256) PRIMARY KEY,
    userName VARCHAR(256) UNIQUE NOT NULL,
    salt VARCHAR(256) NOT NULL
    );
-- Dumpster Positions: Stores dumpster id and position
-- saves a lot of pain using UUID and revision while maintaining
-- unique positions for non revised dumpsters
CREATE TABLE DumpsterPositions (
    dumpsterID INT PRIMARY KEY AUTO_INCREMENT,
    position POINT UNIQUE NOT NULL,
    revisionID INT, -- references Dumpsters(revisionID)
    SPATIAL INDEX (position)
);
-- Dumpsters: Uniquely identified by position
--            (you better know what a dumpster is)
CREATE TABLE Dumpsters (
    revisionID INT PRIMARY KEY AUTO_INCREMENT,
    dumpsterID INT NOT NULL REFERENCES DumpsterPositions(dumpsterID),
    position POINT NOT NULL,
    name VARCHAR(64) NOT NULL,
    dateAdded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dateUpdated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Categorization:
    dumpsterTypeID INT NOT NULL REFERENCES DumpsterTypes(dumpsterTypeID),
    storeTypeID INT NOT NULL REFERENCES StoreTypes(storeTypeID),

    -- Attributes:
    locked BOOLEAN NOT NULL,
    positiveStoreViewOnDiving BOOLEAN, -- NULL if unknown (triple boolean hell)
    emptyingSchedule VARCHAR(128) NOT NULL, -- should this be nullable?
    cleanliness TINYINT UNSIGNED NOT NULL,
    userID VARCHAR(256),
    info TEXT NOT NULL,

    -- Position index!
    SPATIAL INDEX (position),
    CONSTRAINT dumpsterFK1 FOREIGN KEY Dumpsters(dumpsterTypeID)
        REFERENCES DumpsterTypes (dumpsterTypeID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT dumpsterFK2 FOREIGN KEY Dumpsters(dumpsterID)
        REFERENCES DumpsterPositions (dumpsterID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT dumpsterFK3 FOREIGN KEY Dumpsters(storeTypeID)
        REFERENCES StoreTypes (storeTypeID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT dumpsterFK4 FOREIGN KEY Dumpsters(userID)
        REFERENCES Users (userID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

ALTER TABLE DumpsterPositions ADD FOREIGN KEY (revisionID) references Dumpsters(revisionID) ON UPDATE RESTRICT ON DELETE SET NULL;



-- Dumpster may not exist, or there might be misinformation in the data.
-- This should be reported.
CREATE TABLE DumpsterReports (
    dumpsterReportID INT PRIMARY KEY AUTO_INCREMENT,
    dumpsterID INT NOT NULL REFERENCES DumpsterPositions(dumpsterID),
    userID VARCHAR(256),
    reason TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (dumpsterID),
    CONSTRAINT dumpsterReportFK1 FOREIGN KEY DumpsterReports(dumpsterID)
        REFERENCES DumpsterPositions (dumpsterID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT dumpsterReportFK2 FOREIGN KEY DumpsterReports(userID)
        REFERENCES Users (userID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Rating instances
-- A dumpster's rating is calculated as an average of
-- these instances (perhaps filtered by recency)
CREATE TABLE Ratings (
    userID VARCHAR(256),
    dumpsterID INT NOT NULL REFERENCES DumpsterPositions(dumpsterID),
    rating TINYINT UNSIGNED NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (dumpsterID),
    PRIMARY KEY(userID, dumpsterID),
    CONSTRAINT ratingFK1 FOREIGN KEY Ratings(dumpsterID)
        REFERENCES DumpsterPositions (dumpsterID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT ratingFK2 FOREIGN KEY Ratings(userID)
        REFERENCES Users (userID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Comments convey a diver's experience with a particular dumpster
CREATE TABLE Comments (
    commentID INT PRIMARY KEY AUTO_INCREMENT,
    dumpsterID INT NOT NULL REFERENCES DumpsterPositions(dumpsterID),
    nickname VARCHAR(24) NOT NULL,
    comment TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 0, -- upvotes increment, downvotes decrement
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (date),
    FOREIGN KEY Comments(dumpsterID)
        REFERENCES DumpsterPositions (dumpsterID)
        ON UPDATE RESTRICT ON DELETE RESTRICT

);

-- Photos give a clear view of the state of a dumpster
CREATE TABLE Photos (
    photoID INT PRIMARY KEY AUTO_INCREMENT,
    dumpsterID INT NOT NULL REFERENCES DumpsterPositions(dumpsterID),
    url VARCHAR(256) NOT NULL,
    userID VARCHAR(256) NOT NULL, -- for deleting the photo if you regret everything
    dateAdded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (userID),
    CONSTRAINT photosFK1 FOREIGN KEY Photos(dumpsterID)
        REFERENCES DumpsterPositions (dumpsterID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT photosFK2 FOREIGN KEY Photos(userID)
        REFERENCES Users (userID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Photos may contain unwanted imagery that will need to be moderated
CREATE TABLE PhotoReports (
    photoReportID INT PRIMARY KEY AUTO_INCREMENT,
    photoID INT NOT NULL REFERENCES Photos(photoID),
    userID VARCHAR(256),
    reason TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (photoID),
    CONSTRAINT photoReportFK1 FOREIGN KEY PhotoReports(photoID)
        REFERENCES Photos (photoID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT photoReportFK2 FOREIGN KEY PhotoReports(userID)
        REFERENCES Users (userID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Categories are general types of content that *we* define
CREATE TABLE Categories (
    categoryID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(24) NOT NULL
);

-- Any dumpster could have contents of many categories
CREATE TABLE DumpsterCategories (
    dumpsterID INT NOT NULL REFERENCES DumpsterPositions(dumpsterID),
    revisionID INT NOT NULL REFERENCES Dumpsters(revisionID),
    categoryID INT NOT NULL REFERENCES Categories(categoryID),
    dateAdded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT dumpsterCategoriesFK1 FOREIGN KEY DumpsterCategories(dumpsterID)
        REFERENCES DumpsterPositions (dumpsterID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT dumpsterCategoriesFK2 FOREIGN KEY DumpsterCategories(revisionID)
        REFERENCES Dumpsters (revisionID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT dumpsterCategoriesFK3 FOREIGN KEY DumpsterCategories(categoryID)
        REFERENCES Categories (categoryID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Tags are *specific* content types
CREATE TABLE Tags (
    tagID INT PRIMARY KEY AUTO_INCREMENT,
    categoryID INT NOT NULL REFERENCES Categories(categoryID),
    name VARCHAR(24) NOT NULL,
    FOREIGN KEY Tags(categoryID)
        REFERENCES Categories (categoryID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Contains data about the particular instance of the content type
CREATE TABLE DumpsterTags (
    dumpsterID INT NOT NULL REFERENCES DumpsterPositions(dumpsterID),
    tagID INT NOT NULL REFERENCES Tags(tagID),

    -- Composite amount:
    amount FLOAT,
    unit VARCHAR(12),

    -- Quality rating:
    quality TINYINT UNSIGNED,

    -- Dates:
    foundDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiryDate TIMESTAMP,
    INDEX (foundDate),
    INDEX (expiryDate),
    CONSTRAINT dumpsterTagsPK PRIMARY KEY DumpsterTags(dumpsterID, tagID, foundDate),
    CONSTRAINT dumpsterTagsFK1 FOREIGN KEY DumpsterTags(dumpsterID)
        REFERENCES DumpsterPositions (dumpsterID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT dumpsterTagsFK2 FOREIGN KEY DumpsterTags(tagID)
        REFERENCES Tags (tagID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Collection of foreign keys
CREATE TABLE StandardTags (
    tagID INT PRIMARY KEY REFERENCES Tags(tagID),
    FOREIGN KEY StandardTags(tagID)
        REFERENCES Tags (tagID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Visitors: Date a dumpster is visited
CREATE TABLE Visits (
    dumpsterID INT NOT NULL,
    visitDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userID VARCHAR(256) NOT NULL,
    CONSTRAINT visitsPK PRIMARY KEY Visits(dumpsterID, visitDate, userID),
    CONSTRAINT visitsFK1 FOREIGN KEY Visits(dumpsterID)
        REFERENCES Dumpsters(dumpsterID)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT visitsFK2 FOREIGN KEY Visits(userID)
        REFERENCES Users(userID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
    );
