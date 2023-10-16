
CREATE DATABASE CMdatabase;
USE CMdatabase;

# Users

CREATE TABLE Users (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateLastLoggedIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `PhoneNumber` varchar(50) NOT NULL DEFAULT '',
  `Email` varchar(50) NOT NULL DEFAULT '',
  `Login` VARCHAR(50) NOT NULL DEFAULT '' UNIQUE ,
  `Password` VARCHAR(512) NOT NULL DEFAULT '' ,
  PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

# Contacts

CREATE TABLE Contacts (
  `ID` INT NOT NULL AUTO_INCREMENT ,
  `Name` VARCHAR(50) NOT NULL DEFAULT '' ,
  `Phone` VARCHAR(50) NOT NULL DEFAULT '' ,
  `Email` VARCHAR(50) NOT NULL DEFAULT '' ,
  `UserID` INT NOT NULL DEFAULT '0' ,
  PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

# Insert User Data

insert into Users (FirstName,LastName,PhoneNumber,Email,Login,Password) VALUES ('---','---','---','--@contactmanager4331.online','---','hash');
insert into Users (FirstName,LastName,PhoneNumber,Email,Login,Password) VALUES ('Joey','Crown','123-456-7890','jc@contactmanager4331.online','JoeyC','hash');
insert into Users (FirstName,LastName,PhoneNumber,Email,Login,Password) VALUES ('Caleb','Gibson','123-456-7890','cg@contactmanager4331.online','CalebG','hash');
insert into Users (FirstName,LastName,PhoneNumber,Email,Login,Password) VALUES ('Rahul','Mohan','123-456-7890','rm@contactmanager4331.online','RahulM','hash');
insert into Users (FirstName,LastName,PhoneNumber,Email,Login,Password) VALUES ('Rylan','Simpson','123-456-7890','rs@contactmanager4331.online','RylanS','hash');

# Insert Contact Data

insert into Contacts (Name,Phone,Email,UserID) VALUES ('Desiree Paucek','869-728-0333','Desiree_Paucek28@gmail.com',1);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Eldred Marvin','408-328-3511','Eldred_Marvin@yahoo.com',5);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Deanna Kassulke','961-201-2678','Deanna56@gmail.com',3);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Loma Effertz','079-333-7349','Loma12@hotmail.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Lavina McKenzie-Zieme','713-127-3666','Lavina.McKenzie-Zieme@yahoo.com',5);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Abdul Thiel','895-676-6929','Abdul.Thiel@hotmail.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Karson Bednar','636-473-5421','Karson92@hotmail.com',5);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Elouise Dooley','725-580-0435','Elouise_Dooley@gmail.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Clovis Carter','688-178-7875','Clovis_Carter50@hotmail.com',1);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Alena Effertz','345-195-8935','Alena49@gmail.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Daisha Crona-Brown','567-666-0922','Daisha.Crona-Brown@hotmail.com',5);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Katheryn Parker','066-918-4841','Katheryn72@yahoo.com',1);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Reanna Reinger','547-625-1054','Reanna.Reinger@hotmail.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Jazmyn Satterfield','804-761-2441','Jazmyn_Satterfield@gmail.com',3);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Lessie Wolff','312-489-7374','Lessie.Wolff@gmail.com',5);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Damian Halvorson','952-014-1613','Damian_Halvorson@yahoo.com',5);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Leanna Bogisich','961-927-3592','Leanna.Bogisich@gmail.com',1);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Khalil Koepp','736-548-8139','Khalil_Koepp25@gmail.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Heber Brekke','051-913-8374','Heber25@gmail.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Nat Gutkowski-Botsford','748-974-5631','Nat_Gutkowski-Botsford21@gmail.com',1);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Jayson Konopelski','666-698-9657','Jayson.Konopelski@gmail.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Camylle Doyle','298-093-6603','Camylle_Doyle77@yahoo.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('John Jones','741-683-8885','John79@gmail.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Ludwig Romaguera','539-366-7298','Ludwig83@gmail.com',1);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Cara Davis','105-725-7944','Cara.Davis@yahoo.com',1);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Jordan Hartmann','879-417-2972','Jordan.Hartmann@yahoo.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Maximo Marvin-Beatty','470-477-4118','Maximo63@hotmail.com',5);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Gaetano Marks','082-335-2723','Gaetano_Marks@hotmail.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Glenna Reilly','842-882-1489','Glenna_Reilly51@gmail.com',1);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Ocie Morar','642-336-3258','Ocie_Morar@gmail.com',3);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Ali Conroy','860-225-3742','Ali_Conroy88@yahoo.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Donato Pouros','223-864-3227','Donato_Pouros@hotmail.com',3);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Princess Glover','531-157-1187','Princess55@yahoo.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Deonte Reinger','572-798-2624','Deonte.Reinger@yahoo.com',1);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Eduardo O\'Hara','106-567-3861','Eduardo.OHara@yahoo.com',3);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Wiley Gislason','121-038-1416','Wiley_Gislason71@gmail.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Ora Harber','916-572-8470','Ora_Harber@hotmail.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Mariah Kautzer','141-462-9398','Mariah62@yahoo.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Susana Lynch','487-279-4831','Susana.Lynch81@yahoo.com',3);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Eda Champlin','947-674-2758','Eda69@yahoo.com',3);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Michel Lindgren','030-315-9867','Michel_Lindgren25@gmail.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Terrence Robel','587-294-1328','Terrence18@hotmail.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Leilani Hessel','076-170-2950','Leilani.Hessel@gmail.com',3);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Lucas Frami','277-417-2230','Lucas.Frami96@gmail.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Halie Bogan','614-248-2705','Halie45@gmail.com',5);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Melisa Cremin','541-688-0958','Melisa17@hotmail.com',2);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Angelina Daniel','111-055-2129','Angelina_Daniel79@yahoo.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Herta Mante','842-858-3942','Herta0@hotmail.com',5);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Eula Jenkins','487-209-4954','Eula42@hotmail.com',4);
insert into Contacts (Name,Phone,Email,UserID) VALUES ('Gordon Parker','887-594-2310','Gordon_Parker31@yahoo.com',3);
