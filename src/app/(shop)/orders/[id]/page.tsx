import { getOrderById } from "@/actions/order/getOrderById";
import { OrderStatus, PaypalButton, Title } from "@/components";
import { PersonalInfo } from "@/components/ui/personalInfo/PersonalInfo";
import { SummaryInfo } from "@/components/ui/summaryInfo/SummaryInfo";
import Image from "next/image";
import { redirect } from "next/navigation";
import { currencyFormat } from '../../../../utils/currencyFormat';

interface Props {
    params: { id: string }
}

export default async function OrderPage({ params }: Props) {
    const { id } = await params;
    const { ok, order } = await getOrderById(id);

    if (!ok) {
        redirect('/');
    }

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-250">
                <Title title={`Order #${id.split('-').at(-1)}`} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="flex flex-col mt-5">
                        <OrderStatus isPaid={order!.isPaid} />
                        {
                            order!.orderItems.map(item => (
                                <div key={item.product.slug} className="flex mb-5">
                                    <Image src={`/products/${item.product.productImages[0].url}`}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: 100,
                                            height: 100
                                        }}
                                        alt={item.product.title}
                                        className="mr-5 rounded"
                                    />

                                    <div>
                                        <p>{item.product.title}</p>
                                        <p>${item.price} x {item.quantity}</p>
                                        <p>Subtotal: {currencyFormat(item.price * item.quantity)}</p>

                                        <button className="underline mt-3">
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="bg-white rounded-xl shadow-xl p-7">
                        <h2 className="text-2xl mb-2">Dirección de entrega</h2>
                        <PersonalInfo />
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>
                        <SummaryInfo summaryInfo={{
                            subTotal: order!.subTotal,
                            tax: order!.tax,
                            total: order!.total,
                            itemsIn: order!.itemsInOrder
                        }} />
                        <div className="mt-5 mb-2 w-full">
                            {
                                order?.isPaid ?
                                    (
                                        <OrderStatus isPaid={order!.isPaid} />
                                    )
                                    :
                                    (
                                        <PaypalButton orderId={order!.id} amount={order!.total} />
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}