import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createQuotePDF} from '../apps/quickquote/pdf.mjs';
import {quoteMath} from '../apps/quickquote/math.mjs';

test('creates real PDF with client, work items and amounts',()=>{
  const result=quoteMath({items:[{description:'Paint walls',qty:2,rate:100,taxable:true}],taxPercent:8});
  const bytes=createQuotePDF({business:'Sample Painter LLC',customer:'Demo Customer',job:'Interior repairs',scope:'Prime and paint',terms:'Pay upon completion'},result);
  const pdf=new TextDecoder().decode(bytes);
  assert.ok(pdf.startsWith('%PDF-1.4'));
  assert.ok(pdf.trimEnd().endsWith('%%EOF'));
  assert.match(pdf,/Sample Painter LLC/);
  assert.match(pdf,/Paint walls/);
  assert.match(pdf,/\$216\.00/);
  assert.match(pdf,/\/Type \/Page /);
});
test('long estimate generates multiple pages with pagination',()=>{
  const items=Array.from({length:200},(_,i)=>({description:'Long description of work line '+(i+1),qty:2,rate:15,taxable:false}));
  const result=quoteMath({items});
  const bytes=createQuotePDF({business:'Builder',scope:'Detailed scope. '.repeat(150),terms:'Terms '.repeat(150)},result);
  const pdf=new TextDecoder().decode(bytes);
  assert.ok((pdf.match(/\/Type \/Page /g)||[]).length>2);
  assert.match(pdf,/line 200/);
  assert.match(pdf,/\$6,000\.00/);
});
