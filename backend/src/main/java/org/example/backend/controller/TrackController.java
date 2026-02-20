package org.example.backend.controller;

import org.example.backend.entity.Track;
import org.example.backend.service.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tracks")
public class TrackController {

    @Autowired
    private TrackService trackService;

    @PostMapping
    public ResponseEntity<Track> createTrack(@RequestBody Track track) {
        return ResponseEntity.ok(trackService.saveTrack(track));
    }

    @GetMapping
    public ResponseEntity<List<Track>> getAllTracks() {
        return ResponseEntity.ok(trackService.getAllTracks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Track> getTrack(@PathVariable Long id) {
        return ResponseEntity.ok(trackService.getTrackById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable Long id) {
        trackService.deleteTrack(id);
        return ResponseEntity.noContent().build();
    }
}
