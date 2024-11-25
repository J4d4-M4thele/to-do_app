import React, { useEffect, useState } from "react";
import ToDoCard from "./ToDoCard";
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
            .then(() => alert("Task added successfully"))
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

            <div>
                {todos?.map((todo) => (
                    <ToDoCard
                        key={todo.id}
                        id={todo.id}
                        todoName={todo?.todoName}
                        time={todo.time?.toDate().getTime()}
                        status={todo?.status}
                    />
                ))}
            </div>

            {addTodoModal && (
        <div className="max-w-lg flex items-center justify-between">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Task"
            className="border p-2 flex-1 outline-none rounded-lg"
          />
          <button
            onClick={addTodo}
            className="bg-green-500 p-3 text-white text-sm font-bold rounded-lg hover:scale-110 transition-all duration-200 ease-in-out ml-3"
          >
            Add
          </button>
        </div>
      )}
        </div>
    );
}

export default Body;
