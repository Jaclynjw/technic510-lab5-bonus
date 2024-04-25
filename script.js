// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx69qQPawOVBi2oHiEnmmSdIGDY6znQ7s",
  authDomain: "todo-app-32aa4.firebaseapp.com",
  databaseURL: "https://todo-app-32aa4-default-rtdb.firebaseio.com",
  projectId: "todo-app-32aa4",
  storageBucket: "todo-app-32aa4.appspot.com",
  messagingSenderId: "346291524664",
  appId: "1:346291524664:web:7ed14f3f0a85af87f3c2cd",
  measurementId: "G-TR3H6RBL27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Function to add a todo to Firestore
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text) {
        addDoc(collection(db, "todos"), {
            text: text,
            timestamp: Date.now()
        }).then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            renderTodo(docRef.id, text);
        }).catch(error => {
            console.error("Error adding document: ", error);
        });
        input.value = '';
    }
}

// Function to render todos on the page
function renderTodo(id, text) {
    const list = document.getElementById('todoList');
    const li = document.createElement('li');
    li.textContent = text;
    li.id = id;
    li.onclick = function() {
        deleteDoc(doc(db, "todos", this.id)).then(() => {
            console.log("Document successfully deleted!");
            this.remove();
        }).catch(error => {
            console.error("Error removing document: ", error);
        });
    };
    list.appendChild(li);
}

// Real-time listener to get todos from Firestore
onSnapshot(collection(db, "todos"), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            renderTodo(change.doc.id, change.doc.data().text);
        }
    });
});
