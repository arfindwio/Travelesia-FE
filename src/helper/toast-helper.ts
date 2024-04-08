import toast, { Toaster } from "react-hot-toast";

const showSuccessToast = (message: string): string => {
  return toast.success(message, {
    duration: 3000,
    position: "top-right",
  });
};

const showErrorToast = (message: string): string => {
  return toast.error(message, {
    duration: 3000,
    position: "top-right",
  });
};

const showLoadingToast = (message: string): string => {
  return toast.loading(message, {
    duration: 3000,
    position: "top-right",
  });
};

export { showSuccessToast, showErrorToast, showLoadingToast, Toaster };
