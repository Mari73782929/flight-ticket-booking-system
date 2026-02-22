package com.skyscanner.skyscannerlite.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.skyscanner.skyscannerlite.entity.Flight;
import com.skyscanner.skyscannerlite.repository.FlightRepository;

@Service
public class FlightService {

    private final FlightRepository repo;

    public FlightService(FlightRepository repo) {
        this.repo = repo;
    }

    // ✅ ADD FLIGHT
    public Flight add(Flight flight) {

        if (flight.getFlightNumber() != null)
            flight.setFlightNumber(flight.getFlightNumber().trim());

        if (flight.getSource() != null)
            flight.setSource(flight.getSource().trim());

        if (flight.getDestination() != null)
            flight.setDestination(flight.getDestination().trim());

        return repo.save(flight);
    }

    // ✅ DELETE FLIGHT
    public void delete(Long id) {
        repo.deleteById(id);
    }

    // ✅ SEARCH FLIGHT (Using JPQL method)
    public List<Flight> search(String source, String destination) {
        return repo.searchFlights(source.trim(), destination.trim());
    }

    // ✅ GET ALL FLIGHTS
    public List<Flight> getAllFlights() {
        return repo.findAll();
    }
}