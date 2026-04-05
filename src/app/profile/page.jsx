import Profile from '@/sections/Profile/profile'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function page() {
    return (
        <ProtectedRoute>
            <div>
                <Profile />
            </div>
        </ProtectedRoute>
    )
}
