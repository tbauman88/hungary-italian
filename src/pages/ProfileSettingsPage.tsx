import React, { useState } from 'react';
import { ProfileForm } from '../components/ProfileForm';
import { useAuth } from '../contexts/AuthContext';

enum Tabs {
  EMAIL,
  PASSWORD
}

const tabs: { label: string; value: Tabs; icon: string }[] = [
  { label: 'Email Address', value: Tabs.EMAIL, icon: '✉️' },
  { label: 'Password', value: Tabs.PASSWORD, icon: '🔒' },
]

const errorMessages: Record<string, string> = {
  'wrong-password': 'Incorrect current password. Please try again.',
  'weak-password': 'Password is too weak. Please choose a stronger password.',
  'invalid-credential': 'Incorrect current password. Please try again.',
  'email-already-in-use': 'This email address is already in use by another account.',
  'invalid-email': 'Please enter a valid email address.',
  'requires-recent-login': 'For security reasons, please log out and log back in before changing your email.',
}

export const ProfileSettingsPage: React.FC = () => {
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.EMAIL)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailUpdate = async (data: { newEmail: string; currentPassword: string }): Promise<string | null> => {
    setIsLoading(true)
    setError(null)

    try {
      await updateEmail(data.newEmail, data.currentPassword)
      return null // Success
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred. Please try again.'
      return errorMessages[errorMessage] || errorMessage
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (data: { newPassword: string; currentPassword: string }): Promise<string | null> => {
    setIsLoading(true)
    setError(null)

    try {
      await updatePassword(data.newPassword, data.currentPassword)
      return null // Success
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred. Please try again.'
      return errorMessages[errorMessage] || errorMessage
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 via-yellow-50 to-primary-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-lg text-gray-600">
            Update your email address and password
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${activeTab === tab.value
                    ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === Tabs.EMAIL && (
              <ProfileForm
                type="email"
                currentEmail={currentUser?.email || undefined}
                onSubmit={handleEmailUpdate}
                isLoading={isLoading}
                error={error}
              />
            )}

            {activeTab === Tabs.PASSWORD && (
              <ProfileForm
                type="password"
                onSubmit={handlePasswordUpdate}
                isLoading={isLoading}
                error={error}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
