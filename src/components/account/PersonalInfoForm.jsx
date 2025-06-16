// src/components/account/PersonalInfoForm.jsx
import React, { useState, useEffect } from "react";

export default function PersonalInfoForm({ initialData = {}, onSave }) {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [country,   setCountry]   = useState("");
  const [currency,  setCurrency]  = useState("");

  useEffect(() => {
    // Initialize form fields from the DB-returned profile (snake_case)
    setFirstName(initialData.first_name ?? "");
    setLastName( initialData.last_name  ?? "");
    setCountry(  initialData.country    ?? "");
    setCurrency( initialData.currency   ?? "");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ firstName, lastName, country, currency });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Country of Residence */}
      <div>
        <label className="block text-sm font-medium">Country of Residence</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select country</option>
          <option value="AL">Albania</option>
          <option value="AD">Andorra</option>
          <option value="AM">Armenia</option>
          <option value="AT">Austria</option>
          <option value="AZ">Azerbaijan</option>
          <option value="BY">Belarus</option>
          <option value="BE">Belgium</option>
          <option value="BA">Bosnia and Herzegovina</option>
          <option value="BG">Bulgaria</option>
          <option value="HR">Croatia</option>
          <option value="CY">Cyprus</option>
          <option value="CZ">Czech Republic</option>
          <option value="DK">Denmark</option>
          <option value="EE">Estonia</option>
          <option value="FI">Finland</option>
          <option value="FR">France</option>
          <option value="GE">Georgia</option>
          <option value="DE">Germany</option>
          <option value="GR">Greece</option>
          <option value="HU">Hungary</option>
          <option value="IS">Iceland</option>
          <option value="IE">Ireland</option>
          <option value="IT">Italy</option>
          <option value="KZ">Kazakhstan</option>
          <option value="LV">Latvia</option>
          <option value="LI">Liechtenstein</option>
          <option value="LT">Lithuania</option>
          <option value="LU">Luxembourg</option>
          <option value="MT">Malta</option>
          <option value="MD">Moldova</option>
          <option value="MC">Monaco</option>
          <option value="ME">Montenegro</option>
          <option value="NL">Netherlands</option>
          <option value="MK">North Macedonia</option>
          <option value="NO">Norway</option>
          <option value="PL">Poland</option>
          <option value="PT">Portugal</option>
          <option value="RO">Romania</option>
          <option value="RU">Russia</option>
          <option value="RS">Serbia</option>
          <option value="SK">Slovakia</option>
          <option value="SI">Slovenia</option>
          <option value="ES">Spain</option>
          <option value="SE">Sweden</option>
          <option value="CH">Switzerland</option>
          <option value="TR">Turkey</option>
          <option value="UA">Ukraine</option>
          <option value="GB">United Kingdom</option>
          <option value="VA">Vatican City</option>
        </select>
      </div>

      {/* Preferred Currency */}
      <div>
        <label className="block text-sm font-medium">Preferred Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select currency</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="USD">USD</option>
        </select>
      </div>

      {/* Submit */}
      <div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
}
