'use client';

import { toast } from 'sonner';

interface ToastProps {
  message: string;
  description?: string;
  type: 'success' | 'error';
}

<<<<<<< HEAD
export const showToast = (type: 'success' | 'error', message: string, description?: string) => {
  if (type === 'success') {
    toast.success(message, { description });
  } else {
    toast.error(message, { description });
  }
};
=======
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
>>>>>>> 0350161bae8c1adbf29778f0d669f36b102d0508
