"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { FiAlertTriangle } from "react-icons/fi"
import { ReactNode } from "react";

interface ConfirmDialogProps {
  title: string;
  description: ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  loading?: boolean;
}

export function ConfirmDialog({
  title,
  description,
  isOpen,
  setIsOpen,
  onConfirm,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-red-100 p-3 rounded-full">
              <FiAlertTriangle className="text-red-600 w-6 h-6" />
            </div>

            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {title}
            </Dialog.Title>

            <Dialog.Description className="text-sm text-gray-500">
                {description}
            </Dialog.Description>

            <div className="flex items-center justify-center gap-3 pt-4 w-full">
              <Dialog.Close asChild>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  Cancelar
                </button>
              </Dialog.Close>

              <button
                type="button"
                disabled={loading}
                onClick={async () => {
                  await onConfirm();
                }}
                className={`w-full py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                {loading ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}