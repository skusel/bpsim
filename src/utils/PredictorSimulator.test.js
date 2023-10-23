import { predictNotTaken, predictTaken, predictOneBit, predictTwoBit } from './PredictorSimulator.js'

const ttnnt = [
  "Taken",
  "Taken",
  "Not taken",
  "Not taken",
  "Taken"
];

const ttnnttnntt = [
  "Taken",
  "Taken",
  "Not taken",
  "Not taken",
  "Taken",
  "Taken",
  "Not taken",
  "Not taken",
  "Taken",
  "Taken"
];

describe("Predictor simulator", () => {
  test("not taken predictor on TTNNT pattern", () => {
    const expectedPreds = [
      "Not taken",
      "Not taken",
      "Not taken",
      "Not taken",
      "Not taken"
    ];
    const results = predictNotTaken(ttnnt)
    expect(results.numCorrect).toBe(2);
    expect(results.numIncorrect).toBe(3);
    expect(results.pattern).toEqual(ttnnt);
    expect(results.predictions).toEqual(expectedPreds);
  });

  test("taken predictor on TTNNT pattern", () => {
    const expectedPreds = [
      "Taken",
      "Taken",
      "Taken",
      "Taken",
      "Taken"
    ];
    const results = predictTaken(ttnnt)
    expect(results.numCorrect).toBe(3);
    expect(results.numIncorrect).toBe(2);
    expect(results.pattern).toEqual(ttnnt);
    expect(results.predictions).toEqual(expectedPreds);
  });

  test("one-bit predictor on TTNNT pattern", () => {
    const expectedPreds = [
      "Not taken",
      "Taken",
      "Taken",
      "Not taken",
      "Not taken"
    ];
    const results = predictOneBit(ttnnt, 0);
    expect(results.numCorrect).toBe(2);
    expect(results.numIncorrect).toBe(3);
    expect(results.pattern).toEqual(ttnnt);
    expect(results.predictions).toEqual(expectedPreds);
  });

  test("two-level one-bit predictor with 1 bit of history on TTNNT pattern", () => {
    const expectedPreds = [
      "Not taken",
      "Not taken",
      "Taken",
      "Taken",
      "Not taken"
    ];
    const results = predictOneBit(ttnnt, 1);
    expect(results.numCorrect).toBe(0);
    expect(results.numIncorrect).toBe(5);
    expect(results.pattern).toEqual(ttnnt);
    expect(results.predictions).toEqual(expectedPreds);
  });

  test("two-level one-bit predictor with 2 bits of history on TTNNT pattern", () => {
    const expectedPreds = [
      "Not taken",
      "Not taken",
      "Not taken",
      "Not taken",
      "Taken"
    ];
    const results = predictOneBit(ttnnt, 2);
    expect(results.numCorrect).toBe(3);
    expect(results.numIncorrect).toBe(2);
    expect(results.pattern).toEqual(ttnnt);
    expect(results.predictions).toEqual(expectedPreds);
  });

  test("two-bit predictor on TTNNT pattern", () => {
    const expectedPreds = [
      "Not taken",
      "Not taken",
      "Taken",
      "Not taken",
      "Not taken"
    ];
    const results = predictTwoBit(ttnnt, 0);
    expect(results.numCorrect).toBe(1);
    expect(results.numIncorrect).toBe(4);
    expect(results.pattern).toEqual(ttnnt);
    expect(results.predictions).toEqual(expectedPreds);
  });

  test("two-level two-bit predictor with 1 bit of history on TTNNT pattern", () => {
    const expectedPreds = [
      "Not taken",
      "Not taken",
      "Not taken",
      "Not taken",
      "Not taken"
    ];
    const results = predictTwoBit(ttnnt, 1);
    expect(results.numCorrect).toBe(2);
    expect(results.numIncorrect).toBe(3);
    expect(results.pattern).toEqual(ttnnt);
    expect(results.predictions).toEqual(expectedPreds);
  });

  test("two-level two-bit predictor with 2 bits of history on TTNNTTNNTT pattern", () => {
    const expectedPreds = [
      "Not taken",
      "Not taken",
      "Not taken",
      "Not taken",
      "Not taken",
      "Not taken",
      "Not taken",
      "Not taken",
      "Taken",
      "Taken"
    ];
    const results = predictTwoBit(ttnnttnntt, 2);
    expect(results.numCorrect).toBe(6);
    expect(results.numIncorrect).toBe(4);
    expect(results.pattern).toEqual(ttnnttnntt);
    expect(results.predictions).toEqual(expectedPreds);
  });
});
