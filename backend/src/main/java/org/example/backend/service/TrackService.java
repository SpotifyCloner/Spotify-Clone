package org.example.backend.service;

import org.example.backend.entity.Track;
import org.example.backend.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackService {

    @Autowired
    private TrackRepository trackRepository;

    public Track saveTrack(Track track) {
        return trackRepository.save(track);
    }

    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }

    public Track getTrackById(Long id) {
        return trackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Track not found with id " + id));
    }

    public void deleteTrack(Long id) {
        if (!trackRepository.existsById(id)) {
            throw new RuntimeException("Track not found with id " + id);
        }
        trackRepository.deleteById(id);
    }
}
