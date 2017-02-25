import measurements from './measurements';
import assert from 'assert';
import Equation from './Equation';

// base frame works correctly

const {
  FUNDAMENTALS,
  BASE
} = measurements;

const BASE_WIDTH_AT_FRAME = Equation.fromEquations(
  FUNDAMENTALS.topw,
  FUNDAMENTALS.topw,
  BASE.FRAME.longSide,
  FUNDAMENTALS.totbt,
  FUNDAMENTALS.totbt
);
assert(BASE.OUTER.WIDTH.isEqual(BASE_WIDTH_AT_FRAME), 'Outer width does not match up');

const BASE_DEPTH_AT_FRAME = Equation.fromEquations(
  FUNDAMENTALS.topw,
  FUNDAMENTALS.totbt, // support or long bar
  FUNDAMENTALS.totbt,
  BASE.FRAME.shortSide
);
assert(BASE.OUTER.ACTUAL_DEPTH.isEqual(BASE_DEPTH_AT_FRAME), 'Actual depth does not match up');

