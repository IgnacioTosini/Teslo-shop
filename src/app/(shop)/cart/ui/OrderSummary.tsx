'use client'

import { useEffect, useState } from "react"
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";

export const OrderSummary = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState<boolean>(false);
    const getSumaryInformation = useCartStore(
        (state) => state.getSummaryInformation
    );
    const { itemsInCart, tax, subTotal, total } = getSumaryInformation();

    useEffect(() => {
        if(itemsInCart === 0 && loaded === true) {
            router.replace('/empty')
        }
    }, [itemsInCart, router, loaded]);

    if (!loaded) {
        return <p>Cargando el resumen de compra...</p>;
    }

    return (
        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(tax)}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
        </div>
    )
}
