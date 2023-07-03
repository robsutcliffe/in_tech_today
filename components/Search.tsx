import React, { useContext } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { PostsContext } from "@context/posts.context";

export default function Search() {
  const { searchTerm, handleSearchChange } = useContext(PostsContext);

  return (
    <div className="relative">
      <input
        type="text"
        name="account-number"
        id="account-number"
        className="
          px-4
          block
          w-full
          rounded-xl
          border-0
          py-3
          pr-10
          text-black
          font-extrabold
          ring-4
          ring-inset
          ring-slate-300
          placeholder:text-slate-400
          focus:outline-none
          focus:ring-4
          focus:ring-inset
          focus:ring-yellow-400
          sm:text-sm
          sm:leading-6"
        placeholder="Search"
        value={searchTerm || ""}
        onChange={handleSearchChange}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-slate-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
