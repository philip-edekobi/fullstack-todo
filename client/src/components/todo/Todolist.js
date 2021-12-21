

export default function Todolist({ todos }){
    return(
        <div>
            <ul>
                {todos.map((todo, index) => <li key={index}>{todo.content}</li>)}
            </ul>
        </div>
    );
}