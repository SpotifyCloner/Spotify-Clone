import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PlaylistsPage from './pages/PlaylistsPage';
import PlaylistDetailsPage from './pages/PlaylistDetailsPage';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Simple Sidebar/Nav placeholder to match Spotify look */}
        <div style={{ display: 'flex', flex: 1 }}>
          <aside style={{ width: '240px', background: 'black', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'white' }}>Spotify Clone</div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: 'white', fontWeight: 700, cursor: 'pointer' }}>Home</div>
              <div style={{ color: 'white', fontWeight: 700, cursor: 'pointer' }}>Search</div>
              <div
                style={{ color: 'white', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => window.location.href = '/playlists'}
              >
                Your Library
              </div>
            </nav>
          </aside>

          <main style={{ flex: 1, background: 'var(--spotify-black)', overflowY: 'auto', height: '100vh' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/playlists" replace />} />
              <Route path="/playlists" element={<PlaylistsPage />} />
              <Route path="/playlists/:id" element={<PlaylistDetailsPage />} />
            </Routes>
          </main>
        </div>

        {/* Placeholder for music player */}
        <footer style={{ height: '90px', background: '#181818', borderTop: '1px solid #282828', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <div style={{ color: 'white', fontSize: '14px' }}>Now Playing: Nothing Selected</div>
        </footer>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#282828',
            color: '#fff',
            borderRadius: '8px',
          },
        }}
      />
    </Router>
  );
}

export default App;
