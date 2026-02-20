package org.example.backend.service;

import org.example.backend.entity.Playlist;
import org.example.backend.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private org.example.backend.repository.UserRepository userRepository;

    @Autowired
    private org.example.backend.repository.TrackRepository trackRepository;

    public Playlist createPlaylist(String name, Long userId) {
        org.example.backend.entity.User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
        Playlist playlist = new Playlist();
        playlist.setName(name);
        playlist.setUser(user);
        return playlistRepository.save(playlist);
    }

    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    public Playlist getPlaylistById(Long id) {
        return playlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Playlist not found with id " + id));
    }

    public List<Playlist> getPlaylistsByUserId(Long userId) {
        return playlistRepository.findByUserId(userId);
    }

    public void deletePlaylist(Long id) {
        if (!playlistRepository.existsById(id)) {
            throw new RuntimeException("Playlist not found with id " + id);
        }
        playlistRepository.deleteById(id);
    }

    public Playlist addTrackToPlaylist(Long playlistId, Long trackId) {
        Playlist playlist = getPlaylistById(playlistId);
        org.example.backend.entity.Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new RuntimeException("Track not found with id " + trackId));

        playlist.getTracks().add(track);
        return playlistRepository.save(playlist);
    }

    public Playlist removeTrackFromPlaylist(Long playlistId, Long trackId) {
        Playlist playlist = getPlaylistById(playlistId);
        org.example.backend.entity.Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new RuntimeException("Track not found with id " + trackId));

        playlist.getTracks().remove(track);
        return playlistRepository.save(playlist);
    }
}
