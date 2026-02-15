export const revalidate = 80

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ gender: string }>
    searchParams: Promise<{ page?: string }>
}

export default async function GenderPage({ params, searchParams }: Props) {
    const { gender } = await params
    const { page: pageParam } = await searchParams
    const page = pageParam ? parseInt(pageParam) : 1
    const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });
    //const title = id === 'men' ? 'Hombre' : id === 'women' ? 'Mujer' : 'Niños';
    const title: Record<string, string> = {
        'men': 'Hombres',
        'women': 'Mujeres',
        'kid': 'Niños',
        'unisex': 'Todos'
    };

    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    return (
        <div>
            <Title title={title[gender]} subtitle={`Todos los Productos de ${title[gender]}`} className="mb-2" />
            <ProductGrid products={products.filter(product => product.gender === gender)} />
            <Pagination totalPages={totalPages} />
        </div>
    );
}