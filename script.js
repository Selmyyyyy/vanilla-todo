function displayTodos(todos){
    const todosContainer = document.getElementById('todos-container');
    todosContainer.innerHTML = '';

    for(const todo of todos){ 
    const card = document.createElement('div');
    card.classList.add('todo-card');

     const colorDot = document.createElement('div');
    colorDot.classList.add('colored-dot');
    colorDot.style.backgroundColor = todo.color;
    card.appendChild(colorDot);

    const titleSpan = document.createElement('span');
    titleSpan.appendChild(document.createTextNode(todo.title));
    card.appendChild(titleSpan);
    
    titleSpan.style.textDecoration = "line-through";
    if (todo.done) {
        titleSpan.style.textDecoration = "line-through";
    } else {
        titleSpan.style.textDecoration = "none";
    }

      const countdownSpan = document.createElement('div');
        countdownSpan.classList.add('countdown');
        card.appendChild(countdownSpan);

        function updateCountdown() {
            if (!todo.endDate) {
                countdownSpan.textContent = '';
                return;
            }
            const now = new Date();
            const end = new Date(todo.endDate);
            const diff = end - now;

            if (diff <= 0) {
                countdownSpan.textContent = "Scaduto!";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            countdownSpan.textContent = `${days} giorni, ${hours}h ${minutes}m ${seconds}s`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);


   

    todosContainer.appendChild(card);

    const detailBtn = document.createElement('button');
    detailBtn.appendChild(document.createTextNode("⤍"));
    detailBtn.classList.add('detail-btn');
    detailBtn.addEventListener('click', () => {
        window.location.assign("detail.html?todoId=" + todo.id);
    });


    card.appendChild(detailBtn);

    todosContainer.appendChild(card);


}
}


let todos = []

getAllTodos().then(results => {
    todos = results;
    displayTodos(todos)
})


function orderByTitle() {
    todos.sort((t1, t2) => t1.title.localeCompare(t2.title));
    displayTodos(todos);
}

function compareDates(t1, t2) {
    const date1 = t1.creationDate;
    const date2 = t2.creationDate;
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);
    const time1 = dateObj1.getTime();
    const time2 = dateObj2.getTime();
    return time2 - time1; 
}

function orderByCreationDate(){
    todos.sort(compareDates);
    displayTodos(todos);
}