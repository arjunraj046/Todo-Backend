import { ConnectionOptions } from 'typeorm';
import {Todo} from './entities/todo'; 
import {User} from './entities/user'; 


const connectionOptions: ConnectionOptions = {
  
  type: 'postgres',
  
  
  
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'sanika',
  database: 'postgres', // my-todo.cweibzdpd9si.ap-south-1.rds.amazonaws.com
  
  // host: 'my-todo.cweibzdpd9si.ap-south-1.rds.amazonaws.com',
  // port: 5432,
  // username: 'arjun', 
  // password: 'sanika123', 
  // database: 'postgres', 

 
  entities: [User,Todo], // Specify your entity classes
  synchronize: true, // Automatically create database schema based on entities
};

export default connectionOptions;
