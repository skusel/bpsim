export default function PatternTableRow({ rowNum, style, handleRowClicked, branchRes }) {
  return (
    <tr style={style} onClick={() => handleRowClicked(rowNum)}>
      <td style={{width: "400px"}}>{branchRes}</td>
    </tr>
  );
}
