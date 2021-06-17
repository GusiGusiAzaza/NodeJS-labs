create table USERS (
	id nvarchar,
	username nvarchar(10),
	password nvarchar(10)
)

insert into users values (1, 'gusi', 'gusi');
insert into users values (2, 'gusi', 'azaza');
insert into users values (3, 'ilya', 'valera');

drop table users;

select * from users;