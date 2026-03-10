'use server';

import { Todo } from "@/app/generated/prisma/client";
import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const sleep = async(seconds: number) => {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000)
    })
}

export const toggleTodo = async ( id: string, complete: boolean ): Promise<Todo> => {

    await sleep(3);
    
    const todo = await prisma.todo.findFirst({ where: { id } });

    if(!todo) {
        throw `Todo con id ${id} no encontrado`;
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete: complete }
    });

    revalidatePath('/dashboard/server-todos');
    return updatedTodo;
}


export const addTodo = async ( description: string, userId: string ) => {

    const user = await getUserSessionServer();

    try {

        const todo = await prisma.todo.create({ data: { description, userId: user!.id } })

        revalidatePath('/dashboard/server-todos');

        return todo;

    } catch (error) {
        return {
            message: 'Error creando Todo'
        }
    }
}

export const deleteCompleted = async(): Promise<void> => {
    try {
        await prisma.todo.deleteMany({ where: { complete: true } });
        revalidatePath('/dashboard/server-todos');
    } catch (error) {
        console.log(error);
    }
}