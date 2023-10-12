"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
require("./App.css");
var Homepage_1 = __importDefault(require("./pages/Homepage"));
var PostView_1 = __importDefault(require("./pages/PostView"));
var Upload_1 = __importDefault(require("./pages/Upload"));
function App() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'main-container' },
            react_1.default.createElement("h1", null, "PersonaGram"),
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(Homepage_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/post/:id', element: react_1.default.createElement(PostView_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/upload', element: react_1.default.createElement(Upload_1.default, null) })))));
}
exports.default = App;
