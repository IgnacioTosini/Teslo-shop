'use client'

import { paypalCheckPayment, setTransactionId } from '@/actions';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type { PayPalButtonsComponentProps } from '@paypal/react-paypal-js';

interface Props {
    orderId: string;
    amount: number
}

export const PaypalButton = ({ orderId, amount }: Props) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const rountedAmount = (Math.round(amount * 100)) / 100

    if (isPending) {
        return (
            <div className="animate-pulse flex flex-col gap-3">
                <div className="h-10 bg-gray-300 rounded" />
                <div className="h-10 bg-gray-300 rounded" />
            </div>
        )
    }

    const createOrder: NonNullable<PayPalButtonsComponentProps['createOrder']> = async (data, actions) => {
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        value: `${rountedAmount}`,
                        currency_code: 'USD',
                    },
                },
            ],
        })
        const { ok } = await setTransactionId(orderId, transactionId)
        if (!ok) {
            throw new Error('No se pudo actualizar la orden')
        }

        return transactionId;
    }

    const onApprove: NonNullable<PayPalButtonsComponentProps['onApprove']> = async (data, actions) => {
        const details = await actions.order?.capture();
        if (!details) return

        await paypalCheckPayment(details.id!);
    }

    return (
        <div className='relative z-0'>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>
    )
}
