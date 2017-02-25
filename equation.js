import assert from 'assert';
import Unit from './unit';
import forEach from 'lodash/forEach';
import every from 'lodash/every';

const assertIs = type => arg => assert(arg.constructor.name === type);
const assertIsUnit = assertIs('Unit');
const assertIsEquation = assertIs('Equation');

export default class Equation {
  // takes unit arguments
  constructor(...args) {
    this.units = {};
    args.forEach(arg => {
      assertIsUnit(arg);
      this.addOrSet(arg);
    });
  }

  toString() {
    const unitString = this.iterableUnits.map(unit => unit.toString()).join(', ');
    return `Equation (${unitString})`;
  }

  get symbols() {
    return Object.getOwnPropertySymbols(this.units);
  }

  get iterableUnits() {
    return this.symbols.map(sym => this.units[sym])
      .filter(unit => unit.value !== 0);
  }

  addOrSet(unit) {
    assertIsUnit(unit);

    const myUnit = (this.units[unit.type] = this.units[unit.type] || new Unit(unit.type, 0));
    this.units[unit.type] = myUnit.add(unit);
  }

  isEqual(otherEquation) {
    assertIsEquation(otherEquation);

    const allEqual = every(this.iterableUnits, unit =>
      otherEquation.hasUnitWithValue(unit)
    )
      && every(otherEquation.iterableUnits, unit =>
        this.hasUnitWithValue(unit)
      );

    return allEqual;
  }

  hasUnitWithValue(unit) {
    assertIsUnit(unit);
    const myUnit = this.units[unit.type];

    // can omit unit if its value is 0
    if (unit.value === 0 && (!myUnit || myUnit.value === 0)) return true;

    return myUnit && (myUnit.value === unit.value);
  }

  clone() {
    return new Equation(...Object.values(this.units));
  }

  add(...otherEquations) {
    otherEquations.forEach(eqn => {
      assertIsEquation(eqn);
    });

    const eqn = this.clone();

    otherEquations.forEach(otherEquation => {
      forEach(otherEquation.iterableUnits, unit => eqn.addOrSet(unit))
    });

    return eqn;
  }
}