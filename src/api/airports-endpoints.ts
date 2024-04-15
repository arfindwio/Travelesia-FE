import { API_ENDPOINT } from "./api-endpoints";
import { showErrorToast } from "@/helper/toast-helper";

interface AirportData {
  id: number;
  airportName: string;
  continent: string;
  country: string;
  city: string;
}

export const getAirports = async (): Promise<AirportData[] | false> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.AIRPORTS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const airports = await response.json();
      return airports.data.airports;
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
