// Display conversion keeps the original integer-cent ledger untouched. Repeated
// currency changes must never rewrite FIFO costs, receipts or payments.
function currencyRate(value){
 const text=String(value??'').trim().replace(',','.');
 if(!/^\d{1,9}(?:\.\d{1,8})?$/.test(text))throw Error('Escribe un tipo de cambio positivo, con hasta 8 decimales.');
 const [whole,fraction='']=text.split('.'),numerator=BigInt(whole+fraction),scale=10n**BigInt(fraction.length);
 if(numerator<=0n||numerator>100000000n*scale)throw Error('El tipo de cambio debe ser mayor que cero y no superar 100.000.000.');
 const normalized=String(BigInt(whole))+(fraction.replace(/0+$/,'')?'.'+fraction.replace(/0+$/,''):'');
 return {text:normalized,numerator,scale};
}
function validateCurrencyView(b){
 if(!Object.hasOwn(CURRENCIES,b.currency))throw Error('La moneda de registro no es válida.');
 const view=b.currencyView;if(view===undefined)return;
 if(!view||view.version!==1||view.base!==b.currency||!Object.hasOwn(CURRENCIES,view.code)||!view.rates||typeof view.rates!=='object'||Array.isArray(view.rates)||Object.keys(view.rates).length>4)throw Error('La configuración de conversión no es válida.');
 for(const [code,quote]of Object.entries(view.rates)){
  if(!Object.hasOwn(CURRENCIES,code)||code===b.currency||!quote||typeof quote.perUnit!=='string'||!validDate(quote.date))throw Error('Hay un tipo de cambio no válido.');
  currencyRate(quote.perUnit);
 }
 if(view.code!==b.currency&&!Object.hasOwn(view.rates,view.code))throw Error('Falta el tipo de cambio de la moneda elegida.');
}
function displayCurrency(b=state?.business){return b?.currencyView?.code||b?.currency||'PEN';}
function currencyConverted(b=state?.business){return !!b&&displayCurrency(b)!==b.currency;}
function currencyConvertCents(cents,perUnit){
 const {numerator,scale}=currencyRate(perUnit),n=typeof cents==='bigint'?cents:BigInt(Math.round(cents)),sign=n<0n?-1n:1n;
 return sign*((sign*n*scale+numerator/2n)/numerator);
}
function formatMoneyCents(cents,code){
 const n=typeof cents==='bigint'?cents:BigInt(Math.round(cents)),absolute=n<0n?-n:n,whole=absolute/100n;
 const value=n<0n?(whole===0n?-0:-whole):whole;
 return new Intl.NumberFormat('es-PE',{style:'currency',currency:code,currencyDisplay:'narrowSymbol',minimumFractionDigits:2,maximumFractionDigits:2}).formatToParts(value).map(p=>p.type==='fraction'?String(absolute%100n).padStart(2,'0'):p.value).join('');
}
function recordMoney(cents,b=state?.business){return formatMoneyCents(cents,b?.currency||'PEN');}
function currencyMoney(cents,b=state?.business){
 const code=displayCurrency(b);
 return currencyConverted(b)?formatMoneyCents(currencyConvertCents(cents,b.currencyView.rates[code].perUnit),code):recordMoney(cents,b);
}
function currencyContext(b=state?.business){
 if(!currencyConverted(b))return '';
 const code=displayCurrency(b),quote=b.currencyView.rates[code];
 return `1 ${code} = ${quote.perUnit} ${b.currency} · tasa manual del ${fmtDate(quote.date,true)}`;
}
function currencyBanner(){if(!currencyConverted())return '';return `<div class="currency-view-banner"><div><strong>Importes convertidos a ${displayCurrency()}</strong><small>${esc(currencyContext())}</small><small>Formularios, imágenes y CSV en ${state.business.currency}. Los originales se conservan; los equivalentes se redondean a dos decimales.</small></div><button class="btn secondary small" data-action="currency">Ajustar cambio</button></div>`;}
function currencyAnnotateModal(modal){
 if(!currencyConverted()||!modal.querySelector('#product-form,#purchase-form,#purchase-cost-form,#sale-form,#combo-form,#combo-sale-form,#payment-form,#expense-form'))return;
 const note=document.createElement('p');note.className='notice currency-form-note';note.textContent=`Escribe los importes en ${state.business.currency}, la moneda de registro. Los equivalentes mostrados en ${displayCurrency()} usan ${currencyContext()}.`;
 modal.querySelector('.modal-body').prepend(note);
}
function openCurrencySettings(){
 const b=state.business,code=displayCurrency(),quote=b.currencyView?.rates[code],options=selected=>Object.entries(CURRENCIES).map(([v,n])=>`<option value="${v}" ${v===selected?'selected':''}>${n}</option>`).join('');
 openModal('Moneda y tipo de cambio',`<form id="currency-view-form" data-write-id="${esc(state.writeId||'')}"><p>Elige cómo ver los precios, costos, ventas y ganancias. Los importes originales están registrados en <strong>${b.currency}</strong>.</p><label class="field"><span>Mostrar importes en</span><select name="displayCurrency">${options(code)}</select></label><div id="currency-rate-fields"><label class="field"><span id="currency-rate-label">Tipo de cambio</span><input name="rate" type="text" inputmode="decimal" value="${esc(quote?.perUnit||'')}" maxlength="20" autocomplete="off" placeholder="Por ejemplo: 3.80"></label><label class="field"><span>Fecha de tu tipo de cambio</span><input name="rateDate" type="date" value="${esc(quote?.date||today())}" min="1900-01-01" max="${today()}"></label><p class="muted-note currency-explanation">Usa el cambio de tu banco o casa de cambio. Se guarda manualmente y funciona sin conexión; el ejemplo 3.80 no es una cotización actual.</p></div><div id="currency-preview" class="currency-preview" aria-live="polite"></div><p class="notice">Los formularios para registrar o editar y las importaciones por imagen mantienen la moneda original. Volver a mostrar soles recupera exactamente sus valores, sin perder céntimos. El CSV conserva esa misma moneda de registro.</p><details class="currency-correction"><summary>Corregir una moneda seleccionada por error</summary><p>Úsalo si la versión anterior cambió la etiqueta de soles a dólares y los números siguen siendo los que escribiste en soles. Elige aquí la moneda en la que introdujiste esos números.</p><label class="field"><span>Moneda original de los registros</span><select name="baseCurrency">${options(b.currency)}</select></label><label class="currency-check"><input type="checkbox" name="correctBase"> Confirmo que los números actuales fueron introducidos en esta moneda original.</label><p>Esta corrección cambia la unidad original. Para convertir valores, usa “Mostrar importes en” y su tipo de cambio.</p></details>${formActions('Guardar conversión')}</form>`);
 currencyUpdateForm(true);
}
function currencyDraft(form){
 const fd=new FormData(form),base=String(fd.get('baseCurrency')),code=String(fd.get('displayCurrency'));
 if(!Object.hasOwn(CURRENCIES,base)||!Object.hasOwn(CURRENCIES,code))throw Error('Elige una moneda válida.');
 if(base!==state.business.currency&&!fd.get('correctBase'))throw Error('Confirma la moneda en la que introdujiste los números originales.');
 const rates=base===state.business.currency?clone(state.business.currencyView?.rates||{}):{};
 if(code!==base){const rate=currencyRate(fd.get('rate')).text,date=String(fd.get('rateDate'));if(!validDate(date)||date>today())throw Error('Indica una fecha válida para tu tipo de cambio, hasta hoy.');rates[code]={perUnit:rate,date};}
 const business={...state.business,currency:base,currencyView:{version:1,base,code,rates}};
 validateCurrencyView(business);return business;
}
function currencyUpdateForm(resetRate=false){
 const form=document.querySelector('#currency-view-form');if(!form)return;
 const base=form.elements.baseCurrency.value,code=form.elements.displayCurrency.value,same=base===code,fields=form.querySelector('#currency-rate-fields');
 if(resetRate){const quote=base===state.business.currency?state.business.currencyView?.rates[code]:null;form.elements.rate.value=quote?.perUnit||'';form.elements.rateDate.value=quote?.date||today();}
 fields.hidden=same;form.elements.rate.disabled=same;form.elements.rateDate.disabled=same;form.elements.rate.required=!same;form.elements.rateDate.required=!same;
 form.querySelector('#currency-rate-label').textContent=`¿Cuántos ${base} equivale 1 ${code}? (1 ${code} = … ${base})`;
 const box=form.querySelector('#currency-preview'),submit=form.querySelector('[type=submit]');
 try{
  // Permit a preview of a base correction before its explicit acknowledgement.
  const preview={...state.business,currency:base,currencyView:{version:1,base,code,rates:{}}};
  if(!same){const rate=currencyRate(form.elements.rate.value).text;preview.currencyView.rates[code]={perUnit:rate,date:form.elements.rateDate.value};}
  const products=state.business.products.filter(p=>!p.deleted).slice(0,3),rows=products.length?products:[{name:'Ejemplo con 10 unidades de la moneda original',price:1000}];
  box.innerHTML=`<strong>${same?'Moneda original':`Conversión: 1 ${code} = ${currencyRate(form.elements.rate.value).text} ${base}`}</strong>${rows.map(p=>`<div><span>${esc(p.name)}</span><b>${esc(recordMoney(p.price,preview))} = ${esc(currencyMoney(p.price,preview))}</b></div>`).join('')}`;
  submit.disabled=false;
 }catch(e){box.textContent='Introduce tu tipo de cambio para ver la conversión. '+e.message;submit.disabled=true;}
 form.querySelector('.form-error').textContent='';
}
async function saveCurrencySettings(form){
 try{
  if(saving)throw Error('Espera a que termine el guardado actual.');
  if((state.writeId||'')!==form.dataset.writeId)throw Error('Tus datos cambiaron. Cierra y abre de nuevo el cambio de moneda.');
  const before=clone(state),business=currencyDraft(form);validate({...state,business});state.business=business;
  await businessCommit(before,form,`Conversión guardada. Importes en ${displayCurrency()}; registros originales en ${state.business.currency}.`);
 }catch(e){form.querySelector('.form-error').textContent=e.message;}
}
document.addEventListener('change',ev=>{if(ev.target.closest('#currency-view-form'))currencyUpdateForm(['baseCurrency','displayCurrency'].includes(ev.target.name));});
document.addEventListener('input',ev=>{if(ev.target.closest('#currency-view-form'))currencyUpdateForm();});
document.addEventListener('submit',ev=>{if(ev.target.getAttribute('id')==='currency-view-form'){ev.preventDefault();saveCurrencySettings(ev.target);}});
