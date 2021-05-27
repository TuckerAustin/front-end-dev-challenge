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
      td {
        border: 1px solid #333;
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
                <th colspan="2">${this.dataSetName}</th>
            </tr>
            <tr>
                ${this.columnLabels.map(label => html`
                <th>${label}</th>
                `)}
            </tr>
        </thead>
        <tbody>
            ${this.data.map(row => html`
            <tr>
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