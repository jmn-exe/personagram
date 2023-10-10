"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_router_dom_2 = require("react-router-dom");
require("../App.css");
var data_json_1 = __importDefault(require("../data/data.json"));
var postTags = [
    { tag: 'Diary', class: 't-diary' },
    { tag: 'Journal', class: 't-journal' },
    { tag: 'Fun', class: 't-fun' },
];
//console.log(JSON.stringify(postData));
//let {id} = useParams();
//console.log(id);
//console.log(typeof(id));
function ShowPost(props) {
    var post = data_json_1.default.find(function (p) { return p.id === props.id; });
    if (post != null) {
        return (react_1.default.createElement("div", { className: 'post-view' },
            react_1.default.createElement("div", { className: 'post-container' },
                react_1.default.createElement("div", { className: 'post-box' },
                    react_1.default.createElement(react_router_dom_1.Link, { to: '/' },
                        react_1.default.createElement("div", { className: "post-back-btn" }, "\u2190 Back")),
                    react_1.default.createElement("div", { className: 'img-view' },
                        react_1.default.createElement("img", { src: post.image.url, alt: post.image.alt })),
                    react_1.default.createElement("div", { className: 'desc-view pv' },
                        react_1.default.createElement("div", { className: 'post-date' },
                            "Last edited - ",
                            getDate(post.datemodified)),
                        react_1.default.createElement("div", { className: 'post-tags' }, post.tag.map(function (t) { return (react_1.default.createElement(Tag, { tag: t })); })),
                        react_1.default.createElement("div", { className: 'post-desc' }, post.note),
                        react_1.default.createElement("div", { className: 'post-edit-btn' }, "Edit")),
                    react_1.default.createElement("div", { className: 'desc-edit' },
                        react_1.default.createElement("div", { className: 'tags-select' },
                            react_1.default.createElement(TagSelector, { tags: post.tag })),
                        react_1.default.createElement("div", { className: 'post-desc' }, post.note),
                        react_1.default.createElement("div", { className: 'post-edit-btn' }, "Edit"))))));
    }
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
        return (react_1.default.createElement("label", { className: t.class + " .tag-select" },
            t.tag,
            react_1.default.createElement("input", { type: 'checkbox', id: t.tag, name: t.tag, value: t.tag, defaultChecked: props.tags.includes(t.tag) ? true : false })));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, tagList));
}
function PostView() {
    var id = (0, react_router_dom_2.useParams)().id;
    return (react_1.default.createElement(ShowPost, { id: parseInt(id) }));
}
exports.default = PostView;
