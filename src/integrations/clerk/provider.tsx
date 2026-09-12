import { ClerkProvider, useUser } from '@clerk/tanstack-react-start'
import { useEffect, useRef } from 'react'
import { usePostHog } from 'posthog-js/react'

function PostHogUserIdentification() {
  const posthog = usePostHog()
  const { isLoaded, isSignedIn, user } = useUser()
  const previousUserId = useRef<string | null>(null)

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn || !user) {
      if (previousUserId.current) {
        posthog.reset()
        previousUserId.current = null
      }
      return
    }

    if (previousUserId.current === user.id) return

    if (previousUserId.current) {
      posthog.reset()
    }

    posthog.identify(user.id, {
      ...(user.primaryEmailAddress?.emailAddress
        ? { email: user.primaryEmailAddress.emailAddress }
        : {}),
      ...(user.fullName ? { name: user.fullName } : {}),
    })
    previousUserId.current = user.id
  }, [isLoaded, isSignedIn, posthog, user])

  return null
}

export default function AppClerkProvider({
  children,
  withPostHogIdentity = false,
}: {
  children: React.ReactNode
  withPostHogIdentity?: boolean
}) {
  return (
    <ClerkProvider>
      {withPostHogIdentity && <PostHogUserIdentification />}
      {children}
    </ClerkProvider>
  )
}
