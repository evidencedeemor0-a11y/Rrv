let balance=6962.24, ledger=6742.35, mode='add';
const $=s=>document.querySelector(s), app=$('#app'), modal=$('#modal'), sheet=$('#sheet'), input=$('#input'), quickAmounts=$('#quickAmounts');
const money=n=>n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
function render(){const whole=Math.floor(balance).toLocaleString('en-US'), cents=balance.toFixed(2).split('.')[1];$('#amount').innerHTML='$'+whole+'<span class="cents">.'+cents+'</span>';$('#ledger').textContent='$'+money(ledger)}

function renderChips(kind){
  const presets = kind==='add' ? [50,100,250,500] : [50,100,250];
  quickAmounts.innerHTML='';
  presets.forEach(v=>{
    const b=document.createElement('button');
    b.type='button';b.className='chip';b.textContent='$'+v;
    b.onclick=()=>{input.value=v;syncChipState()};
    quickAmounts.appendChild(b);
  });
  if(kind==='send'){
    const b=document.createElement('button');
    b.type='button';b.className='chip';b.textContent='Max';
    b.onclick=()=>{input.value=balance.toFixed(2);syncChipState()};
    quickAmounts.appendChild(b);
  }
  syncChipState();
}
function syncChipState(){
  [...quickAmounts.children].forEach(chip=>{
    const label=chip.textContent.replace('$','');
    const match = label==='Max' ? Number(input.value)===Number(balance.toFixed(2)) : Number(label)===Number(input.value);
    chip.classList.toggle('active', match);
  });
}
input.addEventListener('input', syncChipState);

function open(kind){
  mode=kind;
  sheet.classList.remove('add','send');sheet.classList.add(kind);
  $('#modalTitle').textContent=kind==='add'?'Add Cash':'Send Money';
  $('#modalDesc').textContent=kind==='add'?'Enter an amount to add to your USD balance.':'Enter an amount to send from your USD balance.';
  $('#confirmLabel').textContent=kind==='add'?'Add Cash':'Send Money';
  input.value=kind==='add'?100:250;
  renderChips(kind);
  modal.classList.add('open');
  setTimeout(()=>input.focus(),50)
}
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>$('#toast').classList.remove('show'),1900)}
$('#add').onclick=()=>open('add');$('#send').onclick=()=>open('send');$('#exchange').onclick=()=>toast('1 USD ≈ ₦1,610 • Rate preview only');
$('#confirm').onclick=()=>{const v=Number(input.value);if(!v||v<=0)return toast('Enter a valid amount');if(mode==='send'&&v>balance)return toast('Insufficient demo balance');balance+=mode==='add'?v:-v;ledger+=mode==='add'?v:-v;render();toast((mode==='add'?'Added $':'Sent $')+money(v));modal.classList.remove('open')};
$('#cancel').onclick=()=>modal.classList.remove('open');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')};document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});
$('#menu').onclick=()=>toast('Account menu');$('#back').onclick=()=>toast('Back');
// Press T to toggle light/dark mode.
document.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='t'){app.classList.toggle('light');document.body.style.background=app.classList.contains('light')?'#f0f0f0':'#111'}});render();
