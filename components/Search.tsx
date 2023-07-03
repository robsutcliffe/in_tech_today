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
          px-2
          block
          w-full
          rounded-md
          shadow-sm
          border-0
          py-1.5
          pr-10
          text-gray-900
          ring-1
          ring-inset
          ring-gray-300
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-inset
          focus:ring-yellow-400
          sm:text-sm sm:leading-6"
        placeholder="Search"
        value={searchTerm || ""}
        onChange={handleSearchChange}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
