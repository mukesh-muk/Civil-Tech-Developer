/**
 * Pure calculation functions for Civil Calculator Pro.
 * Extracted from script.js for testability.
 */

// ─── FORMATTING HELPERS ─────────────────────────

function fmt(n) {
  return n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

function fmtRs(n) {
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
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

// ─── CONCRETE CALCULATORS ───────────────────────

function calcConcreteVolume(length, width, height) {
  if (length <= 0 || width <= 0 || height <= 0) return null;
  const volCft = length * width * height;
  const volCubicMetres = volCft / 35.315;
  return { volCft, volCubicMetres };
}

function calcSlabVolume(length, width, thickness) {
  if (length <= 0 || width <= 0 || thickness <= 0) return null;
  const volCft = length * width * thickness;
  const area = length * width;
  return { volCft, area };
}

function calcColumnVolume(length, width, height) {
  if (length <= 0 || width <= 0 || height <= 0) return null;
  const volCft = length * width * height;
  return { volCft };
}

function calcBeamVolume(length, width, depth) {
  if (length <= 0 || width <= 0 || depth <= 0) return null;
  const volCft = length * width * depth;
  return { volCft };
}

function calcFootingVolume(length, width, depth) {
  if (length <= 0 || width <= 0 || depth <= 0) return null;
  const volCft = length * width * depth;
  return { volCft };
}

// ─── BRICK CALCULATOR ───────────────────────────

function calcBricks(wallLength, wallHeight) {
  if (wallLength <= 0 || wallHeight <= 0) return null;
  const area = wallLength * wallHeight;
  const bricks = Math.round(area * 13.5);
  const withWaste = Math.round(bricks * 1.05);
  return { bricks, withWaste };
}

// ─── MATERIAL CALCULATORS ───────────────────────

function calcCementBags(concreteVolume) {
  if (concreteVolume <= 0) return null;
  const bags = Math.ceil(concreteVolume / 4);
  const weight = bags * 50;
  return { bags, weight };
}

function calcSand(concreteVolume) {
  if (concreteVolume <= 0) return null;
  const sand = parseFloat((concreteVolume * 0.44).toFixed(2));
  return { sand };
}

function calcJelly(concreteVolume) {
  if (concreteVolume <= 0) return null;
  const jelly = parseFloat((concreteVolume * 0.88).toFixed(2));
  return { jelly };
}

function calcSteelWeight(diameterMm, lengthFt) {
  if (diameterMm <= 0 || lengthFt <= 0) return null;
  const lengthM = lengthFt / 3.281;
  const weight = parseFloat(((diameterMm * diameterMm) / 162 * lengthM).toFixed(2));
  return { weight };
}

// ─── STRUCTURE CALCULATORS ──────────────────────

function calcExcavation(length, width, depth) {
  if (length <= 0 || width <= 0 || depth <= 0) return null;
  const volCft = length * width * depth;
  return { volCft };
}

function calcWaterTank(length, width, height) {
  if (length <= 0 || width <= 0 || height <= 0) return null;
  const cft = length * width * height;
  const litres = parseFloat((cft * 28.3168).toFixed(0));
  return { cft, litres };
}

function calcStaircase(floorHeight, stepHeight) {
  if (floorHeight <= 0 || stepHeight <= 0) return null;
  const steps = Math.ceil(floorHeight / stepHeight);
  return { steps };
}

// ─── FINISHING CALCULATORS ──────────────────────

function calcTiles(roomLength, roomWidth, tileSizeFt) {
  if (roomLength <= 0 || roomWidth <= 0 || tileSizeFt <= 0) return null;
  const area = roomLength * roomWidth;
  const tileArea = tileSizeFt * tileSizeFt;
  const tiles = Math.ceil(area / tileArea);
  const withWaste = Math.ceil(tiles * 1.05);
  return { tiles, withWaste };
}

function calcPaint(wallLength, wallHeight) {
  if (wallLength <= 0 || wallHeight <= 0) return null;
  const area = wallLength * wallHeight;
  const litres = parseFloat((area / 40).toFixed(2));
  return { area, litres };
}

function calcPlaster(wallLength, wallHeight) {
  if (wallLength <= 0 || wallHeight <= 0) return null;
  const area = wallLength * wallHeight;
  return { area };
}

// ─── COST CALCULATORS ───────────────────────────

function calcCementCost(bags, pricePerBag) {
  if (bags <= 0 || pricePerBag <= 0) return null;
  const total = bags * pricePerBag;
  return { total };
}

function calcFlooringCost(floorArea, ratePerSqft) {
  if (floorArea <= 0 || ratePerSqft <= 0) return null;
  const total = floorArea * ratePerSqft;
  return { total };
}

function calcHouseCost(area, ratePerSqft) {
  if (area <= 0 || ratePerSqft <= 0) return null;
  const total = area * ratePerSqft;
  return { total };
}

module.exports = {
  fmt,
  fmtRs,
  getUnitForKey,
  calcConcreteVolume,
  calcSlabVolume,
  calcColumnVolume,
  calcBeamVolume,
  calcFootingVolume,
  calcBricks,
  calcCementBags,
  calcSand,
  calcJelly,
  calcSteelWeight,
  calcExcavation,
  calcWaterTank,
  calcStaircase,
  calcTiles,
  calcPaint,
  calcPlaster,
  calcCementCost,
  calcFlooringCost,
  calcHouseCost
};
