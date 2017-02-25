import assert from 'assert';
import symbolDescription from 'symbol-description';

export default class Unit {
  constructor(type, value = 1) {
    assert(typeof type === 'symbol');
    assert(typeof value === 'number');

    this.type = type;
    this.value = value;
  }

  toString() {
    return `${symbolDescription(this.type)}: ${this.value}`;
  }

  setValue(newValue) {
    return new Unit(this.type, newValue);
  }

  clone() {
    return this.setValue(this.value);
  }

  isSameType(unit) {
    return this.type === unit.type;
  }

  add(newUnit) {
    if (!this.isSameType(newUnit)) {
      throw new Error('Cannot add two different types, make an equation instead');
    }

    return this.setValue(this.value + newUnit.value);
  }

  subtract(newUnit) {
    return this.add(newUnit.multiply(-1));
  }

  multiply(scalar) {
    assert(typeof scalar === 'number');
    return this.setValue(this.value * scalar);
  }

  isEqual(unit) {
    return this.isSameType(unit) && this.value === unit.value;
  }
}