import { Api, createAxiosInstance } from "./services/services";
const MOCK_BASE_URL = process.env.NEXT_PUBLIC_MOCK_BASE_URL as string;

export const mockApi = new Api(createAxiosInstance("http://localhost:3030/"));
