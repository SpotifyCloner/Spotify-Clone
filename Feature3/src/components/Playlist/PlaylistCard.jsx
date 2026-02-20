import React from 'react';
import { Play, Edit2, Trash2, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Playlist.css';

const PlaylistCard = ({ playlist, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleOpen = () => {
        navigate(`/playlists/${playlist.id}`);
    };

    return (
        <div className="playlist-card fade-in" onClick={handleOpen}>
            <div className="card-image-container">
                {playlist.imageUrl ? (
                    <img src={playlist.imageUrl} alt={playlist.name} className="card-image" />
                ) : (
                    <div className="card-image-placeholder">
                        <Music size={48} className="text-subdued" />
                    </div>
                )}
                <button className="play-button" aria-label="Play">
                    <Play fill="black" size={20} />
                </button>
            </div>

            <div className="card-content">
                <h3 className="card-title">{playlist.name}</h3>
                <p className="card-description text-subdued">
                    {playlist.description || 'No description'}
                </p>
                <p className="card-stats text-subdued">
                    {playlist.songCount || 0} songs
                </p>
            </div>

            <div className="card-actions">
                <button
                    className="action-btn edit"
                    onClick={(e) => { e.stopPropagation(); onEdit(playlist); }}
                    title="Edit Playlist"
                >
                    <Edit2 size={16} />
                </button>
                <button
                    className="action-btn delete"
                    onClick={(e) => { e.stopPropagation(); onDelete(playlist.id); }}
                    title="Delete Playlist"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default PlaylistCard;
