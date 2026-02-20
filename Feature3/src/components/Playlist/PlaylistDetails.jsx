import React from 'react';
import { ChevronLeft, Plus, Trash2, Clock, Music } from 'lucide-react';
import './Playlist.css';

const PlaylistDetails = ({ playlist, onAddSong, onRemoveSong, onBack }) => {
    if (!playlist) return null;

    return (
        <div className="details-page fade-in">
            <div className="details-header">
                <button
                    className="action-btn"
                    onClick={onBack}
                    style={{ position: 'absolute', top: '24px', left: '24px', background: 'rgba(0,0,0,0.5)' }}
                >
                    <ChevronLeft size={32} />
                </button>

                <div className="details-image card-image-placeholder">
                    <Music size={100} className="text-subdued" />
                </div>

                <div className="details-info">
                    <p className="card-stats">Playlist</p>
                    <h1>{playlist.name}</h1>
                    <p className="text-subdued">{playlist.description}</p>
                    <p style={{ marginTop: '8px', fontWeight: 600 }}>
                        {playlist.songs?.length || 0} songs
                    </p>
                </div>
            </div>

            <div className="song-list">
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                    <button className="btn-primary" style={{ padding: '16px 48px', fontSize: '16px' }}>
                        Play
                    </button>
                    <button className="btn-secondary" onClick={onAddSong}>
                        <Plus size={20} style={{ marginRight: '8px' }} />
                        Add Song
                    </button>
                </div>

                <div className="song-row" style={{ borderBottom: '1px solid #333', marginBottom: '16px', fontWeight: 700 }}>
                    <div className="song-number">#</div>
                    <div className="song-name">Title</div>
                    <div>Album</div>
                    <div><Clock size={16} /></div>
                    <div></div>
                </div>

                {playlist.songs && playlist.songs.length > 0 ? (
                    playlist.songs.map((song, index) => (
                        <div key={song.id || index} className="song-row">
                            <div className="song-number">{index + 1}</div>
                            <div className="song-content">
                                <div className="song-name">{song.title || `Song ${song.id}`}</div>
                                <div className="text-subdued" style={{ fontSize: '12px' }}>{song.artist || 'Unknown Artist'}</div>
                            </div>
                            <div className="text-subdued">{song.album || 'Unknown Album'}</div>
                            <div className="text-subdued">{song.duration || '--:--'}</div>
                            <button
                                className="action-btn"
                                onClick={(e) => { e.stopPropagation(); onRemoveSong(song.id); }}
                                title="Remove Song"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--spotify-light-grey)' }}>
                        No songs in this playlist yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistDetails;
