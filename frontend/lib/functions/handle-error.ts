import { toast } from 'sonner';

interface ErrorData {
  status: string;
  message: string;
  data: { field: string; message: string };
}

export const handleError = (error: unknown) => {
  if (isCustomError(error)) {
    const message = error.data.message || 'An unknown error occurred';

    toast.error('Something went wrong', {
      description: message,
      className:'error-toast'
    });
  } else {
    toast.error('Something went wrong', {
      description: 'An unexpected error occurred.',
    });
  }
};

function isCustomError(error: unknown): error is ErrorData {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const e = error as { data?: unknown };
  return (
    'data' in e &&
    typeof e.data === 'object' &&
    e.data !== null &&
    'message' in e.data &&
    typeof (e.data as { message: unknown }).message === 'string'
  );
}
