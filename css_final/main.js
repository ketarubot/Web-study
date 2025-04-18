const addButton = document.getElementById('addm');

// Create warning message container
const warningDiv = document.createElement('div');
warningDiv.style.color = 'red';
warningDiv.style.fontSize = '14px';
warningDiv.style.marginTop = '5px';
warningDiv.style.display = 'none';
document.body.appendChild(warningDiv);

addButton.addEventListener('click', () => { // Create input element
const input = document.createElement('input');
input.type = 'text';
input.placeholder = '제목 - 가수'; // Replace button with input
input.placeholder = '제목 - 가수';
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
            const songTitle = parts[0];
            const artist = parts[1]; // Create new list item
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `https://music.youtube.com/search?q=${songTitle.replace(' ', '_')}`;
            a.target = '_blank';
            const span = document.createElement('span');
            span.className = 'title';
            span.textContent = songTitle;
            
            a.appendChild(span);
            a.innerHTML += ` - ${artist}`;
            li.appendChild(a);
            
            document.querySelector('ul.playlist').appendChild(li);
            songcount++;
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

// Optional: if input loses focus, revert to button
input.addEventListener('blur', () => {
    warningDiv.style.display = 'none';
    input.replaceWith(addButton);
    });
});
