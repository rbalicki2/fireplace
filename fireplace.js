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
  BASE
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

