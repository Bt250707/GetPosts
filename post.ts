window.onload = () => createHome();

let postId:number = 1;

interface Post {
    usedId: number;
    id: number;
    title: string;
    body: string;
}

interface MetaData {
    post: Post;
    isDeleted: boolean;
    isLiked: boolean;
}

const myPosts: MetaData[] = [];
const deletedPosts: MetaData[] = [];

function addPost(post: Post):void {
    const postElement = document.createElement('div') as HTMLDivElement;
    const postTitle = document.createElement('h3') as HTMLHeadingElement;
    const postBody = document.createElement('p') as HTMLParagraphElement;
    const postContainer = document.getElementsByClassName('post-area')[0] as HTMLDivElement;

    postElement.id = `${post.id}`;
    console.log(`Adding post with id: ${postElement.id}`);
    myPosts.push({post: post, isDeleted: false, isLiked: false});

    postElement.classList.add('post');
    postTitle.innerText = post.title;
    postBody.innerText = post.body;

    postElement.appendChild(postTitle);
    postElement.appendChild(postBody);

    const remove = document.createElement('span') as HTMLSpanElement;
    remove.innerText = 'Remove';
    remove.classList.add('remove-button');
    remove.style.cursor = 'pointer';

    remove.addEventListener('click', () => {
        console.log(`Removing post with id: ${postElement.id}`);
        console.log(myPosts)
        myPosts[parseInt(postElement.id) - 1].isDeleted = true;
        deletedPosts.push({post: post, isDeleted: true, isLiked: false});
        postContainer.removeChild(postElement);
        savePosts();
    });

    postElement.appendChild(remove);
    savePosts();
    postContainer.appendChild(postElement);
}

function createHome() {
    const dashboard = document.getElementsByClassName('dashboard')[0] as HTMLDivElement;
    dashboard.innerHTML = '';

    const sec = document.createElement('section') as HTMLDivElement;
    sec.classList.add('viewport');

    const text1 = document.createElement('h2') as HTMLHeadingElement;
    text1.innerText = 'Get new post on click of a button!!!';

    const button = document.createElement('button') as HTMLButtonElement;
    button.id = 'get-post';
    button.innerText = 'Get Post';
    button.addEventListener('click', async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post:Post = await response.json();
        addPost(post);

        postId++;
    });

    const text2 = document.createElement('h2') as HTMLHeadingElement;
    text2.innerText = 'Post-Area';

    const postContainer = document.createElement('div') as HTMLDivElement;
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
    const postContainer = document.getElementsByClassName('post-area')[0] as HTMLDivElement;

    postContainer.innerHTML = '';
    const postsList = localStorage.getItem('myPosts');
    if (postsList) {
        const post: MetaData[] = JSON.parse(postsList);
        post.filter((post) => post.isDeleted === false).forEach(postData => {
            addPost(postData.post);
        });
    }
}