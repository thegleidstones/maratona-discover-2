import Modal from './modal.js';

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

const lines = document.querySelectorAll('table tbody tr')
const deleteForm = document.querySelector('#delete-category')

console.log("Lines", lines)

for (let line of lines) {
  console.log(line)
  const lineId = line.dataset.id
  console.log(line.dataset)
  const deleteButton = line.querySelector('button.delete')
  deleteButton.onclick = () => {
    modal.open()
    deleteForm.setAttribute('action', '/category/delete/' + lineId)
  }
}