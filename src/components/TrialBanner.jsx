import { useAuth } from "../contexts/AuthContext";

export default function TrialBanner() {
  const { profile } = useAuth();

  if (!profile || profile.plan !== "trial" || !profile.trial_end) return null;

  const trialEnd = new Date(profile.trial_end);
  const now = new Date();
  const timeLeft = Math.max(0, Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24))); // in days

  return (
    <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-center text-sm font-medium shadow">
      {timeLeft > 0
        ? `${timeLeft} day${timeLeft > 1 ? "s" : ""} left in your free trial`
        : "Your trial has ended. Upgrade to keep access."}
    </div>
  );
}
