import units from './units';
import Equation from './Equation';

const { topw, totbt, inch, mouldingWidth } = units;

// BASE measurements do not include the larger plywood on top, just the box
// bounded by the plywood below
const BASE_WIDTH = inch.setValue(58);
const BASE_HEIGHT = inch.setValue(6);
const BASE_CUTOUT_DEPTH = inch.setValue(0.5);
const BASE_TOP_DEPTH = inch.setValue(26);
const BASE_BOTTOM_DEPTH = BASE_TOP_DEPTH.subtract(BASE_CUTOUT_DEPTH);

// ignoring base top... :)

const TOP_DEPTH = inch.setValue(8);
const TOP_WIDTH = inch.setValue(52);

// MIDSECTION
const MIDSECTION_WIDTH = new Equation(
  TOP_WIDTH,
  mouldingWidth.multiply(-2)
);
const MIDSECTION_DEPTH = new Equation(
  TOP_DEPTH,
  mouldingWidth.multiply(-1)
);

const MIDSECTION_HEIGHT = inch.setValue(28);
const MIDSECTION_CUTOUT_WIDTH = inch.setValue(24);
const MIDSECTION_CUTOUT_HEIGHT = inch.setValue(22);
const MIDSECTION_CUTOUT_DEPTH = MIDSECTION_DEPTH.add(new Equation(
  topw.multiply(-1),
  totbt.multiply(-1)
));

const MIDSECTION_SIDE_WIDTH = new Equation(
  MIDSECTION_WIDTH,
  MIDSECTION_CUTOUT_WIDTH.multiply(-1)
).multiply(0.5);

export default {
  FUNDAMENTALS: {
    topw: new Equation(topw),
    totbt: new Equation(totbt),
    inch: new Equation(inch),
    mouldingWidth: new Equation(mouldingWidth),
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
  MIDSECTION: {
    OUTER: {
      WIDTH: new Equation(MIDSECTION_WIDTH),
      HEIGHT: new Equation(MIDSECTION_HEIGHT),
      DEPTH: new Equation(MIDSECTION_DEPTH),
      CUTOUT_WIDTH: new Equation(MIDSECTION_CUTOUT_WIDTH),
      CUTOUT_HEIGHT: new Equation(MIDSECTION_CUTOUT_HEIGHT),
      CUTOUT_DEPTH: new Equation(MIDSECTION_CUTOUT_DEPTH),
      SIDE_WIDTH: MIDSECTION_SIDE_WIDTH,
    },
    FRAME: {
      CORNER_SUPPORT: MIDSECTION_HEIGHT, // 4
      // 2 of these
      INNER_FRONT_SUPPORT: new Equation(
        MIDSECTION_HEIGHT,
        totbt.multiply(-1),
      ),
      // 2 of these
      INNER_BACK_SUPPORT: new Equation(
        MIDSECTION_HEIGHT,
        totbt.multiply(-2)
      ),
      // 3 of these
      FULL_WIDTH: new Equation(
        MIDSECTION_WIDTH,
        totbt.multiply(-2),
        topw.multiply(-2)
      ),
      // 2 of these:
      CUTOUT_WIDTH: new Equation(
        MIDSECTION_CUTOUT_WIDTH,
        topw.multiply(2)
      ),
      // 8:
      SIDE_WIDTH: new Equation(
        MIDSECTION_SIDE_WIDTH,
        totbt.multiply(-2),
        topw.multiply(-2)
      ),
      // 12 of these
      DEPTH: new Equation(
        MIDSECTION_DEPTH,
        topw.multiply(-1),
        totbt.multiply(-2)
      ),
    },
    PANELS: {
      OUTER_SIDE: {
        width: new Equation(
          MIDSECTION_DEPTH,
          topw.multiply(-1)
        ),
        height: new Equation(MIDSECTION_HEIGHT),
      },
      CUTOUT_SIDE: {
        width: new Equation(
          MIDSECTION_CUTOUT_DEPTH,
          topw.multiply(-1) // back wall is not included in cutout depth
        ),
        height: MIDSECTION_CUTOUT_HEIGHT,
      },
      // goes on top of back and side panels, so its dimensions are larger than the cutout outer dims
      CUTOUT_TOP: {
        width: new Equation(
          MIDSECTION_CUTOUT_WIDTH,
          topw.multiply(2)
        ),
        depth: new Equation(
          MIDSECTION_CUTOUT_DEPTH,
          topw
        ),
      },
      CUTOUT_BACK: {
        width: new Equation(
          MIDSECTION_CUTOUT_WIDTH,
          topw.multiply(2)
        ),
        height: MIDSECTION_CUTOUT_HEIGHT,
      },
      FRONT: {
        width: MIDSECTION_WIDTH,
        height: MIDSECTION_HEIGHT,
        cutoutWidth: MIDSECTION_CUTOUT_WIDTH,
        cutoutHeight: MIDSECTION_CUTOUT_HEIGHT,
      },
    },
  },
  TOP: {
    PANEL: {
      width: TOP_WIDTH,
      depth: TOP_DEPTH,
    },
    MOULDING_SIDE: {
      length: TOP_DEPTH
    },
    MOULDING_FRONT: {
      length: TOP_WIDTH,
    },
  },
};