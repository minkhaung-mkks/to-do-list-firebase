
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
import { getDatabase, ref, push, set } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js'
import { databaseURL } from "./secrets.js";
import { CreateAgendaCard } from "./utlis.js";
// import { firebaseConfig } from "./secrets.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    databaseURL: databaseURL,
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

const userAgenda = ref(database, "To-Dos")
const inputField = document.getElementById('new_item_input')
const agendaBox = document.querySelector('.agenda_box')

const AddNewToDo = () => {
    let inputValue = inputField.value
    push(userAgenda, inputValue)
    let newCard = CreateAgendaCard(inputValue)
    agendaBox.append(newCard)
    console.log(`${inputValue} added to the database`)
}

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        AddNewToDo()
    }
})


console.log('started')