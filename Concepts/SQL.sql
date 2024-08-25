create database if not exists college;
create database if not exists instagram;

use  college;

create table if not exists student(
	
    rollno int,
    name varchar(30),
    age int
);

create table if not exists teacher(
	
    ID int,
    name varchar(30),
    subject varchar(30)
);

insert into student
values
(1,"Nischay",20),
(2,"Vaibhav",20),
(3,"Mahadev",20);


select * from student;

insert into teacher
values
(1,"Nischay","Maths"),
(2,"Vaibhav","English"),
(3,"Mahadev","civil");

select * from teacher;

show databases;
drop database if exists instagram;

use instagram;

create table if not exists users(
	id int primary key,
    age int,
    name varchar(50) not null,
    email varchar(50) unique,
    followers int default 0,
    following int default 0,
    constraint age  check(age>10)
);

insert into users
(id,age,name,email,followers,following)
values
(1,13,"NISCHAY","nischay@gmail.com",10,15),
(2,18,"VAIBHAV","v@gmail.com",100,15),
(3,10,"MAHADEV","M@gmail.com",10,35),
(4,10,"ANIRUDH","a@gmail.com",50,14),
(5,30,"NITHYAN","n@gmail.com",30,19);

select * from users;
select distinct age from users;

create table if not exists posts(

	id int primary key,
    content varchar(100),
    userid int ,
    foreign key (userid) references users(id)
);

insert into posts
(id,content,userid)
values
(1,"helllo...",1),
(2,"hiiiiii...",2),
(3,"helllo i am...",1);

select * from posts;

// -- clauses --

use instagram;

// -- where clauses ---

select name ,followers 
from users
where followers >15;

// -- where clauses with arithmetic  ---

select name ,followers ,following
from users
where followers >15 and following >10;

select name ,followers ,following
from users
where followers >15 or following >10;

select name ,followers ,following
from users
where  age between 15 and 20;

select name ,followers ,following
from users
where followers in (10);

select name ,followers ,following
from users
where followers not in (10);

// -- LIMIT CLAUSE --

select * from users
limit 3;

select name ,followers 
from users
where followers >10
limit 2;

// -- ORDER BY CLAUSE --

select *
from users
order by name asc;  -- by which column the order should be applied  (name)  --

// -- Agregate Functions count(),max(),min(),sum(),avg(); ---

select count(followers)
from users
where followers=10;

select max(followers)
from users;

select min(followers)
from users;

select avg(followers)
from users;

// -- Group by (generally used with agregate functions) ---

select age,count(id)  
from users
group by age;

select age,max(followers)  
from users
group by age;

// -- Have similar to where ( but used for groups) --

select age,max(followers)  
from users
group by age
having age>15;

// -- GENERAL ORDER ---

select
from
where
group by
having
order by;

// -- TABLE QUIRES --

// -- UPDATE (related with Rows) ---

set SQL_SAFE_UPDATES =0;

update users
set followers=600
where age=10;

select * from users;

// -- DELETE QUIRE --

delete from users
where age=18;

// -- ALTER QUIRE (related with columns) --

alter table users
add column city varchar(50) default "Banglore";

alter table users
drop column city;

alter table users
rename instausers;

alter table instausers
rename users;

// -- To change column name --

alter table users
change name username varchar(50) not null;

// -- To modify data of Column --

alter table users
modify age varchar(2) not null; -- data type--


// -- Drop quire --

drop table posts;

// -- Truncate quire --

// -- (here table exists by all the data will be deleted )--

truncate table users;