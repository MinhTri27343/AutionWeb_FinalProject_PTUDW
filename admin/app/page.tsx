import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import DeleteButton from "@/components/DeleteButton";
export default function Home() {
  return (
    <>
      <div>
        <DeleteButton />
        <SearchBar />
      </div>
    </>
  );
}
