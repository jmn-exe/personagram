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
    var _c = (0, react_2.useState)(initTag), sPostTag = _c[0], setPostTag = _c[1];
    var _d = (0, react_2.useState)(0), isEdit = _d[0], setIsEdit = _d[1];
    console.log("tag:");
    console.log(sPostTag);
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
                        getDate(datemodified)),
                    react_1.default.createElement("div", { className: 'post-tags' }, sPostTag.map(function (t) { return (react_1.default.createElement(Tag, { tag: t })); })),
                    react_1.default.createElement("div", { className: 'post-desc' }, sPostNote),
                    react_1.default.createElement("button", { className: 'post-edit-btn', onClick: function () { return setIsEdit(1); } }, "Edit")),
                react_1.default.createElement("div", { className: 'desc-edit ' + (isEdit ? '' : 'pv') },
                    react_1.default.createElement("div", { className: 'tags-select' },
                        react_1.default.createElement(TagSelector, { tags: sPostTag, func: setPostTag })),
                    react_1.default.createElement("textarea", { className: 'post-desc', value: sPostNote, onChange: function (t) { return setPostNote(t.target.value); } }),
                    react_1.default.createElement("div", { className: 'edit-confirm' },
                        react_1.default.createElement("button", { className: 'save-edit', onClick: function () {
                                savePost(id, sPostNote, sPostTag);
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
function savePost(id, note, tags) {
    /*
    let postIndex = postData.findIndex(p => p.id === id)
    postData[postIndex].note = note;
    postData[postIndex].tag = tags;
    postData[postIndex].datemodified = JSON.stringify(Date.now());*/
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
    console.log(props.tags);
    console.log(props.tags.includes('Diary'));
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
    console.log(sp);
    return (react_1.default.createElement(react_1.default.Fragment, null, (sp.id === -1) ?
        (react_1.default.createElement("p", null, "Loading..."))
        :
            (react_1.default.createElement(ShowPost, { id: sp.id, img: sp.image, datemodified: sp.datemodified, note: sp.note, taglist: sp.tag }))));
}
exports.default = PostView;
