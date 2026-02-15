export const revalidate = 60080;

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const slug = (await params).slug

    // fetch post information
    const product = await getProductBySlug(slug);

    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            images: [`/products/${product?.images[1]}`]
        }
    }
}

export default async function ProductBySlugPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProductBySlug(slug)

    if (!product) {
        notFound()
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-1 md:col-span-2">
                <ProductMobileSlideshow images={product.images} title={product.title} className='block md:hidden' />
                <ProductSlideshow images={product.images} title={product.title} className="hidden md:block" />
            </div>

            <div className="col-span-1 px-5">
                <StockLabel slug={product.slug} />
                <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>{product.title}</h1>
                <p className="text-lg mb-5">${product.price}</p>

                <AddToCart product={product} />

                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">
                    {product.description}
                </p>
            </div>
        </div>
    );
}