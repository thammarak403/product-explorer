import Link from "next/link";
import { auth } from "@/auth";
import { getProducts } from "@/lib/products";
import { AuthButtons } from "./auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = getProducts();
  const isLoggedIn = Boolean(session?.user);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">Product Explorer</h1>
          <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <p className="mb-6 text-sm text-gray-500">
          สินค้าทั้งหมด {products.length} รายการ
          {!isLoggedIn && " · ล็อกอินเพื่อแก้ไขหรือลบสินค้า"}
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              data-testid="product"
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="mt-1 flex-1 text-sm text-gray-600">
                {product.description}
              </p>
              <p className="mt-4 text-xl font-bold text-indigo-600">
                ฿{product.price.toLocaleString("th-TH")}
              </p>

              {isLoggedIn && (
                <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    แก้ไข
                  </Link>
                  <Link
                    href={`/products/${product.id}/delete`}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    ลบ
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>

        {products.length === 0 && (
          <p className="py-16 text-center text-gray-500">ไม่มีสินค้า</p>
        )}
      </section>
    </main>
  );
}
