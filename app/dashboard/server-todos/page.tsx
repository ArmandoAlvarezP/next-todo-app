// export const dynamic = 'force-dynamic';  // Solo se usa en versiones de next anteriores a la 15 
// export const revalidate = 0;

import prisma from "@/lib/prisma";
import { TodosGrid } from '@/todos';
import { NewTodo } from '@/components';


export default async function ServerTodosPage() {

    const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });
    console.log('construido');

    return (
        <>
            <span className="text-3xl mb-20">Server Actions</span>

            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>

            <TodosGrid todos={ todos }/>
        </>
    );
}