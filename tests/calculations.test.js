const {
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
} = require('../src/calculations');

// ─── FORMATTING HELPERS ─────────────────────────

describe('fmt', () => {
  test('formats integer with Indian locale', () => {
    expect(fmt(1000)).toBe('1,000');
  });

  test('formats decimal to max 2 fraction digits', () => {
    expect(fmt(123.456)).toBe('123.46');
  });

  test('formats large numbers with Indian grouping', () => {
    expect(fmt(1234567)).toBe('12,34,567');
  });

  test('formats zero', () => {
    expect(fmt(0)).toBe('0');
  });

  test('formats small decimal without trailing zeros', () => {
    expect(fmt(1.5)).toBe('1.5');
  });
});

describe('fmtRs', () => {
  test('formats with rupee symbol and no decimals', () => {
    expect(fmtRs(1000)).toBe('₹1,000');
  });

  test('rounds to nearest integer', () => {
    expect(fmtRs(19500.75)).toBe('₹19,501');
  });

  test('formats large amounts with Indian grouping', () => {
    expect(fmtRs(1500000)).toBe('₹15,00,000');
  });

  test('formats zero', () => {
    expect(fmtRs(0)).toBe('₹0');
  });
});

describe('getUnitForKey', () => {
  test('returns CFT for concrete', () => {
    expect(getUnitForKey('concrete')).toBe('CFT');
  });

  test('returns bags for cement', () => {
    expect(getUnitForKey('cement')).toBe('bags');
  });

  test('returns kg for steel', () => {
    expect(getUnitForKey('steel')).toBe('kg');
  });

  test('returns Litres for tank', () => {
    expect(getUnitForKey('tank')).toBe('Litres');
  });

  test('returns ₹ for cost keys', () => {
    expect(getUnitForKey('cementCost')).toBe('₹');
    expect(getUnitForKey('flooringCost')).toBe('₹');
    expect(getUnitForKey('houseCost')).toBe('₹');
  });

  test('returns "units" for unknown key', () => {
    expect(getUnitForKey('unknown')).toBe('units');
    expect(getUnitForKey('')).toBe('units');
  });

  test('returns nos for bricks and tiles', () => {
    expect(getUnitForKey('bricks')).toBe('nos');
    expect(getUnitForKey('tiles')).toBe('nos');
  });

  test('returns steps for stairs', () => {
    expect(getUnitForKey('stairs')).toBe('steps');
  });
});

// ─── CONCRETE CALCULATORS ───────────────────────

describe('calcConcreteVolume', () => {
  test('calculates volume correctly', () => {
    const result = calcConcreteVolume(10, 8, 0.5);
    expect(result.volCft).toBe(40);
    expect(result.volCubicMetres).toBeCloseTo(1.133, 2);
  });

  test('returns null for zero input', () => {
    expect(calcConcreteVolume(0, 8, 0.5)).toBeNull();
    expect(calcConcreteVolume(10, 0, 0.5)).toBeNull();
    expect(calcConcreteVolume(10, 8, 0)).toBeNull();
  });

  test('returns null for negative input', () => {
    expect(calcConcreteVolume(-1, 8, 0.5)).toBeNull();
  });

  test('handles large values', () => {
    const result = calcConcreteVolume(100, 50, 2);
    expect(result.volCft).toBe(10000);
    expect(result.volCubicMetres).toBeCloseTo(283.17, 1);
  });
});

describe('calcSlabVolume', () => {
  test('calculates volume and area', () => {
    const result = calcSlabVolume(20, 15, 0.5);
    expect(result.volCft).toBe(150);
    expect(result.area).toBe(300);
  });

  test('returns null for invalid input', () => {
    expect(calcSlabVolume(0, 15, 0.5)).toBeNull();
    expect(calcSlabVolume(20, 0, 0.5)).toBeNull();
    expect(calcSlabVolume(20, 15, 0)).toBeNull();
  });

  test('handles fractional dimensions', () => {
    const result = calcSlabVolume(12.5, 10.5, 0.4);
    expect(result.volCft).toBeCloseTo(52.5, 1);
    expect(result.area).toBeCloseTo(131.25, 2);
  });
});

describe('calcColumnVolume', () => {
  test('calculates volume', () => {
    const result = calcColumnVolume(1, 1, 10);
    expect(result.volCft).toBe(10);
  });

  test('returns null for invalid input', () => {
    expect(calcColumnVolume(0, 1, 10)).toBeNull();
    expect(calcColumnVolume(1, -1, 10)).toBeNull();
  });
});

describe('calcBeamVolume', () => {
  test('calculates volume', () => {
    const result = calcBeamVolume(15, 1, 1.5);
    expect(result.volCft).toBe(22.5);
  });

  test('returns null for invalid input', () => {
    expect(calcBeamVolume(0, 1, 1.5)).toBeNull();
  });
});

describe('calcFootingVolume', () => {
  test('calculates volume', () => {
    const result = calcFootingVolume(4, 4, 2);
    expect(result.volCft).toBe(32);
  });

  test('returns null for invalid input', () => {
    expect(calcFootingVolume(4, 0, 2)).toBeNull();
  });
});

// ─── BRICK CALCULATOR ───────────────────────────

describe('calcBricks', () => {
  test('calculates bricks and waste', () => {
    const result = calcBricks(20, 10);
    expect(result.bricks).toBe(2700);
    expect(result.withWaste).toBe(2835);
  });

  test('returns null for zero input', () => {
    expect(calcBricks(0, 10)).toBeNull();
    expect(calcBricks(20, 0)).toBeNull();
  });

  test('returns null for negative input', () => {
    expect(calcBricks(-5, 10)).toBeNull();
  });

  test('handles small wall', () => {
    const result = calcBricks(1, 1);
    expect(result.bricks).toBe(14); // round(1 * 13.5) = 14
    expect(result.withWaste).toBe(15); // round(14 * 1.05) = 15
  });

  test('waste is approximately 5% more', () => {
    const result = calcBricks(10, 10);
    expect(result.withWaste).toBeGreaterThan(result.bricks);
    const ratio = result.withWaste / result.bricks;
    expect(ratio).toBeCloseTo(1.05, 1);
  });
});

// ─── MATERIAL CALCULATORS ───────────────────────

describe('calcCementBags', () => {
  test('calculates bags and weight', () => {
    const result = calcCementBags(100);
    expect(result.bags).toBe(25);
    expect(result.weight).toBe(1250);
  });

  test('rounds up for partial bags', () => {
    const result = calcCementBags(5);
    expect(result.bags).toBe(2); // ceil(5/4) = 2
    expect(result.weight).toBe(100);
  });

  test('returns null for zero volume', () => {
    expect(calcCementBags(0)).toBeNull();
  });

  test('returns null for negative volume', () => {
    expect(calcCementBags(-10)).toBeNull();
  });

  test('handles exact multiple', () => {
    const result = calcCementBags(8);
    expect(result.bags).toBe(2); // ceil(8/4) = 2
  });
});

describe('calcSand', () => {
  test('calculates sand volume', () => {
    const result = calcSand(100);
    expect(result.sand).toBe(44);
  });

  test('returns null for zero volume', () => {
    expect(calcSand(0)).toBeNull();
  });

  test('handles fractional result', () => {
    const result = calcSand(50);
    expect(result.sand).toBe(22);
  });

  test('handles small volume', () => {
    const result = calcSand(1);
    expect(result.sand).toBe(0.44);
  });
});

describe('calcJelly', () => {
  test('calculates jelly volume', () => {
    const result = calcJelly(100);
    expect(result.jelly).toBe(88);
  });

  test('returns null for zero volume', () => {
    expect(calcJelly(0)).toBeNull();
  });

  test('handles small volume', () => {
    const result = calcJelly(1);
    expect(result.jelly).toBe(0.88);
  });
});

describe('calcSteelWeight', () => {
  test('calculates weight for 12mm bar', () => {
    const result = calcSteelWeight(12, 40);
    // (12*12)/162 * (40/3.281) = 0.8889 * 12.192 = 10.84
    expect(result.weight).toBeCloseTo(10.84, 1);
  });

  test('calculates weight for 8mm bar', () => {
    const result = calcSteelWeight(8, 20);
    // (8*8)/162 * (20/3.281) = 0.3951 * 6.096 = 2.41
    expect(result.weight).toBeCloseTo(2.41, 1);
  });

  test('returns null for zero diameter', () => {
    expect(calcSteelWeight(0, 40)).toBeNull();
  });

  test('returns null for zero length', () => {
    expect(calcSteelWeight(12, 0)).toBeNull();
  });

  test('returns null for negative inputs', () => {
    expect(calcSteelWeight(-12, 40)).toBeNull();
    expect(calcSteelWeight(12, -40)).toBeNull();
  });
});

// ─── STRUCTURE CALCULATORS ──────────────────────

describe('calcExcavation', () => {
  test('calculates excavation volume', () => {
    const result = calcExcavation(20, 10, 5);
    expect(result.volCft).toBe(1000);
  });

  test('returns null for invalid input', () => {
    expect(calcExcavation(0, 10, 5)).toBeNull();
    expect(calcExcavation(20, 0, 5)).toBeNull();
    expect(calcExcavation(20, 10, 0)).toBeNull();
  });

  test('handles fractional depths', () => {
    const result = calcExcavation(10, 10, 3.5);
    expect(result.volCft).toBe(350);
  });
});

describe('calcWaterTank', () => {
  test('calculates tank volume in litres', () => {
    const result = calcWaterTank(6, 4, 4);
    expect(result.cft).toBe(96);
    expect(result.litres).toBe(2718); // 96 * 28.3168 ≈ 2718
  });

  test('returns null for zero input', () => {
    expect(calcWaterTank(0, 4, 4)).toBeNull();
    expect(calcWaterTank(6, 0, 4)).toBeNull();
    expect(calcWaterTank(6, 4, 0)).toBeNull();
  });

  test('handles small tank', () => {
    const result = calcWaterTank(1, 1, 1);
    expect(result.cft).toBe(1);
    expect(result.litres).toBe(28); // 1 * 28.3168 ≈ 28
  });
});

describe('calcStaircase', () => {
  test('calculates number of steps', () => {
    const result = calcStaircase(10, 0.58);
    expect(result.steps).toBe(18); // ceil(10/0.58) = ceil(17.24) = 18
  });

  test('returns null for zero input', () => {
    expect(calcStaircase(0, 0.58)).toBeNull();
    expect(calcStaircase(10, 0)).toBeNull();
  });

  test('handles exact division', () => {
    const result = calcStaircase(10, 0.5);
    expect(result.steps).toBe(20);
  });

  test('rounds up for partial steps', () => {
    const result = calcStaircase(10, 3);
    expect(result.steps).toBe(4); // ceil(10/3) = 4
  });
});

// ─── FINISHING CALCULATORS ──────────────────────

describe('calcTiles', () => {
  test('calculates tiles with waste', () => {
    const result = calcTiles(15, 12, 2);
    // area = 180, tileArea = 4, tiles = 45, withWaste = ceil(45*1.05) = 48
    expect(result.tiles).toBe(45);
    expect(result.withWaste).toBe(48);
  });

  test('returns null for zero input', () => {
    expect(calcTiles(0, 12, 2)).toBeNull();
    expect(calcTiles(15, 0, 2)).toBeNull();
    expect(calcTiles(15, 12, 0)).toBeNull();
  });

  test('rounds up for partial tiles', () => {
    const result = calcTiles(10, 10, 3);
    // area = 100, tileArea = 9, tiles = ceil(11.11) = 12
    expect(result.tiles).toBe(12);
  });

  test('handles 1x1 tile', () => {
    const result = calcTiles(10, 10, 1);
    expect(result.tiles).toBe(100);
    expect(result.withWaste).toBe(105);
  });
});

describe('calcPaint', () => {
  test('calculates paint litres', () => {
    const result = calcPaint(20, 10);
    // area = 200, litres = 200/40 = 5
    expect(result.area).toBe(200);
    expect(result.litres).toBe(5);
  });

  test('returns null for zero input', () => {
    expect(calcPaint(0, 10)).toBeNull();
    expect(calcPaint(20, 0)).toBeNull();
  });

  test('handles fractional litres', () => {
    const result = calcPaint(15, 10);
    // area = 150, litres = 150/40 = 3.75
    expect(result.area).toBe(150);
    expect(result.litres).toBe(3.75);
  });
});

describe('calcPlaster', () => {
  test('calculates plaster area', () => {
    const result = calcPlaster(20, 10);
    expect(result.area).toBe(200);
  });

  test('returns null for zero input', () => {
    expect(calcPlaster(0, 10)).toBeNull();
    expect(calcPlaster(20, 0)).toBeNull();
  });

  test('handles fractional dimensions', () => {
    const result = calcPlaster(15.5, 9.5);
    expect(result.area).toBeCloseTo(147.25, 2);
  });
});

// ─── COST CALCULATORS ───────────────────────────

describe('calcCementCost', () => {
  test('calculates total cost', () => {
    const result = calcCementCost(50, 380);
    expect(result.total).toBe(19000);
  });

  test('returns null for zero input', () => {
    expect(calcCementCost(0, 380)).toBeNull();
    expect(calcCementCost(50, 0)).toBeNull();
  });

  test('returns null for negative input', () => {
    expect(calcCementCost(-5, 380)).toBeNull();
  });

  test('handles fractional prices', () => {
    const result = calcCementCost(10, 385.5);
    expect(result.total).toBe(3855);
  });
});

describe('calcFlooringCost', () => {
  test('calculates total flooring cost', () => {
    const result = calcFlooringCost(500, 60);
    expect(result.total).toBe(30000);
  });

  test('returns null for zero input', () => {
    expect(calcFlooringCost(0, 60)).toBeNull();
    expect(calcFlooringCost(500, 0)).toBeNull();
  });

  test('handles large area', () => {
    const result = calcFlooringCost(2000, 120);
    expect(result.total).toBe(240000);
  });
});

describe('calcHouseCost', () => {
  test('calculates total house cost', () => {
    const result = calcHouseCost(1000, 1500);
    expect(result.total).toBe(1500000);
  });

  test('returns null for zero input', () => {
    expect(calcHouseCost(0, 1500)).toBeNull();
    expect(calcHouseCost(1000, 0)).toBeNull();
  });

  test('returns null for negative input', () => {
    expect(calcHouseCost(-1000, 1500)).toBeNull();
  });

  test('handles different rate tiers', () => {
    // Economy
    const economy = calcHouseCost(1000, 1200);
    expect(economy.total).toBe(1200000);
    // Premium
    const premium = calcHouseCost(1000, 2500);
    expect(premium.total).toBe(2500000);
  });
});
