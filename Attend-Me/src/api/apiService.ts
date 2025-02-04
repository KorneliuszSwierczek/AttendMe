import { Client as AttendMeClient } from "@/api/AttendMeClient";

// URL backendu (upewnij się, że jest poprawny)
const API_URL = "https://attendme-backend.runasp.net";

// Tworzenie instancji klienta API
export const apiClient = new AttendMeClient(API_URL);
