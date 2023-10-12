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
function sortLatest(data, setData, mode) {
    var tempData;
    if (mode) {
        tempData = __spreadArray([], data, true).sort(function (a, b) { return b.id - a.id; });
    }
    else {
        tempData = __spreadArray([], data, true).sort(function (a, b) { return a.id - b.id; });
    }
    setData(tempData);
}
function sortLatestModified(data, setData, mode) {
    var tempData;
    if (mode) {
        tempData = __spreadArray([], data, true).sort(function (a, b) { return parseInt(b.datemodified) - parseInt(a.datemodified); });
    }
    else {
        tempData = __spreadArray([], data, true).sort(function (a, b) { return parseInt(a.datemodified) - parseInt(b.datemodified); });
    }
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
    var _c = (0, react_2.useState)(0), isSL = _c[0], setIsSL = _c[1];
    var _d = (0, react_2.useState)(0), isSLM = _d[0], setIsSLM = _d[1];
    (0, react_2.useEffect)(function () {
        fetch('/postdata').then(function (res) { return res.json(); }).then(function (data) {
            if (data.length === 0) {
                setIsEmpty(false);
            }
            else {
                //setPostData(data);
                sortLatestModified(data, setPostData, true);
            }
        });
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'sort-filter' },
            react_1.default.createElement("button", { className: (isSL == 1 || isSL == 2) ? "sort-selected" : "", onClick: function (e) {
                    if (isSLM > 0)
                        setIsSLM(0);
                    switch (isSL) {
                        case 0:
                            setIsSL(1);
                            break;
                        case 1:
                            setIsSL(2);
                            break;
                        case 2:
                            setIsSL(1);
                            break;
                    }
                    var mode = (isSL == 1 ? true : false);
                    sortLatest(postData, setPostData, mode);
                    //console.log(isSL);
                } },
                "Sort by Latest Added ",
                isSL == 1 ? '↑' : (isSL == 2 ? '↓' : '')),
            react_1.default.createElement("button", { className: (isSLM == 1 || isSLM == 2) ? "sort-selected" : "", onClick: function () {
                    if (isSL > 0)
                        setIsSL(0);
                    switch (isSLM) {
                        case 0:
                            setIsSLM(1);
                            break;
                        case 1:
                            setIsSLM(2);
                            break;
                        case 2:
                            setIsSLM(1);
                            break;
                    }
                    var mode = (isSLM == 1 ? true : false);
                    sortLatestModified(postData, setPostData, mode);
                } },
                "Sort by Latest Modified ",
                isSLM == 1 ? '↑' : (isSLM == 2 ? '↓' : '')),
            react_1.default.createElement("button", { onClick: function () {
                    setIsSL(0);
                    setIsSLM(0);
                    sortLatestModified(postData, setPostData, true);
                } }, "Reset Sort")),
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
