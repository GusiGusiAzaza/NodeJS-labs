--create database BlueFoxMSSQLNodeJS;

use BlueFoxMSSQLNodeJS;
CREATE TABLE Users (
  [User_Id] int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [Username] varchar(20) NOT NULL,
  [Password_Hash] varchar(15) NOT NULL, 
);

CREATE TABLE Admins (
  [Admin_Id] int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [User_Id] int NOT NULL, 
);

CREATE TABLE User_Stats (
  [User_Id] int NOT NULL PRIMARY KEY,
  [Right_Answered] int,
  [Total_Answered] int,
  [Avg_Score] float,
  [Finished_Tests_Count] int,
  [Passed_Tests_Count] int, 
);

CREATE TABLE User_Info (
  [User_Id] int NOT NULL PRIMARY KEY,
  [Name] varchar(30),
  [Gender] varchar(15),
  [Location] varchar(50),
  [Birthday] datetime,
  [Summary] varchar(100),
  [Education] varchar(60),
  [Work] varchar(60), 
);

CREATE TABLE Test_Result (
  [Result_Id] int IDENTITY(1,1) PRIMARY KEY,
  [User_Id] int,
  [Test_Id] int,
  [Try_Count] int,
  [Is_Passed] int,
  [Score] float,
  [Right_Answers_Count] int,
  [Questions_Count] int,
  [Start_Date] datetime,
  [End_Date] datetime,
);

CREATE TABLE Tests (
  [Test_Id] int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [Admin_Id] int,
  [Test_Name] varchar(50),
  [Theme_Id] int, 
  [Time_Limit_In_Minutes] int,
  [Passing_Score] float,
  [Is_Enabled] int,
);

CREATE TABLE Questions_For_Tests (
  [Question_Id] int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [Test_Id] int,
  [Question_Number] int,
  [Question] varchar(200), 
);

CREATE TABLE Answers_For_Tests (
  [Answer_Id] int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [Answer] varchar(200),
  [Is_Right] int NOT NULL,
  [Question_Id] int, 
);

CREATE TABLE Themes_For_Tests (
  [Theme_Id] int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [Theme_Name] varchar(70), 
);

CREATE TABLE User_Answers (
  [Result_Id] int,
  [Question_Id] int,
  [User_Answer] int
);


ALTER TABLE Users ADD CONSTRAINT Username_Unique UNIQUE (username);

ALTER TABLE Themes_For_Tests ADD CONSTRAINT Themes_Unique UNIQUE (Theme_Name);

ALTER TABLE Admins ADD FOREIGN KEY (User_Id) REFERENCES Users (User_Id);
        
ALTER TABLE User_Stats ADD FOREIGN KEY (User_Id) REFERENCES Users (User_Id);
        
ALTER TABLE User_Info ADD FOREIGN KEY (User_Id) REFERENCES Users (User_Id);
        
ALTER TABLE Test_Result ADD FOREIGN KEY (User_Id) REFERENCES Users (User_Id);
        
ALTER TABLE Test_Result ADD FOREIGN KEY (Test_Id) REFERENCES Tests (Test_Id);
        
ALTER TABLE Tests ADD FOREIGN KEY (Admin_Id) REFERENCES Admins (Admin_Id);
        
ALTER TABLE Tests ADD FOREIGN KEY (Theme_Id) REFERENCES Themes_For_Tests (Theme_Id);
        
ALTER TABLE Questions_For_Tests ADD FOREIGN KEY (Test_Id) REFERENCES Tests (Test_Id);
        
ALTER TABLE Answers_For_Tests ADD FOREIGN KEY (Question_Id) REFERENCES Questions_For_Tests (Question_Id) ON DELETE CASCADE;

ALTER TABLE User_Answers ADD FOREIGN KEY (Result_Id) REFERENCES Test_Result (Result_Id);

ALTER TABLE User_Answers ADD FOREIGN KEY (Question_Id) REFERENCES Questions_For_Tests (Question_Id);

ALTER TABLE User_Answers ADD FOREIGN KEY (User_Answer) REFERENCES Answers_For_Tests (Answer_Id);


DROP TABLE Users;
DROP TABLE Admins;
DROP TABLE User_Stats;
DROP TABLE User_Info;
DROP TABLE Test_Result;
DROP TABLE Tests;
DROP TABLE Questions_For_Tests;
DROP TABLE Answers_For_Tests;
DROP TABLE Themes_For_Tests;
DROP TABLE User_Answers;