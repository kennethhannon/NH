import {$,usd,download,load,save,stamp} from '../../assets/common.js';
import {quoteMath} from './math.mjs';
const KEY='pk-quickquote-v1';
const fields=['business','contact','customer','job','date','validUntil','scope','discount','tax','deposit','terms'];
const limit=(v,n=160)=>String(v??'').slice(0,n);
const newItem=()=>({id:crypto.randomUUID(),description:'',qty:1,rate:0,taxable:false});
const defaults={business:'',contact:'',customer:'',job:'',date:new Date().toISOString().slice(0,10),validUntil:'',scope:'',discount:'0',tax:'0',deposit:'0',terms:''};
function clean(raw){const x=(raw&&typeof raw==='object')?raw:{};return {meta:Object.fromEntries(fields.map(k=>[k,limit(x.meta?.[k]??defaults[k],['scope','terms'].includes(k)?4000:160)])),items:Array.isArray(x.items)?x.items.slice(0,200).map(y=>({id:crypto.randomUUID(),description:limit(y?.description,200),qty:limit(y?.qty??1,24),rate:limit(y?.rate??0,24),taxable:!!y?.taxable})):[]}}
let state=clean(load(KEY,{meta:defaults,items:[newItem()]}));
function readMeta(){state.meta=Object.fromEntries(fields.map(k=>[k,$(k).value]));}
function persist(){readMeta();$('saved').textContent=save(KEY,state)?`Saved on this device · ${stamp()}`:'Browser storage unavailable; download a backup.';}
function row(item){const tr=document.createElement('tr');const cell=()=>{const td=document.createElement('td');tr.append(td);return td};
 const desc=document.createElement('input');desc.value=item.description;desc.placeholder='Paint, material, labor';desc.maxLength=200;desc.setAttribute('aria-label','Line item description');desc.addEventListener('input',()=>{item.description=desc.value;refresh()});cell().append(desc);
 const qty=document.createElement('input');qty.type='number';qty.min='0';qty.max='100000';qty.step='0.01';qty.value=item.qty;qty.setAttribute('aria-label','Quantity');qty.addEventListener('input',()=>{item.qty=qty.value;refresh()});cell().append(qty);
 const rate=document.createElement('input');rate.type='number';rate.min='0';rate.max='100000000';rate.step='0.01';rate.value=item.rate;rate.setAttribute('aria-label','Unit price');rate.addEventListener('input',()=>{item.rate=rate.value;refresh()});cell().append(rate);
 const tax=document.createElement('input');tax.type='checkbox';tax.checked=item.taxable;tax.setAttribute('aria-label','Taxable item');tax.addEventListener('change',()=>{item.taxable=tax.checked;refresh()});cell().append(tax);
 const total=document.createElement('b');total.id=`line-${item.id}`;total.textContent='$0.00';cell().append(total);
 const remove=document.createElement('button');remove.type='button';remove.className='danger remove-quote';remove.textContent='×';remove.setAttribute('aria-label','Remove line item');remove.addEventListener('click',()=>{state.items=state.items.filter(x=>x.id!==item.id);render()});cell().append(remove);return tr;}
function render(){for(const k of fields)$(k).value=state.meta[k]??'';const rows=$('items');rows.replaceChildren(...state.items.map(row));refresh();}
function renderReport(result){const m=state.meta;$('reportTitle').textContent=m.job||'Project estimate';$('reportMeta').textContent=[m.business,m.contact,m.customer&&`Prepared for ${m.customer}`,m.date&&`Dated ${m.date}`,m.validUntil&&`Valid until ${m.validUntil}`].filter(Boolean).join(' · ');$('reportScope').textContent=m.scope;
 const tbody=$('reportItems');tbody.replaceChildren();for(const item of result.lines){const tr=document.createElement('tr');for(const value of [item.description||'Untitled item',String(item.qty),usd(item.rate),usd(item.total)]){const td=document.createElement('td');td.textContent=value;tr.append(td)}tbody.append(tr)}
 for(const [id,value] of Object.entries({subtotal:result.subtotal,discountAmount:result.discount,taxAmount:result.salesTax,total:result.total,depositAmount:result.deposit,balance:result.balance}))$(id).textContent=usd(value);
 $('reportTerms').textContent=m.terms?`Terms: ${m.terms}`:'';}
function refresh(){readMeta();try{const result=quoteMath({items:state.items,discountPercent:state.meta.discount,taxPercent:state.meta.tax,depositPercent:state.meta.deposit});$('error').textContent='';for(let i=0;i<result.lines.length;i++){$(`line-${result.lines[i].id}`).textContent=usd(result.lines[i].total)}renderReport(result);persist();return true}catch(e){$('error').textContent=e.message;for(const id of ['subtotal','discountAmount','taxAmount','total','depositAmount','balance'])$(id).textContent='—';return false}}
for(const k of fields)$(k).addEventListener('input',refresh);
$('add').addEventListener('click',()=>{if(state.items.length>=200){$('error').textContent='Maximum 200 line items';return}state.items.push(newItem());render()});
$('export').addEventListener('click',()=>{if(refresh())download('quickquote-estimate.json',JSON.stringify({...state,exportedAt:stamp()},null,2))});
$('print').addEventListener('click',()=>{if(refresh())window.print()});
$('import').addEventListener('click',()=>$('upload').click());
$('upload').addEventListener('change',async()=>{const f=$('upload').files?.[0];if(!f)return;try{if(f.size>300000)throw Error('File too large.');const obj=JSON.parse(await f.text());if(!obj||!Array.isArray(obj.items)||!obj.meta||typeof obj.meta!=='object')throw Error('Not a QuickQuote backup.');if(!confirm('Replace the current quote?'))return;state=clean(obj);render()}catch(e){$('error').textContent=e.message}finally{$('upload').value=''}});
$('clear').addEventListener('click',()=>{if(!confirm('Clear this estimate and start a new one? Download a backup first if needed.'))return;state=clean({meta:defaults,items:[newItem()]});render()});
render();
