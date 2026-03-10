import { products, type Product } from "@/products/data/products";
import { ItemCart } from "@/shopping-cart";
import { cookies } from "next/headers";
import { WidgetItem } from '../../../components/WidgetItem';


export const metadata = {
    title: 'Carrito de compras',
    description: 'Carrito de compras',
};

interface ProductsInCart {
    product: Product;
    quantity: number;
}

const getProductsInCart = ( cart: { [id:string]: number }): ProductsInCart[] => {

    const productsInCart: ProductsInCart[] = [];

    for (const id of Object.keys(cart)) {
        const product = products.find( prod => prod.id === id);
        if( product ) {
            productsInCart.push({ product: product, quantity: cart[id] })
        }
        
    }
    return productsInCart;
}

export default async function CartPage() {

    const cookieStore = await cookies();
    const cart = JSON.parse( cookieStore.get('cart')?.value ?? '{}') as { [id:string]:number };
    const productsInCart = getProductsInCart(cart);

    const totalToPay = productsInCart.reduce( ( prev, current ) => (current.product.price * current.quantity) + prev, 0);

    return (
        <div className="text-5xl">
            <h1 className="mb-2">Productos en el carrito</h1>
            <hr />

            <div className="mt-10 flex flex-col sm:flex-row gap-2 w-full">

                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {
                        productsInCart?.map( ({product, quantity}) => (
                            <ItemCart key={product.id} product={ product } quantity={ quantity } />
                        ))
                    }
                </div>

                <div className="flex flex-col w-full sm:w-4/12">
                    <WidgetItem title={ 'Total a pagar:' } >
                        <div className="mt-2 flex justify-center gap-4">
                            <h3 className="text-3xl font-bold text-gray-700">${(totalToPay * 1.15).toFixed(2)}</h3>
                        </div>
                        <span className="font-bold text-center text-gray-500 text-xl">Impuestos 15%: ${ (totalToPay * 0.15).toFixed(2) }</span>
                    </WidgetItem>
                </div>
            </div>
        </div>
    );
}