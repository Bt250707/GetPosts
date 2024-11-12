var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
window.onload = function () { return createHome(); };
var postId = 1;
var myPosts = [];
var deletedPosts = [];
function addPost(post) {
    var postElement = document.createElement('div');
    var postTitle = document.createElement('h3');
    var postBody = document.createElement('p');
    var postContainer = document.getElementsByClassName('post-area')[0];
    postElement.id = "".concat(post.id);
    console.log("Adding post with id: ".concat(postElement.id));
    myPosts.push({ post: post, isDeleted: false, isLiked: false });
    postElement.classList.add('post');
    postTitle.innerText = post.title;
    postBody.innerText = post.body;
    postElement.appendChild(postTitle);
    postElement.appendChild(postBody);
    var remove = document.createElement('span');
    remove.innerText = 'Remove';
    remove.classList.add('remove-button');
    remove.style.cursor = 'pointer';
    remove.addEventListener('click', function () {
        console.log("Removing post with id: ".concat(postElement.id));
        console.log(myPosts);
        myPosts[parseInt(postElement.id) - 1].isDeleted = true;
        deletedPosts.push({ post: post, isDeleted: true, isLiked: false });
        postContainer.removeChild(postElement);
        savePosts();
    });
    postElement.appendChild(remove);
    savePosts();
    postContainer.appendChild(postElement);
}
function createHome() {
    var _this = this;
    var dashboard = document.getElementsByClassName('dashboard')[0];
    dashboard.innerHTML = '';
    var sec = document.createElement('section');
    sec.classList.add('viewport');
    var text1 = document.createElement('h2');
    text1.innerText = 'Get new post on click of a button!!!';
    var button = document.createElement('button');
    button.id = 'get-post';
    button.innerText = 'Get Post';
    button.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/posts/".concat(postId))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    post = _a.sent();
                    addPost(post);
                    postId++;
                    return [2 /*return*/];
            }
        });
    }); });
    var text2 = document.createElement('h2');
    text2.innerText = 'Post-Area';
    var postContainer = document.createElement('div');
    postContainer.classList.add('post-area');
    sec.appendChild(text1);
    sec.appendChild(button);
    dashboard.appendChild(sec);
    dashboard.appendChild(text2);
    dashboard.appendChild(postContainer);
    loadPosts();
}
function savePosts() {
    console.log('Saving posts');
    localStorage.setItem('myPosts', JSON.stringify(Array.from(myPosts)));
    localStorage.setItem('deletedPosts', JSON.stringify(Array.from(deletedPosts)));
}
function loadPosts() {
    var postContainer = document.getElementsByClassName('post-area')[0];
    postContainer.innerHTML = '';
    var postsList = localStorage.getItem('myPosts');
    if (postsList) {
        var post = JSON.parse(postsList);
        post.filter(function (post) { return post.isDeleted === false; }).forEach(function (postData) {
            addPost(postData.post);
        });
    }
}
