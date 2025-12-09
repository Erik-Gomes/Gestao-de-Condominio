'use client';

import { toast } from 'sonner';

interface ToastProps {
  message: string;
  description?: string;
  type: 'success' | 'error';
}

export const showToast = (type: 'success' | 'error', message: string, description?: string) => {
  if (type === 'success') {
    toast.success(message, { description });
  } else {
    toast.error(message, { description });
  }
};
