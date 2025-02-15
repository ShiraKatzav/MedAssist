package com.example.demo.service;

import java.io.*;
import java.net.*;
import org.json.*;



public class DistanceMatrix {

    private static final String API_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";
    private static final String API_KEY = "";

    // שליחת בקשה ל-Google Maps Distance Matrix API
    public static JSONObject getDistance(String origin, String destination) throws IOException {
        String urlString = API_URL + "?origins=" + URLEncoder.encode(origin, "UTF-8") +
                "&destinations=" + URLEncoder.encode(destination, "UTF-8") +
                "&key=" + API_KEY;

        // שליחה של הבקשה ל-API
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        // פענוח התשובה ל-JSON
        return new JSONObject(response.toString());
    }

}