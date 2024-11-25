import React, { useEffect, useState } from "react";
import TodoCard from "./ToDoCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

function Body() {
    //declaring states
    const [addTodoModal, setAddTodoModal] = useState(false);
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    const [user] = useAuthState(auth);

    const addTodo = (e) => {
        e.preventDefault();
        setAddTodoModal(false);
        //adding document to todos collection
        addDoc(collection(db, `user/${user?.uid}/todos`), {
            //model (specifies document fields)
            todoName: input,
            status: false,
            time: serverTimestamp()
        })
            .then(() => alert("To-do Added"))
            .catch((err) => alert(err.message));

        //clear input field
        setInput("");
    };

    useEffect(() => {
        onSnapshot(
            query(collection(db, `user/${user?.uid}/todos`), orderBy("time", "desc")),
            (snapshot) => {
                setTodos(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        todoName: doc.data().todoName,
                        time: doc.data().time,
                        status: doc.data().status,
                    }))
                )
            }
        );
    }, [user])

    return (
        <div>
            <div className="flex items-center justify-between p-5">
                <h1 className="text-3xl font-bold">My Todos</h1>
                <button
                    onClick={() => setAddTodoModal(true)}
                    className="bg-green-500 p-3 text-white text-sm font-bold rounded-lg hover:scale-110 transition-all duration-200 ease-in-out"
                >
                    Add Todo
                </button>
            </div>
        </div>
    );
}

export default Body;
