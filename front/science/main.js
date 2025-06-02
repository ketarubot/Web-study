const body = document.getElementById('path');
        const td = document.getElementsByTagName('td');
        for (const item of td) {
            if (item.className === '' && item.id === '') {
                item.addEventListener('click', () => {
                    const add = document.createElement('p');
                    add.innerHTML = item.innerHTML;
                    body.appendChild(add);
                    const E = item.innerHTML.slice(5);
                    let elNum = '';
                    for (const ch of E) {
                        if (ch === '<') break;
                        elNum += ch;
                    }
                    elNum = Number(elNum);
                    console.log(elNum);
                });
            }
        }