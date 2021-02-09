-- ♪♫ Living in the database ♪♫

-- old test things
DROP TABLE IF EXISTS things;

CREATE TABLE things (
    id INT AUTO_INCREMENT,
    thing VARCHAR(128) NOT NULL,
    number INT,
    PRIMARY KEY things(id)
);

-- DROP 'EM ALL! (╯°□°）╯︵ ┻━┻
DROP TABLE IF EXISTS
    PhotoReports, Photos,
    DumpsterTags, StandardTags, Tags,
    DumpsterCategories, Categories,
    Ratings, Comments,
    Dumpsters,
    StoreTypes, DumpsterTypes;

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

-- Dumpsters: Uniquely identified by position
--            (you better know what a dumpster is)
CREATE TABLE Dumpsters (
    dumpsterID INT PRIMARY KEY AUTO_INCREMENT,
    position POINT UNIQUE NOT NULL,
    name VARCHAR(64) NOT NULL,
    dateAdded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Categorization:
    dumpsterTypeID INT NOT NULL REFERENCES DumpsterTypes(dumpsterTypeID),
    storeTypeID INT NOT NULL REFERENCES StoreTypes(storeTypeID),

    -- Attributes:
    locked BOOLEAN NOT NULL,
    positiveStoreViewOnDiving BOOLEAN, -- NULL if unknown (triple boolean hell)
    emptyingSchedule VARCHAR(128), -- should this be nullable?
    cleanliness TINYINT UNSIGNED NOT NULL,

    -- Position index!
    SPATIAL INDEX (position)
);

-- Rating instances
-- A dumpster's rating is calculated as an average of
-- these instances (perhaps filtered by recency)
CREATE TABLE Ratings (
    ratingID INT PRIMARY KEY AUTO_INCREMENT,
    dumpsterID INT NOT NULL REFERENCES Dumpsters(dumpsterID),
    rating TINYINT UNSIGNED NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (dumpsterID)
);

-- Comments convey a diver's experience with a particular dumpster
CREATE TABLE Comments (
    commentID INT PRIMARY KEY AUTO_INCREMENT,
    dumpsterID INT NOT NULL REFERENCES Dumpsters(dumpsterID),
    nickname VARCHAR(24) NOT NULL,
    comment TEXT NOT NULL,
    rating TINYINT UNSIGNED NOT NULL DEFAULT 0, -- upvotes increment, downvotes decrement
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (date)
);

-- Photos give a clear view of the state of a dumpster
CREATE TABLE Photos (
    photoID INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(256) NOT NULL,
    key_ VARCHAR(256) NOT NULL, -- for deleting the photo if you regret everything
    dateAdded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (key_)
);

-- Photos may contain unwanted imagery that will need to be moderated
CREATE TABLE PhotoReports (
    photoReportID INT PRIMARY KEY AUTO_INCREMENT,
    photoID INT NOT NULL REFERENCES Photos(photoID),
    reason TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (photoID)
);

-- Categories are general types of content that *we* define
CREATE TABLE Categories (
    categoryID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(24) NOT NULL
);

-- Any dumpster could have contents of many categories
CREATE TABLE DumpsterCategories (
    dumpsterID INT NOT NULL REFERENCES Dumpsters(dumpsterID),
    categoryID INT NOT NULL REFERENCES Categories(categoryID),
    dateAdded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tags are *specific* content types
CREATE TABLE Tags (
    tagID INT PRIMARY KEY AUTO_INCREMENT,
    categoryID INT NOT NULL REFERENCES Categories(categoryID),
    name VARCHAR(24) NOT NULL
);

-- Contains data about the particular instance of the content type
CREATE TABLE DumpsterTags (
    dumpsterID INT NOT NULL REFERENCES Dumpsters(dumpsterID),
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
    INDEX (expiryDate)
);

-- Collection of foreign keys
CREATE TABLE StandardTags (
    tagID INT PRIMARY KEY REFERENCES Tags(tagID)
);
