import {Point3D} from "./Point3D.js";
import {Cylinder3D} from "./Cylinder3D.js";

export class SVGContainer2 {
    constructor() {
        this.Rotate = (vertice, center, theta, phi) => {
            let ct = Math.cos(theta),
                st = Math.sin(theta),
                cp = Math.cos(phi),
                sp = Math.sin(phi),

                x = vertice.x - center.x,
                y = vertice.y - center.y,
                z = vertice.z - center.z;

            vertice.x = ct * x - st * cp * y + st * sp * z + center.x;
            vertice.y = st * x + ct * cp * y - ct * sp * z + center.y;
            vertice.z = sp * y + cp * z + center.z;
        }

        const svgns = "http://www.w3.org/2000/svg";
        this.svgElement = document.createElementNS(svgns, "svg");
        this.svgElement.setAttributeNS(null, "width", "400");
        this.svgElement.setAttributeNS(null, "height", "400");

        document.body.append(this.svgElement);
        this.mouse = {
            down: true,
            x: 0,
            y: 0
        }

        const width = this.svgElement.attributes.width.value;
        const height = this.svgElement.attributes.height.value;

        const dx = width / 2;
        const dy = height / 2;

        this.center = new Point3D(0, dy, 0);

        this.cylinder3D = new Cylinder3D(this.center, dy);
        this.cylinder3D.render(this.svgElement, dx, dy);

        // let that = this;
        // this.svgElement.addEventListener('mousedown', (e) => {
        //     that.mouse.down = true;
        //     that.mouse.x = e.clientX;
        //     that.mouse.y = e.clientY;
        // });
        // this.svgElement.addEventListener('mousemove', (e) => {
        //     if (that.mouse.down) {
        //         let theta = (e.clientX - that.mouse.x) * Math.PI / 360;
        //         let phi = (e.clientY - that.mouse.y) * Math.PI / 180;
        //
        //         for (let i = 0, ii = 8; i < ii; i++) {
        //             that.Rotate(that.cylinder3D.vertices[i], that.center, theta, phi);
        //         }
        //
        //         that.mouse.x = e.clientX;
        //         that.mouse.y = e.clientY;
        //
        //         that.cylinder3D.render(that.svgElement, dx, dy);
        //     }
        // });
        //
        // this.svgElement.addEventListener('mouseup', (e) => {
        //     that.mouse.down = false;
        // })
    }
}