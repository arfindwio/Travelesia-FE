import { API_ENDPOINT } from "./api-endpoints";
import { showErrorToast } from "@/helper/toast-helper";

interface UserProfileInput {
  image: File | null;
  fullName: string;
  phoneNumber: string;
  city: string;
  country: string;
}

export const putUserProfileUser = async (input: UserProfileInput): Promise<boolean> => {
  try {
    const token = localStorage.getItem("tokenUser");
    const formData = new FormData();

    formData.append("image", input.image || "");
    formData.append("fullName", input.fullName);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("city", input.city);
    formData.append("country", input.country);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.USER_PROFILES}/update-profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      return true;
    } else {
      const errorMessage = await response.json();
      showErrorToast(errorMessage.message);
      return false;
    }
  } catch (error) {
    showErrorToast("An unexpected error occurred");
    return false;
  }
};
