"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("../App.css");
//import postData from '../data/data.json'
function Post(props) {
    return (react_1.default.createElement("div", { className: 'img-instance', key: props.postID },
        react_1.default.createElement(react_router_dom_1.Link, { to: '/post/' + props.postID },
            react_1.default.createElement("img", { src: props.url, alt: props.alt }))));
}
function Homepage() {
    var _a = (0, react_2.useState)([]), postData = _a[0], setPostData = _a[1];
    (0, react_2.useEffect)(function () {
        fetch('/postdata').then(function (res) { return res.json(); }).then(function (data) {
            setPostData(data);
        });
    }, []);
    return (react_1.default.createElement("div", { className: "grid-center" },
        react_1.default.createElement("div", { className: "grid-container" }, postData.map(function (data) { return react_1.default.createElement(Post, { postID: data.id, url: data.image.url, alt: data.image.alt }); })),
        react_1.default.createElement(react_router_dom_1.Link, { to: '/upload' },
            react_1.default.createElement("button", { className: 'upload-btn' }, "Upload"))));
}
exports.default = Homepage;
