import {Point3D} from "./Point3D.js";

export class Cube3D {
    constructor(center, size) {
        const d = size / 2;

        this.Project = (vertice) => new Point3D(vertice.x, vertice.z);

        this.vertices = [
            new Point3D(center.x - d, center.y - d, center.z + d),
            new Point3D(center.x - d, center.y - d, center.z - d),
            new Point3D(center.x + d, center.y - d, center.z - d),
            new Point3D(center.x + d, center.y - d, center.z + d),
            new Point3D(center.x + d, center.y + d, center.z + d),
            new Point3D(center.x + d, center.y + d, center.z - d),
            new Point3D(center.x - d, center.y + d, center.z - d),
            new Point3D(center.x - d, center.y + d, center.z + d)
        ];
        this.faces = [
            [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
            [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
            [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
            [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
            [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
            [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
        ];
    }

    render(container, dx, dy) {
        container.innerHTML = "";
        let pathGenerate = `<g class="cube" fill="#ff7f0e" stroke="rgb(125, 62, 7)">`;
        for (let i = 0, ii = this.faces.length; i < ii; i++) {
            let face = this.faces[i];
            let point = this.Project(face[0]);
            let str = `<path d="M${point.x + dx} ${-point.y + dy}`;
            for (let o = 1, oo = face.length; o < oo; o++) {
                point = this.Project(face[o]);
                str += ` L ${point.x + dx} ${-point.y + dy}`;
            }
            str += `Z" fill="rgba(205, 0, 175, 1)" stroke="rgba(0, 0, 0, 1)" fill-opacity="0.95"></path>`;
            pathGenerate += str;
        }
        pathGenerate+='</g>';
        container.innerHTML = pathGenerate;
    }
}