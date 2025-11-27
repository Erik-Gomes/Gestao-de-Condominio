'use client';

import { toast } from 'sonner';

interface ToastProps {
  message: string;
  description?: string;
  type: 'success' | 'error';
}

export const showToast = ({ message, description, type }: ToastProps) => {
  console.log("showToast")
  if (type === 'success') {
      console.log("showToast")
    toast.success(message, {
      description: description,
    });
  } else {
    toast.error(message, {
      description: description,
    });
  }
};