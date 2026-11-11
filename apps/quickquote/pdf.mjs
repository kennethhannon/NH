/** Dependency-free, client-side PDF export for QuickQuote estimates.
 *  Uses built-in PDF Helvetica fonts, so it needs no network, account, or server.
 *  Non-WinAnsi scripts are simplified for these initial beta reports.
 */
const PAGE_WIDTH = 612, PAGE_HEIGHT = 792;
const LEFT = 46, RIGHT = PAGE_WIDTH - 46, CONTENT = RIGHT - LEFT;
const BOTTOM = 57;
const f = n => Number(n).toFixed(2).replace(/\.00$/, '');
const money = n => '$' + Number(n || 0).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
const clean = value => String(value ?? '').replace(/\r\n?/g, '\n')
  .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
  .replace(/[\u2013\u2014\u2212]/g, '-').replace(/\u00a0/g,' ')
  .replace(/[\u2022\u00b7]/g, '-').replace(/\u2026/g,'...')
  .normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
function pdfText(value) {
  let out = '';
  for (const ch of clean(value)) {
    const n = ch.codePointAt(0);
    if (ch === '(' || ch === ')' || ch === '\\') out += '\\' + ch;
    else if (n >= 32 && n <= 126) out += ch;
    else if (n >= 160 && n <= 255) out += '\\' + n.toString(8).padStart(3,'0');
    else out += ch === '\n' ? ' ' : '?';
  }
  return out;
}
// Widths are intentionally conservative; the lines remain well inside the page.
const glyphWidth = (c, pt) => (/[il\.,;:'!| ]/.test(c) ? .31 : /[MW@#%&]/.test(c) ? .88 : /[A-Z0-9$]/.test(c) ? .67 : .57) * pt;
const widthOf = (value, pt) => [...clean(value)].reduce((w, c) => w + glyphWidth(c, pt), 0);
function wrap(raw, width, pt) {
  const result = [];
  for (const paragraph of clean(raw).split('\n')) {
    if (!paragraph.trim()) { result.push(''); continue; }
    let line = '';
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      if (widthOf(word, pt) > width) {
        if (line) { result.push(line); line = ''; }
        let chunk = '';
        for (const char of word) {
          if (chunk && widthOf(chunk + char, pt) > width) { result.push(chunk); chunk=''; }
          chunk += char;
        }
        line = chunk;
      } else if (!line) line=word;
      else if (widthOf(line + ' ' + word,pt) <= width) line += ' ' + word;
      else {result.push(line);line=word;}
    }
    result.push(line);
  }
  return result;
}
class PDFReport {
  constructor() {this.pages=[[]];this.y=744;this.tableContinuation=false;}
  get ops(){return this.pages[this.pages.length-1];}
  color(hex){const digits=hex.replace('#','');return [0,2,4].map(i=>f(parseInt(digits.slice(i,i+2),16)/255)).join(' ')}
  text(value,x,y,pt=10,bold=false,color='#172638'){
    this.ops.push(`BT /F${bold?2:1} ${f(pt)} Tf ${this.color(color)} rg 1 0 0 1 ${f(x)} ${f(y)} Tm (${pdfText(value)}) Tj ET`);
  }
  rect(x,y,w,h,hex){this.ops.push(`${this.color(hex)} rg ${f(x)} ${f(y)} ${f(w)} ${f(h)} re f`)}
  line(x,y,toX,toY,hex='#d6e0e8'){this.ops.push(`${this.color(hex)} RG 0.6 w ${f(x)} ${f(y)} m ${f(toX)} ${f(toY)} l S`)}
  newPage(){this.pages.push([]);this.y=741;this.text('ESTIMATE  /  CONTINUED',LEFT,750,10,true,'#1c6559');this.line(LEFT,733,RIGHT,733);this.y=711;}
  ensure(h){if(this.y-h<BOTTOM)this.newPage();}
  section(text){this.ensure(40);this.y-=16;this.text(text,LEFT,this.y,10,true,'#135d53');this.y-=18;}
  paragraph(text,pt=10,leading=15,color='#263a4d'){
    for(const line of wrap(text,CONTENT,pt)){
      this.ensure(leading+2);this.text(line,LEFT,this.y,pt,false,color);this.y-=leading;
    }
  }
  header(meta){
    this.rect(LEFT,752,34,6,'#19a88d');
    this.text('ESTIMATE',LEFT,714,26,true);
    this.text('QUICKQUOTE  /  PRACTICALKIT',RIGHT-widthOf('QUICKQUOTE  /  PRACTICALKIT',8.5),741,8.5,true,'#135d53');
    this.y=691;
    if(meta.business){this.paragraph(meta.business,14,19,'#102535');this.y-=2;}
    if(meta.contact)this.paragraph(meta.contact,9,13);
    this.y-=13;
    if(meta.job){this.section('PROJECT');this.paragraph(meta.job,13,18);}
    if(meta.customer){this.section('PREPARED FOR');this.paragraph(meta.customer,11,16);}
    const dates=[meta.date&&`Estimate date: ${meta.date}`,meta.validUntil&&`Valid until: ${meta.validUntil}`].filter(Boolean).join('     ');
    if(dates){this.ensure(21);this.text(dates,LEFT,this.y,9,false,'#526478');this.y-=21;}
    this.line(LEFT,this.y+2,RIGHT,this.y+2);
    this.y-=8;
  }
  tableHeader(){
    this.ensure(41);
    this.rect(LEFT,this.y-23,CONTENT,26,'#173a49');
    this.text('ITEM / DESCRIPTION',LEFT+9,this.y-14,9,true,'#ffffff');
    this.text('QTY',365,this.y-14,9,true,'#ffffff');
    this.text('RATE',418,this.y-14,9,true,'#ffffff');
    this.text('AMOUNT',RIGHT-76,this.y-14,9,true,'#ffffff');
    this.y-=29;
  }
  rightText(value,right,y,pt=9.5,bold=false,color='#263a4d'){
    this.text(value,right-widthOf(value,pt),y,pt,bold,color);
  }
  items(lines){
    this.section('ITEMIZED ESTIMATE');
    this.tableHeader();
    for(let i=0;i<lines.length;i++){
      const item=lines[i];const desc=wrap((item.description||'Untitled item')+(item.taxable?' (taxable)':''),270,9.5);
      const rowHeight=Math.max(30,desc.length*13+13);
      if(this.y-rowHeight<BOTTOM){this.newPage();this.tableHeader();}
      if(i%2===0)this.rect(LEFT,this.y-rowHeight+2,CONTENT,rowHeight,'#f3f7f9');
      for(let j=0;j<desc.length;j++)this.text(desc[j],LEFT+8,this.y-15-j*13,9.5);
      this.rightText(String(item.qty),392,this.y-15,9.5);
      this.rightText(money(item.rate),462,this.y-15,9.5);
      this.rightText(money(item.total),RIGHT-9,this.y-15,9.5,true);
      this.y-=rowHeight;
      this.line(LEFT,this.y,RIGHT,this.y);
    }
  }
  totals(result){
    this.ensure(176);
    this.y-=16;
    for(const [label,value] of [
      ['Subtotal',result.subtotal],['Discount',-result.discount],['Estimated tax',result.salesTax]
    ]){
      this.text(label,RIGHT-230,this.y,10,false,'#526478');this.rightText(money(value),RIGHT-6,this.y,10);
      this.y-=19;
    }
    this.rect(RIGHT-244,this.y-39,244,49,'#173a49');
    this.text('ESTIMATED TOTAL',RIGHT-231,this.y-12,9,true,'#ffffff');
    this.rightText(money(result.total),RIGHT-13,this.y-12,15,true,'#ffffff');
    this.y-=55;
    for(const [label,value] of [
      ['Deposit requested',result.deposit],['Balance after deposit',result.balance]
    ]){
      this.text(label,RIGHT-230,this.y,9.5,false,'#526478');this.rightText(money(value),RIGHT-6,this.y,10,true);
      this.y-=18;
    }
  }
  footers(){
    this.pages.forEach((ops,i)=>{
      ops.push(`${this.color('#d6e0e8')} RG 0.6 w ${LEFT} 44 m ${RIGHT} 44 l S`);
      ops.push(`BT /F1 8 Tf ${this.color('#526478')} rg 1 0 0 1 ${LEFT} 31 Tm (${pdfText('Prepared with QuickQuote - verify scope, taxes, and contract terms.')}) Tj ET`);
      ops.push(`BT /F1 8 Tf ${this.color('#526478')} rg 1 0 0 1 ${RIGHT-48} 31 Tm (${pdfText(`${i+1} / ${this.pages.length}`)}) Tj ET`);
    });
  }
  bytes(){
    this.footers();
    const objects=[];
    objects[1]='<< /Type /Catalog /Pages 2 0 R >>';
    const kids=this.pages.map((_,i)=>`${5+i*2} 0 R`).join(' ');
    objects[2]=`<< /Type /Pages /Kids [${kids}] /Count ${this.pages.length} >>`;
    objects[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
    objects[4]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
    for(let i=0;i<this.pages.length;i++){
      const pageId=5+i*2,streamId=pageId+1,stream=this.pages[i].join('\n')+'\n';
      objects[pageId]=`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${streamId} 0 R >>`;
      objects[streamId]=`<< /Length ${stream.length} >>\nstream\n${stream}endstream`;
    }
    let pdf='%PDF-1.4\n%PracticalKit\n';const offsets=[0];
    for(let id=1;id<objects.length;id++){
      offsets[id]=pdf.length;
      pdf+=`${id} 0 obj\n${objects[id]}\nendobj\n`;
    }
    const xref=pdf.length;
    pdf+=`xref\n0 ${objects.length}\n0000000000 65535 f \n`;
    for(let id=1;id<objects.length;id++)pdf+=`${String(offsets[id]).padStart(10,'0')} 00000 n \n`;
    pdf+=`trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
    return new TextEncoder().encode(pdf);
  }
}
/** Returns a complete PDF file as Uint8Array. Throws for invalid data. */
export function createQuotePDF(meta,result){
  if(!meta||!result||!Array.isArray(result.lines)||!Number.isFinite(result.total))throw Error('A valid estimate is required to create a PDF.');
  const doc=new PDFReport();doc.header(meta);
  if(meta.scope?.trim()){doc.section('SCOPE OF WORK');doc.paragraph(meta.scope,9.5,14);doc.y-=10;}
  doc.items(result.lines);doc.totals(result);
  if(meta.terms?.trim()){doc.section('TERMS AND EXCLUSIONS');doc.paragraph(meta.terms,9.5,14);}
  doc.ensure(38);doc.y-=18;doc.paragraph('Estimate only. Final price depends on the agreed scope and applicable requirements.',8.5,12,'#526478');
  return doc.bytes();
}