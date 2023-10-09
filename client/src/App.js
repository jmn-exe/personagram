"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
require("./App.css");
var data_json_1 = __importDefault(require("./data/data.json"));
function Post(props) {
    return (React.createElement("div", { className: 'img-instance', key: props.postID, onClick: function () { return OpenPost(props.postID); } },
        React.createElement("img", { src: props.url, alt: props.alt })));
}
function OpenPost(id) {
    data_json_1.default.map(function (data) {
        if (data.id == id) {
        }
    });
}
function App() {
    console.log(typeof (data_json_1.default));
    var _a = (0, react_1.useState)([{}]), backendData = _a[0], setBackendData = _a[1];
    return (React.createElement("div", { className: 'main-container' },
        React.createElement("h1", null, "PersonaGram"),
        React.createElement("div", { className: "grid-center" }),
        React.createElement("div", { className: 'post-view' },
            React.createElement("div", { className: 'dim-back' },
                React.createElement("div", { className: 'post-box' },
                    React.createElement("div", { className: 'img-view' },
                        React.createElement("img", { src: "https://i.ytimg.com/vi/tzzgVtEAoqw/maxresdefault.jpg", alt: "" })),
                    React.createElement("div", { className: 'desc-view' },
                        React.createElement("div", { className: 'post-date' }, "Last edited - 6:11PM 9/10/2023"),
                        React.createElement("div", { className: 'post-tags' },
                            React.createElement("div", null, "Diary"),
                            React.createElement("div", null, "Journal"),
                            React.createElement("div", null, "Fun")),
                        React.createElement("div", { className: 'post-desc' }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut hendrerit felis. Cras eleifend consequat nunc nec placerat. Maecenas lobortis mauris sit amet est aliquet porta. Nulla eros risus, dictum sed nibh in, viverra vehicula nisl. Proin finibus metus sit amet nisl dapibus malesuada. Nulla facilisi. Suspendisse sed nisl et leo molestie posuere eu sit amet erat."),
                        React.createElement("div", { className: 'post-edit-btn' }, "Edit")))))));
}
function fetchData() {
}
exports.default = App;
