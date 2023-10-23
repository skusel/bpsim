export default function ResultsTableRow({ branchNum, expected, predicted }) {
  const correct = expected === predicted;

  return (
    <tr>
      <td>{branchNum}</td>
      <td>{expected}</td>
      <td>{predicted}</td>
      <td style={{textAlign: "center", color: correct ? "green" : "red"}}>{correct ? "\u2713" : "\u2717"}</td>
    </tr>
  );
}
