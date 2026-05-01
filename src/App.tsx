import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppShell from "./components/AppShell";
import AudioGuidePage from "./pages/AudioGuidePage";
import ExplorePage from "./pages/ExplorePage";
import GroupsPage from "./pages/GroupsPage";
import ItineraryPage from "./pages/ItineraryPage";
import PassportPage from "./pages/PassportPage";
import ProfilePage from "./pages/ProfilePage";
import TourDetailsPage from "./pages/TourDetailsPage";
import VoicePage from "./pages/VoicePage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<ExplorePage />} />
          <Route path="tours/:tourId" element={<TourDetailsPage />} />
          <Route path="audio/:tourId" element={<AudioGuidePage />} />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="voz" element={<VoicePage />} />
          <Route path="itinerario" element={<ItineraryPage />} />
          <Route path="grupos" element={<GroupsPage />} />
          <Route path="passaporte" element={<PassportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
