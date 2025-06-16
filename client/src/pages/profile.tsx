import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertConsultantSchema, type InsertConsultant, type Consultant } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Save, Edit } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: consultant, isLoading } = useQuery<Consultant>({
    queryKey: ["/api/consultant"],
  });

  const form = useForm<InsertConsultant>({
    resolver: zodResolver(insertConsultantSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  // Update form when consultant data loads
  useEffect(() => {
    if (consultant) {
      form.reset({
        email: consultant.email,
        phone: consultant.phone || "",
      });
    }
  }, [consultant, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: InsertConsultant) => {
      const response = await apiRequest("PUT", "/api/consultant", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/consultant"] });
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertConsultant) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded mx-auto mb-2 w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded mx-auto w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
              alt="Rithanya Gopinathan - Wellness Consultant" 
              className="w-24 h-24 rounded-full object-cover border-4 border-[var(--wellness-green)] shadow-lg"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-wellness-orange rounded-full flex items-center justify-center shadow-md hover:bg-wellness-orange/80 transition-all">
              <Camera className="text-white h-4 w-4" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Rithanya Gopinathan</h2>
          <p className="text-gray-600">Wellness Consultant</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Email Address</Label>
            <div className="relative">
              <Input
                {...form.register("email")}
                type="email"
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--wellness-green)] focus:border-transparent transition-all pr-10"
              />
              {!isEditing && (
                <button 
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[var(--wellness-green)] transition-all"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</Label>
            <div className="relative">
              <Input
                {...form.register("phone")}
                type="tel"
                disabled={!isEditing}
                placeholder="Enter phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--wellness-green)] focus:border-transparent transition-all pr-10"
              />
              {!isEditing && (
                <button 
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[var(--wellness-green)] transition-all"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
            {form.formState.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex space-x-3">
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="flex-1 bg-gradient-to-r from-[var(--wellness-green)] to-[var(--wellness-green-light)] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {updateMutation.isPending ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  form.reset({
                    email: consultant.email || "",
                    phone: consultant.phone || "",
                  });
                }}
                className="px-6 py-3 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
