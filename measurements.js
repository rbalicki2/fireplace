import units from './units';
import Equation from './Equation';

const { topw, totbt, inch } = units;

// BASE measurements do not include the larger plywood on top, just the box
// bounded by the plywood below
const BASE_WIDTH = inch.setValue(58);
const BASE_HEIGHT = inch.setValue(6);
const BASE_CUTOUT_DEPTH = inch.setValue(0.5);
const BASE_TOP_DEPTH = inch.setValue(26);
const BASE_BOTTOM_DEPTH = BASE_TOP_DEPTH.subtract(BASE_CUTOUT_DEPTH);


export default {
  FUNDAMENTALS: {
    topw: new Equation(topw),
    totbt: new Equation(totbt),
    inch: new Equation(inch),
  },
  BASE: {
    OUTER: {
      WIDTH: new Equation(BASE_WIDTH),
      HEIGHT: new Equation(BASE_HEIGHT),
      TOP_DEPTH: new Equation(BASE_TOP_DEPTH),
      BOTTOM_DEPTH: new Equation(BASE_BOTTOM_DEPTH),
    },
    FRAME: {
      support: new Equation(BASE_HEIGHT),
      shortSide: new Equation(
        BASE_BOTTOM_DEPTH,
        topw.multiply(-1),
        totbt.multiply(-2)
      ),
      longSide: new Equation(
        BASE_WIDTH,
        topw.multiply(-2),
        totbt.multiply(-2)
      ),
    },
    PANELS: {
      FRONT: {
        width: new Equation(BASE_WIDTH),
        height: new Equation(BASE_HEIGHT),
      },
      SIDE: {
        widthTop: new Equation(
          BASE_TOP_DEPTH,
          topw.multiply(-1)
        ),
        widthBottom: new Equation(
          BASE_BOTTOM_DEPTH,
          topw.multiply(-1)
        ),
        height: new Equation(BASE_HEIGHT),
      },
    },
  },
}