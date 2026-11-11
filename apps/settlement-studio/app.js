import {usd,num,val,$,download,save,load,stamp} from '../../assets/common.js';
import {settlement} from './math.mjs';
const ids=['vehicle','state','offer','replacement','insurerTax','deductible','taxrate','docfee','title','loan','comp1','comp2','comp3','notes'];
const defaults=Object.fromEntries(ids.map(id=>[id,$(id).value]));
function values(){return Object.fromEntries(ids.map(id=>[id,val(id)]))}
function run(){const v=values(),result=settlement({...v,comps:[v.comp1,v.comp2,v.comp3]});
for(const [id,key] of [['cost','cost'],['check','check'],['shortfall','shortfall'],['equity','equity'],['tax','taxes'],['fees','fees']])$(id).textContent=usd(result[key]);
$('median').textContent=result.median===null?'—':usd(result.median);$('compdiff').textContent=result.compdiff===null?'—':usd(result.compdiff);$('generated').textContent='Calculated '+stamp();save('pk-settlement',v);return {values:v,calculation:result};}
for(const id of ids)$(id).addEventListener('input',run);
Object.entries(load('pk-settlement',defaults)).forEach(([id,v])=>{if($(id)&&typeof v==='string')$(id).value=v});
$('export').addEventListener('click',()=>download('settlement-studio.json',JSON.stringify({...run(),created:stamp(),disclaimer:'Planning estimate only; insurer obligations vary.'},null,2)));
$('print').addEventListener('click',()=>window.print());
$('reset').addEventListener('click',()=>{if(!confirm('Reset the calculator and clear locally saved values?'))return;for(const id of ids)$(id).value=defaults[id];run()});run();
