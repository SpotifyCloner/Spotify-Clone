import React from 'react';
import PlaylistCard from './PlaylistCard';
import './Playlist.css';

const PlaylistList = ({ playlists, onEdit, onDelete, loading }) => {
    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="playlist-grid">
            {playlists.length > 0 ? (
                playlists.map(playlist => (
                    <PlaylistCard
                        key={playlist.id}
                        playlist={playlist}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', background: 'var(--spotify-dark-grey)', borderRadius: '8px' }}>
                    <p className="text-subdued">No playlists found. Create your first one!</p>
                </div>
            )}
        </div>
    );
};

export default PlaylistList;
