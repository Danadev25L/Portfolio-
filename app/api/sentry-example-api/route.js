
import * as Sentry from '@sentry/nextjs';

export const dynamic = 'force-dynamic';

// A faulty API route to test Sentry's error monitoring
export async function GET() {
  try {
    // Simulating some code that could throw an error
    throw new Error('Sentry Example API Route Error');
  } catch (error) {
    // Capture the error with Sentry
    Sentry.captureException(error);
    
    // Optionally, send a response to the client
    return new Response('Something went wrong, and the error was captured by Sentry', {
      status: 500,
    });
  }
}
