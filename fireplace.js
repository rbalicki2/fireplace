import measurements from './measurements';
import assert from 'assert';
import Equation from './Equation';

// base frame works correctly

const {
  FUNDAMENTALS: {
    inch,
    topw,
    totbt
  },
  BASE,
  MIDSECTION
} = measurements;

// BASE FRAME
const BASE_WIDTH_AT_FRAME = Equation.fromEquations(
  topw,
  topw,
  BASE.FRAME.longSide,
  totbt,
  totbt
);
assert(BASE.OUTER.WIDTH.isEqual(BASE_WIDTH_AT_FRAME), 'Outer width does not match up');

const BASE_DEPTH_AT_FRAME = Equation.fromEquations(
  topw,
  totbt, // support or long bar
  totbt,
  BASE.FRAME.shortSide
);
assert(BASE.OUTER.BOTTOM_DEPTH.isEqual(BASE_DEPTH_AT_FRAME), 'Actual depth does not match up');

const BASE_DEPTH_AT_PANEL_BOTTOM = Equation.fromEquations(
  topw,
  BASE.PANELS.SIDE.widthBottom
);
assert(BASE.OUTER.BOTTOM_DEPTH.isEqual(BASE_DEPTH_AT_PANEL_BOTTOM), 'Side base panel at bottom does not match');

const BASE_DEPTH_AT_PANEL_TOP = Equation.fromEquations(
  topw,
  BASE.PANELS.SIDE.widthTop
);
assert(BASE.OUTER.TOP_DEPTH.isEqual(BASE_DEPTH_AT_PANEL_TOP), 'Side base panel panel at top does not match');

// BASE TOP doesn't need testing...

// MIDSECTION
// OUTER WIDTH
assert(MIDSECTION.OUTER.WIDTH.isEqual(
  new Equation(
    MIDSECTION.OUTER.CUTOUT_WIDTH,
    MIDSECTION.OUTER.SIDE_WIDTH,
    MIDSECTION.OUTER.SIDE_WIDTH
  )
), 'midsection outer widths');

assert(MIDSECTION.OUTER.WIDTH.isEqual(
  new Equation(
    MIDSECTION.FRAME.FULL_WIDTH,
    totbt.multiply(2),
    topw.multiply(2)
  )
), 'full width adds up');

// SIDE WIDTH
assert(MIDSECTION.OUTER.SIDE_WIDTH.isEqual(
  new Equation(
    MIDSECTION.FRAME.SIDE_WIDTH,
    totbt.multiply(2),
    topw.multiply(2)
  )
), 'side width at frame');

// inner cutout width is 2*topw larger than the visible width
assert(MIDSECTION.OUTER.CUTOUT_WIDTH.isEqual(new Equation(
  MIDSECTION.FRAME.CUTOUT_WIDTH,
  topw.multiply(-2)
)), 'cutout width at frame');

assert(MIDSECTION.OUTER.DEPTH.isEqual(new Equation(
  MIDSECTION.FRAME.DEPTH,
  topw,
  totbt.multiply(2)
)), 'depth at frame');

assert(MIDSECTION.OUTER.DEPTH.isEqual(new Equation(
  MIDSECTION.PANELS.OUTER_SIDE.width,
  topw
)), 'depth at outer panel');

assert(MIDSECTION.OUTER.CUTOUT_DEPTH.isEqual(new Equation(
  MIDSECTION.PANELS.CUTOUT_SIDE.width,
  topw
)), 'depth of cutout at panel');

assert(MIDSECTION.OUTER.DEPTH.isEqual(new Equation(
  MIDSECTION.PANELS.CUTOUT_SIDE.width,
  topw.multiply(2),
  totbt
)), 'depth at inner cutout panel');

// height
