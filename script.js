// ─── RESULTS STORE ──────────────────────────────
const results = {};

// ─── TAB SWITCHING ──────────────────────────────
function showTab(name) {
  document.querySelectorAll('.calc-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  event.currentTarget.classList.add('active');
}

// ─── HELPERS ────────────────────────────────────
function getVal(id) {
  return parseFloat(document.getElementById(id).value);
}

function showResult(boxId, valId, value, sub, subId) {
  const box = document.getElementById(boxId);
  box.classList.remove('error-box');
  box.classList.add('show');
  document.getElementById(valId).textContent = value;
  if (subId && sub) document.getElementById(subId).textContent = sub;
}

function showError(boxId, valId, msg) {
  const box = document.getElementById(boxId);
  box.classList.add('show', 'error-box');
  document.getElementById(valId).textContent = msg;
}

function validate(...ids) {
  let ok = true;
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const v = parseFloat(el.value);
    if (isNaN(v) || v <= 0) {
      el.classList.add('error');
      ok = false;
    } else {
      el.classList.remove('error');
    }
  });
  return ok;
}

function resetCard(...ids) {
  const resultId = ids[ids.length - 1];
  const inputIds = ids.slice(0, -1);
  inputIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.classList.remove('error'); }
  });
  const box = document.getElementById(resultId);
  if (box) box.classList.remove('show');
}

function fmt(n) { return n.toLocaleString('en-IN', {maximumFractionDigits: 2}); }
function fmtRs(n) { return '₹' + n.toLocaleString('en-IN', {maximumFractionDigits: 0}); }

// ─── CALCULATORS: CONCRETE TAB ──────────────────

function concreteCalc() {
  if (!validate('conLength','conWidth','conHeight')) {
    showError('conResult','conResultVal','⚠ Please enter valid values'); return;
  }
  const vol = getVal('conLength') * getVal('conWidth') * getVal('conHeight');
  results.concrete = fmt(vol) + ' CFT';
  showResult('conResult','conResultVal', fmt(vol) + ' CFT', 'Approx ' + fmt(vol/35.315) + ' cubic metres', 'conResultSub');
}

function slabCalc() {
  if (!validate('slabLength','slabWidth','slabThick')) {
    showError('slabResult','slabResultVal','⚠ Please enter valid values'); return;
  }
  const vol = getVal('slabLength') * getVal('slabWidth') * getVal('slabThick');
  results.slab = fmt(vol) + ' CFT';
  showResult('slabResult','slabResultVal', fmt(vol) + ' CFT', 'Area: ' + fmt(getVal('slabLength')*getVal('slabWidth')) + ' sq.ft', 'slabResultSub');
}

function columnCalc() {
  if (!validate('colL','colW','colH')) {
    showError('colResult','colResultVal','⚠ Please enter valid values'); return;
  }
  const vol = getVal('colL') * getVal('colW') * getVal('colH');
  results.column = fmt(vol) + ' CFT';
  showResult('colResult','colResultVal', fmt(vol) + ' CFT');
}

function beamCalc() {
  if (!validate('beamL','beamW','beamH')) {
    showError('beamResult','beamResultVal','⚠ Please enter valid values'); return;
  }
  const vol = getVal('beamL') * getVal('beamW') * getVal('beamH');
  results.beam = fmt(vol) + ' CFT';
  showResult('beamResult','beamResultVal', fmt(vol) + ' CFT');
}

function footingCalc() {
  if (!validate('footL','footW','footD')) {
    showError('footResult','footResultVal','⚠ Please enter valid values'); return;
  }
  const vol = getVal('footL') * getVal('footW') * getVal('footD');
  results.footing = fmt(vol) + ' CFT';
  showResult('footResult','footResultVal', fmt(vol) + ' CFT');
}

// ─── CALCULATORS: BRICK TAB ─────────────────────

function brickCalc() {
  if (!validate('wallL','wallH')) {
    showError('brickRes','brickResVal','⚠ Please enter valid values'); return;
  }
  const area = getVal('wallL') * getVal('wallH');
  const bricks = Math.round(area * 13.5);
  const withWaste = Math.round(bricks * 1.05);
  results.bricks = bricks + ' nos';
  showResult('brickRes','brickResVal', fmt(bricks) + ' bricks', '+5% waste = ' + fmt(withWaste) + ' bricks', 'brickResSub');
}

// ─── CALCULATORS: MATERIALS TAB ─────────────────

function cementCalc() {
  if (!validate('cemVol')) {
    showError('cemResult','cemResultVal','⚠ Please enter valid volume'); return;
  }
  const bags = Math.ceil(getVal('cemVol') / 4);
  results.cement = bags + ' bags';
  showResult('cemResult','cemResultVal', bags + ' bags (50kg)', 'Weight: ' + (bags*50) + ' kg', 'cemResultSub');
}

function sandCalc() {
  if (!validate('sandVol')) {
    showError('sandResult','sandResultVal','⚠ Please enter valid volume'); return;
  }
  const sand = (getVal('sandVol') * 0.44).toFixed(2);
  results.sand = sand + ' CFT';
  showResult('sandResult','sandResultVal', sand + ' CFT');
}

function jellyCalc() {
  if (!validate('jellyVol')) {
    showError('jellyResult','jellyResultVal','⚠ Please enter valid volume'); return;
  }
  const jelly = (getVal('jellyVol') * 0.88).toFixed(2);
  results.jelly = jelly + ' CFT';
  showResult('jellyResult','jellyResultVal', jelly + ' CFT');
}

function steelCalc() {
  if (!validate('steelDia','steelLen')) {
    showError('steelResult','steelResultVal','⚠ Please enter valid values'); return;
  }
  const dia = getVal('steelDia');
  const len = getVal('steelLen');
  const weight = ((dia * dia) / 162) * (len / 3.281);
  results.steel = weight.toFixed(2) + ' kg';
  showResult('steelResult','steelResultVal', weight.toFixed(2) + ' kg', 'Formula: D²/162 × Length(m)', 'steelResultSub');
}

// ─── CALCULATORS: STRUCTURE TAB ─────────────────

function excavationCalc() {
  if (!validate('excL','excW','excD')) {
    showError('excResult','excResultVal','⚠ Please enter valid values'); return;
  }
  const vol = getVal('excL') * getVal('excW') * getVal('excD');
  results.excavation = fmt(vol) + ' CFT';
  showResult('excResult','excResultVal', fmt(vol) + ' CFT');
}

function tankCalc() {
  if (!validate('tankL','tankW','tankH')) {
    showError('tankResult','tankResultVal','⚠ Please enter valid values'); return;
  }
  const cft = getVal('tankL') * getVal('tankW') * getVal('tankH');
  const litres = (cft * 28.3168).toFixed(0);
  results.tank = litres + ' Litres';
  showResult('tankResult','tankResultVal', Number(litres).toLocaleString('en-IN') + ' Litres', fmt(cft) + ' cubic feet', 'tankResultSub');
}

function stairCalc() {
  if (!validate('stairH','stepH')) {
    showError('stairResult','stairResultVal','⚠ Please enter valid values'); return;
  }
  const steps = Math.ceil(getVal('stairH') / getVal('stepH'));
  results.stairs = steps + ' steps';
  showResult('stairResult','stairResultVal', steps + ' steps');
}

// ─── CALCULATORS: FINISHING TAB ─────────────────

function tileCalc() {
  if (!validate('tileL','tileW','tileS')) {
    showError('tileResult','tileResultVal','⚠ Please enter valid values'); return;
  }
  const area = getVal('tileL') * getVal('tileW');
  const tileArea = getVal('tileS') * getVal('tileS');
  const tiles = Math.ceil(area / tileArea);
  const withWaste = Math.ceil(tiles * 1.05);
  results.tiles = tiles + ' nos';
  showResult('tileResult','tileResultVal', fmt(tiles) + ' tiles', '+5% waste = ' + fmt(withWaste) + ' tiles', 'tileResultSub');
}

function paintCalc() {
  if (!validate('paintL','paintH')) {
    showError('paintResult','paintResultVal','⚠ Please enter valid values'); return;
  }
  const area = getVal('paintL') * getVal('paintH');
  // 1 litre covers ~40 sq.ft for 2 coats
  const litres = (area / 40).toFixed(2);
  results.paint = litres + ' litres';
  showResult('paintResult','paintResultVal', litres + ' litres', 'Area: ' + fmt(area) + ' sq.ft (1L covers ~40 sq.ft)', 'paintResultSub');
}

function plasterCalc() {
  if (!validate('plasL','plasH')) {
    showError('plasResult','plasResultVal','⚠ Please enter valid values'); return;
  }
  const area = getVal('plasL') * getVal('plasH');
  results.plaster = fmt(area) + ' sq.ft';
  showResult('plasResult','plasResultVal', fmt(area) + ' sq.ft');
}

// ─── CALCULATORS: COST TAB ──────────────────────

function costCalc() {
  if (!validate('cemBags','cemPrice')) {
    showError('costResult','costResultVal','⚠ Please enter valid values'); return;
  }
  const total = getVal('cemBags') * getVal('cemPrice');
  results.cementCost = fmtRs(total);
  showResult('costResult','costResultVal', fmtRs(total));
}

function flooringCalc() {
  if (!validate('floorArea','floorRate')) {
    showError('floorResult','floorResultVal','⚠ Please enter valid values'); return;
  }
  const total = getVal('floorArea') * getVal('floorRate');
  results.flooringCost = fmtRs(total);
  showResult('floorResult','floorResultVal', fmtRs(total));
}

function houseCalc() {
  if (!validate('houseArea')) {
    showError('houseResult','houseResultVal','⚠ Please enter valid area'); return;
  }
  const area = getVal('houseArea');
  const rate = parseFloat(document.getElementById('houseType').value);
  const total = area * rate;
  results.houseCost = fmtRs(total);
  showResult('houseResult','houseResultVal', fmtRs(total), 'For ' + fmt(area) + ' sq.ft @ ₹' + fmt(rate) + '/sq.ft', 'houseResultSub');
}

// ─── PDF GENERATION ─────────────────────────────

function generateReport() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Civil Calculator Pro - Report', 15, 15);
  
  doc.setFontSize(12);
  doc.text('Generated on: ' + new Date().toLocaleString('en-IN'), 15, 25);
  
  let yPos = 35;
  const margin = 15;
  const pageHeight = doc.internal.pageSize.height;
  
  doc.setFontSize(14);
  doc.text('Summary of Calculations', margin, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  for (const [key, value] of Object.entries(results)) {
    if (yPos > pageHeight - 20) {
      doc.addPage();
      yPos = 15;
    }
    doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, margin, yPos);
    yPos += 7;
  }
  
  doc.save('civil-calculator-report.pdf');
  document.getElementById('pdfStatus').textContent = '✅ PDF Downloaded Successfully!';
  setTimeout(() => {
    document.getElementById('pdfStatus').textContent = '';
  }, 3000);
}

// ─── AI PRICE FETCHING ──────────────────────────

function fetchAIPrices() {
  const btn = document.getElementById('aiFetchBtn');
  const loading = document.getElementById('aiLoading');
  const grid = document.getElementById('priceGrid');
  
  btn.disabled = true;
  loading.classList.add('show');
  
  // Simulated AI prices (Tamil Nadu market rates)
  setTimeout(() => {
    const prices = {
      cement: 385,
      sand: 12,
      aggregate: 15,
      steel: 58,
      brick: 4500,
      paint: 350
    };
    
    document.getElementById('pCement').textContent = '₹' + prices.cement;
    document.getElementById('pSand').textContent = '₹' + prices.sand;
    document.getElementById('pAggregate').textContent = '₹' + prices.aggregate;
    document.getElementById('pSteel').textContent = '₹' + prices.steel;
    document.getElementById('pBrick').textContent = '₹' + prices.brick;
    document.getElementById('pPaint').textContent = '₹' + prices.paint;
    
    document.getElementById('pCementTrend').textContent = '↑ +2.5% from last week';
    document.getElementById('pSandTrend').textContent = '→ Stable';
    document.getElementById('pAggregateTrend').textContent = '↓ -1.2% from last week';
    document.getElementById('pSteelTrend').textContent = '↑ +3.8% from last week';
    document.getElementById('pBrickTrend').textContent = '→ Stable';
    document.getElementById('pPaintTrend').textContent = '↑ +1.5% from last week';
    
    document.getElementById('aiSummary').textContent = 'Last updated: ' + new Date().toLocaleTimeString('en-IN');
    
    grid.style.display = 'block';
    loading.classList.remove('show');
    btn.disabled = false;
  }, 1500);
}

// ─── LANGUAGE SUPPORT (PLACEHOLDER) ─────────────

function changeLanguage() {
  const lang = document.getElementById('languageSelector').value;
  // Placeholder for language switching
  console.log('Language changed to:', lang);
  // TODO: Implement i18n for multi-language support
}
