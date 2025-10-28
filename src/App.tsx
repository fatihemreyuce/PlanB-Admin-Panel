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
import ServiceListPage from "@/pages/services/service-list-page";
import ServiceCreatePage from "@/pages/services/service-create-page";
import ServiceEditPage from "@/pages/services/service-edit-page";
import ServiceDetailPage from "@/pages/services/service-detail-page";
import PartnerListPage from "@/pages/partners/partner-list-page";
import PartnerCreatePage from "@/pages/partners/partner-create-page";
import PartnerEditPage from "@/pages/partners/partner-edit-page";
import PartnerDetailPage from "@/pages/partners/partner-detail-page";
import ContactListPage from "@/pages/contacts/contact-list-page";
import ContactCreatePage from "@/pages/contacts/contact-create-page";
import TagListPage from "@/pages/tags/tag-list-page";
import TagCreatePage from "@/pages/tags/tag-create-page";
import TagEditPage from "@/pages/tags/tag-edit-page";
import TagDetailPage from "@/pages/tags/tag-detail-page";
import SliderListPage from "@/pages/sliders/slider-list-page";
import SliderCreatePage from "@/pages/sliders/slider-create-page";
import SliderEditPage from "@/pages/sliders/slider-edit-page";
import SliderDetailPage from "@/pages/sliders/slider-detail-page";
import PortfolioListPage from "@/pages/portfolios/portfolio-list-page";
import PortfolioCreatePage from "@/pages/portfolios/portfolio-create-page";
import PortfolioEditPage from "@/pages/portfolios/portfolio-edit-page";
import PortfolioDetailPage from "@/pages/portfolios/portfolio-detail-page";

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
                <Route path="/services" element={<ServiceListPage />} />
                <Route
                  path="/services/create"
                  element={<ServiceCreatePage />}
                />
                <Route
                  path="/services/edit/:id"
                  element={<ServiceEditPage />}
                />
                <Route
                  path="/services/detail/:id"
                  element={<ServiceDetailPage />}
                />
                <Route path="/partners" element={<PartnerListPage />} />
                <Route
                  path="/partners/create"
                  element={<PartnerCreatePage />}
                />
                <Route
                  path="/partners/edit/:id"
                  element={<PartnerEditPage />}
                />
                <Route
                  path="/partners/detail/:id"
                  element={<PartnerDetailPage />}
                />
                <Route path="/contacts" element={<ContactListPage />} />
                <Route
                  path="/contacts/create"
                  element={<ContactCreatePage />}
                />
                <Route path="/tags" element={<TagListPage />} />
                <Route path="/tags/create" element={<TagCreatePage />} />
                <Route path="/tags/edit/:id" element={<TagEditPage />} />
                <Route path="/tags/detail/:id" element={<TagDetailPage />} />
                <Route path="/sliders" element={<SliderListPage />} />
                <Route path="/sliders/create" element={<SliderCreatePage />} />
                <Route path="/sliders/edit/:id" element={<SliderEditPage />} />
                <Route
                  path="/sliders/detail/:id"
                  element={<SliderDetailPage />}
                />
                <Route path="/portfolios" element={<PortfolioListPage />} />
                <Route
                  path="/portfolios/create"
                  element={<PortfolioCreatePage />}
                />
                <Route
                  path="/portfolios/edit/:id"
                  element={<PortfolioEditPage />}
                />
                <Route
                  path="/portfolios/detail/:id"
                  element={<PortfolioDetailPage />}
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
