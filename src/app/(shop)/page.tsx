export const revalidate = 80

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import { ProductGrid } from "@/components/products/productGrid/ProductGrid";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page?: string; }>
}

export default async function Home({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = pageParam ? parseInt(pageParam) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <main className="">
      <Title title={"Tienda"} subtitle="Todos los Productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}
