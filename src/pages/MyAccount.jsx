// src/pages/MyAccount.jsx
import { useState } from "react";
import { Card } from "../components/ui/Card";
import PersonalInfoForm from "../components/account/PersonalInfoForm";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";

const TABS = [
  { key: "profile",   label: "Personal Info" },
  { key: "integrate", label: "Accounts & Integrations" },
  { key: "security",  label: "Security" },
  { key: "privacy",   label: "Data & Privacy" },
];

export default function MyAccount() {
  const { profile, setProfile } = useAuth();
  const [active,   setActive]   = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const currentTab = TABS.find((t) => t.key === active);

  const handleProfileSave = async (newData) => {
    // prepare the payload matching your DB columns
    const updates = {
      id:           profile.id,
      first_name:   newData.firstName,
      last_name:    newData.lastName,
      country:      newData.country,
      currency:     newData.currency,
      updated_at:   new Date().toISOString(),
    };

    const { error } = await supabase
      .from("profiles")
      .upsert(updates, { returning: "minimal" });

    if (error) {
      console.error("Error updating profile:", error);
      setToastMsg({ type: "error", text: "Failed to save changes" });
    } else {
      // update in-memory profile so the form re­-renders with the new data
      setProfile((prev) => ({
        ...prev,
        ...updates
      }));
      setToastMsg({ type: "success", text: "Profile updated!" });
    }

    // dismiss toast after 3 seconds
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 space-y-6">
      {/* Toast notifications */}
      {toastMsg && (
        <div className="toast toast-top toast-end z-50">
          <div className={`alert ${toastMsg.type === "success" ? "alert-success" : "alert-error"}`}>
            <span>{toastMsg.text}</span>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold">My Account</h1>

      {/* Mobile accordion for section navigation */}
      <div className="mb-4 lg:hidden">
        <div className="collapse collapse-arrow border rounded-box">
          <input
            type="checkbox"
            checked={menuOpen}
            onChange={() => setMenuOpen((o) => !o)}
          />
          <div className="collapse-title text-lg font-medium">
            {currentTab.label}
          </div>
          <div className="collapse-content">
            <ul className="menu w-full">
              {TABS.map(({ key, label }) => (
                <li key={key}>
                  <button
                    className={`w-full text-left ${active === key ? "font-bold" : ""}`}
                    onClick={() => {
                      setActive(key);
                      setMenuOpen(false);
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop tabs for section navigation */}
      <div className="hidden lg:flex tabs tabs-lifted mb-6">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`tab ${active === key ? "tab-active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Section content */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{currentTab.label}</h2>

        {currentTab.key === "profile" ? (
          <PersonalInfoForm
            initialData={profile}
            onSave={handleProfileSave}
          />
        ) : (
          <p className="text-gray-600">
            This is a placeholder for your “{currentTab.label}” settings. Coming soon!
          </p>
        )}
      </Card>
    </div>
  );
}
