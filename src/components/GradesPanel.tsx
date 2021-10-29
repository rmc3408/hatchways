import React from "react";

const GradesPanel = ({ grades }: IGrades) => {
  if (!grades) return null;

  return (
    <div>
      <table className="table-GradesPanel">
        {grades.map((score: string, idx: number) => (
          <tr key={idx}>
            <td>Test {++idx}</td>
            <td>{score}%</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default GradesPanel;
