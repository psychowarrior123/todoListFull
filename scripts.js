const form = document.getElementsByClassName('item-form').item(0)
const checklist = document.getElementsByClassName('checklist').item(0)
const clearAll = document.getElementsByClassName('clear-all').item(0)
const clearDone =  document.getElementsByClassName('clear-done').item(0)
const input = document.getElementsByTagName('input').item(0)

// task getter
const getTasks = () => {
	const items = localStorage.getItem('tasks')
	return items ? JSON.parse(items) : []
}

// global task
let userTasks = getTasks()

// task setter
const setTasksToStorage = () => {
	localStorage.setItem('tasks', JSON.stringify(userTasks));
}

// checkboxAdder

const createCheckbox = (id, value, isChecked = false) => {
	const container = document.createElement('div');
	const checkbox = document.createElement('input')
	const label = document.createElement('label');
	checkbox.type = "checkbox";
	checkbox.name = 'task';
	checkbox.id = id
	if(isChecked){
		checkbox.checked = true
	}
	label.htmlFor = id;
	label.appendChild(document.createTextNode(value));
	container.appendChild(checkbox);
	container.appendChild(label)
	checklist.appendChild(container)
	checkbox.addEventListener('change', setChecked)
}

// task renderer

const renderTasks = tasks => {
	tasks.forEach(({ id, value, isChecked }) => createCheckbox(id, value, isChecked))
}

// task appender
const appendTask = task => {
	const taskId = Math.random().toString(36).substr(2, 5)
	createCheckbox(taskId, task)
	const taskItem = {
		id: taskId,
		value: task,
		isChecked: false
	}
	userTasks.push(taskItem)
	setTasksToStorage()
}

// set checkbox checked
const setChecked = e => {
	const id = e.target.id
	const isChecked = e.target.checked
	userTasks.forEach(task => {
		if(task.id === id){
			task.isChecked = isChecked
		}
	})
	setTasksToStorage()
}
// invoked functions
renderTasks(userTasks)

// submit
form.addEventListener('submit', function (e) {
	e.preventDefault()
	appendTask(input.value)
	input.value = ''
})

clearAll.addEventListener('click', ()=> {
	localStorage.clear()
	checklist.innerHTML = ''
})

clearDone.addEventListener('click', () => {
	let newTasks = []
	userTasks.forEach(task => {
		const element = document.getElementById(task.id)
		if(!task.isChecked) {
			newTasks.push(task)
			return
		}
		element.parentElement.remove()
	})
	userTasks = newTasks
	console.log(userTasks)
	setTasksToStorage()
})