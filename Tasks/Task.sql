// -- practice

create database if not exists collegeQuestion;

use collegeQuestion;

// -- TASK 1 ---

create table if not exists teacher(

id int primary key,
name varchar(50) not null,
subject varchar(50),
salary int default 25000

);

insert into teacher
(id,name,subject,salary)
values
(23,"ajay","math",57000),
(47,"bharat","english",60000),
(18,"chethan","chemistry",45000),
(9,"divya","physics",75000);

select * from teacher;

select * from teacher
where salary>50000;

// -- TO ALTER THE Column NAME --

alter table teacher
change column salary ctc int;


set SQL_SAFE_UPDATES =0;     -- for First Time Trying To update--

// -- TO UPDATE ALL SALARY BY 25% --

update teacher
set ctc = ctc +(.25)*ctc;

// -- TO ADD NEW COLUMN TO TABLE --

alter table teacher
add column city varchar(50) default "Gurgan";

// -- DELETING THE COLUMN ---

alter table teacher
drop column ctc;

// -- TASK 2 ---

create table if not exists student(

	rollno int primary key,
    name varchar(50) not null,
    city varchar(50) default "banglore",
    marks int default 0
    
);

insert into student
(rollno,name,city,marks)
values
(110,"adam","delhi",76),
(108,"bob","mumbai",65),
(124,"casey","pune",94),
(112,"duke","pune",80);

select * from student;

select name from student
where marks>75;

// -- To Select Unique Cities From city column --

select distinct city from student;

// -- (or) By making groups This Can be Achieved --

select city
from student
group by city;

// -- Maximum In perticular Cities --

select city,max(marks)
from student
group by city;

// -- Average Of Class --

select avg(marks)
from student;

// -- Add new Column grade based on marks ---

alter table student
add column grade varchar(2) default 'F';

update student
set grade="O"
where marks>80;

update student
set grade="A"
where marks>= 70 and marks<=80;

update student
set grade="B"
where marks>= 60 and marks<=70;