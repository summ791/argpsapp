import { useState, useEffect } from "react";
import {
  Platform,
  Alert,
  Image,
  TouchableOpacity
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertConsultantSchema,
  type InsertConsultant,
  type Consultant,
} from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Save } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [touchTimer, setTouchTimer] = useState<NodeJS.Timeout | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
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

  useEffect(() => {
    if (consultant) {
      form.reset({
        email: consultant.email,
        phone: consultant.phone || "",
      });
    }
    loadProfileImage();
  }, [consultant]);

  const loadProfileImage = async () => {
    if (Platform.OS === "android") {
      const savedImage = await AsyncStorage.getItem("profile_image");
      if (savedImage) setProfileImage(savedImage);
    }
  };

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

  const handleSecretUnlock = () => {
    if (Platform.OS !== "android") return;

    const code = prompt("Enter the secret code to unlock editing:");
    if (code === "6111949") {
      setIsEditing(true);
      setWrongAttempts(0);
      toast({
        title: "Access Granted",
        description: "You can now edit your profile.",
      });
    } else {
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);

      if (newAttempts >= 3) {
        toast({
          title: "Too Many Attempts",
          description: "Please press and hold the profile picture again to retry.",
          variant: "destructive",
        });
        setWrongAttempts(0);
      } else {
        toast({
          title: "Incorrect Code",
          description: `Incorrect code. Attempt ${newAttempts} of 3.`,
          variant: "destructive",
        });
      }
    }
  };

  const pickImage = async () => {
    if (Platform.OS !== "android" || !isEditing) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await AsyncStorage.setItem("profile_image", uri);
    }
  };

  if (isLoading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <div className="px-6 py-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div
            className="relative inline-block mb-4"
            onMouseDown={() => {
              if (Platform.OS === "android") {
                const timer = setTimeout(() => handleSecretUnlock(), 5000);
                setTouchTimer(timer);
              }
            }}
            onMouseUp={() => {
              if (touchTimer) clearTimeout(touchTimer);
            }}
            onTouchStart={() => {
              if (Platform.OS === "android") {
                const timer = setTimeout(() => handleSecretUnlock(), 5000);
                setTouchTimer(timer);
              }
            }}
            onTouchEnd={() => {
              if (touchTimer) clearTimeout(touchTimer);
            }}
          >
            <img
              src={
                profileImage ||
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
              }
              alt="Rithanya Gopinathan - Wellness Consultant"
              className="w-24 h-24 rounded-full object-cover border-4 border-[var(--wellness-green)] shadow-lg"
            />
            {isEditing && Platform.OS === "android" && (
              <button
                onClick={pickImage}
                className="absolute bottom-0 right-0 w-8 h-8 bg-wellness-orange rounded-full flex items-center justify-center shadow-md hover:bg-wellness-orange/80 transition-all"
              >
                <Camera className="text-white h-4 w-4" />
              </button>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Rithanya Gopinathan</h2>
          <p className="text-gray-600">Wellness Consultant</p>
          <p className="text-xs text-gray-400 mt-1 italic">
            (Long press photo to unlock editing)
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6"
        >
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Email Address</Label>
            <Input
              {...form.register("email")}
              type="email"
              disabled={!isEditing || Platform.OS !== "android"}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--wellness-green)] focus:border-transparent transition-all"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</Label>
            <Input
              {...form.register("phone")}
              type="tel"
              disabled={!isEditing || Platform.OS !== "android"}
              placeholder="Enter phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--wellness-green)] focus:border-transparent transition-all"
            />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          {isEditing && Platform.OS === "android" && (
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
