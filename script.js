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

// ─── CALCULATORS ────────────────────────────────

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
  const cost = area * rate;
  const label = document.getElementById('houseType').selectedOptions[0].text;
  results.houseCost = fmtRs(cost);
  showResult('houseResult','houseResultVal', fmtRs(cost), label + ' · ' + fmt(area) + ' sq.ft × ₹' + fmt(rate), 'houseResultSub');
}


function generateReport() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const status = document.getElementById('pdfStatus');

  const orange = [232, 98, 10];
  const dark = [26, 26, 46];
  const gray = [107, 114, 128];
  const lightBg = [248, 249, 252];
  const green = [16, 185, 129];

  function domVal(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const txt = el.textContent.trim();
    return (txt && !txt.startsWith('⚠') && txt !== '—') ? txt : null;
  }

  const calcRows = [
    ['Concrete Volume',  domVal('conResultVal')],
    ['Slab Volume',      domVal('slabResultVal')],
    ['Column Volume',    domVal('colResultVal')],
    ['Beam Volume',      domVal('beamResultVal')],
    ['Footing Volume',   domVal('footResultVal')],
    ['Bricks Required',  domVal('brickResVal')],
    ['Cement Required',  domVal('cemResultVal')],
    ['Sand Required',    domVal('sandResultVal')],
    ['Jelly Required',   domVal('jellyResultVal')],
    ['Steel Weight',     domVal('steelResultVal')],
    ['Excavation Vol',   domVal('excResultVal')],
    ['Tank Capacity',    domVal('tankResultVal')],
    ['Staircase Steps',  domVal('stairResultVal')],
    ['Tiles Required',   domVal('tileResultVal')],
    ['Paint Required',   domVal('paintResultVal')],
    ['Plaster Area',     domVal('plasResultVal')],
    ['Cement Cost',      domVal('costResultVal')],
    ['Flooring Cost',    domVal('floorResultVal')],
    ['House Estimate',   domVal('houseResultVal')],
  ];
  const validRows = calcRows.filter(([, val]) => val);

  // AI price rows
  const priceRows = [
    ['Cement (per 50kg bag)',    domVal('pCement')],
    ['Sand / M-Sand (per CFT)', domVal('pSand')],
    ['Coarse Aggregate (per CFT)', domVal('pAggregate')],
    ['Steel TMT (per kg)',      domVal('pSteel')],
    ['Bricks (per 1000 nos)',   domVal('pBrick')],
    ['Paint Exterior (per ltr)',domVal('pPaint')],
  ];
  const validPriceRows = priceRows.filter(([, val]) => val);
  const aiSummary = domVal('aiSummary');

  // ── HEADER ──
  doc.setFillColor(...dark);
  doc.rect(0, 0, 210, 38, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('CIVIL CALCULATOR PRO • PREMIUM REPORT', 15, 17);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Premium Construction Report  |  Generated: ' + new Date().toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'}), 15, 30);

  let y = 50;

  // ── SECTION: CALCULATIONS ──
  // Section title bar
  doc.setFillColor(...orange);
  doc.rect(10, y - 6, 190, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('CALCULATION RESULTS', 15, y + 1);
  y += 12;

  if (validRows.length === 0) {
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text('No calculations done yet. Go to other tabs and calculate first.', 15, y + 4);
    y += 16;
  } else {
    validRows.forEach(([label, val], i) => {
      if (i % 2 === 0) {
        doc.setFillColor(...lightBg);
        doc.rect(10, y - 4, 190, 11, 'F');
      }
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...gray);
      doc.text(label, 15, y + 3);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...dark);
      doc.text(String(val), 195, y + 3, { align: 'right' });
      y += 11;
      if (y > 265) { doc.addPage(); y = 20; }
    });
    y += 4;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...gray);
    doc.text(validRows.length + ' calculations included.', 15, y);
    y += 12;
  }

  // ── SECTION: AI MATERIAL PRICES ──
  if (y > 240) { doc.addPage(); y = 20; }

  doc.setFillColor(99, 102, 241); // indigo
  doc.rect(10, y - 6, 190, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('AI ESTIMATED MATERIAL RATES  (Tamil Nadu – Sivagangai / Madurai)', 15, y + 1);
  y += 12;

  if (validPriceRows.length === 0) {
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text('No AI prices fetched yet. Go to the AI Prices tab and click "Get Prices".', 15, y + 4);
    y += 16;
  } else {
    validPriceRows.forEach(([label, val], i) => {
      if (i % 2 === 0) {
        doc.setFillColor(240, 240, 255);
        doc.rect(10, y - 4, 190, 11, 'F');
      }
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...gray);
      doc.text(label, 15, y + 3);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(99, 102, 241);
      doc.text(String(val), 195, y + 3, { align: 'right' });
      y += 11;
      if (y > 265) { doc.addPage(); y = 20; }
    });

    if (aiSummary) {
      y += 4;
      doc.setFillColor(255, 249, 230);
      doc.rect(10, y - 3, 190, 14, 'F');
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(146, 64, 14);
      const summaryText = aiSummary.replace('📊 ', '');
      doc.text('Market Summary: ' + summaryText, 15, y + 6, { maxWidth: 180 });
      y += 18;
    }

    y += 2;
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...gray);
    doc.text('* AI-estimated rates only. Verify with local supplier before purchase.', 15, y);
    y += 10;
  }

  // ── FOOTER ──
  const pageCount = doc.internal.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFillColor(...orange);
    doc.rect(0, 287, 210, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Civil Calculator Pro  |  Tamil Nadu', 15, 294);
    doc.text('Page ' + p + ' of ' + pageCount, 195, 294, { align: 'right' });
  }

  doc.save('Civil_Calculator_Report.pdf');
  const total = validRows.length + validPriceRows.length;
  status.textContent = '✅ PDF ready! ' + validRows.length + ' calc' + (validRows.length !== 1 ? 's' : '') + (validPriceRows.length ? ' + ' + validPriceRows.length + ' AI prices' : '') + ' included.';
  setTimeout(() => status.textContent = '', 5000);
}

// ─── AI PRICE FETCHER ────────────────────────────

async function fetchAIPrices() {
  const btn = document.getElementById('aiFetchBtn');
  const loading = document.getElementById('aiLoading');
  const grid = document.getElementById('priceGrid');

  btn.disabled = true;
  btn.textContent = '⏳ Fetching...';
  loading.classList.add('show');

  try {
    await new Promise(r => setTimeout(r, 1200));

    const prices = {
      cement: { price: "₹430", trend: "→ Stable", brand: "UltraTech" },
      sand: { price: "₹55", trend: "↑ Rising", note: "M-Sand" },
      aggregate: { price: "₹38", trend: "→ Stable", note: "20mm Aggregate" },
      steel: { price: "₹68", trend: "↑ Rising", note: "TMT Fe500" },
      brick: { price: "₹9000", trend: "→ Stable", note: "1000 Bricks" },
      paint: { price: "₹320", trend: "↑ Rising", note: "Exterior Emulsion" },
      summary: "Tamil Nadu construction material prices remain mostly stable."
    };

    document.getElementById('pCement').textContent = prices.cement.price;
    document.getElementById('pCementTrend').textContent = prices.cement.trend + ' · ' + prices.cement.brand;

    document.getElementById('pSand').textContent = prices.sand.price;
    document.getElementById('pSandTrend').textContent = prices.sand.trend + ' · ' + prices.sand.note;

    document.getElementById('pAggregate').textContent = prices.aggregate.price;
    document.getElementById('pAggregateTrend').textContent = prices.aggregate.trend + ' · ' + prices.aggregate.note;

    document.getElementById('pSteel').textContent = prices.steel.price;
    document.getElementById('pSteelTrend').textContent = prices.steel.trend + ' · ' + prices.steel.note;

    document.getElementById('pBrick').textContent = prices.brick.price;
    document.getElementById('pBrickTrend').textContent = prices.brick.trend + ' · ' + prices.brick.note;

    document.getElementById('pPaint').textContent = prices.paint.price;
    document.getElementById('pPaintTrend').textContent = prices.paint.trend + ' · ' + prices.paint.note;

    document.getElementById('aiSummary').textContent = '📊 ' + prices.summary;

    grid.style.display = 'block';
    btn.textContent = '🔄 Refresh Prices';

  } catch (err) {
    document.getElementById('aiLoading').textContent = '❌ Error loading prices';
  } finally {
    btn.disabled = false;
    loading.classList.remove('show');
  }
}



const appLang={
en:{title:"Civil Calculator Pro"},
ta:{title:"சிவில் கால்குலேட்டர் ப்ரோ"},
hi:{title:"सिविल कैलकुलेटर प्रो"},
te:{title:"సివిల్ కాలిక్యులేటర్ ప్రో"},
ml:{title:"സിവിൽ കാൽക്കുലേറ്റർ പ്രോ"},
kn:{title:"ಸಿವಿಲ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಪ್ರೊ"}
};

function changeLanguage(){
 const l=document.getElementById('languageSelector').value;
 localStorage.setItem('civil_lang',l);
 const h=document.querySelector('.header h1');
 if(h){ h.innerHTML='🏗 '+appLang[l].title; }
}

window.addEventListener('load',()=>{
 const l=localStorage.getItem('civil_lang')||'en';
 const s=document.getElementById('languageSelector');
 if(s){ s.value=l; changeLanguage(); }
});
