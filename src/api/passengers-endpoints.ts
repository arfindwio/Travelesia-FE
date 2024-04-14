import { API_ENDPOINT } from "./api-endpoints";
import { showErrorToast } from "@/helper/toast-helper";

interface CreatePassengerInput {
  title: string;
  fullName: string;
  familyName: string;
  bornDate: string;
  citizen: string;
  identityNumber: string;
  publisherCountry: string;
  validUntil: string;
  bookingId: number;
}

export const postCreatePassenger = async (input: CreatePassengerInput): Promise<boolean> => {
  try {
    const token = localStorage.getItem("tokenUser");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.PASSENGERS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
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
