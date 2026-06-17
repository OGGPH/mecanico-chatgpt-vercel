
const history=[];
const msgs=document.getElementById('messages');
const inp=document.getElementById('inp');

function addMessage(text,from){
 const d=document.createElement('div');
 d.innerHTML=`<b>${from==="user"?"Você":"Mecânico IA"}:</b> ${text}`;
 msgs.appendChild(d);
}

async function send(){
 const text=inp.value.trim();
 if(!text) return;

 addMessage(text,'user');
 inp.value='';

 const r=await fetch('/api/chat',{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({message:text,history})
 });

 const data=await r.json();
 addMessage(data.reply,'bot');

 history.push({role:'user',content:text});
 history.push({role:'assistant',content:data.reply});
}

document.getElementById('sbtn').onclick=send;
inp.addEventListener('keydown',e=>{if(e.key==='Enter')send();});
