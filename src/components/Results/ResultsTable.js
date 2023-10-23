import TableRow from './ResultsTableRow'

export default function ResultsTable({ results }) {
  return (
    <table>
      <thead>
        <tr>
          <td>Branch ID</td>
          <td>Expected</td>
          <td>Predicted</td>
          <td>Correct</td>
        </tr>
      </thead>
      <tbody>
        {results !== null 
          ? results.pattern.map((expected, i) => {
            return (
              <TableRow
                key={i}
                branchNum={i + 1}
                expected={expected}
                predicted={results.predictions[i]}
              />
            );
          })
          : null
        }
      </tbody>
    </table>
  );
}
