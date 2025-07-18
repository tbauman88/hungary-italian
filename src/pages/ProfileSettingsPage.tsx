import React, { useState } from 'react';
import { ProfileForm } from '../components/ProfileForm';
import { useAuth } from '../contexts/AuthContext';

enum Tabs {
  EMAIL,
  PASSWORD
}

const tabs: { label: string; value: Tabs }[] = [
  { label: 'Email Address', value: Tabs.EMAIL },
  { label: 'Password', value: Tabs.PASSWORD },
]

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

      if (errorMessage.includes('wrong-password') || errorMessage.includes('invalid-credential')) {
        return 'Incorrect current password. Please try again.'
      } else if (errorMessage.includes('email-already-in-use')) {
        return 'This email address is already in use by another account.'
      } else if (errorMessage.includes('invalid-email')) {
        return 'Please enter a valid email address.'
      } else if (errorMessage.includes('requires-recent-login')) {
        return 'For security reasons, please log out and log back in before changing your email.'
      } else {
        return errorMessage
      }
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

      if (errorMessage.includes('wrong-password') || errorMessage.includes('invalid-credential')) {
        return 'Incorrect current password. Please try again.'
      } else if (errorMessage.includes('weak-password')) {
        return 'Password is too weak. Please choose a stronger password.'
      } else if (errorMessage.includes('requires-recent-login')) {
        return 'For security reasons, please log out and log back in before changing your password.'
      } else {
        return errorMessage
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p className="mt-1 text-sm text-gray-600">
              Update your email address and password
            </p>
          </div>

          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === tab.value
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
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
  )
} 
