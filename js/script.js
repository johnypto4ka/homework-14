const wrapper = document.querySelector('.wrapper')
const card = document.querySelector('.card')
const info = document.querySelector('.info')

wrapper.addEventListener('click', addUserInfo)

function fetchData (url, method, callback) {
	const xhr = new XMLHttpRequest()
	xhr.open(method, url)
  
	xhr.onload = () => {
	  if (xhr.status == '200') {
		callback(xhr.response)
	  }
	}
  
	xhr.onerror = () => {
	  console.error(xhr.status + ' ' + xhr.statusText)
	}

	xhr.send()
}   

fetchData('https://jsonplaceholder.typicode.com/users', 'GET', (response) => {
	const data = JSON.parse(response)
	
	data.forEach((item) => {
		const template = templateCards(item)
		wrapper.innerHTML = wrapper.innerHTML + template
	})
})

function templateCards ({ name, email, id }) { // = item
	return `
		<div class="card"  data-role="create" data-id="${id}">
			<div class="card-body">
				<h2 class="card-name">${name}</h2>
				<div class="card-mail">e-mail: ${email}</div>
			</div>
		</div>
	`
}

function templateOneUserCard({name, email, address, phone, company, id}) {
	return `
		<div class="usercard" data-id="${id}">
			<h1>User Info</h1>
			<h2">Name: ${name}</h2>
			<div>E-mail: ${email}</div>
			<div>Address: ${address.street}</div>
			<div>Suite: ${address.suite}</div>
			<div>City: ${address.city}</div>
			<div>Phone: ${phone}</div>
			<div>Company: ${company.name}</div>
		</div>
	`
}

function addUserInfo(event) {
	const { target } = event
    const { role } = target.dataset
    if(role != 'create') return
    const { id } = target.dataset

	fetchData('https://jsonplaceholder.typicode.com/users', 'GET', function(response) {
		const data = JSON.parse(response)
		info.innerHTML = ''
			
		data.forEach(item => {
			if (id == item.id) {
				info.innerHTML += templateOneUserCard(item)
			}
		});
	})
}



  




















/* wrapper.addEventListener('click', function(event){
	const target = event.target
	
		console.log('done')
		fetchData('https://jsonplaceholder.typicode.com/users/2}', 'GET', (response) => {
		const data = JSON.parse(response)
		const id = data["id"]
		console.log(data)
		console.log(id)
	data.forEach((item) => {
		const template = templateUserCard(item)
		usercard.innerHTML = usercard.innerHTML + template
		})
  	})
}) */