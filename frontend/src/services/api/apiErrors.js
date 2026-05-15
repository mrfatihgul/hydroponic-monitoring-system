/**
 * Maps server error payloads or axios errors to a short user-facing message.
 * @param {unknown} error
 * @returns {string}
 */
export function getApiErrorMessage(error) {
  if (error == null) return "Unknown error.";
  if (typeof error === "string") return error;
  if (error.response?.data?.message && typeof error.response.data.message === "string") {
    return error.response.data.message;
  }
  if (error.code === "ECONNABORTED") {
    return "The server did not respond in time.";
  }
  if (!error.response) {
    return "Could not reach the server. Check the URL and your network connection.";
  }
  const status = error.response.status;
  if (status === 404) return "The requested resource was not found.";
  if (status === 400) return "Invalid request.";
  if (status >= 500) return "A server error occurred.";
  return `Request failed (${status}).`;
}
