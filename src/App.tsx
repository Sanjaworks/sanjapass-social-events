import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Public Pages
import Index from "./pages/Index";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import GalleryPage from "./pages/GalleryPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import ComoFunciona from "./pages/ComoFunciona";

// Dashboard Pages
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import CustomerTickets from "./pages/dashboard/CustomerTickets";
import OrganizerDashboard from "./pages/dashboard/OrganizerDashboard";
import OrganizerEvents from "./pages/dashboard/OrganizerEvents";
import CreateEvent from "./pages/dashboard/CreateEvent";
import EditEvent from "./pages/dashboard/EditEvent";
import CheckinPage from "./pages/dashboard/CheckinPage";
import MasterAdminPanel from "./pages/dashboard/MasterAdminPanel";
import OrganizersManagement from "./pages/dashboard/OrganizersManagement";
import CommissionsPage from "./pages/dashboard/CommissionsPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import EventApprovalPage from "./pages/dashboard/EventApprovalPage";
import AlertsPage from "./pages/dashboard/AlertsPage";
import ParticipantPage from "./pages/dashboard/ParticipantPage";
import Settings from "./pages/dashboard/Settings";
import FinancialDashboard from "./pages/dashboard/FinancialDashboard";
import FinancialTransactions from "./pages/dashboard/FinancialTransactions";
import PayoutManagement from "./pages/dashboard/PayoutManagement";
import OrganizerAttendees from "./pages/dashboard/OrganizerAttendees";
import OrganizerReports from "./pages/dashboard/OrganizerReports";
import OrganizerFinancial from "./pages/dashboard/OrganizerFinancial";

const queryClient = new QueryClient();

// Protected route component (now with bypass for development)
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, isAuthenticated } = useAuth();
  
  // For development purposes we're bypassing authentication
  return <>{children}</>;
  
  /* Original protected route logic
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
  */
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/checkout/:eventId/:ticketId" element={<CheckoutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            
            {/* Customer Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/tickets" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerTickets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/tickets/:ticketId" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerTickets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/settings" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/participant/:userId" 
              element={<ParticipantPage />} 
            />
            
            {/* Organizer Routes */}
            <Route 
              path="/organizer" 
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <OrganizerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/events" 
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <OrganizerEvents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/events/create" 
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <CreateEvent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/events/:eventId/edit" 
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <EditEvent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/attendees" 
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <OrganizerAttendees />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/attendees/:eventId" 
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <OrganizerAttendees />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/reports" 
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <OrganizerReports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/financial" 
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <OrganizerFinancial />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/checkin" 
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <CheckinPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/settings" 
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            
            {/* Master Admin Routes */}
            <Route 
              path="/master" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <MasterAdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master/organizers" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <OrganizersManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master/commissions" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <CommissionsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master/approve" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <EventApprovalPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master/reports" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ReportsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master/alerts" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AlertsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Financial Routes */}
            <Route 
              path="/master/financial" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <FinancialDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master/transactions" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <FinancialTransactions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master/payouts" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <PayoutManagement />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all (404) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
