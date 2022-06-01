import { JSDOM } from "jsdom";

const dom = new JSDOM();
global.document = dom.window.document;
global.Element = dom.window.Element;
global.SVGElement = dom.window.SVGElement            