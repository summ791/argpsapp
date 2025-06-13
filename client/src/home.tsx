import { Lightbulb, Apple } from "lucide-react";
import ImageSlider from "@/components/image-slider";

export default function Home() {
  const wellnessTips = [
    "Start your day with a glass of warm lemon water to boost your metabolism and support digestion. This simple habit can help detoxify your body and provide vitamin C.",
    "Take a 10-minute walk after each meal to aid digestion and regulate blood sugar levels.",
    "Practice deep breathing exercises for 5 minutes daily to reduce stress and improve mental clarity.",
    "Include colorful vegetables in every meal to ensure you get a variety of essential nutrients.",
    "Stay hydrated by drinking at least 8 glasses of water throughout the day."
  ];

  const healthBites = [
    { text: "Eating a handful of almonds daily can help reduce bad cholesterol levels and provide healthy fats that support brain function.", highlight: "Did you know?" },
    { text: "Green tea contains antioxidants called catechins that may help boost metabolism and protect against heart disease.", highlight: "Health Fact:" },
    { text: "Berries are packed with anthocyanins, powerful compounds that help improve memory and cognitive function.", highlight: "Nutrition Tip:" },
    { text: "Dark leafy greens like spinach and kale are rich in nitrates, which can help improve blood flow and exercise performance.", highlight: "Fun Fact:" }
  ];

  const currentTip = wellnessTips[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % wellnessTips.length];
  const currentBite = healthBites[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % healthBites.length];

  return (
    <div className="px-6 py-6">
      {/* Welcome Message */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Wellness</h2>
        <p className="text-gray-600">Your journey to a healthier lifestyle starts here</p>
      </div>

      {/* Daily Wellness Tips */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-wellness-green rounded-full flex items-center justify-center mr-3">
            <Lightbulb className="text-white h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Daily Wellness Tip</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {currentTip}
        </p>
      </div>

      {/* Short Health Bites */}
      <div className="bg-gradient-to-r from-[var(--wellness-orange-light)] to-orange-100 rounded-2xl p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-wellness-orange rounded-full flex items-center justify-center mr-3">
            <Apple className="text-white h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Health Bite</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          <strong>{currentBite.highlight}</strong> {currentBite.text}
        </p>
      </div>

      {/* Image Slider */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Nature's Powerhouses</h3>
        <ImageSlider />
      </div>
    </div>
  );
}
