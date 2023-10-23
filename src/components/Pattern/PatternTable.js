import TableRow from './PatternTableRow';

export default function PatternTable({ rows, onRowClicked }) {
  return (
    <table style={{border: "solid 2px #003366", borderRadius: "8px"}}>
      <tbody>
        {rows.map((row, i) => {
          return (
            <TableRow 
              key={i} 
              rowNum={i}
              style={row.style} 
              handleRowClicked={() => onRowClicked(i)} 
              branchRes={row.branchRes} 
            />
          );
        })}
      </tbody>
    </table>
  );
}
