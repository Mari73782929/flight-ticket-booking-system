package com.skyscanner.skyscannerlite.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skyscanner.skyscannerlite.entity.Flight;
import com.skyscanner.skyscannerlite.service.FlightService;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin("*")
public class FlightController {

    private final FlightService service;

    // ✔ Constructor Injection (Best Practice)
    public FlightController(FlightService service) {
        this.service = service;
    }

    @GetMapping("/search")
    public List<Flight> searchFlights(
            @RequestParam String source,
            @RequestParam String destination) {

        return service.search(source, destination);
    }

    @PostMapping
    public Flight add(@RequestBody Flight flight) {
        System.out.println("Flight received: " + flight);
        return service.add(flight);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    @GetMapping
    public List<Flight> getAllFlights() {
        return service.getAllFlights();
    }
}