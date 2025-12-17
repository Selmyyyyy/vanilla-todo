function displayTodo(todo) {
    const titleHeader = document.getElementById('todo-title');
    titleHeader.innerHTML = todo.title;

    const descriptionSpan = document.getElementById('todo-description');
    descriptionSpan.innerHTML = todo.description;

    const creationDateSpan = document.getElementById('todo-creation-date');
    creationDateSpan.innerHTML = formaDate(todo.creationDate);

    const endDateSpan = document.getElementById('todo-end-date');
    endDateSpan.innerHTML = formaDate(todo.endDate);

    const colorDiv = document.getElementById('todo-color');
    colorDiv.style.backgroundColor = todo.color;

    const doneSpan = document.getElementById('todo-done');
    if (todo.done) {
        doneSpan.innerHTML = 'completato';
        return true;
        
    } else {
        doneSpan.innerHTML = 'da completare';
        return false;
    }


    



}

function formaDate(dateISO){
    const date = new Date(dateISO);

    // const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    // return formattedDate;
    const options =
    {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return date.toLocaleDateString('it-IT', options);
}

const searchParams = new URLSearchParams(window.location.search);

const id = searchParams.get('todoId');

getTodo(id).then(result => displayTodo(result));