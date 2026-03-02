import { Todo } from '@/app/generated/prisma/client';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
import * as yup from 'yup';


interface Segments {
    id: string
}
interface SegmentsWrap {
    params: Promise<Segments>
}

const getTodo = async (id: string):Promise<Todo | null> => {

    const todo = await prisma.todo.findFirst({where: {id}})
    return todo;
}

export async function GET(request: Request, {params}: SegmentsWrap) {

    const { id } = await params;

    const todo = await getTodo( id );

    if( !todo ) {
        return NextResponse.json({ message: 'El id no existe' }, { status: 404 });
    }

    return NextResponse.json(todo);
}

const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional(),

})

export async function PUT(request: Request, {params}: SegmentsWrap) {

    const { id } = await params;

    const todo = await getTodo( id );

    if( !todo ) {
        return NextResponse.json({ message: 'El id no existe' }, { status: 404 });
    }

    const {complete, description} =  await putSchema.validate(await request.json());

    try {
        const updatedTodo = await prisma.todo.update({ 
        where: {id},
        data: { complete, description } 
        })

        return NextResponse.json(updatedTodo);

    } catch (error) {
        const message = error instanceof Error ? error.message : "An error occurred";
        return NextResponse.json( { message }, { status: 400 } );
    }


}