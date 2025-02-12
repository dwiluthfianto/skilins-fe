import { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

interface ErrorResponse {
  message?: string;
  error?: string;
}

export function handleAxiosError(
  error: unknown,
  defaultMessage = 'An unexpected error occurred'
) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as ErrorResponse;

    // Handle specific HTTP status codes
    if (status === 500) {
      toast({
        title: 'Server Error',
        description: 'Internal server error. Please try again later.',
        variant: 'destructive',
      });
      return;
    }

    if (status === 401) {
      toast({
        title: 'Unauthorized',
        description: 'You are not authorized to access this resource.',
        variant: 'destructive',
      });
      return;
    }

    if (status === 403) {
      toast({
        title: 'Forbidden',
        description: 'You are not authorized to access this resource.',
        variant: 'destructive',
      });
      return;
    }

    if (status === 422) {
      toast({
        title: 'Unprocessable Entity',
        description:
          'The request was well-formed but was unable to be followed due to semantic errors.',
        variant: 'destructive',
      });
      return;
    }

    if (status === 429) {
      toast({
        title: 'Too Many Requests',
        description: 'You have made too many requests. Please try again later.',
        variant: 'destructive',
      });
      return;
    }

    if (status === 503) {
      toast({
        title: 'Service Unavailable',
        description:
          'The server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.',
        variant: 'destructive',
      });
      return;
    }

    if (error.response) {
      toast({
        title: 'Error!',
        description: data.message || data.error || defaultMessage,
        variant: 'destructive',
      });
      return;
    }
  }

  // Handle non-Axios errors
  toast({
    title: 'Error!',
    description: defaultMessage,
    variant: 'destructive',
  });
}
