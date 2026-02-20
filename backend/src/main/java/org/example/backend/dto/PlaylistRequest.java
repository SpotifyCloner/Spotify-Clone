package org.example.backend.dto;

import lombok.Data;

@Data
public class PlaylistRequest {
    private String name;
    private Long userId;
}
