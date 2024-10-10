import {WebEditor} from "../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import {DOM} from "../../../../UIFrameWork/Shared/Common/DOM.js";

export default class WebSignatureEditor extends WebEditor {

    static registerKey() {
        return "WebSignatureEditor"
    };

    constructor() {
        super();

        this.setGeneratedInputElement(false);
    }

    onAttach(parentElement) {
        super.onAttach(parentElement);

        const canvas = DOM.createElement('canvas');
        const ctx = canvas.getContext('2d');

        this.getElement().appendChild(canvas);

        canvas.width = 800;
        canvas.height = 600;

        let isDrawing = false;
        let lastX, lastY;
        let brushSize = 5;
        let color = '#000000';

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);

        const clearCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };

        document.getElementById('colorPicker').addEventListener('input', (e) => {
            color = e.target.value;
        });

        document.getElementById('brushSize').addEventListener('input', (e) => {
            brushSize = parseInt(e.target.value);
        });

        function startDrawing(e) {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function draw(e) {
            if (!isDrawing) return;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = color;
            ctx.lineWidth = brushSize * 2;
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function stopDrawing() {
            isDrawing = false;
        }

        clearCanvas();
    }
}