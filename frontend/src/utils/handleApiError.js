import toast from "react-hot-toast";

export const handleApiError = (
  error,
  fallbackMessage = "Something went wrong"
) => {
  if (error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else if (error.request) {
    toast.error("Server not responding. Please check your network.");
  } else {
    toast.error(fallbackMessage);
  }
};
