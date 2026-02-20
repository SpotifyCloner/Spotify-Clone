package org.example.backend.controller;

import org.example.backend.dto.PlaylistRequest;
import org.example.backend.entity.Playlist;
import org.example.backend.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestBody PlaylistRequest request) {
        return ResponseEntity.ok(playlistService.createPlaylist(request.getName(), request.getUserId()));
    }

    @GetMapping
    public ResponseEntity<java.util.List<Playlist>> getAllPlaylists() {
        return ResponseEntity.ok(playlistService.getAllPlaylists());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Playlist> getPlaylist(@PathVariable Long id) {
        return ResponseEntity.ok(playlistService.getPlaylistById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        playlistService.deletePlaylist(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{playlistId}/tracks/{trackId}")
    public ResponseEntity<Playlist> addTrackToPlaylist(@PathVariable Long playlistId, @PathVariable Long trackId) {
        return ResponseEntity.ok(playlistService.addTrackToPlaylist(playlistId, trackId));
    }

    @DeleteMapping("/{playlistId}/tracks/{trackId}")
    public ResponseEntity<Playlist> removeTrackFromPlaylist(@PathVariable Long playlistId, @PathVariable Long trackId) {
        return ResponseEntity.ok(playlistService.removeTrackFromPlaylist(playlistId, trackId));
    }
}
