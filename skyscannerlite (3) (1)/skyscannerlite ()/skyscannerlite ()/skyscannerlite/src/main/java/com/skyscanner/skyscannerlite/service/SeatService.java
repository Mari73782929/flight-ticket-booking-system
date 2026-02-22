package com.skyscanner.skyscannerlite.service;

import org.springframework.stereotype.Service;

import com.skyscanner.skyscannerlite.entity.Flight;
import com.skyscanner.skyscannerlite.entity.Seat;
import com.skyscanner.skyscannerlite.repository.FlightRepository;
import com.skyscanner.skyscannerlite.repository.SeatRepository;

@Service
public class SeatService {

    private final SeatRepository seatRepo;
    private final FlightRepository flightRepo;

    // ✔ Constructor Injection (No Lombok)
    public SeatService(SeatRepository seatRepo,
                       FlightRepository flightRepo) {
        this.seatRepo = seatRepo;
        this.flightRepo = flightRepo;
    }

    public Seat add(Long flightId, Seat seat) {

        Flight flight = flightRepo.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        seat.setFlight(flight);
        seat.setBooked(false);

        return seatRepo.save(seat);
    }

    public void delete(Long id) {
        seatRepo.deleteById(id);
    }
}