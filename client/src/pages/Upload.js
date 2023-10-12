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
var tags_json_1 = __importDefault(require("../data/tags.json"));
function Upload() {
    var _a = (0, react_2.useState)(''), imgSrc = _a[0], setImgSrc = _a[1];
    var _b = (0, react_2.useState)(''), imgFile = _b[0], setImgFile = _b[1];
    var _c = (0, react_2.useState)([]), tagList = _c[0], setTagList = _c[1];
    var _d = (0, react_2.useState)(''), note = _d[0], setNote = _d[1];
    var reader = new FileReader();
    reader.onload = function () {
        setImgSrc(reader.result);
    };
    return (react_1.default.createElement("div", { className: 'post-container' },
        react_1.default.createElement("form", { className: 'post-upload', onSubmit: function (e) { return validateForm(e, imgFile, tagList, note); } },
            react_1.default.createElement(react_router_dom_1.Link, { to: '/' },
                react_1.default.createElement("div", { className: "post-back-btn" }, "\u2190 Back")),
            react_1.default.createElement("div", { className: 'img-upload' },
                react_1.default.createElement("img", { src: imgSrc, className: imgSrc === '' ? "img-view-hide" : "" }),
                react_1.default.createElement("input", { type: "file", name: "img", id: "img", accept: "image/png, image/jpeg", formEncType: "multipart/form-data", onChange: function (e) {
                        setImgFile(e.target.files[0]);
                        setImgSrc(reader.readAsDataURL(e.target.files[0]));
                    } })),
            react_1.default.createElement("div", { className: 'upload-form' },
                react_1.default.createElement("div", { className: 'upload-tags' },
                    react_1.default.createElement(InputTag, { tags: tagList, func: setTagList })),
                react_1.default.createElement("textarea", { className: 'post-desc', onChange: function (e) { return setNote(e.target.value); } }),
                react_1.default.createElement("button", { type: 'submit' }, "Upload")))));
}
exports.default = Upload;
function validateForm(e, imgFile, tagList, pNote) {
    e.preventDefault();
    if (imgFile === '') {
        window.alert('Please upload an image!');
    }
    else if (tagList.length <= 0) {
        window.alert('Please select atleast one tag!');
    }
    else {
        var formData = new FormData();
        formData.append('image', imgFile);
        formData.append('tag', tagList);
        formData.append('notes', pNote);
        /*let formData = {
         img:imgFile,
         tag:tagList,
         notes:pNote
        }*/
        fetch('/uploadpost', {
            method: 'POST',
            body: formData
        }).then(function (res) { return res.json(); }).then(function (data) {
            if (data) {
                window.alert("Uploaded!");
                window.location.href = "/";
            }
        });
    }
}
function InputTag(_a) {
    var tags = _a.tags, func = _a.func;
    var listTag = tags_json_1.default.map(function (t) {
        var tag = t.tag;
        return (react_1.default.createElement("label", { key: tag, className: t.class + " tag-select" },
            tag,
            react_1.default.createElement("input", { key: tag, type: "checkbox", name: tag, value: tag, onChange: function (e) {
                    if (e.target.checked)
                        func(__spreadArray(__spreadArray([], tags, true), [e.target.value], false));
                    else
                        func(tags.filter(function (t) { return t !== e.target.value; }));
                } })));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, listTag));
}
