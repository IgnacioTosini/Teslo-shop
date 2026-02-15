'use client'

import { useAddressStore, useCartStore } from "@/store";
import { useEffect, useState } from "react"
import clsx from 'clsx';
import { placeOrder } from "@/actions";
import { useRouter } from "next/navigation";
import { PersonalInfo } from "@/components/ui/personalInfo/PersonalInfo";
import { SummaryInfo } from "@/components/ui/summaryInfo/SummaryInfo";

export const PlaceOrder = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const address = useAddressStore(state => state.address);
    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);
    const getSumaryInformation = useCartStore(
        (state) => state.getSummaryInformation
    );
    const { itemsInCart, tax, subTotal, total } = getSumaryInformation();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoaded(true)
    }, []);

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true);
        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }))

        const resp = await placeOrder(productsToOrder, address)

        if (!resp.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }

        clearCart();
        router.replace('/orders/' + resp.order!.id);
    }

    if (!loaded) {
        return <p>Cargando...</p>
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <PersonalInfo />
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <SummaryInfo summaryInfo={{
                subTotal,
                tax,
                total,
                itemsIn: itemsInCart
            }}  />
            <div className="mt-5 mb-2 w-full">
                <p className="mb-5">
                    <span className="text-xs">
                        Al hacer clic en Colocar orden, aceptas nuestros <a href="#" className="underline">términos y condiciones</a>
                    </span>
                </p>
                <p className="text-red-500">{errorMessage}</p>
                <button
                    onClick={onPlaceOrder}
                    className={clsx({
                        'btn-primary': !isPlacingOrder,
                        'btn-disable': isPlacingOrder,
                    })}>
                    Colocar orden
                </button>
            </div>
        </div>
    )
}
