import assert from 'node:assert/strict';
import {test} from 'node:test';
import {LIBRARY_CAP,normalizeLibrary,saveEstimate,deleteEstimate} from '../apps/quickquote/library.mjs';

const sample=(id,job='Test job')=>({
  id,savedAt:'2026-11-13T00:00:00Z',
  customer:'Test customer',job,
  quote:{meta:{customer:'Test customer',job},items:[{description:'Materials',qty:1,rate:200,taxable:true}]}
});

test('library rejects malformed entries and duplicate ids',()=>{
  const result=normalizeLibrary([null,{id:'incomplete'},sample('a'),sample('a'),sample('b')]);
  assert.deepEqual(result.map(row=>row.id),['a','b']);
});
test('saving a quote creates it; updating same id never duplicates',()=>{
  let result=saveEstimate([],sample('x'));
  assert.equal(result.length,1);
  result=saveEstimate(result,sample('x','Updated project'));
  assert.equal(result.length,1);
  assert.equal(result[0].job,'Updated project');
  result=saveEstimate(result,sample('y'));
  assert.deepEqual(result.map(row=>row.id),['y','x']);
});
test('limit prevents silent loss of old quotes',()=>{
  const full=Array.from({length:LIBRARY_CAP},(_,i)=>sample('quote-'+i));
  assert.throws(()=>saveEstimate(full,sample('extra')),/library is full/);
  const updated=saveEstimate(full,sample('quote-0','Updated'));
  assert.equal(updated.length,LIBRARY_CAP);
  assert.equal(updated[0].job,'Updated');
});
test('deletion is scoped to only selected quote',()=>{
  const result=deleteEstimate([sample('a'),sample('b')],'a');
  assert.deepEqual(result.map(row=>row.id),['b']);
});
