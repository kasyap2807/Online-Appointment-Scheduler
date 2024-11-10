create database appointment;
use appointment;
create table booking (slotno int , time time, start_time time);
insert into booking values(1,"00:30:00","09:00:00");
insert into booking values(2,"00:30:00","09:30:00");
insert into booking values(3,"00:30:00","10:00:00");
insert into booking values(4,"00:30:00","10:30:00");
insert into booking values(5,"00:30:00","11:00:00");
insert into booking values(6,"00:30:00","11:30:00");
insert into booking values(7,"00:30:00","12:00:00");

-- create table newbook ( booking_id long, date date, slot int, for_id long, user_id long ) ;
-- select * from newbook;
-- drop table newbook;

-- select * from booking where !( (slotno in (select slotno from booking)) and (slotno in (select slot from newbook where (date = "2024-05-09" and for_id = 1))));
-- select * from newbook where for_id = 2;

-- update newbook set date = "2024-05-08", slot = 4 where booking_id = 1;
-- select slot from newbook where date = "2024-05-05";
-- -- if(x<10 or x>12)

-- show tables;

-- select * from users;

-- insert into users (email,password,name,phone_number,type_of_user) values ("kanups","kkk","kasyp","789456120",0);

-- drop table users;

-- select * from providers;

-- select id,name from providers where designation="Endocrinologist";