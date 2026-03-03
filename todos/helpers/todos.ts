import { Todo } from "@/app/generated/prisma/client";

// const sleep = (seconds: number = 0):Promise<boolean> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(true)
//         }, seconds * 1000);
//     }) 
// }

export const updateTodo = async (id: string, complete:boolean):Promise<Todo> => {
    // TODO: actualizaciones optimistas
    //await sleep(2);
    const body= { complete };

    // Se puede colocar la url relativa ya que el helper será llamado del lado del cliente
    const todo = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify( body ),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( res => res.json());

    // console.log(todo);

    return todo;
}

export const createTodo = async (description: string):Promise<Todo> => {
    const body= { description };

    // Se puede colocar la url relativa ya que el helper será llamado del lado del cliente
    const todo = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify( body ),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( res => res.json());

    // console.log(todo);

    return todo;
}

export const deleteTodo = async ():Promise<boolean> => {
    
    // Se puede colocar la url relativa ya que el helper será llamado del lado del cliente
    await fetch(`/api/todos`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( res => res.json());

    return true;
}