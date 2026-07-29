package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.dto.RoutesOption;
import com.itsmartsystems.bookyourseat.service.TrafficService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TrafficController {

    private final TrafficService trafficService ;
    public TrafficController(TrafficService trafficService) {this.trafficService = trafficService;}
    public TrafficService getTrafficService() {
        return trafficService;
    }

    @GetMapping("/traffic-routes")
    public List<RoutesOption> getRoutes(@RequestParam double lat , @RequestParam double lng)
    {
        return trafficService.getTrafficRoutes(lat, lng);
    }
}
