import {mkdir,mkdtemp,rm} from 'node:fs/promises';
import path from 'node:path';
import {MongoMemoryServer} from 'mongodb-memory-server';
export async function temporaryDatabase(){
 const root=path.resolve('.data');await mkdir(root,{recursive:true});
 const dbPath=await mkdtemp(path.join(root,'mongo-'));
 const db=await MongoMemoryServer.create({instance:{dbPath,dbName:'staffsync',args:['--wiredTigerCacheSizeGB','0.25']}});
 const originalStop=db.stop.bind(db);
 db.stop=async()=>{await originalStop();await rm(dbPath,{recursive:true,force:true})};
 return db;
}
