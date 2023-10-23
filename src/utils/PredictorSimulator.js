class TwoLevelPredictor {
  constructor(historyBits, isOneBit) {
    this.isOneBit = isOneBit;
    this.history = 0;
    this.historyMask = 0;
    for(let i = 0; i < historyBits; i++) {
      this.historyMask = this.historyMask << 1;
      this.historyMask++;
    }
    this.predictors = Array(2**historyBits).fill(0);
  }

  predict() {
    const prediction = this.predictors[this.history];
    if(this.isOneBit) {
      if(prediction === 0) {
        return "Not taken";
      } else {
        return "Taken";
      }
    } else {
      if(prediction < 2) {
        return "Not taken";
      } else {
        return "Taken";
      }
    }
  }

  update(branchOutcome) {
    const currentHistory = this.history;
    const prediction = this.predictors[currentHistory];
    this.history = currentHistory << 1;
    this.history = this.history & this.historyMask;
    if(branchOutcome === "Taken") {
      this.history++;
      if(this.isOneBit && prediction === 0) {
        this.predictors[currentHistory]++;
      } else if(!this.isOneBit && prediction < 3) {
        this.predictors[currentHistory]++;
      }
    } else {
      if(this.isOneBit && prediction === 1) {
        this.predictors[currentHistory]--;
      } else if(!this.isOneBit && prediction > 0) {
        this.predictors[currentHistory]--;
      }
    }
  }
}

export function predictNotTaken(pattern) {
  let results = {
    numCorrect: 0,
    numIncorrect: 0,
    pattern,
    predictions: []
  };

  for(const branchOutcome of pattern) {
    results.predictions.push("Not taken");
    if(branchOutcome === "Not taken") {
      results.numCorrect++;
    } else {
      results.numIncorrect++;
    }
  }

  return results;
}

export function predictTaken(pattern) {
  let results = {
    numCorrect: 0,
    numIncorrect: 0,
    pattern,
    predictions: []
  };

  for(const branchOutcome of pattern) {
    results.predictions.push("Taken");
    if(branchOutcome === "Taken") {
      results.numCorrect++;
    } else {
      results.numIncorrect++;
    }
  }

  return results;
}

export function predictOneBit(pattern, historyBits) {
  let results = {
    numCorrect: 0,
    numIncorrect: 0,
    pattern,
    predictions: []
  };

  if(historyBits !== null && historyBits > 0) {
    let twoLevelPred = new TwoLevelPredictor(historyBits, true);
    for(const branchOutcome of pattern) {
      const prediction = twoLevelPred.predict();
      results.predictions.push(prediction);
      if(prediction === branchOutcome) {
        results.numCorrect++;
      } else {
        results.numIncorrect++;
      }
      twoLevelPred.update(branchOutcome);
    }
  }
  else {
    let pred = 0;
    for(const branchOutcome of pattern) {
      if(pred === 0) {
        results.predictions.push("Not taken");
        if(branchOutcome === "Not taken") {
          results.numCorrect++;
        } else {
          results.numIncorrect++;
          pred = 1;
        }
      } else
      {
        results.predictions.push("Taken");
        if(branchOutcome === "Taken") {
          results.numCorrect++;
        } else {
          results.numIncorrect++;
          pred = 0;
        }
      }
    }
  }

  return results;
}

export function predictTwoBit(pattern, historyBits) {
  let results = {
    numCorrect: 0,
    numIncorrect: 0,
    pattern,
    predictions: []
  };

  if(historyBits !== null && historyBits > 0) {
    let twoLevelPred = new TwoLevelPredictor(historyBits, false);
    for(const branchOutcome of pattern) {
      const prediction = twoLevelPred.predict();
      results.predictions.push(prediction);
      if(prediction === branchOutcome) {
        results.numCorrect++;
      } else {
        results.numIncorrect++;
      }
      twoLevelPred.update(branchOutcome);
    }
  } else {
    let pred = 0;
    for(const branchOutcome of pattern) {
      if(pred < 2) {
        results.predictions.push("Not taken");
        if(branchOutcome === "Not taken") {
          results.numCorrect++;
          if(pred === 1) {
            pred--;
          }
        } else {
          results.numIncorrect++;
          pred++;
        }
      } else
      {
        results.predictions.push("Taken");
        if(branchOutcome === "Taken") {
          results.numCorrect++;
          if(pred === 2) {
            pred++;
          }
        } else {
          results.numIncorrect++;
          pred--;
        }
      }
    }
  }

  return results;
}

