import { apiRequest } from "./queryClient";
import type { InsertBooking, InsertConsultant } from "@shared/schema";

export const api = {
  // Booking APIs
  createBooking: async (data: InsertBooking) => {
    const response = await apiRequest("POST", "/api/bookings", data);
    return response.json();
  },

  getBookings: async () => {
    const response = await apiRequest("GET", "/api/bookings");
    return response.json();
  },

  // Consultant APIs
  getConsultant: async () => {
    const response = await apiRequest("GET", "/api/consultant");
    return response.json();
  },

  updateConsultant: async (data: InsertConsultant) => {
    const response = await apiRequest("PUT", "/api/consultant", data);
    return response.json();
  },
};
