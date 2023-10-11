"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
require("./App.css");
var data_json_1 = __importDefault(require("./data/data.json"));
var Homepage_1 = __importDefault(require("./pages/Homepage"));
var PostView_1 = __importDefault(require("./pages/PostView"));
var Upload_1 = __importDefault(require("./pages/Upload"));
function Post(props) {
    return (react_1.default.createElement("div", { className: 'img-instance', key: props.postID, onClick: function () { return OpenPost(props); } },
        react_1.default.createElement("img", { src: props.url, alt: props.alt })));
}
function OpenPost(props) {
    return (react_1.default.createElement("div", { className: 'post-view' },
        react_1.default.createElement("div", { className: 'dim-back' },
            react_1.default.createElement("div", { className: 'post-box' },
                react_1.default.createElement("div", { className: "post-back-btn" }, "\u2190 Back"),
                react_1.default.createElement("div", { className: 'img-view' },
                    react_1.default.createElement("img", { src: "https://i.ytimg.com/vi/tzzgVtEAoqw/maxresdefault.jpg", alt: "" })),
                react_1.default.createElement("div", { className: 'desc-view' },
                    react_1.default.createElement("div", { className: 'post-date' }, "Last edited - 6:11PM 9/10/2023"),
                    react_1.default.createElement("div", { className: 'post-tags' },
                        react_1.default.createElement("div", null, "Diary"),
                        react_1.default.createElement("div", null, "Journal"),
                        react_1.default.createElement("div", null, "Fun")),
                    react_1.default.createElement("div", { className: 'post-desc' }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut hendrerit felis. Cras eleifend consequat nunc nec placerat. Maecenas lobortis mauris sit amet est aliquet porta. Nulla eros risus, dictum sed nibh in, viverra vehicula nisl. Proin finibus metus sit amet nisl dapibus malesuada. Nulla facilisi. Suspendisse sed nisl et leo molestie posuere eu sit amet erat."),
                    react_1.default.createElement("div", { className: 'post-edit-btn' }, "Edit"))))));
}
function ShowMain() {
    return (react_1.default.createElement("div", { className: "grid-center" },
        react_1.default.createElement("div", { className: "grid-container" }, data_json_1.default.map(function (data) { return react_1.default.createElement(Post, { postID: data.id, url: data.image.url, alt: data.image.alt }); }))));
}
function App() {
    //const [backendData, setBackendData] : any[] = useState([{}]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'main-container' },
            react_1.default.createElement("h1", null, "PersonaGram"),
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(Homepage_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/post/:id', element: react_1.default.createElement(PostView_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/upload', element: react_1.default.createElement(Upload_1.default, null) })))));
}
exports.default = App;
