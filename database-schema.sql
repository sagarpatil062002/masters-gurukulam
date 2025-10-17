-- MongoDB Collections Schema (SQL-like representation for clarity)
-- Note: This is a conceptual representation. MongoDB uses collections and documents, not tables and rows.

-- Collection: courses
CREATE TABLE courses (
    _id ObjectId PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Collection: faculty
CREATE TABLE faculty (
    _id ObjectId PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    photo VARCHAR(500) NOT NULL, -- URL to photo
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Collection: facilities
CREATE TABLE facilities (
    _id ObjectId PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500) NOT NULL, -- URL to image
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Collection: testimonials
CREATE TABLE testimonials (
    _id ObjectId PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    feedback TEXT NOT NULL,
    image VARCHAR(500), -- Optional URL to photo
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Collection: activities
CREATE TABLE activities (
    _id ObjectId PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    images TEXT[] NOT NULL, -- Array of image URLs
    date DATE NOT NULL,
    type VARCHAR(100), -- Optional category (e.g., Sports, Academic)
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Collection: contacts
CREATE TABLE contacts (
    _id ObjectId PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Collection: exams
CREATE TABLE exams (
    _id ObjectId PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    banner VARCHAR(500), -- Optional URL to banner image
    registrationStartDate DATE NOT NULL,
    registrationEndDate DATE NOT NULL,
    examFee DECIMAL(10,2) NOT NULL,
    isRegistrationOpen BOOLEAN DEFAULT TRUE,
    resultPublished BOOLEAN DEFAULT FALSE,
    resultLink VARCHAR(500), -- Optional URL to result
    answerBookLink VARCHAR(500), -- Optional URL to answer book
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Collection: examregistrations
CREATE TABLE examregistrations (
    _id ObjectId PRIMARY KEY,
    examId ObjectId REFERENCES exams(_id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    examCentre VARCHAR(255) NOT NULL,
    languagePreference VARCHAR(100) NOT NULL,
    idProof VARCHAR(500) NOT NULL, -- URL to uploaded file
    optionalDocuments TEXT[], -- Array of URLs
    paymentStatus ENUM('pending', 'successful', 'failed') DEFAULT 'pending',
    paymentAmount DECIMAL(10,2),
    hallTicketGenerated BOOLEAN DEFAULT FALSE,
    hallTicketLink VARCHAR(500), -- Optional URL to generated hall ticket
    grievance TEXT,
    grievanceProof VARCHAR(500), -- Optional URL to proof file
    grievanceStatus ENUM('pending', 'resolved') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Collection: videos
CREATE TABLE videos (
    _id ObjectId PRIMARY KEY,
    url VARCHAR(500) NOT NULL, -- YouTube link or MP4 URL
    type ENUM('youtube', 'mp4') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_courses_createdAt ON courses(createdAt);
CREATE INDEX idx_faculty_createdAt ON faculty(createdAt);
CREATE INDEX idx_facilities_createdAt ON facilities(createdAt);
CREATE INDEX idx_testimonials_createdAt ON testimonials(createdAt);
CREATE INDEX idx_activities_date ON activities(date);
CREATE INDEX idx_contacts_createdAt ON contacts(createdAt);
CREATE INDEX idx_exams_createdAt ON exams(createdAt);
CREATE INDEX idx_examregistrations_examId ON examregistrations(examId);
CREATE INDEX idx_examregistrations_email ON examregistrations(email);
CREATE INDEX idx_videos_createdAt ON videos(createdAt);