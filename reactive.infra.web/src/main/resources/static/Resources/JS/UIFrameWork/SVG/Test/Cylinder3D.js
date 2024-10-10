import {Point3D} from "./Point3D.js";

export class Cylinder3D {
    constructor() {
        this.Project = (vertice) => new Point3D(vertice.x, vertice.z);
    }

    render(container, dx, dy) {
        container.innerHTML = "";
        for (let i = 0, ii = this.faces.length; i < ii; i++) {
            let face = this.faces[i];
            let point = this.Project(face[0]);
            let str = `<path d="M${point.x + dx} ${-point.y + dy}`;
            for (let o = 1, oo = face.length; o < oo; o++) {
                point = this.Project(face[o]);
                str += ` L ${point.x + dx} ${-point.y + dy}`;
            }
            str += ` Z" fill="rgba(205, 0, 175, .1)" stroke="rgba(0, 0, 0, .1)">`;
            container.innerHTML += str;
        }
    }
}