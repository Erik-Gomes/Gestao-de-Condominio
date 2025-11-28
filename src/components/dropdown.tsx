"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiMoreVertical } from "react-icons/fi";

export function DropdownActions({
  onDelete,
}: {
  onDelete: () => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="text-gray-500 hover:text-black focus:outline-none">
          <FiMoreVertical className="h-5 w-5" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[160px] bg-white border rounded-md shadow-md p-1 text-sm text-gray-700"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item
            className="w-full px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Editar
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={onDelete}
            className="w-full px-3 py-2 rounded-md hover:bg-red-100 text-red-600 cursor-pointer"
          >
            Excluir
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
