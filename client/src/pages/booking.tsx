import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, Send, Check } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Booking() {
  const [showThankYou, setShowThankYou] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      date: "",
      time: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      setShowThankYou(true);
      form.reset();
      toast({
        title: "Booking Confirmed!",
        description: "Your consultation has been booked successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBooking) => {
    bookingMutation.mutate(data);
  };

  const resetForm = () => {
    setShowThankYou(false);
    form.reset();
  };

  if (showThankYou) {
    return (
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-green-500 h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for booking your consultation. Rithanya will contact you soon to confirm the details.
          </p>
          <Button 
            onClick={resetForm}
            className="bg-wellness-green text-white px-6 py-3 rounded-xl hover:bg-wellness-green/90 transition-all"
          >
            Book Another Consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-wellness-green rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarCheck className="text-white h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Consultation</h2>
          <p className="text-gray-600">Schedule your wellness consultation with Rithanya</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Full Name</Label>
            <Input
              {...form.register("name")}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--wellness-green)] focus:border-transparent transition-all"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Email Address</Label>
            <Input
              {...form.register("email")}
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--wellness-green)] focus:border-transparent transition-all"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</Label>
            <Input
              {...form.register("date")}
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--wellness-green)] focus:border-transparent transition-all"
            />
            {form.formState.errors.date && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.date.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</Label>
            <Select onValueChange={(value) => form.setValue("time", value)}>
              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--wellness-green)] focus:border-transparent transition-all">
                <SelectValue placeholder="Select preferred time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">9:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="14:00">2:00 PM</SelectItem>
                <SelectItem value="15:00">3:00 PM</SelectItem>
                <SelectItem value="16:00">4:00 PM</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.time && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.time.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={bookingMutation.isPending}
            className="w-full bg-gradient-to-r from-[var(--wellness-green)] to-[var(--wellness-green-light)] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {bookingMutation.isPending ? (
              "Booking..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Book Now
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
