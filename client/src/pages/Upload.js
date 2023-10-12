"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("../App.css");
var tags_json_1 = __importDefault(require("../data/tags.json"));
function Upload() {
    var _a = (0, react_2.useState)(''), imgPreview = _a[0], setImgPreview = _a[1];
    var reader = new FileReader();
    reader.onload = function () {
        setImgPreview(reader.result);
    };
    return (react_1.default.createElement("div", { className: 'post-container' },
        react_1.default.createElement("form", { method: "post", className: 'post-upload' },
            react_1.default.createElement(react_router_dom_1.Link, { to: '/' },
                react_1.default.createElement("div", { className: "post-back-btn" }, "\u2190 Back")),
            react_1.default.createElement("div", { className: 'img-upload' },
                react_1.default.createElement("img", { src: imgPreview, className: imgPreview === '' ? "img-view-hide" : "" }),
                react_1.default.createElement("input", { type: "file", name: "img", id: "img", accept: "image/png, image/jpeg", onChange: function (e) {
                        setImgPreview(reader.readAsDataURL(e.target.files[0]));
                    } })),
            react_1.default.createElement("div", { className: 'upload-form' },
                react_1.default.createElement("div", { className: 'upload-tags' },
                    react_1.default.createElement(InputTag, null)),
                react_1.default.createElement("textarea", { className: 'post-desc' }),
                react_1.default.createElement("button", { type: 'submit' }, "Upload")))));
}
exports.default = Upload;
function InputTag() {
    var listTag = tags_json_1.default.map(function (t) {
        var tag = t.tag;
        return (react_1.default.createElement("label", { key: tag, className: t.class + " tag-select" },
            tag,
            react_1.default.createElement("input", { key: tag, type: "checkbox", name: tag, value: tag })));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, listTag));
}
