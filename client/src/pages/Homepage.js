"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
require("../App.css");
var data_json_1 = __importDefault(require("../data/data.json"));
function Post(props) {
    return (react_1.default.createElement("div", { className: 'img-instance', key: props.postID },
        react_1.default.createElement(react_router_dom_1.Link, { to: '/post/' + props.postID },
            react_1.default.createElement("img", { src: props.url, alt: props.alt }))));
}
function ShowMain() {
    return (react_1.default.createElement("div", { className: "grid-center" },
        react_1.default.createElement("div", { className: "grid-container" }, data_json_1.default.map(function (data) { return react_1.default.createElement(Post, { postID: data.id, url: data.image.url, alt: data.image.alt }); }))));
}
function Homepage() {
    return (react_1.default.createElement("div", { className: "grid-center" },
        react_1.default.createElement("div", { className: "grid-container" }, data_json_1.default.map(function (data) { return react_1.default.createElement(Post, { postID: data.id, url: data.image.url, alt: data.image.alt }); }))));
}
exports.default = Homepage;
