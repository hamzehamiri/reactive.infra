import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import ResourceStateModel from "../../../../Shared/Common/ResourceStateModel.js";
import ScriptManagerUtil from "../../../../Shared/Common/ScriptManagerUtil.js";
import PointerEvent from "./Events/PointerEvent.js";
import Point from "./Events/Point.js";
import MaskResourceComponent from "../../../Component/Masks/MaskResourceComponent.js";

export class HighChartComponent extends HTMLComponent {
    constructor() {
        super();

        this.highChartElement = DOM.createElement('div');

        this.setElement(this.highChartElement);

        let arrayResourceStateModel = [];
        arrayResourceStateModel.push(new ResourceStateModel('./Resources/Library/HighChart/highcharts.js', 'HighChartJs', ScriptManagerUtil.Type.JavaScript))

        this.addMapByComponent(arrayResourceStateModel[0]);

        let that = this;
        this.startCaptureResource((resourceStateModel) => {

        }, () => {
            that.unMaskComponent();
            that.loadHighChart();
        });

        this.showMaskComponent(new MaskResourceComponent(arrayResourceStateModel), 100, 300, this.highChartElement);
    }

    setSize(width, height) {
        super.setSize(width, height);
        if (this.getAttached() && this.highChart) {
            this.highChart.setSize(width, height, false);
        }
    }

    loadHighChart() {
        this.highChart = Highcharts.chart(this.highChartElement, {
            title: {
                text: 'گزارش فرم بر اساس تنظیمات',
                align: 'left'
            },
            chart: {
                type: 'column'
            },

            subtitle: {
                align: 'left'
            },

            yAxis: {
                title: {
                    text: 'بر اساس تنظیمات'
                }
            },

            xAxis: {
                type: 'category',
                labels: {
                    autoRotation: [-45, -90],
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    // pointStart: 2010,
                    dataLabels: {
                        enabled: true
                    },
                    events: {
                        click: function (event) {
                            let pointerEvent = new PointerEvent();
                            pointerEvent.applyData(event);
                            if (pointerEvent.getPoint() instanceof Point) {
                                alert(" X: " + pointerEvent.getPoint().getX() + " Y : " + pointerEvent.getPoint().getY())
                            }
                        }
                    }
                }
            },

            series: [],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },

            accessibility: {
                enabled: false
            }
        });
    }

    removeAddSeries() {
        let indexSize = this.highChart.series.length;
        for (let i = 0; i < indexSize; i++) {
            let series = this.highChart.series[0];
            series.remove();
        }
    }

    addSeries(seriesName, data, color) {
        this.highChart.addSeries({
            name: seriesName,
            data: data,
            color: color
        });
    }

    getHighChartJs() {
        return this.highChart
    }
}