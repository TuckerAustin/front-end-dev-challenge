import { html, css, LitElement } from 'lit';
import './challenge-chart/dist/challenge-chart.js';
import { ChallengeDataService } from './ChallengeDataService.js';
import './challenge-table.js';

class ChallengeApp extends LitElement {

    static get styles() {
        return css`
      * {
        font-size: 100%;
      }

      .dropdown {
        display: flex;
        justify-content: center;
        margin: 4px 0px;
      }

      .challenge {
        display: flex;
        justify-content: space-between;
        margin: 2px 8px;
        width: calc(100% - 32px);
      }

      challenge-chart {
        width: 75%;
        margin: 2px 8px;
      }
      
  `}

    static get properties() {
        return {
            columnLabels: { type: Array },
            data: { type: Array },
            currentDataSet: { type: Object }
        };
    }

    constructor() {
        super();
        this.columnLabels = [];
        this.challengeDataService = new ChallengeDataService();
        this.loadDataSet();
    }

    async loadDataSet(e) {
        const size = e?.target.value ?? 'small';
        this.currentDataSet = await this.challengeDataService.getDataSet(size);
        this.columnLabels = [this.currentDataSet.xColumn.name, this.currentDataSet.yColumn.name];
        const xValues = this.currentDataSet.xColumn.values;
        const yValues = this.currentDataSet.yColumn.values;
        const valuesLength = Math.max(xValues.length, yValues.length);
        this.data = [];
        for (let i = 0; i < valuesLength; ++i) {
            this.data.push({ x: xValues[i], y: yValues[i] });
        }
        this.requestUpdate();
    }


    render() {
        return html`
    <div class="dropdown"><select @change="${this.loadDataSet}">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select></div>
    <div class="challenge">
        <challenge-chart .data=${this.data}></challenge-chart>
        <challenge-table .dataSetName="${this.currentDataSet.name}" .data="${this.data}"
            .columnLabels="${this.columnLabels}">
        </challenge-table>
    </div>
    `;
    }

}

window.customElements.define('challenge-app', ChallengeApp);