const form = document.getElementsByClassName('item-form').item(0)
const checklist = document.getElementsByClassName('checklist').item(0)
const clearAll = document.getElementsByClassName('clear-all').item(0)
const clearDone =  document.getElementsByClassName('clear-done').item(0)
const input = document.getElementsByClassName('item-input').item(0)
const taskTitle = document.getElementsByClassName('title').item(0)
const titleForm = document.getElementsByClassName('title-form').item(0)
const titleInput = document.getElementsByClassName('title-input').item(0)

// task getter
const getTasks = () => {
	const items = localStorage.getItem('tasks')
	return items ? JSON.parse(items) : []
}

// global task
let userTasks = getTasks()

// title getter
const getTitle = () => {
	const items = localStorage.getItem('title')
	return items ? JSON.parse(items) : []
}

//global title
let userTitle = getTitle()

// task setter
const setTasksToStorage = () => {
	localStorage.setItem('tasks', JSON.stringify(userTasks));
}

// title setter
const setTitleToStorage = () => {
	localStorage.setItem('title', JSON.stringify(userTitle));
}

// titleAdder
const createTitle = (id, value) => {
	taskTitle.appendChild(document.createTextNode(value));
	taskTitle.id = id;
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
	checkbox.className = "task"
	label.appendChild(document.createTextNode(value+';'));
	container.appendChild(checkbox);
	container.appendChild(label)
	checklist.appendChild(container)
	checkbox.addEventListener('change', setChecked)
}

// title renderer

const renderTitle = title => {
	title.forEach(({id, value}) => createTitle(id, value))
}

// task renderer

const renderTasks = tasks => {
	tasks.forEach(({ id, value, isChecked }) => createCheckbox(id, value, isChecked))
}

// title appender
const appendTitle = title => {
	const titleId = Math.random().toString(36).substr(2, 5)
	createTitle(titleId, title)
	const titleItem = {
		value: title,
		id: titleId
	}
	userTitle.push(titleItem)
	setTitleToStorage();
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
renderTitle(userTitle)

// submit
form.addEventListener('submit', function (e) {
	e.preventDefault()
	appendTask(input.value)
	input.value = ''
})

// submitTitle
titleForm.addEventListener('submit', function (e){
	e.preventDefault()
	userTitle = []
	taskTitle.innerHTML = ''
	appendTitle(titleInput.value)
	titleInput.value = ''
})

clearAll.addEventListener('click', ()=> {
	localStorage.clear()
	userTitle = []
	userTasks = []
	checklist.innerHTML = ''
	taskTitle.innerHTML = ''
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