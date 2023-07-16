let todoInp = document.getElementById('todoInp');
let todoInpPrio = document.getElementById('todoInpPrio');
let btn = document.getElementsByClassName('btn')[0];
let todoBody = document.getElementsByClassName('todos')[0];
btn.addEventListener('click', () => {
    let dt = new Date();
    let formdata = {
        'task': todoInp.value,
        'prio': parseInt(todoInpPrio.value),
        'time': dt.toLocaleString()
    }
    todoInp.value = "";
    todoInpPrio.value = "";
    jsondata = JSON.stringify(formdata);
    fetch('php/addTodo.php', {
        method: 'POST',
        body: jsondata,
        headers: {
            'Content-type': 'application/json'
        }
    }).then(() => {
        loadTable("Priority");
    })
})
function updateTable(file){
    fetch(`./php/${file}.php`).then((res) => res.json()).then(async (data) => {
        todoBody.innerHTML = "";
        for (let i in data) {
            todoBody.innerHTML += `<div class="card my-2">
                <div class="card-body" style="display: flex; align-items: center; box-shadow: 2px 3px 11.5px -3px black;
                border-radius: 5px;">
                    <div style="flex: 0 0 6%;"><input type="checkbox" name="" class= "checkb"></div>
                    <div style="flex: 0 0 80%;">
                        <h5 class="card-title">${data[i].task}</h5>
                        <p class="card-text">Time: ${data[i].time}.
                        </p>
                    </div>
                    <div class="buttons" style="flex: 0 0 10%;"><button class="btn btn-danger">Delete</button></div>
                </div>
            </div>`
        }
        await Array.from(document.getElementsByClassName('checkb')).forEach(element => {
            element.addEventListener('change', () => {
                element.parentElement.nextElementSibling.classList.toggle('checked');
            })
        });
        await Array.from(document.getElementsByClassName("btn-danger")).forEach(e => {
            e.addEventListener('click', (elem) => {
                val = elem.target.parentElement.previousElementSibling.children[0].innerText;
                jsondata = JSON.stringify({'task' : val});
                fetch('php/removeTodo.php', {
                    method: 'POST',
                    body: jsondata,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then(() => {
                    loadTable("Priority");
                })
            })
        })
    })
}
document.getElementById('filter').addEventListener('change', () => {
    loadTable(document.getElementById('filter').value);
})
function loadTable(op) {
    if (op == 'Priority') {
        updateTable('showTablePrio');
    }
    else {
        updateTable('showTableAsc');
    }
}
let search = document.getElementById('search')
search.addEventListener('keyup',()=>{
    todoBody.innerHTML = "";
    fetch("./php/showTableAsc.php").then((res) => res.json()).then(async (data)=>{
        for(let i in data){
            if(data[i].task.match(search.value)!=null || search.value==""){
                todoBody.innerHTML += `<div class="card my-2">
                    <div class="card-body" style="display: flex; align-items: center; box-shadow: 2px 3px 11.5px -3px black;
                    border-radius: 5px;">
                        <div style="flex: 0 0 6%;"><input type="checkbox" name="" class= "checkb"></div>
                        <div style="flex: 0 0 80%;">
                            <h5 class="card-title">${data[i].task}</h5>
                            <p class="card-text">${data[i].time}
                            </p>
                        </div>
                        <div class="buttons" style="flex: 0 0 10%;"><button class="btn btn-danger">Delete</button></div>
                    </div>
                </div>`;
            }
        }
        await Array.from(document.getElementsByClassName('checkb')).forEach(element => {
            element.addEventListener('change', () => {
                element.parentElement.nextElementSibling.classList.toggle('checked');
            })
        });
        await Array.from(document.getElementsByClassName("btn-danger")).forEach(e => {
            e.addEventListener('click', (elem) => {
                val = elem.target.parentElement.previousElementSibling.children[0].innerText;
                jsondata = JSON.stringify({'task' : val});
                fetch('php/removeTodo.php', {
                    method: 'POST',
                    body: jsondata,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then(() => {
                    loadTable("Priority");
                })
            })
        })
    })
})
search.addEventListener('click',()=>{
    updateTable('showTablePrio');
})
loadTable('Priority');