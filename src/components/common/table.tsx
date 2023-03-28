import React from "react";
import { v4 as uuidv4 } from "uuid";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type TableProps = {
  head: string[];
  contents: string[][];
};

const wrapper = css`
  overflow: auto;
`;

const table = css`
  border-collapse: collapse;
`;

const tableHead = css`
  text-align: left;
  border-bottom: 1px solid ${Colors.amber20};
  color: ${Colors.neutral60};
  ${Texts.B1_13_M2};

  th {
    padding: 0.25rem;
    white-space: nowrap;
  }
`;

const tableBody = css`
  color: #282a2e;
  ${Texts.B1_13_M1}

  tr {
    td {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 7rem;
      padding: 0.5rem 0.25rem;
    }
  }
`;

const neutralBackground = css`
  background-color: ${Colors.neutral10};
`;

const Table = (props: TableProps) => {
  return (
    <div css={wrapper}>
      <table css={table}>
        <thead>
          <tr css={tableHead}>
            {props.head.map((el) => (
              <th key={el}>{el}</th>
            ))}
          </tr>
        </thead>
        <tbody css={tableBody}>
          {props.contents.map((el, idx) => (
            <tr key={uuidv4()} css={idx % 2 === 0 && neutralBackground}>
              {el.map((item) => (
                <td key={uuidv4()}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
