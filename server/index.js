import 'dotenv/config';
import mongoose from 'mongoose';
import crypto from 'node:crypto';
import express from 'express';
import path from 'node:path';
import {createApp} from './app.js';
import {seed} from './seed.js';
let memory;
try{
 const demo=!process.env.MONGODB_URI;
 if(demo){const {temporaryDatabase}=await import('./database.js');memory=await temporaryDatabase();await mongoose.connect(memory.getUri());console.log('DEMO MODE: temporary MongoDB. Data resets when the server stops.');await seed();}
 else await mongoose.connect(process.env.MONGODB_URI);
 if(!demo&&(!process.env.JWT_SECRET||process.env.JWT_SECRET.length<32))throw Error('Set JWT_SECRET to a random string of at least 32 characters.');
 const app=createApp(process.env.JWT_SECRET||crypto.randomBytes(48).toString('hex'));
 app.use(express.static(path.resolve('dist')));app.get('/{*path}',(_q,s)=>s.sendFile(path.resolve('dist/index.html')));
 const server=app.listen(process.env.PORT||4000,'127.0.0.1',()=>console.log('StaffSync API: http://127.0.0.1:4000'));
 const shutdown=async()=>{server.close();await mongoose.disconnect();if(memory)await memory.stop();process.exit(0);};process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);
}catch(e){console.error(e.message);process.exit(1);}

