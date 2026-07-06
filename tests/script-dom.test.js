/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load script content and expose functions globally
const scriptContent = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

// Wrap script to assign all functions to global scope
const wrappedScript = scriptContent.replace('const results = {};', 'var results = {};');
// Use indirect eval to run in global scope
const indirectEval = eval;
indirectEval(wrappedScript);

describe('script.js DOM integration tests', () => {

  beforeEach(() => {
    document.body.innerHTML = '';
    // Reset results store
    global.results = {};
  });

  // ─── CONCRETE TAB ─────────────────────────────

  describe('concreteCalc', () => {
    test('displays result for valid input', () => {
      document.body.innerHTML = `
        <input id="conLength" value="10" />
        <input id="conWidth" value="8" />
        <input id="conHeight" value="0.5" />
        <div id="conResult" class="result-box">
          <div id="conResultVal"></div>
          <div id="conResultSub"></div>
        </div>
      `;
      concreteCalc();
      expect(document.getElementById('conResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('conResultVal').textContent).toContain('40');
      expect(document.getElementById('conResultVal').textContent).toContain('CFT');
    });

    test('shows error for invalid input', () => {
      document.body.innerHTML = `
        <input id="conLength" value="" />
        <input id="conWidth" value="8" />
        <input id="conHeight" value="0.5" />
        <div id="conResult" class="result-box">
          <div id="conResultVal"></div>
          <div id="conResultSub"></div>
        </div>
      `;
      concreteCalc();
      expect(document.getElementById('conResult').classList.contains('error-box')).toBe(true);
    });

    test('stores result in results object', () => {
      document.body.innerHTML = `
        <input id="conLength" value="10" />
        <input id="conWidth" value="8" />
        <input id="conHeight" value="0.5" />
        <div id="conResult" class="result-box">
          <div id="conResultVal"></div>
          <div id="conResultSub"></div>
        </div>
      `;
      concreteCalc();
      expect(results.concrete).toContain('40');
      expect(results.concrete).toContain('CFT');
    });
  });

  // ─── SLAB CALCULATOR ──────────────────────────

  describe('slabCalc', () => {
    test('displays result for valid input', () => {
      document.body.innerHTML = `
        <input id="slabLength" value="20" />
        <input id="slabWidth" value="15" />
        <input id="slabThick" value="0.5" />
        <div id="slabResult" class="result-box">
          <div id="slabResultVal"></div>
          <div id="slabResultSub"></div>
        </div>
      `;
      slabCalc();
      expect(document.getElementById('slabResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('slabResultVal').textContent).toContain('150');
    });

    test('stores result in results object', () => {
      document.body.innerHTML = `
        <input id="slabLength" value="20" />
        <input id="slabWidth" value="15" />
        <input id="slabThick" value="0.5" />
        <div id="slabResult" class="result-box">
          <div id="slabResultVal"></div>
          <div id="slabResultSub"></div>
        </div>
      `;
      slabCalc();
      expect(results.slab).toContain('150');
    });
  });

  // ─── COLUMN CALCULATOR ────────────────────────

  describe('columnCalc', () => {
    test('displays result for valid input', () => {
      document.body.innerHTML = `
        <input id="colL" value="1" />
        <input id="colW" value="1" />
        <input id="colH" value="10" />
        <div id="colResult" class="result-box">
          <div id="colResultVal"></div>
        </div>
      `;
      columnCalc();
      expect(document.getElementById('colResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('colResultVal').textContent).toContain('10');
    });
  });

  // ─── BEAM CALCULATOR ──────────────────────────

  describe('beamCalc', () => {
    test('displays result for valid input', () => {
      document.body.innerHTML = `
        <input id="beamL" value="15" />
        <input id="beamW" value="1" />
        <input id="beamH" value="1.5" />
        <div id="beamResult" class="result-box">
          <div id="beamResultVal"></div>
        </div>
      `;
      beamCalc();
      expect(document.getElementById('beamResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('beamResultVal').textContent).toContain('22.5');
    });
  });

  // ─── FOOTING CALCULATOR ───────────────────────

  describe('footingCalc', () => {
    test('displays result for valid input', () => {
      document.body.innerHTML = `
        <input id="footL" value="4" />
        <input id="footW" value="4" />
        <input id="footD" value="2" />
        <div id="footResult" class="result-box">
          <div id="footResultVal"></div>
        </div>
      `;
      footingCalc();
      expect(document.getElementById('footResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('footResultVal').textContent).toContain('32');
    });
  });

  // ─── BRICK CALCULATOR ─────────────────────────

  describe('brickCalc', () => {
    test('displays brick count', () => {
      document.body.innerHTML = `
        <input id="wallL" value="20" />
        <input id="wallH" value="10" />
        <div id="brickRes" class="result-box">
          <div id="brickResVal"></div>
          <div id="brickResSub"></div>
        </div>
      `;
      brickCalc();
      expect(document.getElementById('brickRes').classList.contains('show')).toBe(true);
      expect(document.getElementById('brickResVal').textContent).toContain('2,700');
    });

    test('shows waste amount in sub text', () => {
      document.body.innerHTML = `
        <input id="wallL" value="20" />
        <input id="wallH" value="10" />
        <div id="brickRes" class="result-box">
          <div id="brickResVal"></div>
          <div id="brickResSub"></div>
        </div>
      `;
      brickCalc();
      expect(document.getElementById('brickResSub').textContent).toContain('2,835');
    });
  });

  // ─── CEMENT CALCULATOR ────────────────────────

  describe('cementCalc', () => {
    test('displays cement bags', () => {
      document.body.innerHTML = `
        <input id="cemVol" value="100" />
        <div id="cemResult" class="result-box">
          <div id="cemResultVal"></div>
          <div id="cemResultSub"></div>
        </div>
      `;
      cementCalc();
      expect(document.getElementById('cemResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('cemResultVal').textContent).toContain('25');
    });

    test('displays weight in sub text', () => {
      document.body.innerHTML = `
        <input id="cemVol" value="100" />
        <div id="cemResult" class="result-box">
          <div id="cemResultVal"></div>
          <div id="cemResultSub"></div>
        </div>
      `;
      cementCalc();
      expect(document.getElementById('cemResultSub').textContent).toContain('1250');
    });
  });

  // ─── SAND CALCULATOR ──────────────────────────

  describe('sandCalc', () => {
    test('displays sand volume', () => {
      document.body.innerHTML = `
        <input id="sandVol" value="100" />
        <div id="sandResult" class="result-box">
          <div id="sandResultVal"></div>
        </div>
      `;
      sandCalc();
      expect(document.getElementById('sandResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('sandResultVal').textContent).toContain('44');
    });
  });

  // ─── JELLY CALCULATOR ─────────────────────────

  describe('jellyCalc', () => {
    test('displays jelly volume', () => {
      document.body.innerHTML = `
        <input id="jellyVol" value="100" />
        <div id="jellyResult" class="result-box">
          <div id="jellyResultVal"></div>
        </div>
      `;
      jellyCalc();
      expect(document.getElementById('jellyResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('jellyResultVal').textContent).toContain('88');
    });
  });

  // ─── STEEL CALCULATOR ─────────────────────────

  describe('steelCalc', () => {
    test('displays steel weight', () => {
      document.body.innerHTML = `
        <input id="steelDia" value="12" />
        <input id="steelLen" value="40" />
        <div id="steelResult" class="result-box">
          <div id="steelResultVal"></div>
          <div id="steelResultSub"></div>
        </div>
      `;
      steelCalc();
      expect(document.getElementById('steelResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('steelResultVal').textContent).toContain('kg');
    });
  });

  // ─── EXCAVATION CALCULATOR ────────────────────

  describe('excavationCalc', () => {
    test('displays excavation volume', () => {
      document.body.innerHTML = `
        <input id="excL" value="20" />
        <input id="excW" value="10" />
        <input id="excD" value="5" />
        <div id="excResult" class="result-box">
          <div id="excResultVal"></div>
        </div>
      `;
      excavationCalc();
      expect(document.getElementById('excResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('excResultVal').textContent).toContain('1,000');
    });
  });

  // ─── WATER TANK CALCULATOR ────────────────────

  describe('tankCalc', () => {
    test('displays tank capacity in litres', () => {
      document.body.innerHTML = `
        <input id="tankL" value="6" />
        <input id="tankW" value="4" />
        <input id="tankH" value="4" />
        <div id="tankResult" class="result-box">
          <div id="tankResultVal"></div>
          <div id="tankResultSub"></div>
        </div>
      `;
      tankCalc();
      expect(document.getElementById('tankResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('tankResultVal').textContent).toContain('Litres');
    });
  });

  // ─── STAIRCASE CALCULATOR ─────────────────────

  describe('stairCalc', () => {
    test('displays number of steps', () => {
      document.body.innerHTML = `
        <input id="stairH" value="10" />
        <input id="stepH" value="0.58" />
        <div id="stairResult" class="result-box">
          <div id="stairResultVal"></div>
        </div>
      `;
      stairCalc();
      expect(document.getElementById('stairResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('stairResultVal').textContent).toContain('18');
    });
  });

  // ─── TILE CALCULATOR ──────────────────────────

  describe('tileCalc', () => {
    test('displays tile count', () => {
      document.body.innerHTML = `
        <input id="tileL" value="15" />
        <input id="tileW" value="12" />
        <input id="tileS" value="2" />
        <div id="tileResult" class="result-box">
          <div id="tileResultVal"></div>
          <div id="tileResultSub"></div>
        </div>
      `;
      tileCalc();
      expect(document.getElementById('tileResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('tileResultVal').textContent).toContain('45');
    });
  });

  // ─── PAINT CALCULATOR ─────────────────────────

  describe('paintCalc', () => {
    test('displays paint litres', () => {
      document.body.innerHTML = `
        <input id="paintL" value="20" />
        <input id="paintH" value="10" />
        <div id="paintResult" class="result-box">
          <div id="paintResultVal"></div>
          <div id="paintResultSub"></div>
        </div>
      `;
      paintCalc();
      expect(document.getElementById('paintResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('paintResultVal').textContent).toContain('5');
    });
  });

  // ─── PLASTER CALCULATOR ───────────────────────

  describe('plasterCalc', () => {
    test('displays plaster area', () => {
      document.body.innerHTML = `
        <input id="plasL" value="20" />
        <input id="plasH" value="10" />
        <div id="plasResult" class="result-box">
          <div id="plasResultVal"></div>
        </div>
      `;
      plasterCalc();
      expect(document.getElementById('plasResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('plasResultVal').textContent).toContain('200');
    });
  });

  // ─── COST CALCULATOR ──────────────────────────

  describe('costCalc', () => {
    test('displays cement cost', () => {
      document.body.innerHTML = `
        <input id="cemBags" value="50" />
        <input id="cemPrice" value="380" />
        <div id="costResult" class="result-box">
          <div id="costResultVal"></div>
        </div>
      `;
      costCalc();
      expect(document.getElementById('costResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('costResultVal').textContent).toContain('₹');
    });
  });

  // ─── FLOORING COST CALCULATOR ─────────────────

  describe('flooringCalc', () => {
    test('displays flooring cost', () => {
      document.body.innerHTML = `
        <input id="floorArea" value="500" />
        <input id="floorRate" value="60" />
        <div id="floorResult" class="result-box">
          <div id="floorResultVal"></div>
        </div>
      `;
      flooringCalc();
      expect(document.getElementById('floorResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('floorResultVal').textContent).toContain('₹');
    });
  });

  // ─── HOUSE COST CALCULATOR ────────────────────

  describe('houseCalc', () => {
    test('displays house cost', () => {
      document.body.innerHTML = `
        <input id="houseArea" value="1000" />
        <select id="houseType"><option value="1500" selected>Standard</option></select>
        <div id="houseResult" class="result-box">
          <div id="houseResultVal"></div>
          <div id="houseResultSub"></div>
        </div>
      `;
      houseCalc();
      expect(document.getElementById('houseResult').classList.contains('show')).toBe(true);
      expect(document.getElementById('houseResultVal').textContent).toContain('₹');
    });
  });

  // ─── VALIDATE FUNCTION ────────────────────────

  describe('validate', () => {
    test('returns true for valid positive numbers', () => {
      document.body.innerHTML = `<input id="test1" value="5" /><input id="test2" value="10" />`;
      expect(validate('test1', 'test2')).toBe(true);
    });

    test('returns false for empty input', () => {
      document.body.innerHTML = `<input id="test1" value="" />`;
      expect(validate('test1')).toBe(false);
    });

    test('returns false for zero', () => {
      document.body.innerHTML = `<input id="test1" value="0" />`;
      expect(validate('test1')).toBe(false);
    });

    test('returns false for negative', () => {
      document.body.innerHTML = `<input id="test1" value="-5" />`;
      expect(validate('test1')).toBe(false);
    });

    test('adds error class to invalid inputs', () => {
      document.body.innerHTML = `<input id="test1" value="" /><input id="test2" value="10" />`;
      validate('test1', 'test2');
      expect(document.getElementById('test1').classList.contains('error')).toBe(true);
      expect(document.getElementById('test2').classList.contains('error')).toBe(false);
    });
  });

  // ─── RESET CARD FUNCTION ──────────────────────

  describe('resetCard', () => {
    test('clears inputs and hides result', () => {
      document.body.innerHTML = `
        <input id="in1" value="5" class="error" />
        <input id="in2" value="10" />
        <div id="resBox" class="result-box show"></div>
      `;
      resetCard('in1', 'in2', 'resBox');
      expect(document.getElementById('in1').value).toBe('');
      expect(document.getElementById('in2').value).toBe('');
      expect(document.getElementById('in1').classList.contains('error')).toBe(false);
      expect(document.getElementById('resBox').classList.contains('show')).toBe(false);
    });
  });

  // ─── GET UNIT FOR KEY ─────────────────────────

  describe('getUnitForKey (DOM context)', () => {
    test('returns correct unit from script.js', () => {
      expect(getUnitForKey('concrete')).toBe('CFT');
      expect(getUnitForKey('steel')).toBe('kg');
      expect(getUnitForKey('unknown')).toBe('units');
    });
  });
});
