import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/query-client-provider";
import { LoginProvider } from "@/providers/login-state-provider";
import ProtectedRoute from "@/providers/protected-route";
import LoginPage from "@/pages/login/login-page";
import AdminLayout from "@/components/admin-layout";
import UserListPage from "@/pages/users/user-list-page";
import UserCreatePage from "@/pages/users/user-create-page";
import UserEditPage from "@/pages/users/user-edit-page";
import UserDetailPage from "@/pages/users/user-detail-page";
import NotificationListPage from "@/pages/notifications/notification-list-page";
import NotificationCreatePage from "@/pages/notifications/notification-create-page";
import NotificationEditPage from "@/pages/notifications/notification-edit-page";
import NotificationDetailPage from "@/pages/notifications/notification-detail-page";
import SubsListPage from "@/pages/notification-subs/subs-list-page";
import SubsCreatePage from "@/pages/notification-subs/subs-create-page";
import SubsDetailPage from "@/pages/notification-subs/subs-detail-page";
import TeamMembersListPage from "@/pages/team-members/team-members-list-page";
import TeamMembersCreatePage from "@/pages/team-members/team-members-create-page";
import TeamMembersEditPage from "@/pages/team-members/team-members-edit-page";
import TeamMembersDetailPage from "@/pages/team-members/team-members-detail-page";

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Hoş Geldiniz!</h1>
        <p className="text-muted-foreground">Başarıyla giriş yaptınız.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryProvider>
      <LoginProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<UserListPage />} />
                <Route path="/users/create" element={<UserCreatePage />} />
                <Route path="/users/edit/:id" element={<UserEditPage />} />
                <Route path="/users/detail/:id" element={<UserDetailPage />} />
                <Route
                  path="/notifications"
                  element={<NotificationListPage />}
                />
                <Route
                  path="/notifications/create"
                  element={<NotificationCreatePage />}
                />
                <Route
                  path="/notifications/edit/:id"
                  element={<NotificationEditPage />}
                />
                <Route
                  path="/notifications/detail/:id"
                  element={<NotificationDetailPage />}
                />
                <Route path="/notification-subs" element={<SubsListPage />} />
                <Route
                  path="/notification-subs/create"
                  element={<SubsCreatePage />}
                />
                <Route
                  path="/notification-subs/detail/:id"
                  element={<SubsDetailPage />}
                />
                <Route path="/team-members" element={<TeamMembersListPage />} />
                <Route
                  path="/team-members/create"
                  element={<TeamMembersCreatePage />}
                />
                <Route
                  path="/team-members/edit/:id"
                  element={<TeamMembersEditPage />}
                />
                <Route
                  path="/team-members/detail/:id"
                  element={<TeamMembersDetailPage />}
                />
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </QueryProvider>
  );
}

export default App;
