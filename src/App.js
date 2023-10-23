import { useState, useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import PredictorSelector from './components/BranchPredictor/PredictorSelector';
import PatternTableWrapper from './components/Pattern/PatternTableWrapper';
import Results from './components/Results/Results';
import { 
  predictNotTaken,
  predictTaken, 
  predictOneBit, 
  predictTwoBit 
} from './utils/PredictorSimulator'

function App() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [enableHistoryBits, setEnableHistoryBits] = useState(false);
  const availablePredictors = [
    {value: "not-taken", label: "Not taken"}, 
    {value: "taken", label: "Taken"}, 
    {value: "1-bit", label: "1-bit"}, 
    {value: "2-bit", label: "2-bit"}
  ];
  const [currentPredictor, setCurrentPredictor] = useState(availablePredictors[0].value);
  const historyBits = useRef(0);
  const [results, setResults] = useState(null);

  function handlePredictorChanged(newPredictor) {
    setCurrentPredictor(newPredictor);
    if(newPredictor === "not-taken" || newPredictor === "taken") {
      setEnableHistoryBits(false);
    } else {
      setEnableHistoryBits(true);
    }
    setResults(null);
  }

  function handleHistoryBitsChanged(newHistoryBits) {
    historyBits.current = newHistoryBits;
    setResults(null);
  }

  function handlePredictClicked() {
    if(
      historyBits.current != null && 
      (isNaN(historyBits.current) || historyBits.current < 0 || historyBits.current > 10)
    ) {
      alert("This simulator allows two-level predictors to have up to 10 history bits. " +
            "You can also disable two-level prediction by entering 0 history bits.");
      return;
    }

    const pattern = rows.map(row => row.branchRes);
    if(currentPredictor === "not-taken") {
      setResults(predictNotTaken(pattern));
    } else if(currentPredictor === "taken") {
      setResults(predictTaken(pattern));
    } else if(currentPredictor === "1-bit") {
      setResults(predictOneBit(pattern, historyBits.current));
    } else {
      setResults(predictTwoBit(pattern, historyBits.current));
    }
  }

  function handleInputRowClicked(rowNum) {
    if(selectedRow !== rowNum) {
      if(selectedRow !== -1) {
        rows[selectedRow].style = {backgroundColor: "white", color: "black", cursor: "pointer"};
      }
      setSelectedRow(rowNum);
      rows[rowNum].style = {backgroundColor: "#003366", color: "white", cursor: "pointer"};
    } else {
      setSelectedRow(-1);
      rows[rowNum].style = {backgroundColor: "white", color: "black", cursor: "pointer"};
    }
  }

  function handleAddNotTakenRow() {
    const newRows = [...rows, {branchRes: "Not taken", style: {cursor: "pointer"}}];
    setRows(newRows);
    setResults(null);
  }

  function handleAddTakenRow() {
    const newRows = [...rows, {branchRes: "Taken", style: {cursor: "pointer"}}];
    setRows(newRows);
    setResults(null);
  }

  function handleRemoveSelectedRow() {
    if(selectedRow !== -1) {
      const newRows = [];
      for(let i = 0; i < rows.length; i++) {
        if(i !== selectedRow)
          newRows.push(rows[i]);
      }
      setRows(newRows);
      const newSelectedRow = selectedRow - 1;
      if(newSelectedRow !== -1) {
        rows[newSelectedRow].style = {backgroundColor: "#003366", color: "white"};
      }
      setSelectedRow(newSelectedRow);
    }
    setResults(null);
  }

  function handleClearAllRows() {
    setRows([]);
    setResults(null);
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{marginTop: "60px"}}>
        <PredictorSelector
          className="col-xl-5 col-l-5 col-12"
          style={{marginBottom: "20px", display: "inline-block", verticalAlign: "top"}}
          availablePredictors={availablePredictors}
          onPredictorChanged={handlePredictorChanged}
          enableHistoryBits={enableHistoryBits}
          onHistoryBitsChanged={handleHistoryBitsChanged}
          onPredictClicked={handlePredictClicked}
        />
        <div className="col-xl-1 col-l-1" style={{display: "inline-block"}} />
        <PatternTableWrapper
          className="col-xl-6 col-l-6 col-12" 
          style={{marginBottom: "20px", display: "inline-block"}}
          rows={rows}
          onRowClicked={handleInputRowClicked} 
          onAddNotTakenRowClicked={handleAddNotTakenRow}
          onAddTakenRowClicked={handleAddTakenRow}
          onRemoveSelectedRowClicked={handleRemoveSelectedRow}
          onClearAllRowsClicked={handleClearAllRows}
        />
        <Results results={results} />
      </div>
    </>
  );
}

export default App;
