import { html, css, LitElement } from 'lit';

class ChallengeTable extends LitElement {

    static get properties() {
        return {
            dataSetName: { type: String },
            columnLabels: { type: Array },
            data: { type: Array }
        };
    }

    static get styles() {
        return css`
    * {
      font-size: 100%;
    }
    table,
    tbody,
      td {
        border: 2px solid black;
      }

      thead,
      tfoot {
        background-color: #333;
        color: #fff;
      }
  `}

    render() {
        return html`
    <table>
        <thead>
            <tr>
                <th colspan="3">${this.dataSetName}</th>
            </tr>
            <tr>
                <th></th>
                ${this.columnLabels.map(label => html`
                <th>${label}</th>
                `)}
            </tr>
        </thead>
        <tbody>
            ${this.data.map((row, index) => html`
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${row.x}
                </td>
                <td>
                    ${row.y}
                </td>
            </tr>
            `)}
        </tbody>
    </table>
  `}
}

customElements.define('challenge-table', ChallengeTable);