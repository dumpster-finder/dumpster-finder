-- ♪♫ Living in the database ♪♫

-- old test things
DROP TABLE IF EXISTS points, things;
CREATE TABLE points (g POINT);

CREATE TABLE things (
    id INT AUTO_INCREMENT,
    thing VARCHAR(128) NOT NULL,
    number INT,
    PRIMARY KEY things(id)
);

DROP TABLE IF EXISTS
    PhotoReports, Photos,
    Ratings, Comments,
    Dumpsters,
    StoreTypes, DumpsterTypes;

-- Dumpster types: Compressor, dumpster, idk
CREATE TABLE DumpsterTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(24) NOT NULL
);

-- Store types: Grocery, electronics, etc.
CREATE TABLE StoreTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(24) NOT NULL
);

CREATE TABLE Dumpsters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    position POINT UNIQUE NOT NULL,
    name VARCHAR(64) NOT NULL,

    -- Categorization:
    type INT NOT NULL REFERENCES DumpsterTypes(id),
    storeType INT NOT NULL REFERENCES StoreTypes(id),

    -- Attributes:
    locked BOOLEAN NOT NULL,
    positiveViewOnDiving BOOLEAN NOT NULL,
    emptyingSchedule VARCHAR(128), -- should this be nullable?
    cleanliness TINYINT UNSIGNED NOT NULL,

    -- Position index!
    SPATIAL INDEX (position)
);

-- Rating instances
-- A dumpster's rating is calculated as an average of
-- these instances (perhaps filtered by recency)
CREATE TABLE Ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dumpster INT NOT NULL REFERENCES Dumpsters(id),
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    rating INT NOT NULL,
    INDEX (dumpster)
);

CREATE TABLE Comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dumpster INT NOT NULL REFERENCES Dumpsters(id),
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nickname VARCHAR(24) NOT NULL,
    comment TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 0, -- upvotes increment, downvotes decrement
    INDEX (date)
);

CREATE TABLE Photos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(256) NOT NULL,
    key_ VARCHAR(256) NOT NULL, -- for deleting the photo if you regret everything
    INDEX (key_)
);


CREATE TABLE PhotoReports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    photo INT NOT NULL REFERENCES Photos(id),
    reason TEXT NOT NULL,
    INDEX (photo)
);

-- Categories are general types of content that *we* define
CREATE TABLE Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(24) NOT NULL
);

-- Connection
CREATE TABLE DumpsterCategories (
    dumpster INT NOT NULL REFERENCES Dumpsters(id),
    category INT NOT NULL REFERENCES Categories(id)
);

-- Tags are *specific* content types
CREATE TABLE Tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category INT NOT NULL REFERENCES Categories(id),
    tag VARCHAR(24) NOT NULL
);

-- Contains data about the particular instance of the content type
CREATE TABLE DumpsterTags (
    dumpster INT NOT NULL REFERENCES Dumpsters(id),
    tag INT NOT NULL REFERENCES Tags(id),

    -- Composite amount:
    amount INT NOT NULL,
    unit VARCHAR(12) NOT NULL,

    -- Quality rating:
    quality INT NOT NULL,

    -- Dates:
    foundDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiryDate TIMESTAMP NOT NULL,
    INDEX (foundDate),
    INDEX (expiryDate)
);

-- Collection of foreign keys
CREATE TABLE StandardTags (
    tag INT PRIMARY KEY REFERENCES Tags(id)
);
