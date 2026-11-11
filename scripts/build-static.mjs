import {cp,copyFile,mkdir,rm,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const out=join(root,'dist');
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
await copyFile(join(root,'index.html'),join(out,'index.html'));
for(const directory of ['assets','apps'])await cp(join(root,directory),join(out,directory),{recursive:true});
for(const file of ['index.html','assets/style.css','apps/finishline/index.html','apps/settlement-studio/index.html','apps/shift-math/index.html']){
  const x=await stat(join(out,file));if(!x.isFile()||x.size===0)throw Error('Missing built file '+file);
}
console.log('Static site ready in dist/ (homepage, assets, three applications)');
