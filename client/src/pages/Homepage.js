"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
    return (react_1.default.createElement("div", { className: 'img-instance' },
        react_1.default.createElement(react_router_dom_1.Link, { to: '/post/' + props.postID },
            react_1.default.createElement("img", { src: props.url, alt: props.alt }))));
}
function sortLatest(data, setData) {
    var tempData = __spreadArray([], data, true).sort(function (a, b) { return b.id - a.id; });
    setData(tempData);
}
function sortLatestModified(data, setData) {
    var tempData = __spreadArray([], data, true).sort(function (a, b) { return parseInt(b.datemodified) - parseInt(a.datemodified); });
    setData(tempData);
}
function Homepage() {
    var initPost = {
        id: -1,
        image: {
            alt: '',
            url: ''
        },
        note: '',
        tag: [],
        datemodified: ''
    };
    var _a = (0, react_2.useState)(true), isEmpty = _a[0], setIsEmpty = _a[1];
    var _b = (0, react_2.useState)([initPost]), postData = _b[0], setPostData = _b[1];
    (0, react_2.useEffect)(function () {
        fetch('/postdata').then(function (res) { return res.json(); }).then(function (data) {
            if (data.length === 0) {
                setIsEmpty(false);
            }
            else {
                setPostData(data);
            }
        });
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'sort-filter' },
            react_1.default.createElement("button", { onClick: function () { return sortLatest(postData, setPostData); } }, "Sort by Latest Added"),
            react_1.default.createElement("button", { onClick: function () { return sortLatestModified(postData, setPostData); } }, "Sort by Latest Modified")),
        react_1.default.createElement("div", { className: "grid-center" }, (postData[0].id === -1 && isEmpty) ? (react_1.default.createElement("p", null, "Loading...")) :
            ((!isEmpty) ? (react_1.default.createElement("div", { className: "grid-container" },
                react_1.default.createElement("p", null, "Your gallery is empty"),
                react_1.default.createElement(react_router_dom_1.Link, { to: '/upload' },
                    react_1.default.createElement("button", { className: 'upload-btn' }, "Upload")))) : (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: "grid-container" }, postData.map(function (data) { return react_1.default.createElement(Post, { postID: data.id, url: data.image.url, alt: data.image.alt, key: data.id }); })),
                react_1.default.createElement(react_router_dom_1.Link, { to: '/upload' },
                    react_1.default.createElement("button", { className: 'upload-btn' }, "Upload"))))))));
}
exports.default = Homepage;
