import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/demo-products";
import { updateProductAction } from "@/app/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

const inputClass =
  "mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold">แก้ไขสินค้า</h1>

        <form action={updateAction} className="mt-5 space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              ชื่อสินค้า
            </label>
            <input
              id="name"
              name="name"
              defaultValue={product.name}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="price" className="text-sm font-medium">
              ราคา
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={product.price}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">
              รายละเอียด
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={product.description}
              required
              className={inputClass}
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              บันทึก
            </button>
            <Link href="/" className="text-sm text-gray-600 hover:underline">
              ยกเลิก
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
