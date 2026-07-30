package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.dto.RoutesOption;
import com.itsmartsystems.bookyourseat.dto.WeatherInfo;
import com.itsmartsystems.bookyourseat.service.TrafficService;
import com.itsmartsystems.bookyourseat.service.WeatherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class TrafficController {

    private final TrafficService trafficService ;
    private final WeatherService weatherService;
    public TrafficController(TrafficService trafficService, WeatherService weatherService)
    {
        this.trafficService = trafficService;
        this.weatherService = weatherService;
    }
    public TrafficService getTrafficService() {
        return trafficService;
    }
    public WeatherService getWeatherService() {return weatherService;}

    @GetMapping("/traffic-routes")
    public List<RoutesOption> getRoutes(@RequestParam double lat , @RequestParam double lng)
    {
        return trafficService.getTrafficRoutes(lat, lng);
    }

    @GetMapping("/weather-test")
    public WeatherInfo getWeatherInfo(@RequestParam double latitude , @RequestParam double longitude , @RequestParam String targetHour)
    {
        LocalDateTime dateTime = LocalDateTime.parse(targetHour);
        return weatherService.getWeather(latitude , longitude , dateTime);
    }


}
