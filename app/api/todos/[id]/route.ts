import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'

interface Segments {
    id: string
}
interface SegmentsWrap {
    params: Promise<Segments>
}

export async function GET(request: Request, {params}: SegmentsWrap) {

    const { id } = await params;

    const todo = await prisma.todo.findUnique({
        where: {id}
    })

    if( !todo ) {
        return NextResponse.json({ message: 'El id no existe' }, { status: 404 });
    }

    return NextResponse.json(todo);
}