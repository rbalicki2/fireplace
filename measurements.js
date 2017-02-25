import units from './units';
import Equation from './Equation';

// BASE measurements do not include the larger plywood on top, just the box
// bounded by the plywood below
const BASE_WIDTH = units.inch.setValue(58);
const BASE_HEIGHT = units.inch.setValue(6);
const BASE_CUTOUT_DEPTH = units.inch.setValue(0.5);
const BASE_TOTAL_DEPTH = units.inch.setValue(26);
const BASE_ACTUAL_DEPTH = BASE_TOTAL_DEPTH.subtract(BASE_CUTOUT_DEPTH);

export default {
  FUNDAMENTALS: {
    topw: new Equation(units.topw),
    totbt: new Equation(units.totbt),
    inch: new Equation(units.inch),
  },
  BASE: {
    OUTER: {
      WIDTH: new Equation(BASE_WIDTH),
      HEIGHT: new Equation(BASE_HEIGHT),
      TOTAL_DEPTH: new Equation(BASE_TOTAL_DEPTH),
      ACTUAL_DEPTH: new Equation(BASE_ACTUAL_DEPTH),
    },
    FRAME: {
      support: new Equation(BASE_HEIGHT),
      shortSide: new Equation(
        BASE_ACTUAL_DEPTH,
        units.topw.multiply(-1),
        units.totbt.multiply(-2)
      ),
      longSide: new Equation(
        BASE_WIDTH,
        units.topw.multiply(-2),
        units.totbt.multiply(-2)
      ),
    },
  },
}