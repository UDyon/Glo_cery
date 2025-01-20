package com.rehappy.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class GooglePlacesController {

    @Value("${google.places.api.key}")
    private String googlePlacesApiKey;

    @GetMapping("/api/nearby-hospitals")
    public String getNearbyHospitals(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam String keyword
    ) {
        String url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
                + "?location=" + lat + "," + lng
                + "&radius=5000"
                + "&type=hospital"
                + "&keyword=" + keyword
                + "&language=ko"
                + "&key=" + googlePlacesApiKey;

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}
