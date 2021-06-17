select * from users;
select * from repos;
select * from commits;
drop table users;
drop table repos;
drop table commits;

CREATE TABLE users (
  id INT NOT NULL IDENTITY(1,1),
  username VARCHAR(16) NOT NULL,
  email VARCHAR(255) NULL,
  password VARCHAR(32) NOT NULL,
  role VARCHAR(5) NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE repos (
  id INT NOT NULL IDENTITY(1,1),
  name VARCHAR(255) NULL DEFAULT NULL,
  authorId INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_repos_users
    FOREIGN KEY (authorId)
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE commits (
  id INT NOT NULL IDENTITY(1,1),
  repoId INT NULL DEFAULT NULL,
  message VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_commits_repos
    FOREIGN KEY (repoId)
    REFERENCES repos (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
