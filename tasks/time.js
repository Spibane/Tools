// Time zone maths for Tasks and Events, kept apart from the page so time.test.js can check it: node --test tasks/

// partsIn gives the wall-clock date and time in a zone at an instant. A zone this browser doesn't
// know (from a backup made in a newer one, or a damaged file) counts as UTC instead of throwing,
// which would stop the whole page drawing.
const fmts={};
function partsIn(ts,tz){
  let f=fmts[tz];
  if(!f){
    const opts={hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric'};
    try{f=new Intl.DateTimeFormat('en-US',{...opts,timeZone:tz});}catch(_){f=new Intl.DateTimeFormat('en-US',{...opts,timeZone:'UTC'});}
    fmts[tz]=f;
  }
  const p={};f.formatToParts(ts).forEach(x=>{if(x.type!=='literal')p[x.type]=+x.value;});
  return p;
}
const offset=(ts,tz)=>{const p=partsIn(ts,tz);return Date.UTC(p.year,p.month-1,p.day,p.hour%24,p.minute,p.second)-Math.floor(ts/1000)*1000;};
// The instant a wall-clock time happens in a zone. Days past the month's end roll into the next month.
function zoned(y,m,d,time,tz){
  const [h,min]=time.split(':').map(Number),guess=Date.UTC(y,m-1,d,h,min);
  return guess-offset(guess-offset(guess,tz),tz);
}
const civil=(y,m,d)=>{const t=new Date(Date.UTC(y,m-1,d));return {y:t.getUTCFullYear(),m:t.getUTCMonth()+1,d:t.getUTCDate()};};
const daysIn=(y,m)=>new Date(Date.UTC(y,m,0)).getUTCDate();

// When a rule last reset (at or before now) and when it resets next.
// A monthly reset on a day the month doesn't have (the 31st in April) happens on its last day.
function resetWindow(rule,now=Date.now()){
  const p=partsIn(now,rule.tz);
  const at=k=>{
    if(rule.every==='month'){const c=civil(p.year,p.month+k,1);return zoned(c.y,c.m,Math.min(rule.day,daysIn(c.y,c.m)),rule.time,rule.tz);}
    const back=rule.every==='week'?(new Date(Date.UTC(p.year,p.month-1,p.day)).getUTCDay()-rule.weekday+7)%7:0;
    const c=civil(p.year,p.month,p.day-back+k*(rule.every==='week'?7:1));
    return zoned(c.y,c.m,c.d,rule.time,rule.tz);
  };
  let k=0;
  while(at(k)>now)k--;
  while(at(k+1)<=now)k++;
  return {last:at(k),next:at(k+1)};
}

// When an event starts and ends. Dates are 'YYYY-MM-DD' in the event's zone; an empty end time means the whole end day.
const dateParts=s=>s.split('-').map(Number);
const startOf=ev=>{const [y,m,d]=dateParts(ev.start);return zoned(y,m,d,ev.startTime||'00:00',ev.tz);};
const endOf=ev=>{const [y,m,d]=dateParts(ev.end);return ev.endTime?zoned(y,m,d,ev.endTime,ev.tz):zoned(y,m,d+1,'00:00',ev.tz);};
