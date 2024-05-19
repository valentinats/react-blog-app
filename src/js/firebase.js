import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3TmdLaJMUkRhd03VzBG0eV6_RI8MrYMM",
  authDomain: "react-blog-c4264.firebaseapp.com",
  projectId: "react-blog-c4264",
  storageBucket: "react-blog-c4264.appspot.com",
  messagingSenderId: "832630857594",
  appId: "1:832630857594:web:4b3e308b1df11eab02c0c3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getTodos() {
  const postsCollection = collection(db, "posts");
  const snapshot = await getDocs(postsCollection);
  const posts = snapshot.docs.map((doc) => doc.data());
  posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return posts;
}

//используем функцию для загрузки данных из коллекции "posts"
getTodos().catch((error) => {
  console.error("Ошибка загрузки данных:", error);
});

async function addTodo(todo) {
  try {
    const postsCollection = collection(db, "posts");
    const id = todo.id;
    await setDoc(doc(postsCollection, todo.id), todo);
    console.log("Document written with ID: ", id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

async function deleteTodo(id) {
  try {
    const postsCollection = collection(db, "posts");
    await deleteDoc(doc(postsCollection, id));
    console.log("Document deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

async function updateTodo(todo) {
  try {
    const postsCollection = collection(db, "posts");
    await setDoc(doc(postsCollection, todo.id), todo);
    console.log("Document updated with ID: ", todo.id);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export { getTodos, addTodo, deleteTodo, updateTodo };
