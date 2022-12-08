const allList = document.querySelector('.allList')
const completedList = document.querySelector('.completedList')
const input = document.querySelector('.mainInput')
const addButton = document.querySelector('.button-add')
const storedValues = localStorage.getItem('textinput')
const allTexts = []

window.addEventListener('DOMContentLoaded', () => {
  if (storedValues) {
    for (let i = 0; i < JSON.parse(storedValues).length; i++) {
      allTexts.push(JSON.parse(storedValues)[i])
    }
  }
  if (allTexts) {
    for (let i = 0; i < allTexts.length; i++) {
      let text = allTexts[i].text
      allTexts[i].done ? createDoneList(text, i) : createElement(text, i)
    }
  }
})

function createElement(iv) {
  const li = document.createElement('li')
  const h2 = document.createElement('h2')
  h2.textContent = iv

  li.appendChild(h2)
  li.appendChild(
    createButton("<i class='fa-solid fa-trash-can'></i>", false, iv)
  )
  li.appendChild(createButton("<i class='fa-solid fa-check'></i>", true, iv))
  allList.appendChild(li)
}

addButton.addEventListener('click', () => {
  if (input.value) {
    createElement(input.value, allTexts.length)
    allTexts.push({ text: input.value, done: false })
    saveToLocalStorage(allTexts)
    input.value = ''
  }
})

function createButton(icon, isGreen, input) {
  const iconButton = document.createElement('button')
  const completeIcon = document.createElement('i')
  iconButton.classList.add(isGreen ? 'greenBtn' : 'redBtn')
  isGreen
    ? iconButton.addEventListener('click', (e) => {
        for (let i = 0; i < allTexts.length; i++) {
          if (
            e.target.parentElement.querySelector('h2').textContent ==
            allTexts[i].text
          ) {
            allTexts[i].done = true
            saveToLocalStorage(allTexts)
            break
          }
        }
        e.target.parentElement.remove()
        createDoneList(input)
      })
    : iconButton.addEventListener('click', (e) => {
        for (let i = 0; i < allTexts.length; i++) {
          if (
            e.target.parentElement.querySelector('h2').textContent ==
            allTexts[i].text
          ) {
            allTexts.splice(i, 1)
            saveToLocalStorage(allTexts)
            break
          }
        }
        e.target.parentElement.remove()
      })
  completeIcon.innerHTML = icon
  iconButton.appendChild(completeIcon)

  return iconButton
}

function createDoneList(input) {
  const li = document.createElement('li')
  li.classList.add('done')
  const h2 = document.createElement('h2')
  h2.textContent = input
  li.appendChild(h2)
  li.appendChild(
    createButton("<i class='fa-solid fa-trash-can'></i>", false, input)
  )

  completedList.appendChild(li)
}

const saveToLocalStorage = (allTexts) => {
  localStorage.setItem('textinput', JSON.stringify(allTexts))
}
