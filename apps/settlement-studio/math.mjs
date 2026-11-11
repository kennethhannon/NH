export const settlement=(x)=>{
 const clamp=n=>Number.isFinite(+n)?Math.max(0,+n):0;
 const offer=clamp(x.offer), replacement=clamp(x.replacement), offeredExtras=clamp(x.insurerTax),deductible=clamp(x.deductible),taxRate=Math.min(30,clamp(x.taxrate));
 const taxes=replacement*taxRate/100,fees=clamp(x.docfee)+clamp(x.title),cost=replacement+taxes+fees,check=offer+offeredExtras-deductible,loan=clamp(x.loan);
 const comparables=(x.comps||[]).map(clamp).filter(n=>n>0).sort((a,b)=>a-b);
 const mid=comparables.length?comparables.length%2?comparables[(comparables.length-1)/2]:(comparables[comparables.length/2-1]+comparables[comparables.length/2])/2:null;
 return {taxes,fees,cost,check,shortfall:Math.max(0,cost-check),equity:check-loan,median:mid,compdiff:mid===null?null:mid-offer,comparables};
};
