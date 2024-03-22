const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNota1 = document.querySelector('#m-nota1')
const sNota2 = document.querySelector('#m-nota2')
const sMedia = document.querySelector('#m-media')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNota1.value = itens[index].nota1
    sNota2.value = itens[index].nota2
    sMedia.value = itens[index].media
    id = index
  } else {
    sNota1.value = ''
    sNota2.value = ''
    sMedia.value = ''
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nota1}</td>
    <td>${item.nota2}</td>
    <td>${item.media}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  e.preventDefault();

  const nota1 = parseFloat(sNota1.value)
  const nota2 = parseFloat(sNota2.value)
  const media = (nota1 + nota2) / 2

  if (isNaN(nota1) || isNaN(nota2)) {
    alert('Por favor, insira notas válidas.')
    return
  }

  if (id !== undefined) {
    itens[id].nota1 = nota1
    itens[id].nota2 = nota2
    itens[id].media = media.toFixed(2)
  } else {
    itens.push({'nota1': nota1, 'nota2': nota2, 'media': media.toFixed(2)})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbnotas')) ?? []
const setItensBD = () => localStorage.setItem('dbnotas', JSON.stringify(itens))

loadItens()
