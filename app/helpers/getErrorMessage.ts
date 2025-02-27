import { AxiosError } from "axios";

export default function getErrorMessage(error: any) {
    if (error instanceof AxiosError) {
        return error.response?.data?.error || "Something went wrong";
    } else if (error instanceof Error) {
        return error.message;
    } else {
        return "An error occurred"
    }
}