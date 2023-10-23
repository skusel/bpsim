import Table from './PatternTable';

export default function PatternTableWrapper({ className, style, rows, onRowClicked, onAddNotTakenRowClicked, onAddTakenRowClicked, onRemoveSelectedRowClicked, onClearAllRowsClicked }) {
  return (
    <div className={className} style={style}>
      <h1>Pattern</h1>
      <div className="col-6" style={{display: "inline-block"}}>
        <Table rows={rows} onRowClicked={onRowClicked} />
      </div>
      <div className="col-6" style={{display: "inline-block", verticalAlign: "top"}}>
        <button 
          className="col-11" 
          style={{display: "block", marginLeft: "8.33%", marginBottom: "5px"}} 
          onClick={onAddNotTakenRowClicked}
        >
          Add "Not taken"
        </button>
        <button 
          className="col-11" 
          style={{display: "block", marginLeft: "8.33%", marginBottom: "5px"}} 
          onClick={onAddTakenRowClicked}
        >
          Add "Taken"
        </button>
        <button 
          className="col-11" 
          style={{display: "block", marginLeft: "8.33%", marginBottom: "5px"}} 
          onClick={onRemoveSelectedRowClicked}
        >
          Remove Selected
        </button>
        <button 
          className="col-11" 
          style={{display: "block", marginLeft: "8.33%", marginBottom: "5px"}} 
          onClick={onClearAllRowsClicked}
        >
          Clear Pattern
        </button>
      </div>
    </div>
  );
}
