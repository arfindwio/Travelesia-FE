import { API_ENDPOINT } from "./api-endpoints";
import { showErrorToast } from "@/helper/toast-helper";

interface RegisterInput {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
interface LoginInput {
  emailOrPhoneNumber: string;
  password: string;
}
interface VerifyOtpInput {
  email: string;
  otp: string;
}
interface ResendOtpInput {
  email: string;
}
interface ForgetPasswordInput {
  email: string;
}

export const postRegisterUser = async (input: RegisterInput): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.USERS}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const postLoginUser = async (input: LoginInput): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.USERS}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem("tokenUser", user.data.token);
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

export const putVerifyOtpUser = async (input: VerifyOtpInput): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.USERS}/verify-otp`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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

export const putResendOtpUser = async (input: ResendOtpInput): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.USERS}/resend-otp`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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

export const postForgetPasswordUser = async (input: ForgetPasswordInput): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.USERS}/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const getAuthenticateUser = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("tokenUser");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.USERS}/authenticate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
