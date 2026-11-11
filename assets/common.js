export const usd = (v)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(Number.isFinite(+v)?+v:0);
export const num = (id)=>{const el=document.getElementById(id);const x=Number(el?.value??0);return Number.isFinite(x)?x:0};
export const val = (id)=>document.getElementById(id)?.value??'';
export const $ = (id)=>document.getElementById(id);
export const download = (filename,content,type='application/json')=>{const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.style.display='none';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)};
export const escapeHTML=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const save=(name,value)=>{try{localStorage.setItem(name,JSON.stringify(value));return true}catch{return false}};
export const load=(name,fallback)=>{try{const v=JSON.parse(localStorage.getItem(name));return v??fallback}catch{return fallback}};
export const stamp=()=>new Date().toLocaleString();
