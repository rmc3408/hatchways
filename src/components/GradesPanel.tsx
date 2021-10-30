import React from "react";
import { v4 as uuidv4 } from 'uuid';

const GradesPanel = ({ grades }: IGrades) => {
  if (!grades) return null;

  return (
    <div>
      <table className="table-GradesPanel">
        {grades.map((score: string, idx: number) => (
          <tbody key={uuidv4()}>
            <tr>
              <td>Test {++idx}</td>
              <td>{score}%</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default GradesPanel;
