import bcrypt from 'bcryptjs';
import {User,Leave,Announcement,Training} from './models.js';
export async function seed(){
 if(await User.countDocuments())return;
 const password=await bcrypt.hash('StaffSync123!',12);
 const people=[['Alex Morgan','hr','People','HR Director'],['Jamie Chen','manager','Engineering','Engineering Manager'],['Sam Rivera','employee','Engineering','Product Designer'],['Avery Patel','employee','Engineering','Frontend Developer'],['Jordan Lee','employee','Design','Brand Designer'],['Taylor Kim','employee','People','People Partner'],['Casey Wilson','employee','Engineering','Backend Developer'],['Riley Brooks','employee','Design','UX Researcher']];
 const users=await User.insertMany(people.map(([name,role,department,title])=>({name,role,department,title,email:name.split(' ')[0].toLowerCase()+'@staffsync.demo',password})));
 await Leave.create({user:users[2]._id,type:'Annual',start:new Date(Date.now()+86400000),end:new Date(Date.now()+259200000),reason:'A little time to recharge with family.'});
 await Announcement.insertMany([{title:'Good work starts with feeling good.',body:'Our wellbeing week is here. Make room for a reset, connect with your teammates, and join a session that works for you.',category:'Wellbeing',author:users[0]._id},{title:'A warm welcome to our newest teammates',body:'Say hello, share your favorite lunch spot, and help our new starters feel at home.',category:'People',author:users[0]._id},{title:'Your ideas belong here',body:'Our next town hall is coming up. Bring your questions and ideas for making work better, together.',category:'Company',author:users[0]._id}]);
 await Training.create({title:'Better together: team communication',description:'A practical workshop on feedback, collaboration, and making space for every voice.',department:'Engineering',manager:users[1]._id,date:new Date(Date.now()+604800000)});
}
