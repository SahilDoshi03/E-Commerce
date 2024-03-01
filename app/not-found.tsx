import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col h-[100vh] items-center justify-center">
      <h2 className="text-3xl">Resource Not Found</h2>
      <Link href="/" className="bg-red-200 text-xl p-2 mt-2 rounded-xl">
        Return Home
      </Link>
    </div>
  );
}
