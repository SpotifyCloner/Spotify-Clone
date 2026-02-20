import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import './Playlist.css';

const AddSongModal = ({ isOpen, onClose, onAdd }) => {
    const [trackId, setTrackId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (trackId.trim()) {
            onAdd(trackId);
            setTrackId('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content fade-in" onClick={e => e.stopPropagation()}>
                <div className="playlist-header">
                    <h2 className="modal-title">Add Song to Playlist</h2>
                    <button className="action-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="trackId">Song ID or Track ID</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                id="trackId"
                                className="form-input"
                                value={trackId}
                                onChange={(e) => setTrackId(e.target.value)}
                                placeholder="Enter song ID (e.g. 123)"
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    <p className="text-subdued" style={{ marginBottom: '20px', fontSize: '12px' }}>
                        Note: In a real app, you would search for songs here. For this demo, please enter the Track ID provided by the backend.
                    </p>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Add Song
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSongModal;
