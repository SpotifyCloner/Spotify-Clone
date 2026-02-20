package org.example.backend.service;

import org.example.backend.dto.SongDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import tools.jackson.databind.JsonNode;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class YouTubeService {


    private String apiKey = "AIzaSyAj3meYZzhpY3LtcztOdwqHzDC-x5biiJg";

    private final RestClient restClient = RestClient.create();

    public List<SongDTO> searchSongs(String query) {
        String url = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q="
                + query + "&key=" + apiKey;

        // In a real MVP, you'd parse the complex Google JSON response here
        // For now, we fetch the data and map it to our SongDTO
        var response = restClient.get()
                .uri(url)
                .retrieve()
                .body(JsonNode.class);

        return StreamSupport.stream(response.get("items").spliterator(), false)
                .map(item -> new SongDTO(
                        item.get("id").get("videoId").asText(),
                        item.get("snippet").get("title").asText(),
                        item.get("snippet").get("channelTitle").asText(),
                        item.get("snippet").get("thumbnails").get("default").get("url").asText()
                )).toList();
    }
}
