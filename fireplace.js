import measurements from './measurements';
import assert from 'assert';
import Equation from './Equation';

// base frame works correctly

const BASE_OUTER_CALCULATED_WIDTH = (new Equation()).add(
  measurements.FUNDAMENTALS.topw,
  measurements.FUNDAMENTALS.topw,
  measurements.BASE.FRAME.longSide,
  measurements.FUNDAMENTALS.totbt,
  measurements.FUNDAMENTALS.totbt
);


console.log(BASE_OUTER_CALCULATED_WIDTH.toString());
console.log('------');
console.log(measurements.BASE.OUTER.WIDTH.toString());

assert(
  measurements.BASE.OUTER.WIDTH.isEqual(
    BASE_OUTER_CALCULATED_WIDTH
  ),
  'Outer width does not match up'
);

