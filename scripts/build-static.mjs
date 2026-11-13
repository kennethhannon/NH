import {cp,copyFile,mkdir,rm,stat,readFile,writeFile,readdir} from 'node:fs/promises';
import {join,resolve,relative} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const out=join(root,'dist');
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
for(const file of ['index.html','privacy.html'])await copyFile(join(root,file),join(out,file));
for(const directory of ['assets','apps','guides'])await cp(join(root,directory),join(out,directory),{recursive:true});
const pub=String(process.env.ADSENSE_PUBLISHER_ID||'').trim();
const ads=process.env.ADSENSE_ADS_ENABLED==='true';
const cmp=process.env.ADSENSE_CMP_READY==='true';
if(pub&&!/^ca-pub-[0-9]{10,20}$/.test(pub))throw Error('ADSENSE_PUBLISHER_ID must have ca-pub- followed by 10–20 digits');
if(ads&&!pub)throw Error('ADSENSE_ADS_ENABLED requires an authorized publisher ID');
if(ads&&!cmp)throw Error('ADSENSE_ADS_ENABLED requires approved CMP/consent configuration');
const htmlFiles=[];
async function walk(dir){for(const f of await readdir(dir,{withFileTypes:true})){const p=join(dir,f.name);if(f.isDirectory())await walk(p);else if(f.name.endsWith('.html'))htmlFiles.push(p)}}
await walk(out);
if(pub){for(const p of htmlFiles){let h=await readFile(p,'utf8');const verification='<meta name="google-adsense-account" content="'+pub+'">';
const script=ads?'<script async crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+pub+'"></script>':'';
h=h.replace('</head>',verification+script+'</head>');
if(ads)h=h.replace('No advertising or analytics scripts are loaded at present.','Google AdSense advertising may use cookies or identifiers; users can manage consent through the configured consent system.');
await writeFile(p,h)}
await writeFile(join(out,'ads.txt'),'google.com, '+pub.replace('ca-','')+', DIRECT, f08c47fec0942fa0\n')
}
const checks=['index.html','assets/style.css','apps/finishline/index.html','apps/settlement-studio/index.html','apps/shift-math/index.html','apps/quickquote/index.html','privacy.html','guides/index.html',...['total-loss-settlement','contractor-estimate','renovation-punch-list','night-shift-pay'].map(x=>'guides/'+x+'.html')];
for(const f of checks){const x=await stat(join(out,f));if(!x.isFile()||!x.size)throw Error('Missing built file '+f)}
console.log('PracticalKit static build: '+checks.length+' verified pages; AdSense publisher '+(pub?'configured':'not configured')+'; ads '+(ads?'enabled':'disabled'));
