var DAY=864e5;
var ICS=(function(){
function unfold(t){return t.replace(/\r\n/g,'\n').replace(/\r/g,'\n').replace(/\n[ \t]/g,'')}
function parseProp(line){
  var i=line.indexOf(':'); if(i<0) return null;
  var head=line.slice(0,i), val=line.slice(i+1), parts=head.split(';'), p={name:parts[0].toUpperCase(),val:val,params:{}};
  for(var k=1;k<parts.length;k++){var kv=parts[k].split('='); p.params[kv[0].toUpperCase()]=(kv[1]||'').replace(/"/g,'')}
  return p;
}
function parseDate(p){
  var v=p.val.trim(), m=v.match(/^(\d{4})(\d\d)(\d\d)(?:T(\d\d)(\d\d)(\d\d)?(Z)?)?$/);
  if(!m) return null;
  var allDay=!m[4];
  var d=m[7]?new Date(Date.UTC(+m[1],m[2]-1,+m[3],+m[4],+m[5],+(m[6]||0))):new Date(+m[1],m[2]-1,+m[3],+(m[4]||0),+(m[5]||0),+(m[6]||0));
  return {d:d,allDay:allDay||p.params.VALUE==='DATE'};
}
function parse(text){
  var lines=unfold(text).split('\n'), out=[], cur=null;
  lines.forEach(function(l){
    if(l==='BEGIN:VEVENT'){cur={att:0,declined:0,ex:[],emails:[]};return}
    if(l==='END:VEVENT'){if(cur) out.push(cur); cur=null; return}
    if(!cur) return;
    var p=parseProp(l); if(!p) return;
    switch(p.name){
      case 'SUMMARY': cur.title=p.val.replace(/\\,/g,',').replace(/\\;/g,';').replace(/\\n/gi,' ').trim(); break;
      case 'DESCRIPTION': cur.desc=p.val.replace(/\\n/gi,' ').trim(); break;
      case 'DTSTART': cur.s=parseDate(p); break;
      case 'DTEND': cur.e=parseDate(p); break;
      case 'DURATION': cur.dur=p.val; break;
      case 'STATUS': cur.status=p.val.toUpperCase(); break;
      case 'RRULE': cur.rr=p.val; break;
      case 'EXDATE': p.val.split(',').forEach(function(x){var q=parseDate({val:x,params:{}}); if(q) cur.ex.push(q.d.toDateString())}); break;
      case 'ORGANIZER': cur.org=p.val.toLowerCase(); break;
      case 'ATTENDEE':
        if(/DECLINED/i.test(p.params.PARTSTAT||'')) cur.declined++;
        else if(!/RESOURCE|ROOM/i.test(p.params.CUTYPE||'')){cur.att++; var em=p.val.toLowerCase().replace('mailto:',''); cur.emails.push(em); if(cur.org&&p.val.toLowerCase()===cur.org) cur.orgIn=true}
        break;
    }
  });
  return out;
}
function durMinutes(ev){
  if(ev.s&&ev.e) return Math.round((ev.e.d-ev.s.d)/6e4);
  if(ev.dur){var m=ev.dur.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?/); if(m) return (+m[1]||0)*1440+(+m[2]||0)*60+(+m[3]||0)}
  return 0;
}
function people(ev){return ev.att+((ev.org&&!ev.orgIn&&ev.att>0)?1:0)}
var BYDAY={SU:0,MO:1,TU:2,WE:3,TH:4,FR:5,SA:6};
function occurrences(ev,from,to){
  var s=ev.s.d, res=[];
  if(!ev.rr){ if(s>=from&&s<to) res.push(s); return res }
  var r={}; ev.rr.split(';').forEach(function(x){var kv=x.split('='); r[kv[0]]=kv[1]});
  var freq=r.FREQ, inter=+(r.INTERVAL||1), count=r.COUNT?+r.COUNT:Infinity, until=null;
  if(r.UNTIL){var u=parseDate({val:r.UNTIL,params:{}}); if(u) until=new Date(u.d.getTime()+(u.allDay?DAY:0))}
  var days=r.BYDAY?r.BYDAY.split(',').map(function(x){return BYDAY[x.slice(-2)]}).filter(function(x){return x!==undefined}):null;
  var n=0, cursor=new Date(s.getTime()), guard=0, hh=s.getHours(), mm=s.getMinutes(), ss=s.getSeconds();
  function push(d){
    if(until&&d>until) return false;
    if(n>=count) return false;
    n++;
    if(d>=from&&d<to&&ev.ex.indexOf(d.toDateString())<0) res.push(d);
    return true;
  }
  if(freq==='DAILY'){
    while(cursor<to&&guard++<6000){
      if(!days||days.indexOf(cursor.getDay())>=0){ if(!push(new Date(cursor))) break }
      cursor=new Date(cursor.getFullYear(),cursor.getMonth(),cursor.getDate()+inter,hh,mm,ss);
    }
  } else if(freq==='WEEKLY'){
    var wk=new Date(s.getFullYear(),s.getMonth(),s.getDate()-s.getDay(),hh,mm,ss), list=days||[s.getDay()];
    list=list.slice().sort(function(a,b){return a-b});
    while(wk<to&&guard++<3000){
      var stop=false;
      for(var i=0;i<list.length;i++){
        var d=new Date(wk.getFullYear(),wk.getMonth(),wk.getDate()+list[i],hh,mm,ss);
        if(d<s) continue;
        if(!push(d)){stop=true;break}
      }
      if(stop) break;
      wk=new Date(wk.getFullYear(),wk.getMonth(),wk.getDate()+7*inter,hh,mm,ss);
    }
  } else if(freq==='MONTHLY'){
    var i2=0;
    while(guard++<800){
      var d2=new Date(s.getFullYear(),s.getMonth()+i2*inter,s.getDate(),hh,mm,ss);
      if(d2>=to) break;
      if(d2.getDate()===s.getDate()){ if(!push(d2)) break }
      i2++;
    }
  } else if(s>=from&&s<to) res.push(s);
  return res;
}
/* flat list of real multi-person meetings inside [from,to) */
function expand(events,from,to){
  var out=[];
  events.forEach(function(ev){
    if(!ev.s||ev.s.allDay||ev.status==='CANCELLED') return;
    var mins=durMinutes(ev), ppl=people(ev);
    if(mins<5||mins>600||ppl<2) return;
    var agenda=!!(ev.desc&&ev.desc.length>=40);
    occurrences(ev,from,to).forEach(function(d){
      out.push({title:ev.title||'Untitled',start:d,end:new Date(d.getTime()+mins*6e4),mins:mins,ppl:ppl,rec:!!ev.rr,agenda:agenda,emails:ev.emails});
    });
  });
  out.sort(function(a,b){return a.start-b.start});
  return out;
}
/* a realistic fictional calendar, starting a year back, for "try it" buttons */
function sample(){
  var now=new Date(); now.setHours(0,0,0,0);
  var mon=new Date(now.getFullYear(),now.getMonth(),now.getDate()-((now.getDay()+6)%7)-7*52);
  function p2(n){return String(n).padStart(2,'0')}
  function st(off,h,m){var d=new Date(mon.getFullYear(),mon.getMonth(),mon.getDate()+off,h,m); return d.getFullYear()+p2(d.getMonth()+1)+p2(d.getDate())+'T'+p2(h)+p2(m)+'00'}
  function att(n){var s=''; for(var i=0;i<n;i++) s+='ATTENDEE;PARTSTAT=ACCEPTED:mailto:person'+i+'@example.com\n'; return s}
  var uid=0;
  function ev(t,off,h1,m1,h2,m2,n,rr,desc){uid++; return 'BEGIN:VEVENT\nUID:s'+uid+'\nSUMMARY:'+t+'\nDTSTART:'+st(off,h1,m1)+'\nDTEND:'+st(off,h2,m2)+'\n'+(rr?'RRULE:'+rr+'\n':'')+(desc?'DESCRIPTION:'+desc+'\n':'')+att(n)+'END:VEVENT\n'}
  var ag='Agenda: decide scope, owners and the go or no-go. Pre-read is linked in the doc.';
  return 'BEGIN:VCALENDAR\n'+
   ev('Daily Standup',0,9,30,9,45,7,'FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR')+
   ev('Weekly Product Sync',4,10,0,11,0,11,'FREQ=WEEKLY;BYDAY=FR')+
   ev('All-hands',1,15,0,16,0,38,'FREQ=WEEKLY;BYDAY=TU')+
   ev('1:1 with manager',2,14,0,14,30,1,'FREQ=WEEKLY;BYDAY=WE')+
   ev('1:1 with direct report',3,11,0,11,30,1,'FREQ=WEEKLY;BYDAY=TH')+
   ev('Planning',0,10,0,11,30,8,'FREQ=WEEKLY;BYDAY=MO',ag)+
   ev('Design review',0,11,30,12,15,6,'FREQ=WEEKLY;BYDAY=MO')+
   ev('Hiring sync',0,12,15,13,0,5,'FREQ=WEEKLY;BYDAY=MO')+
   ev('Customer review',3,13,0,14,0,5,'FREQ=WEEKLY;INTERVAL=2;BYDAY=TH',ag)+
   ev('Roadmap brainstorm',2,16,0,17,30,9,'FREQ=MONTHLY')+
   ev('APAC handover',1,17,30,18,15,6,'FREQ=WEEKLY;BYDAY=TU')+
   'END:VCALENDAR';
}
return {parse:parse,expand:expand,sample:sample};
})();
