const clock=s=>{const p=String(s).split(':').map(Number);if(p.length<2||p.some(n=>!Number.isFinite(n))||p[0]<0||p[0]>23||p[1]<0||p[1]>59)throw Error('Enter valid clock times.');return p[0]*60+p[1]};
export function shiftMath(x){const start=clock(x.start),endC=clock(x.end);const duration=((endC-start+1440)%1440)||1440;if(duration>1440)throw Error('Shift must be 24 hours or less.');const breakMin=Number(x.breakMin??0);if(!Number.isInteger(breakMin)||breakMin<0||breakMin>180||breakMin>duration)throw Error('Enter a valid unpaid break length.');
const bC=clock(x.breakStart);const bOffset=((bC-start+1440)%1440);if(breakMin&&bOffset+breakMin>duration)throw Error('Unpaid break must fit within the shift.');
const ns=clock(x.nightStart),ne=clock(x.nightEnd);const fullDayNight=ns===ne;
let paidMinutes=0,nightMinutes=0,otMinutes=0,otNightMinutes=0;
const prior=Number(x.priorHours??0),threshold=Number(x.otThreshold??40),base=Number(x.base??0),diff=Number(x.diff??0),factor=Number(x.otFactor??1.5);
if([prior,threshold,base,diff,factor].some(z=>!Number.isFinite(z))||prior<0||threshold<=0||base<0||diff<0||factor<1)throw Error('Rates and prior hours must be valid, nonnegative numbers.');
const weeklyTrigger=Math.max(0,Math.ceil((threshold-prior)*60-1e-7));
for(let m=0;m<duration;m++){if(m>=bOffset&&m<bOffset+breakMin)continue;const minute=(start+m)%1440;const isNight=fullDayNight||(ns<ne?(minute>=ns&&minute<ne):(minute>=ns||minute<ne));const isOT=paidMinutes>=weeklyTrigger;paidMinutes++;if(isNight)nightMinutes++;if(isOT){otMinutes++;if(isNight)otNightMinutes++;}}
const paid=paidMinutes/60,night=nightMinutes/60,ot=otMinutes/60,nightOT=otNightMinutes/60;
const basePay=paid*base,diffPay=night*diff,otPay=(factor-1)*(ot*base+(x.otDiff==='both'?nightOT*diff:0));return {durationHours:duration/60,paid,night,ot,nightOT,basePay,diffPay,otPay,gross:basePay+diffPay+otPay};}
