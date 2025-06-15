import { Button } from "./ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="bg-blue-700 flex flex-row justify-between py-4 px-8 items-center">
        <div className="flex flex-row items-center gap-3">
            <p className="text-white font-bold text-2xl">Jobbee</p>
            <p className="text-white  text-sm mt-1"> - building your future</p>
        </div>
      <Button
        size="sm"
        variant="outline"
        className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold rounded-md"
        asChild
      >
        <Link href="/admin/login">Admin Portal</Link>
      </Button>
    </div>
  );
}
