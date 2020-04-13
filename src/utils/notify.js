import uniqid from 'uniqid'

const notify =  (message, timeout=2000)=> {
  const id = uniqid()
  const noteContainer = document.body.querySelector("div[class=notificationContainer]")

  noteContainer.innerHTML = `
  <div class="notify" data-id="${id}">
    <div>${message}</div>
  </div>
  `
  
  const notify = document.body.querySelector(`div[data-id=${id}]`)

  setTimeout(() => {
    notify.remove()
  }, timeout);
}

export default notify