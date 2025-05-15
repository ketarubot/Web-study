const addButton = document.getElementById('addm');

const changecolorButton = document.getElementById('change');
changecolorButton.addEventListener('click', () => {
    console.log(Math.random());
});

let songcount = 8;

let saveLikes = Array(8).fill(false);

// Create warning message container
const warningDiv = document.createElement('div');
warningDiv.style.color = 'red';
warningDiv.style.fontSize = '14px';
warningDiv.style.marginTop = '5px';
warningDiv.style.display = 'none';
document.body.appendChild(warningDiv);

const deleteButton = document.createElement('button');
deleteButton.textContent = 'x';
deleteButton.className = 'delete';
deleteButton.addEventListener('click', () => {
    deleteButton.parentElement.remove();
});

function new_likeButton(likeid) {
    const likeButton = document.createElement('button');
    likeButton.className = 'likeB';
    likeButton.textContent = '☆';
    likeButton.addEventListener('click', () => {
        saveLikes[likeid] = !saveLikes[likeid];
        likeButton.textContent = saveLikes[likeid] ? '⭐️' : '☆';
        const favoriteArea = document.getElementById('fav');
        const likeBpa = likeButton.parentElement;
        if (saveLikes[likeid]) {
            likeBpa.parentElement.insertBefore(likeBpa, favoriteArea);
        }
        else {
            if (saveLikes.at(likeid+1) !== undefined) {
                const li = document.getElementById(`song${likeid+1}`);
                likeBpa.parentElement.insertBefore(likeBpa, li);
            }
            else {
                likeBpa.parentElement.appendChild(likeBpa);
            }
        }
    });
    return likeButton;
}

let likeButtons = Array.from({length:8}, (_, i) => new_likeButton(i));

function attachHoverEvents(item, likeButton, likeid) {
    item.addEventListener('mouseenter', () => {
        item.prepend(likeButton);
        item.appendChild(deleteButton);
    });
    item.addEventListener('mouseleave', () => {
        deleteButton.remove();
        if (!saveLikes[likeid]) {
            likeButton.remove();
        }
    });
}

function createSongItem(title, artist, id) {
    const li = document.createElement('li');
    li.className = 'songlist';
    li.id = `song${id}`;
    
    const a = document.createElement('a');
    a.href = `https://music.youtube.com/search?q=${title.replace(' ', '_')}`;
    a.target = '_blank';
    
    const span = document.createElement('span');
    span.className = 'title';
    span.textContent = title;
    
    a.appendChild(span);
    a.innerHTML += ` - ${artist}`;
    li.appendChild(a);

    const likeBtn = new_likeButton(id);
    likeButtons.push(likeBtn);
    saveLikes.push(false);
    
    attachHoverEvents(li, likeBtn, id);

    return li;
}

const songlistitems = document.getElementsByClassName('songlist');
for (const item of songlistitems) {
    const likeid = Number(item.id.slice(4));
    const itemlike = likeButtons[likeid];
    attachHoverEvents(item, itemlike, likeid);
}

addButton.addEventListener('click', () => { // Create input element
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '제목 - 가수'; // Replace button with input
    input.style = 'width: 150px; min-width: 150px; font-size: 16px;';

    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'pre';
    span.style.fontSize = '16px';
    document.body.appendChild(span);

    input.addEventListener('input', () => {
        span.textContent = input.value || input.placeholder;
        input.style.width = `${span.offsetWidth + 20}px`;
    });
    addButton.replaceWith(input);
    input.focus(); // On Enter key, add song
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const inputText = input.value.trim();
            const parts = inputText.split(' - ');
            if (parts.length === 2 && parts[0] && parts[1]) {
                const songTitle = parts[0].trim();
                const artist = parts[1].trim(); // Create new
                const count = songcount++;
                const li = createSongItem(songTitle, artist, count);
                
                document.querySelector('ul.playlist').appendChild(li);
                // Replace input back with button
                warningDiv.style.display = 'none';
                input.replaceWith(addButton);
                input.value = '';
            } else {
            warningDiv.id = 'warn';
            warningDiv.textContent = '형식이 맞지 않습니다. "노래제목 - 가수" 형식으로 입력해주세요.';
            warningDiv.style.display = 'block';
            }
        }
    });

    input.addEventListener('blur', () => {
        warningDiv.style.display = 'none';
        input.replaceWith(addButton);
        });
});