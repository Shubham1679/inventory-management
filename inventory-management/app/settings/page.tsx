"use client";

import React, { useState } from "react";
import Header from "@/app/(components)/Header";

type UserSetting =
  | { label: string; value: string; type: "text" }
  | { label: string; value: boolean; type: "toggle" };

const mockSettings: UserSetting[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const updatedSettings = [...userSettings];
    if (updatedSettings[index].type === "toggle") {
      updatedSettings[index].value = !updatedSettings[index].value;
    }
    setUserSettings(updatedSettings);
  };

  const handleInputChange = (index: number, newValue: string) => {
    const updatedSettings = [...userSettings];
    if (updatedSettings[index].type === "text") {
      updatedSettings[index].value = newValue;
    }
    setUserSettings(updatedSettings);
  };

  return (
    <div className="w-full">
      <Header name="User Settings" />

      <div className="overflow-x-auto mt-5 shadow-md rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
          {/* Header */}
          <thead className="bg-gray-800 dark:bg-gray-900 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {userSettings.map((setting, index) => (
              <tr
                key={setting.label}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                  {setting.label}
                </td>

                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer
                        peer-focus:ring-blue-400 peer-focus:ring-4 transition
                        peer-checked:bg-blue-600
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:border after:rounded-full after:h-5 after:w-5
                        after:transition-all peer-checked:after:translate-x-full"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      value={setting.value as string}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;