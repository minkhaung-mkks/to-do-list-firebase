
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js'
import { CreateAgendaCard } from "./utlis.js";
// import { firebaseConfig } from "./secrets.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    databaseURL: process.env.databaseURL,
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

const agendaBox = document.querySelector('.agenda_box')
const userAgenda = ref(database, "To-Dos")
const inputField = document.getElementById('new_item_input')

export const AddNewToDo = () => {
    let inputValue = inputField.value
    push(userAgenda, inputValue)

    console.log(`${inputValue} added to the database`)
}

onValue(userAgenda, (snapshot) => {
    reset()
    const data = Object.entries(snapshot.val());
    for (let i = 0; i < data.length; i++) {
        let currentData = data[i]
        const id = currentData[0]
        const text = currentData[1]
        let newCard = CreateAgendaCard(text)
        newCard.addEventListener('click', () => {
            console.log(id)
            let itemLocationInDb = ref(database, `To-Dos/${id}`)
            remove(itemLocationInDb)
        })
        agendaBox.append(newCard)
    }
})

const reset = () => {
    const agendaCards = document.querySelectorAll('.agenda_card')
    agendaCards.forEach((card) => {
        card.remove()
    })
    inputField.value = ''
}

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        AddNewToDo()
    }
})


console.log('started')