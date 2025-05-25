
  document.addEventListener('turbo:load', () => {
    const taskModal = document.getElementById('taskModal')
    const modalDayLabel = document.getElementById('modalDay')
    const tasksListDiv = document.getElementById('tasksList')
    const addTaskFormDiv = document.getElementById('addTaskForm')
    const taskItemsUl = document.getElementById('taskItems')
    const showAddFormBtn = document.getElementById('showAddFormBtn')
    const cancelAddTaskBtn = document.getElementById('cancelAddTaskBtn')
  
    taskModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget
      const day = button.getAttribute('data-day')
      const hasTasks = button.getAttribute('data-has-tasks') === 'true'
  
      modalDayLabel.textContent = new Date(day).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' })
  
      if (hasTasks) {
        tasksListDiv.style.display = 'block'
        addTaskFormDiv.style.display = 'none'
  
        taskItemsUl.innerHTML = ''
  
        const dayCard = document.querySelector(`[data-day='${day}']`)
        if (dayCard) {
          const lis = dayCard.querySelectorAll('ul.list-unstyled li')
          lis.forEach(li => {
            const title = li.dataset.title
            const desc = li.dataset.description
            const user = li.dataset.user
            const start = li.dataset.start
            const end = li.dataset.end
          
            const newLi = document.createElement('li')
            newLi.classList.add('list-group-item')
            newLi.innerHTML = `
              <strong>${title}</strong><br>
              <small>${desc}</small><br>
              <em>Użytkownik: ${user}</em><br>
              <span class="text-muted">${start} - ${end}</span>
            `
            taskItemsUl.appendChild(newLi)
          })
        }
  
        showAddFormBtn.onclick = () => {
          tasksListDiv.style.display = 'none'
          addTaskFormDiv.style.display = 'block'
          addTaskFormDiv.querySelector('input[name="task[day]"]').value = day
        }
      } else {
        tasksListDiv.style.display = 'none'
        addTaskFormDiv.style.display = 'block'
        addTaskFormDiv.querySelector('input[name="task[day]"]').value = day
      }
    })
  
    cancelAddTaskBtn.onclick = () => {
      addTaskFormDiv.style.display = 'none'
      tasksListDiv.style.display = 'block'
    }
  })