function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text) {
        const list = document.getElementById('todoList');
        const li = document.createElement('li');
        li.textContent = text;
        li.onclick = function() {
            this.parentNode.removeChild(this);
        };
        list.appendChild(li);
        input.value = '';
    }
}
