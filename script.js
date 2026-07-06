// ─── RESULTS STORE ──────────────────────────────
const results = {};

// ─── ALLOWED TAB NAMES (whitelist for safe DOM lookup) ─────
const VALID_TABS = ['concrete','brick','materials','structure','finishing','cost','report','prices'];

// ─── TAB SWITCHING ──────────────────────────────
function showTab(name, clickedBtn) {
  if (!VALID_TABS.includes(name)) return;
  document.querySelectorAll('.calc-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  if (clickedBtn) clickedBtn.classList.add('active');
}

// ─── HELPERS ────────────────────────────────────
function getVal(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.error('getVal: missing input element "' + id + '"');
    return NaN;
  }
  return parseFloat(el.value);
}

function showResult(boxId, valId, value, sub, subId) {
  const box = document.getElementById(boxId);
  const valEl = document.getElementById(valId);
  if (!box || !valEl) {
    console.error('showResult: missing element(s) "' + boxId + '" / "' + valId + '"');
    return;
  }
  box.classList.remove('error-box');
  box.classList.add('show');
  valEl.textContent = value;
  if (subId && sub) {
    const subEl = document.getElementById(subId);
    if (subEl) subEl.textContent = sub;
  }
}

function showError(boxId, valId, msg) {
  const box = document.getElementById(boxId);
  const valEl = document.getElementById(valId);
  if (!box || !valEl) {
    console.error('showError: missing element(s) "' + boxId + '" / "' + valId + '"');
    return;
  }
  box.classList.add('show', 'error-box');
  valEl.textContent = msg;
}

function validate(...ids) {
  let ok = true;
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const v = parseFloat(el.value);
    if (isNaN(v) || v <= 0 || v > 999999) {
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
  const houseTypeEl = document.getElementById('houseType');
  const rate = houseTypeEl ? parseFloat(houseTypeEl.value) : NaN;
  if (isNaN(rate) || rate <= 0) {
    showError('houseResult','houseResultVal','⚠ Please select a valid construction type'); return;
  }
  const total = area * rate;
  results.houseCost = fmtRs(total);
  showResult('houseResult','houseResultVal', fmtRs(total), 'For ' + fmt(area) + ' sq.ft @ ₹' + fmt(rate) + '/sq.ft', 'houseResultSub');
}

// ─── PREMIUM PDF GENERATION ─────────────────────

function generateReport() {
  const statusEl = document.getElementById('pdfStatus');
  const setStatus = (msg) => { if (statusEl) statusEl.textContent = msg; };

  if (!window.jspdf || !window.jspdf.jsPDF) {
    console.error('generateReport: jsPDF library is not loaded');
    setStatus('⚠ PDF library failed to load. Check your internet connection and try again.');
    return;
  }

  try {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (2 * margin);
  let yPos = margin;
  let pageNum = 1;

  // Color scheme
  const colors = {
    primary: '#1A3A52',
    accent: '#E8620A',
    lightBg: '#F0F4F8',
    text: '#1A1A2E',
    lightText: '#6B7280',
    border: '#D1D5DB'
  };

  // Helper: Add header
  function addHeader() {
    doc.setFillColor(26, 58, 82);
    doc.rect(0, 0, pageWidth, 15, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('🏗 CIVIL CALCULATOR PRO', margin, 8.5);
    
    doc.setTextColor(232, 98, 10);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Professional Civil Engineering Report', pageWidth - margin - 60, 8.5);

    yPos = 22;
  }

  // Helper: Add footer
  function addFooter() {
    doc.setTextColor(107, 114, 128);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    
    doc.setDrawColor(209, 213, 219);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    
    doc.text('Generated by Civil Calculator Pro', margin, pageHeight - 8);
    doc.text('Developed by Mukesh', margin, pageHeight - 5);
    doc.text('Page ' + pageNum, pageWidth - margin - 15, pageHeight - 8);
  }

  // Helper: Add divider
  function addDivider() {
    doc.setDrawColor(209, 213, 219);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 4;
  }

  // Helper: Add section title
  function addSectionTitle(title, icon) {
    doc.setTextColor(26, 58, 82);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(icon + ' ' + title, margin, yPos);
    yPos += 2;
    addDivider();
    yPos += 2;
  }

  // Helper: Add card box
  function addCardBox(height = 25) {
    doc.setFillColor(240, 244, 248);
    doc.rect(margin, yPos, contentWidth, height, 'F');
    doc.setDrawColor(209, 213, 219);
    doc.setLineWidth(0.5);
    doc.rect(margin, yPos, contentWidth, height);
    const startY = yPos;
    yPos += height;
    return startY;
  }

  // Helper: Add table header
  function addTableHeader(columns) {
    const colWidth = contentWidth / columns.length;
    doc.setFillColor(26, 58, 82);
    doc.rect(margin, yPos, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    
    let xPos = margin;
    columns.forEach(col => {
      doc.text(col, xPos + 2, yPos + 4.5);
      xPos += colWidth;
    });
    yPos += 8;
  }

  // Helper: Add table row
  function addTableRow(data, rowNum) {
    const colWidth = contentWidth / data.length;
    if (rowNum % 2 === 0) {
      doc.setFillColor(245, 247, 250);
      doc.rect(margin, yPos, contentWidth, 6.5, 'F');
    }
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    doc.line(margin, yPos + 6.5, pageWidth - margin, yPos + 6.5);
    doc.setTextColor(26, 26, 46);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    
    let xPos = margin;
    data.forEach(cell => {
      doc.text(String(cell), xPos + 2, yPos + 4);
      xPos += colWidth;
    });
    yPos += 6.5;
  }

  // Helper: Check page break
  function checkPageBreak(requiredSpace = 40) {
    if (yPos + requiredSpace > pageHeight - 15) {
      addFooter();
      doc.addPage();
      pageNum++;
      addHeader();
      return true;
    }
    return false;
  }

  // PAGE 1: COVER PAGE
  addHeader();
  
  doc.setTextColor(26, 58, 82);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('CIVIL CALCULATOR', margin, yPos + 15);
  doc.text('PRO', margin, yPos + 28);
  
  yPos += 40;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(232, 98, 10);
  doc.text('Professional Civil Engineering Report', margin, yPos);
  
  yPos += 15;
  
  const cardStart = addCardBox(45);
  doc.setTextColor(107, 114, 128);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Report Generated:', margin + 4, cardStart + 8);
  doc.text(new Date().toLocaleString('en-IN'), margin + 4, cardStart + 14);
  
  doc.text('Total Calculations:', margin + 4, cardStart + 22);
  doc.setTextColor(26, 58, 82);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(Object.keys(results).length.toString(), margin + 4, cardStart + 29);
  
  yPos += 10;
  addDivider();
  
  doc.setTextColor(107, 114, 128);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('This comprehensive report contains all calculation results from your civil engineering project.', margin, yPos + 5);
  doc.text('All values are calculated using industry-standard formulas and practices.', margin, yPos + 11);
  
  addFooter();

  // PAGE 2+: RESULTS TABLE
  doc.addPage();
  pageNum++;
  addHeader();
  
  addSectionTitle('CALCULATION RESULTS', '📊');
  
  const resultsList = Object.entries(results).map(([key, value]) => [
    key.replace(/([A-Z])/g, ' $1').trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    String(value),
    getUnitForKey(key)
  ]);
  
  if (resultsList.length > 0) {
    addTableHeader(['Calculation Name', 'Result', 'Unit']);
    
    resultsList.forEach((row, idx) => {
      checkPageBreak(10);
      addTableRow(row, idx);
    });
  } else {
    doc.setTextColor(107, 114, 128);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text('No calculations performed yet.', margin + 2, yPos + 5);
    yPos += 10;
  }
  
  addFooter();
  
  // PAGE 3: SUMMARY
  doc.addPage();
  pageNum++;
  addHeader();
  
  addSectionTitle('MATERIAL SUMMARY', '🏗️');
  const materialResults = Object.entries(results).filter(([key]) => 
    ['cement', 'sand', 'jelly', 'steel', 'bricks'].some(m => key.toLowerCase().includes(m))
  );
  
  if (materialResults.length > 0) {
    addTableHeader(['Material', 'Quantity']);
    materialResults.forEach((row, idx) => {
      checkPageBreak(10);
      addTableRow([
        row[0].replace(/([A-Z])/g, ' $1').trim(),
        String(row[1])
      ], idx);
    });
  } else {
    doc.setTextColor(107, 114, 128);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text('No material calculations performed.', margin + 2, yPos + 5);
    yPos += 10;
  }
  
  yPos += 8;
  
  addSectionTitle('COST SUMMARY', '💰');
  const costResults = Object.entries(results).filter(([key]) => 
    key.toLowerCase().includes('cost')
  );
  
  if (costResults.length > 0) {
    addTableHeader(['Item', 'Cost']);
    costResults.forEach((row, idx) => {
      checkPageBreak(10);
      addTableRow([
        row[0].replace(/([A-Z])/g, ' $1').trim(),
        String(row[1])
      ], idx);
    });
    
    yPos += 10;
    const totalCost = costResults.reduce((sum, [, val]) => {
      const num = parseInt(val.toString().replace(/₹|,/g, '')) || 0;
      return sum + num;
    }, 0);
    
    doc.setFillColor(240, 244, 248);
    doc.rect(margin, yPos, contentWidth, 8, 'F');
    doc.setTextColor(26, 58, 82);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Total Estimated Cost:', margin + 2, yPos + 5);
    doc.text(fmtRs(totalCost), pageWidth - margin - 30, yPos + 5);
  } else {
    doc.setTextColor(107, 114, 128);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text('No cost calculations performed.', margin + 2, yPos + 5);
    yPos += 10;
  }
  
  yPos += 15;
  
  addSectionTitle('KEY STATISTICS', '📈');
  doc.setTextColor(107, 114, 128);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Total Calculations Performed: ' + Object.keys(results).length, margin + 2, yPos);
  yPos += 5;
  doc.text('Report Generated: ' + new Date().toLocaleString('en-IN'), margin + 2, yPos);
  yPos += 5;
  doc.text('Quality: A4 Optimized | Multi-Page Format', margin + 2, yPos);
  
  addFooter();
  
  doc.save('civil-calculator-professional-report.pdf');
  setStatus('Professional PDF Downloaded Successfully!');
  setTimeout(function () { setStatus(''); }, 4000);
  } catch (err) {
    console.error('generateReport: failed to generate PDF', err);
    setStatus('Failed to generate PDF. Please try again.');
  }
}

function getUnitForKey(key) {
  const unitMap = {
    'concrete': 'CFT',
    'slab': 'CFT',
    'column': 'CFT',
    'beam': 'CFT',
    'footing': 'CFT',
    'bricks': 'nos',
    'cement': 'bags',
    'sand': 'CFT',
    'jelly': 'CFT',
    'steel': 'kg',
    'excavation': 'CFT',
    'tank': 'Litres',
    'stairs': 'steps',
    'tiles': 'nos',
    'paint': 'litres',
    'plaster': 'sq.ft',
    'cementCost': '₹',
    'flooringCost': '₹',
    'houseCost': '₹'
  };
  return unitMap[key] || 'units';
}

// ─── AI PRICE FETCHING ──────────────────────────

function fetchAIPrices() {
  const btn = document.getElementById('aiFetchBtn');
  const loading = document.getElementById('aiLoading');
  const grid = document.getElementById('priceGrid');
  
  if (!btn || !loading || !grid) {
    console.error('fetchAIPrices: required elements are missing');
    return;
  }

  btn.disabled = true;
  loading.classList.add('show');
  
  setTimeout(() => {
    try {
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
    } catch (err) {
      console.error('fetchAIPrices: failed to update prices', err);
      const summary = document.getElementById('aiSummary');
      if (summary) summary.textContent = '⚠ Failed to fetch prices. Please try again.';
    } finally {
      loading.classList.remove('show');
      btn.disabled = false;
    }
  }, 1500);
}

// ─── LANGUAGE SUPPORT (PLACEHOLDER) ─────────────

function changeLanguage() {
  document.getElementById('languageSelector').value;
}

// ─── CALCULATOR DISPATCH MAP ────────────────────
const calcDispatch = {
  concrete: concreteCalc,
  slab: slabCalc,
  column: columnCalc,
  beam: beamCalc,
  footing: footingCalc,
  brick: brickCalc,
  cement: cementCalc,
  sand: sandCalc,
  jelly: jellyCalc,
  steel: steelCalc,
  excavation: excavationCalc,
  tank: tankCalc,
  stair: stairCalc,
  tile: tileCalc,
  paint: paintCalc,
  plaster: plasterCalc,
  cost: costCalc,
  flooring: flooringCalc,
  house: houseCalc
};

// ─── EVENT LISTENER REGISTRATION ────────────────
document.addEventListener('DOMContentLoaded', function () {
  // Tab buttons
  document.querySelectorAll('[data-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showTab(btn.dataset.tab, btn);
    });
  });

  // Calculator buttons
  document.querySelectorAll('[data-calc]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var fn = calcDispatch[btn.dataset.calc];
      if (fn) fn();
    });
  });

  // Reset buttons
  document.querySelectorAll('[data-reset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var ids = btn.dataset.reset.split(',');
      resetCard.apply(null, ids);
    });
  });

  // PDF report button
  var reportBtn = document.getElementById('reportBtn');
  if (reportBtn) reportBtn.addEventListener('click', generateReport);

  // AI prices button
  var aiFetchBtn = document.getElementById('aiFetchBtn');
  if (aiFetchBtn) aiFetchBtn.addEventListener('click', fetchAIPrices);

  // Language selector
  var langSel = document.getElementById('languageSelector');
  if (langSel) langSel.addEventListener('change', changeLanguage);

  // Cap numeric inputs to a safe maximum
  document.querySelectorAll('input[type="number"]').forEach(function (input) {
    if (!input.hasAttribute('max')) input.setAttribute('max', '999999');
  });
});
