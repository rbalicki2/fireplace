import './tests';
import measurements from './measurements';
import units from './units';
import { argv } from 'yargs';
import assert from 'assert';
import forEach from 'lodash/forEach';

const assertIsEquation = arg => assert(arg.constructor.name === 'Equation');

const { BASE, MIDSECTION, TOP } = measurements;

const ALL_MEASUREMENTS = {
  'base frame support (4x)': BASE.FRAME.support,
  'base frame depth (8x)': BASE.FRAME.shortSide,
  'base frame width (4x)': BASE.FRAME.longSide,
  'base panel front (1) width': BASE.PANELS.FRONT.width,
  'base panel front height': BASE.PANELS.FRONT.height,
  'base panel side (2) width top': BASE.PANELS.SIDE.widthTop,
  'base panel side width bottom': BASE.PANELS.SIDE.widthBottom,
  'base panel side height': BASE.PANELS.SIDE.height,
  // inner

  'base inner panel (1) width': BASE.PANELS.INNER.width,
  'base inner panel height': BASE.PANELS.INNER.height,

  // top of base
  'base top panel (1) depth': BASE.PANELS.TOP_OF_BASE.depth,
  'base top panel width': BASE.PANELS.TOP_OF_BASE.width,

  'midsection frame outer corner support (4)': MIDSECTION.FRAME.CORNER_SUPPORT,
  'midsection frame inner front support (2)': MIDSECTION.FRAME.INNER_FRONT_SUPPORT,
  'midsection frame inner back support (2)': MIDSECTION.FRAME.INNER_BACK_SUPPORT,
  'midsection frame full width bars (3)': MIDSECTION.FRAME.FULL_WIDTH,
  'midsection frame cutout width bars (2)': MIDSECTION.FRAME.CUTOUT_WIDTH,
  'midsection frame side width bars (8)': MIDSECTION.FRAME.SIDE_WIDTH,
  'midsection frame depth bars (12)': MIDSECTION.FRAME.DEPTH,

  'midsection panel front (1) width': MIDSECTION.PANELS.FRONT.width,
  'midsection panel front height': MIDSECTION.PANELS.FRONT.height,
  'midsection panel front cutout width': MIDSECTION.PANELS.FRONT.cutoutWidth,
  'midsection panel front cutout height': MIDSECTION.PANELS.FRONT.cutoutHeight,
  'midsection panel outer side (2) width': MIDSECTION.PANELS.OUTER_SIDE.width,
  'midsection panel outer side height': MIDSECTION.PANELS.OUTER_SIDE.height,
  'midsection panel cutout side (2) width': MIDSECTION.PANELS.CUTOUT_SIDE.width,
  'midsection panel cutout side height': MIDSECTION.PANELS.CUTOUT_SIDE.height,
  'midsection panel cutout back (1) width': MIDSECTION.PANELS.CUTOUT_BACK.width,
  'midsection panel cutout back height': MIDSECTION.PANELS.CUTOUT_BACK.height,
  'midsection panel cutout top (1) width': MIDSECTION.PANELS.CUTOUT_TOP.width,
  'midsection panel cutout top depth': MIDSECTION.PANELS.CUTOUT_TOP.depth,

  'top panel width (1)': TOP.PANEL.width,
  'top panel depth': TOP.PANEL.depth,
};

if (argv.moulding && argv.topw && argv.totbt) {
  forEach(ALL_MEASUREMENTS, (measurement, key) => {
    assertIsEquation(measurement);

    const inInches = measurement
      .replace(units.topw, units.inch.setValue(Number(argv.topw)))
      .replace(units.totbt, units.inch.setValue(Number(argv.totbt)))
      .replace(units.mouldingWidth, units.inch.setValue(Number(argv.moulding)));

    console.log(`${key} - ${inInches.toString()}`);
  });
}
