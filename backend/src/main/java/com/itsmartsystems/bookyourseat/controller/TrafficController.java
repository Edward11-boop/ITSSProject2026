package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.dto.RoutesOption;
import com.itsmartsystems.bookyourseat.dto.WeatherInfo;
import com.itsmartsystems.bookyourseat.model.Rezervare;
import com.itsmartsystems.bookyourseat.service.AiAssistantService;
import com.itsmartsystems.bookyourseat.service.AprobareRezervareService;
import com.itsmartsystems.bookyourseat.service.TrafficService;
import com.itsmartsystems.bookyourseat.service.WeatherService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class TrafficController {

    private final TrafficService trafficService;
    private final WeatherService weatherService;
    private final AiAssistantService aiAssistantService;
    private final AprobareRezervareService aprobareRezervareService;

    public TrafficController(TrafficService trafficService, WeatherService weatherService, AiAssistantService aiAssistantService, AprobareRezervareService aprobareRezervareService) {
        this.trafficService = trafficService;
        this.weatherService = weatherService;
        this.aiAssistantService = aiAssistantService;
        this.aprobareRezervareService = aprobareRezervareService;
    }

    public TrafficService getTrafficService() {
        return trafficService;
    }

    public WeatherService getWeatherService() {
        return weatherService;
    }

    public AiAssistantService getAiAssistantService() {
        return aiAssistantService;
    }

    @GetMapping("/traffic-routes")
    public List<RoutesOption> getRoutes(@RequestParam double lat, @RequestParam double lng) {
        return trafficService.getTrafficRoutes(lat, lng);
    }

    @GetMapping("/weather-test")
    public WeatherInfo getWeatherInfo(@RequestParam double latitude, @RequestParam double longitude, @RequestParam String targetHour) {
        LocalDateTime dateTime = LocalDateTime.parse(targetHour);
        return weatherService.getWeather(latitude, longitude, dateTime);
    }

    @GetMapping("/recommendation")
    public String getRecommendation(@RequestParam double lat, @RequestParam double lng, @RequestParam String targetHour) {
        LocalDateTime dateTime = LocalDateTime.parse(targetHour);
        return aiAssistantService.getRecommendation(lat, lng, dateTime);
    }

    @PutMapping("/rezervari/{id}/aproba")
    public Rezervare aprobaRezervare(@PathVariable String id) {
        return aprobareRezervareService.aprobaRezervare(id);
    }
}
