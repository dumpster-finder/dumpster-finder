-- ♪♫ Living in the database ♪♫

-- old test things
DROP TABLE IF EXISTS thangs, things;

CREATE TABLE things (
    id INT AUTO_INCREMENT,
    thing VARCHAR(128) NOT NULL,
    number INT,
    PRIMARY KEY things(id)
    );

CREATE TABLE thangs (
    id INT PRIMARY KEY AUTO_INCREMENT ,
    name VARCHAR(128) NOT NULL,
    thingID INT NOT NULL REFERENCES things(id),
    FOREIGN KEY things(thingID)
        REFERENCES things (id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);
SET foreign_key_checks = 0;
-- DROP 'EM ALL! (╯°□°）╯︵ ┻━┻
DROP TABLE IF EXISTS
    PhotoReports, Photos,
    DumpsterTags, StandardTags, Tags,
    DumpsterCategories, Categories,
    Ratings, Comments,
    DumpsterReports,  Dumpsters, DumpsterPositions,
    StoreTypes, DumpsterTypes;
SET foreign_key_checks = 1;
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
-- Dumpster Positions: Stores dumpster id and position
-- saves a lot of pain using UUID and revision while maintaining
-- unique positions for non revised dumpsters
CREATE TABLE DumpsterPositions (
    dumpsterID INT PRIMARY KEY AUTO_INCREMENT,
    position POINT UNIQUE NOT NULL,
    revisionID INT REFERENCES Dumpsters(dumpsterID),
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
    emptyingSchedule VARCHAR(128), -- should this be nullable?
    cleanliness TINYINT UNSIGNED NOT NULL,
    userID VARCHAR(256),

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
        ON UPDATE RESTRICT ON DELETE RESTRICT
);
ALTER TABLE DumpsterPositions ADD FOREIGN KEY (revisionID) references Dumpsters(revisionID) ON UPDATE RESTRICT ON DELETE SET NULL;



-- Dumpster may not exist, or there might be misinformation in the data.
-- This should be reported.
CREATE TABLE DumpsterReports (
    dumpsterReportID INT PRIMARY KEY AUTO_INCREMENT,
    dumpsterID INT NOT NULL REFERENCES DumpsterPositions(dumpsterID),
    reason TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (dumpsterID),
    FOREIGN KEY DumpsterReports(dumpsterID)
        REFERENCES DumpsterPositions (dumpsterID)
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
    FOREIGN KEY Ratings(dumpsterID)
        REFERENCES DumpsterPositions (dumpsterID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Comments convey a diver's experience with a particular dumpster
CREATE TABLE Comments (
    commentID INT PRIMARY KEY AUTO_INCREMENT,
    dumpsterID INT NOT NULL REFERENCES DumpsterPositions(dumpsterID),
    nickname VARCHAR(24) NOT NULL,
    comment TEXT NOT NULL,
    rating TINYINT UNSIGNED NOT NULL DEFAULT 0, -- upvotes increment, downvotes decrement
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
    FOREIGN KEY Photos(dumpsterID)
        REFERENCES DumpsterPositions (dumpsterID)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Photos may contain unwanted imagery that will need to be moderated
CREATE TABLE PhotoReports (
    photoReportID INT PRIMARY KEY AUTO_INCREMENT,
    photoID INT NOT NULL REFERENCES Photos(photoID),
    reason TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (photoID),
    FOREIGN KEY PhotoReports(photoID)
        REFERENCES Photos (photoID)
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
    amount INT,
    unit VARCHAR(12),

    -- Quality rating:
    quality TINYINT UNSIGNED,

    -- Dates:
    foundDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiryDate TIMESTAMP,
    INDEX (foundDate),
    INDEX (expiryDate),
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
