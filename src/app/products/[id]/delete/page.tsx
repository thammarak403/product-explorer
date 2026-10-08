import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { deleteProductAction } from "@/app/actions";

type DeleteProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProductPage({
  params,
}: DeleteProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  const deleteAction = deleteProductAction.bind(null, product.id);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold">ยืนยันการลบ</h1>
        <p className="mt-3 text-gray-600">
          ต้องการลบสินค้า “{product.name}” หรือไม่? การลบย้อนกลับไม่ได้
        </p>
        <div className="mt-6 flex items-center gap-3">
          <form action={deleteAction}>
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              ยืนยันการลบ
            </button>
          </form>
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            ยกเลิก
          </Link>
        </div>
      </div>
    </main>
  );
}
