'use client'

import { currencyFormat } from "@/utils"

interface Props {
    summaryInfo: {
        subTotal: number;
        tax: number;
        total: number;
        itemsIn: number;
    }
}

export const SummaryInfo = ({ summaryInfo }: Props) => {
    return (
        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{summaryInfo.itemsIn === 1 ? '1 artículo' : `${summaryInfo.itemsIn} artículos`}</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(summaryInfo.subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(summaryInfo.tax)}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(summaryInfo.total)}</span>
        </div>
    )
}
