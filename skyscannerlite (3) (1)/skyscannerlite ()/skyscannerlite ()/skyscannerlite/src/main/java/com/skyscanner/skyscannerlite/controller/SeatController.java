package com.skyscanner.skyscannerlite.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skyscanner.skyscannerlite.entity.Seat;
import com.skyscanner.skyscannerlite.service.SeatService;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin("*")
public class SeatController {

    private final SeatService service;

    // ✔ Constructor Injection (Java 21 + Eclipse safe)
    public SeatController(SeatService service) {
        this.service = service;
    }

    @PostMapping("/{flightId}")
    public Seat addSeat(@PathVariable Long flightId,
                        @RequestBody Seat seat) {
        return service.add(flightId, seat);
    }

    @DeleteMapping("/{id}")
    public void deleteSeat(@PathVariable Long id) {
        service.delete(id);
    }
}