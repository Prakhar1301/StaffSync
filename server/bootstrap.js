import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {User} from './models.js';
if(!process.env.MONGODB_URI)throw Error('Configure MONGODB_URI in .env first.');
const {ADMIN_EMAIL,ADMIN_PASSWORD,ADMIN_NAME}=process.env;
if(!ADMIN_EMAIL||!/^\S+@\S+\.\S+$/.test(ADMIN_EMAIL)||!ADMIN_PASSWORD||ADMIN_PASSWORD.length<12)throw Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters) in your environment.');
try{await mongoose.connect(process.env.MONGODB_URI);if(await User.exists({role:'hr',active:true}))throw Error('An HR administrator already exists. Use the app to add people.');await User.create({name:ADMIN_NAME||'HR Administrator',email:ADMIN_EMAIL.toLowerCase(),password:await bcrypt.hash(ADMIN_PASSWORD,12),role:'hr',department:'People',title:'HR Administrator'});console.log('HR administrator created. Sign in with your configured credentials.');}finally{await mongoose.disconnect()}
