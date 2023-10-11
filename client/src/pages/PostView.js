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
var react_router_dom_2 = require("react-router-dom");
require("../App.css");
var data_json_1 = __importDefault(require("../data/data.json"));
var postTags = [
    { tag: 'Diary', class: 't-diary' },
    { tag: 'Journal', class: 't-journal' },
    { tag: 'Fun', class: 't-fun' },
];
console.log(JSON.stringify(data_json_1.default));
//let {id} = useParams();
//console.log(id);
//console.log(typeof(id));
function ShowPost(props) {
    var post = data_json_1.default.find(function (p) { return p.id === props.id; });
    var initNote = post.note;
    var initTag = post.tag;
    var _a = (0, react_2.useState)(initNote), sPostNote = _a[0], setPostNote = _a[1];
    var _b = (0, react_2.useState)(initTag), sPostTag = _b[0], setPostTag = _b[1];
    var _c = (0, react_2.useState)(0), isEdit = _c[0], setIsEdit = _c[1];
    if (post != null) {
        return (react_1.default.createElement("div", { className: 'post-view' },
            react_1.default.createElement("div", { className: 'post-container' },
                react_1.default.createElement("div", { className: 'post-box' },
                    react_1.default.createElement(react_router_dom_1.Link, { to: '/' },
                        react_1.default.createElement("div", { className: "post-back-btn" }, "\u2190 Back")),
                    react_1.default.createElement("div", { className: 'img-view' },
                        react_1.default.createElement("img", { src: post.image.url, alt: post.image.alt })),
                    react_1.default.createElement("div", { className: 'desc-view ' + (isEdit ? 'pv' : '') },
                        react_1.default.createElement("div", { className: 'post-date' },
                            "Last edited - ",
                            getDate(post.datemodified)),
                        react_1.default.createElement("div", { className: 'post-tags' }, post.tag.map(function (t) { return (react_1.default.createElement(Tag, { tag: t })); })),
                        react_1.default.createElement("div", { className: 'post-desc' }, post.note),
                        react_1.default.createElement("button", { className: 'post-edit-btn', onClick: function () { return setIsEdit(1); } }, "Edit")),
                    react_1.default.createElement("div", { className: 'desc-edit ' + (isEdit ? '' : 'pv') },
                        react_1.default.createElement("div", { className: 'tags-select' },
                            react_1.default.createElement(TagSelector, { tags: sPostTag, func: setPostTag })),
                        react_1.default.createElement("textarea", { className: 'post-desc', value: sPostNote, onChange: function (t) { return setPostNote(t.target.value); } }),
                        react_1.default.createElement("div", { className: 'edit-confirm' },
                            react_1.default.createElement("button", { className: 'save-edit', onClick: function () {
                                    savePost(post.id, sPostNote, sPostTag);
                                    setIsEdit(0);
                                } }, "Save"),
                            react_1.default.createElement("button", { className: 'cancel-edit', onClick: function () {
                                    var confirmation = window.confirm("Discard changes?");
                                    if (confirmation) {
                                        setPostNote(initNote);
                                        setPostTag(initTag);
                                        setIsEdit(0);
                                    }
                                } }, "Cancel")))))));
    }
}
function savePost(id, note, tags) {
    var postIndex = data_json_1.default.findIndex(function (p) { return p.id === id; });
    data_json_1.default[postIndex].note = note;
    data_json_1.default[postIndex].tag = tags;
    data_json_1.default[postIndex].datemodified = JSON.stringify(Date.now());
}
function getDate(date) {
    if (typeof (date) == "string") {
        date = parseInt(date);
    }
    var d = new Date(date);
    var locale = d.toLocaleString();
    var splitDate = locale.split(", ");
    return (splitDate[1] + " " + splitDate[0]);
}
function Tag(props) {
    var postTag = postTags.find(function (pt) { return pt.tag === props.tag; });
    var tagName = postTag.tag;
    var tagClass = postTag.class;
    return (react_1.default.createElement("div", { key: tagName, className: tagClass }, tagName));
}
function TagSelector(props) {
    var tagList = postTags.map(function (t) {
        return (react_1.default.createElement("label", { key: t.tag, className: t.class + " .tag-select" },
            t.tag,
            react_1.default.createElement("input", { key: t.tag, type: 'checkbox', id: t.tag, name: t.tag, value: t.tag, onChange: function (e) { return handleCheckbox(e, props.tags, props.func); }, defaultChecked: props.tags.includes(t.tag) ? true : false })));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, tagList));
}
function handleCheckbox(e, tags, setTags) {
    if (e.target.checked) {
        setTags(__spreadArray(__spreadArray([], tags, true), [e.target.value], false));
    }
    else {
        setTags(tags.filter(function (item) { return item !== e.target.value; }));
    }
}
function PostView() {
    var id = (0, react_router_dom_2.useParams)().id;
    return (react_1.default.createElement(ShowPost, { id: parseInt(id) }));
}
exports.default = PostView;
