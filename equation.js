import assert from 'assert';
import Unit from './unit';
import forEach from 'lodash/forEach';
import every from 'lodash/every';

const assertIs = type => arg => assert.equal(arg.constructor.name, type);
const assertIsUnit = assertIs('Unit');
const assertIsEquation = assertIs('Equation');
const assertIsUnitOrEquation = arg => assert(arg.constructor.name === 'Unit' || arg.constructor.name === 'Equation');

export default class Equation {
  static fromEquations(...equations) {
    return (new Equation()).add(...equations);
  }

  // takes unit arguments
  constructor(...args) {
    this.units = {};
    args.forEach(arg => {
      assertIsUnitOrEquation(arg);
      if (arg.constructor.name === 'Unit') {
        this.addOrSet(arg);
      } else {
        arg.iterableUnits.forEach(unit => this.addOrSet(unit));
      }
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
    return new Equation(...this.iterableUnits);
  }

  add(...otherEquations) {
    const actualEquations = otherEquations.map(otherEqn => {
      assertIsUnitOrEquation(otherEqn);

      if (otherEqn.constructor.name === 'Unit') {
        return new Equation(otherEqn);
      }

      return otherEqn;
    });

    const eqn = this.clone();

    actualEquations.forEach(actualEqn => {
      forEach(actualEqn.iterableUnits, unit => eqn.addOrSet(unit))
    });

    return eqn;
  }

  multiply(scalar) {
    return new Equation(
      ...this.iterableUnits.map(unit => unit.multiply(scalar))
    );
  }
}