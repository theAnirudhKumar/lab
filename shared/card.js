var $=function(id){return document.getElementById(id)};
var DAY=864e5;
function parseCSV(t){
  var out=[],row=[],f='',q=false;
  for(var i=0;i<t.length;i++){var c=t[i];
    if(q){ if(c==='"'){ if(t[i+1]==='"'){f+='"';i++} else q=false } else f+=c }
    else if(c==='"') q=true; else if(c===','){row.push(f);f=''}
    else if(c==='\n'||c==='\r'){ if(c==='\r'&&t[i+1]==='\n') i++; row.push(f);f=''; if(row.length>1||row[0]!=='') out.push(row); row=[] }
    else f+=c;
  }
  if(f!==''||row.length){row.push(f);out.push(row)}
  return out;
}
function fmtDate(d){return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function shuffled(a,r){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}

var Card=(function(){
var MONO='ui-monospace,SFMono-Regular,Menlo,Consolas,monospace', SANS='system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';
function mk(w,h,sc){var c=document.createElement('canvas');c.width=w*sc;c.height=h*sc;var g=c.getContext('2d');g.scale(sc,sc);return {c:c,g:g}}
function wrapText(g,text,maxW){
  var words=String(text).split(' '),lines=[],cur='';
  words.forEach(function(w){var t=cur?cur+' '+w:w; if(g.measureText(t).width>maxW&&cur){lines.push(cur);cur=w}else cur=t});
  if(cur) lines.push(cur); return lines;
}
/* lines: [{t:'sep'|'c'|'r', l, r, cls:'b big m'}] */
function receipt(lines){
  var sc=2,w=440,lh=22,pad=28;
  var h=pad*2+lines.reduce(function(a,x){return a+(x.t==='sep'?14:(/big/.test(x.cls||'')?30:lh))},0);
  var m=mk(w,h,sc),g=m.g; g.fillStyle='#fffefa'; g.fillRect(0,0,w,h);
  var y=pad;
  lines.forEach(function(x){
    if(x.t==='sep'){g.strokeStyle='#1c1b19';g.setLineDash([4,3]);g.beginPath();g.moveTo(pad,y+5);g.lineTo(w-pad,y+5);g.stroke();y+=14;return}
    var big=/big/.test(x.cls||''),bold=/\bb\b/.test(x.cls||''),mute=/\bm\b/.test(x.cls||'');
    g.font=(bold?'700 ':'400 ')+(big?'20px ':'13px ')+MONO; g.fillStyle=mute?'#6f6a60':'#1c1b19'; y+=big?22:16;
    if(x.t==='c'){g.textAlign='center';g.fillText(x.l,w/2,y)}
    else{g.textAlign='left';g.fillText(x.l,pad,y);g.textAlign='right';g.fillText(x.r,w-pad,y)}
    y+=big?8:6;
  });
  return m.c;
}
function receiptText(lines){
  var W=40;
  return lines.map(function(x){
    if(x.t==='sep') return '-'.repeat(W);
    if(x.t==='c'){return ' '.repeat(Math.max(0,Math.floor((W-x.l.length)/2)))+x.l}
    return x.l+' '.repeat(Math.max(1,W-x.l.length-x.r.length))+x.r;
  }).join('\n');
}
/* o: {kicker, headline, sub, stats:[{v,l}] (max 4), footer, hue} */
function poster(o){
  var W=1080,H=1350,m=mk(W,H,1),g=m.g,h=o.hue==null?20:o.hue;
  var gr=g.createLinearGradient(0,0,W,H); gr.addColorStop(0,'hsl('+h+',65%,13%)'); gr.addColorStop(1,'hsl('+((h+50)%360)+',70%,30%)');
  g.fillStyle=gr; g.fillRect(0,0,W,H);
  g.globalAlpha=.1; g.fillStyle='#fff'; g.beginPath(); g.arc(W-100,170,270,0,7); g.fill(); g.beginPath(); g.arc(60,H-300,210,0,7); g.fill(); g.globalAlpha=1;
  g.textBaseline='alphabetic'; g.textAlign='left'; g.fillStyle='#fff';
  g.font='700 30px '+SANS; g.globalAlpha=.8; g.fillText(String(o.kicker||'').toUpperCase(),80,120); g.globalAlpha=1;
  var size=112,lines;
  for(;;){g.font='800 '+size+'px '+SANS; lines=wrapText(g,o.headline,W-160); if(lines.length<=4||size<=52) break; size-=6}
  var y=270; lines.forEach(function(l){g.fillText(l,80,y); y+=size*1.1});
  if(o.sub){g.font='400 40px '+SANS; g.globalAlpha=.85; y+=14; wrapText(g,o.sub,W-160).slice(0,3).forEach(function(l){g.fillText(l,80,y);y+=52}); g.globalAlpha=1}
  var st=(o.stats||[]).slice(0,4), bw=(W-160-30)/2, bh=190;
  st.forEach(function(s,i){
    var bx=80+(i%2)*(bw+30), by=H-510+Math.floor(i/2)*(bh+24);
    g.fillStyle='rgba(255,255,255,.12)'; g.beginPath(); if(g.roundRect) g.roundRect(bx,by,bw,bh,24); else g.rect(bx,by,bw,bh); g.fill();
    g.fillStyle='#fff'; var vs=68; do{g.font='800 '+vs+'px '+SANS; vs-=4}while(g.measureText(String(s.v)).width>bw-48&&vs>28);
    g.fillText(String(s.v),bx+24,by+98);
    g.font='400 26px '+SANS; g.globalAlpha=.75; g.fillText(String(s.l).toUpperCase(),bx+24,by+150); g.globalAlpha=1;
  });
  g.font='500 28px '+SANS; g.globalAlpha=.7; g.fillStyle='#fff'; g.fillText(o.footer||'',80,H-44); g.globalAlpha=1;
  return m.c;
}
function show(el,canvas,maxW){
  el.textContent=''; canvas.style.cssText='width:100%;max-width:'+(maxW||440)+'px;height:auto;border-radius:8px;box-shadow:0 8px 28px rgba(0,0,0,.25);display:block;margin:0 auto';
  el.appendChild(canvas);
}
function download(canvas,name){var a=document.createElement('a');a.download=name||'share.png';a.href=canvas.toDataURL('image/png');a.click()}
function copy(text,btn){
  var old=btn.textContent;
  (navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(function(){btn.textContent='Copied'},function(){btn.textContent='Copy failed'});
  setTimeout(function(){btn.textContent=old},1500);
}
return {receipt:receipt,receiptText:receiptText,poster:poster,show:show,download:download,copy:copy,wrapText:wrapText,MONO:MONO,SANS:SANS};
})();
var UI={
  dropzone:function(dropId,fileId,cb,asText){
    var drop=$(dropId),fi=$(fileId);
    function take(files){if(!files||!files.length) return; if(asText===false){cb(files)} else {var r=new FileReader(); r.onload=function(){cb(String(r.result))}; r.onerror=function(){UI.err('Could not read that file.')}; r.readAsText(files[0])}}
    drop.addEventListener('click',function(){fi.click()});
    drop.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fi.click()}});
    fi.addEventListener('change',function(){take(fi.files)});
    ['dragenter','dragover'].forEach(function(t){drop.addEventListener(t,function(e){e.preventDefault();drop.classList.add('over')})});
    ['dragleave','drop'].forEach(function(t){drop.addEventListener(t,function(e){e.preventDefault();drop.classList.remove('over')})});
    drop.addEventListener('drop',function(e){take(e.dataTransfer.files)});
  },
  err:function(m){var e=$('err'); if(e) e.textContent=m||''},
  startOfWeek:function(d){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate()); x.setDate(x.getDate()-((x.getDay()+6)%7)); return x}
};
