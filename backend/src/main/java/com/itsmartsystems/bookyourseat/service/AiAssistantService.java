package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.dto.RoutesOption;
import com.itsmartsystems.bookyourseat.dto.WeatherInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiAssistantService {




    @Value("${openai.api.key}")
    private String apiKey ;

    private final RestTemplate restTemplate;
    private final TrafficService trafficService;
    private final WeatherService weatherService;

    public AiAssistantService(RestTemplate restTemplate, TrafficService trafficService, WeatherService weatherService)
    {
        this.restTemplate = restTemplate;
        this.trafficService = trafficService;
        this.weatherService = weatherService;
    }

    public String getRecommendation(double latOrigin, double longOrigin, LocalDateTime targetHour)
    {


        List<RoutesOption> routes = trafficService.getTrafficRoutes(latOrigin, longOrigin);
        WeatherInfo  weather = weatherService.getWeather(latOrigin, longOrigin , targetHour);

        String prompt = "Un angajat vrea să ajungă la birou (sediul ITSS din București) la ora "
                + targetHour + ". Iată rutele disponibile, calculate cu trafic real:\n"
                + routes.toString()
                + "\n\nIată prognoza meteo pentru momentul plecării:\n"
                + "Temperatură: " + weather.getTemperature() + "°C\n"
                + "Viteza vântului: " + weather.getWindSpeed() + " km/h\n"
                + "Precipitații: " + weather.getPrecipitation() + " mm\n"
                + "Ninsoare: " + weather.getSnowfall() + " cm\n"
                + "Cod meteo: " + weather.getWeatherCode() + "\n\n"
                + "Recomandă ruta cea mai rapidă, explicând pe scurt de ce. "
                + "Dacă observi condiții meteo EXTREME (furtună, ninsoare abundentă, "
                + "vânt foarte puternic, ploaie torențială, căldură sau frig extrem), "
                + "începe răspunsul cu '⚠️ ALERTĂ METEO:' și avertizează clar utilizatorul. "
                + "Altfel, menționează vremea pe scurt, normal, fără alarmism. "
                + "Răspunde în română, concis, într-un paragraf .";
        HashMap<String , Object> message = new HashMap<>();
        message.put("role","user");
        message.put("content" , prompt);

        HashMap<String , Object> request = new HashMap<>();
        request.put("model","gpt-4o-mini");
        request.put("messages" , List.of(message));

        // Construim headerul
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization" , "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Combinam CEREREA + HEADERUL intr o ENTITATE ( fimpachetam metodele frumos )
        HttpEntity entity = new HttpEntity<>(request, headers);

        // Acum setam HTTP METHOD
        ResponseEntity<Map> requestAi = restTemplate.postForEntity("https://api.openai.com/v1/chat/completions" , entity, Map.class);

        // Luam fiecare camp din raspuns
        Map<String , Object> body = requestAi.getBody();
        List<Map<String, Object>> choices =(List<Map<String, Object>>) body.get("choices");
        Map<String, Object> firstChoice = choices.get(0);
        Map<String, Object> messageResponse = (Map<String, Object>) firstChoice.get("message");
        String content = (String) messageResponse.get("content");
        return content;

    }
}
