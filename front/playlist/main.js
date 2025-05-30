const addButton = document.getElementById('addm');

const changecolorButton = document.getElementById('change');
changecolorButton.addEventListener('click', () => {
    console.log(Math.random());
});

let songcount = 1;

const adremoveButton = document.getElementById('ad_remove');
adremoveButton.addEventListener('click', () => {
    adremoveButton.parentElement.remove();
})

const ad = document.getElementById('ad');
ad.addEventListener('click', () => {
    location.assign('../../../../myWeb/10/10-1.html');
});

let saveLikes = Array(1).fill(false);

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

let likeButtons = [new_likeButton(0)];

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
    li.id = `song${id}`;
    
    const a = document.createElement('a');
    a.href = `https://youtube.com/search?q=${artist} ${title}`;
    a.target = '_blank';
    
    const span = document.createElement('span');
    span.className = 'title';
    span.textContent = title;
    
    const albumCover = document.createElement('img');
    fetch(`https://itunes.apple.com/search?term=${artist.replaceAll(' ', '+')}+${title.replaceAll(' ', '+')}&media=music`)
    .then(res => res.json())
    .then(data => {
        if (data.results && data.results.length > 0) {
            const imageUrl = data.results[0].artworkUrl100;
            console.log(imageUrl);

            albumCover.src = imageUrl.replace('100x100', '20x20'); // 더 큰 이미지도 가능
            albumCover.alt = `${title} 앨범 커버`;
            albumCover.style.width = '20px'; // 필요 시 크기 설정
            albumCover.style.height = '20px';
            li.prepend(albumCover);
        } else {
            console.warn('앨범 커버를 찾을 수 없습니다.');
        }
    })
    .catch(err => {
        console.error('iTunes API 오류:', err);
    });

    a.appendChild(span);
    a.innerHTML += ` - ${artist}`;
    li.appendChild(a);

    const likeBtn = new_likeButton(id);
    likeButtons.push(likeBtn);
    saveLikes.push(false);
    
    attachHoverEvents(li, likeBtn, id);

    return li;
}

const song0 = document.getElementById('song0')
attachHoverEvents(song0, new_likeButton(0), 0);

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