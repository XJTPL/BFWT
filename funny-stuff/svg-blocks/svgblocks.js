import { matrix, multiply, rotationMatrix } from 'mathjs';

  // a SVG tag iydk
const svg_ns = "http://www.w3.org/2000/svg";

var azimuth = Math.PI / 6;
var altitude = Math.PI / 4;
var spin = 0;

var line_color = "black";
var line_width = "3";
var fill_color = "orange";

function undo() {
    Liex.removeChild(Liex.firstChild);
}

function clear_all() {
    while (Liex.firstChild) {
        undo();
    }
}

function line(svg, x1, y1, x2, y2) {
    const line = document.createElementNS(svg_ns, "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", line_color);
    line.setAttribute("stroke-width", line_width);
    svg.appendChild(line);
}

function

