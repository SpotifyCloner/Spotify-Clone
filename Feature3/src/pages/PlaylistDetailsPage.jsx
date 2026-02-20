import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { playlistService } from '../services/playlistService';
import PlaylistDetails from '../components/Playlist/PlaylistDetails';
import AddSongModal from '../components/Playlist/AddSongModal';
import '../components/Playlist/Playlist.css';

const PlaylistDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAddSongOpen, setIsAddSongOpen] = useState(false);

    useEffect(() => {
        fetchPlaylistDetails();
    }, [id]);

    const fetchPlaylistDetails = async () => {
        try {
            setLoading(true);
            const data = await playlistService.getPlaylistById(id);
            setPlaylist(data);
        } catch (error) {
            toast.error('Failed to load playlist details');
            navigate('/playlists');
        } finally {
            setLoading(false);
        }
    };

    const handleAddSong = async (trackId) => {
        try {
            await playlistService.addSong(id, trackId);
            toast.success('Song added to playlist');
            setIsAddSongOpen(false);
            fetchPlaylistDetails();
        } catch (error) {
            toast.error('Failed to add song');
        }
    };

    const handleRemoveSong = async (trackId) => {
        try {
            await playlistService.removeSong(id, trackId);
            toast.success('Song removed');
            fetchPlaylistDetails();
        } catch (error) {
            toast.error('Failed to remove song');
        }
    };

    if (loading) {
        return (
            <div className="loading-spinner" style={{ height: '100vh' }}>
                <Loader2 className="animate-spin" size={64} />
            </div>
        );
    }

    return (
        <>
            <PlaylistDetails
                playlist={playlist}
                onAddSong={() => setIsAddSongOpen(true)}
                onRemoveSong={handleRemoveSong}
                onBack={() => navigate('/playlists')}
            />

            <AddSongModal
                isOpen={isAddSongOpen}
                onClose={() => setIsAddSongOpen(false)}
                onAdd={handleAddSong}
            />

            <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
        </>
    );
};

export default PlaylistDetailsPage;
