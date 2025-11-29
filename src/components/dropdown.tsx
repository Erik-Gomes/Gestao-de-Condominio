"use client";

<<<<<<< HEAD
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiMoreVertical } from "react-icons/fi";

export function DropdownActions({
  onDelete,
}: {
=======
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"; //é a lib que cuida de acessibilidade e navegação via teclado.
import { FiMoreVertical } from "react-icons/fi";

export function DropdownActions({
//   onEdit,
  onDelete,
}: {
//   onEdit: () => void;
>>>>>>> 0350161bae8c1adbf29778f0d669f36b102d0508
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
<<<<<<< HEAD
=======
            // onClick={onEdit}
>>>>>>> 0350161bae8c1adbf29778f0d669f36b102d0508
            className="w-full px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Editar
          </DropdownMenu.Item>
          <DropdownMenu.Item
<<<<<<< HEAD
            onSelect={onDelete}
=======
            onClick={onDelete}
>>>>>>> 0350161bae8c1adbf29778f0d669f36b102d0508
            className="w-full px-3 py-2 rounded-md hover:bg-red-100 text-red-600 cursor-pointer"
          >
            Excluir
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 0350161bae8c1adbf29778f0d669f36b102d0508
