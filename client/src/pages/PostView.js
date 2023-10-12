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
var postTags = [
    { tag: 'Diary', class: 't-diary' },
    { tag: 'Journal', class: 't-journal' },
    { tag: 'Fun', class: 't-fun' },
];
function ShowPost(_a) {
    var id = _a.id, img = _a.img, note = _a.note, datemodified = _a.datemodified, taglist = _a.taglist;
    var initNote = note;
    var initTag = taglist;
    var _b = (0, react_2.useState)(initNote), sPostNote = _b[0], setPostNote = _b[1];
    var _c = (0, react_2.useState)(initNote), tempNote = _c[0], setTempNote = _c[1];
    var _d = (0, react_2.useState)(initTag), tempTag = _d[0], setTempTag = _d[1];
    var _e = (0, react_2.useState)(initTag), sPostTag = _e[0], setPostTag = _e[1];
    var _f = (0, react_2.useState)(0), isEdit = _f[0], setIsEdit = _f[1];
    var _g = (0, react_2.useState)(datemodified), date = _g[0], setDate = _g[1];
    return (react_1.default.createElement("div", { className: 'post-view' },
        react_1.default.createElement("div", { className: 'post-container' },
            react_1.default.createElement("div", { className: 'post-box' },
                react_1.default.createElement(react_router_dom_1.Link, { to: '/' },
                    react_1.default.createElement("div", { className: "post-back-btn" }, "\u2190 Back")),
                react_1.default.createElement("div", { className: 'img-view' },
                    react_1.default.createElement("img", { src: img.url, alt: img.alt })),
                react_1.default.createElement("div", { className: 'desc-view ' + (isEdit ? 'pv' : '') },
                    react_1.default.createElement("div", { className: 'post-date' },
                        "Last edited - ",
                        getDate(date)),
                    react_1.default.createElement("div", { className: 'post-tags' }, sPostTag.map(function (t) { return (react_1.default.createElement(Tag, { tag: t })); })),
                    react_1.default.createElement("div", { className: 'post-desc' }, sPostNote),
                    react_1.default.createElement("button", { className: 'post-edit-btn', onClick: function () { return setIsEdit(1); } }, "Edit")),
                react_1.default.createElement("div", { className: 'desc-edit ' + (isEdit ? '' : 'pv') },
                    react_1.default.createElement("div", { className: 'tags-select' },
                        react_1.default.createElement(TagSelector, { tags: tempTag, func: setTempTag })),
                    react_1.default.createElement("textarea", { className: 'post-desc', value: tempNote, onChange: function (t) { return setTempNote(t.target.value); } }),
                    react_1.default.createElement("div", { className: 'edit-confirm' },
                        react_1.default.createElement("button", { className: 'save-edit', onClick: function () {
                                setDate(Date.now());
                                savePost(id, tempNote, tempTag);
                                setPostNote(tempNote);
                                setPostTag(tempTag);
                                setIsEdit(0);
                            } }, "Save"),
                        react_1.default.createElement("button", { className: 'cancel-edit', onClick: function () {
                                var confirmation = window.confirm("Discard changes?");
                                if (confirmation) {
                                    setTempNote(sPostNote);
                                    setTempTag(sPostTag);
                                    setIsEdit(0);
                                }
                            } }, "Cancel"))),
                react_1.default.createElement("button", { className: 'post-delete-btn', onClick: function () { return deletePost(id); } }, "Delete")))));
}
function savePost(id, note, tags) {
    var body = { id: id, note: note, tags: tags };
    fetch('/update', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}
function deletePost(id) {
    var confirmation = window.confirm("Are you sure you want to delete this post?");
    if (confirmation) {
        //delete
        fetch('/deletepost', {
            method: 'POST',
            body: JSON.stringify({ "id": id }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(function (res) { return res.json(); }).then(function (data) {
            window.alert(data);
            window.location.href = "/";
        });
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
        return (react_1.default.createElement("label", { key: t.tag, className: t.class + " .tag-select" },
            t.tag,
            react_1.default.createElement("input", { key: t.tag, type: 'checkbox', id: t.tag, name: t.tag, value: t.tag, onChange: function (e) { return handleCheckbox(e, props.tags, props.func); }, checked: props.tags.includes(t.tag) ? true : false })));
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
    var _a = (0, react_2.useState)(initPost), sp = _a[0], setSelectedPost = _a[1];
    var id = (0, react_router_dom_2.useParams)().id;
    (0, react_2.useEffect)(function () {
        fetch('/post/' + id).then(function (res) { return res.json(); }).then(function (data) {
            setSelectedPost(data);
        });
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null, (sp.id === -1) ?
        (react_1.default.createElement("p", null, "Loading..."))
        :
            (react_1.default.createElement(ShowPost, { id: sp.id, img: sp.image, datemodified: sp.datemodified, note: sp.note, taglist: sp.tag }))));
}
exports.default = PostView;
