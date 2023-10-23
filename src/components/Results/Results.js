import BarGraph from "./BarGraph"
import ResultsTable from "./ResultsTable"

export default function Results({ style, results })
{
  return (
    <div style={style}>
      <h1>Results</h1>
      <div className="col-xl-7 col-l-6 col-12" style={{float: "right", verticalAlign: "top", marginBottom: "30px"}}>
        <BarGraph results={results} />
      </div>
      <div className="col-xl-1 col-l-1" style={{float: "right"}} />
      <div className="col-xl-4 col-l-5 col-12" style={{float: "left", marginBottom: "30px"}}>
        <ResultsTable results={results} />
      </div>
    </div>
  );
}
