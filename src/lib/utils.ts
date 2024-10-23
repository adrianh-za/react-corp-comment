//Tries to parse the specified error object and return a human-readable error message
export const getErrorMessage = (error: Error | unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return "An unknown error occurred while fetching feedback items.";
  }
}