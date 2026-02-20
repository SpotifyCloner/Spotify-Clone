import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PlaylistList from '../components/Playlist/PlaylistList';
import PlaylistForm from '../components/Playlist/PlaylistForm';
import { playlistService } from '../services/playlistService';
import '../components/Playlist/Playlist.css';

const PlaylistsPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPlaylist, setEditingPlaylist] = useState(null);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            setLoading(true);
            const data = await playlistService.getPlaylists();
            setPlaylists(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Failed to load playlists. Make sure backend is running at http://localhost:8080');
            setPlaylists([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (formData) => {
        try {
            if (editingPlaylist) {
                await playlistService.updatePlaylist(editingPlaylist.id, formData);
                toast.success('Playlist updated!');
            } else {
                await playlistService.createPlaylist(formData);
                toast.success('Playlist created!');
            }
            setIsFormOpen(false);
            setEditingPlaylist(null);
            fetchPlaylists();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this playlist?')) {
            try {
                await playlistService.deletePlaylist(id);
                toast.success('Playlist deleted');
                fetchPlaylists();
            } catch (error) {
                toast.error('Failed to delete playlist');
            }
        }
    };

    const openCreateForm = () => {
        setEditingPlaylist(null);
        setIsFormOpen(true);
    };

    const openEditForm = (playlist) => {
        setEditingPlaylist(playlist);
        setIsFormOpen(true);
    };

    return (
        <div className="playlist-container">
            <div className="playlist-header">
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Your Playlists</h1>
                    <p className="text-subdued">Manage your music collections</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={openCreateForm}>
                    <Plus size={20} />
                    Create Playlist
                </button>
            </div>

            <PlaylistList
                playlists={playlists}
                loading={loading}
                onEdit={openEditForm}
                onDelete={handleDelete}
            />

            <PlaylistForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleCreateOrUpdate}
                initialData={editingPlaylist}
            />
        </div>
    );
};

export default PlaylistsPage;
