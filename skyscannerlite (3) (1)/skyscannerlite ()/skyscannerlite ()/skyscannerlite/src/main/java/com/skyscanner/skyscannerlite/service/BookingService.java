package com.skyscanner.skyscannerlite.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skyscanner.skyscannerlite.dto.BookingDTO;
import com.skyscanner.skyscannerlite.entity.Booking;
import com.skyscanner.skyscannerlite.entity.Seat;
import com.skyscanner.skyscannerlite.entity.Flight;
import com.skyscanner.skyscannerlite.repository.BookingRepository;
import com.skyscanner.skyscannerlite.repository.FlightRepository;
import com.skyscanner.skyscannerlite.repository.SeatRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;
    private final SeatRepository seatRepo;
    private final FlightRepository flightRepo;

    public BookingService(BookingRepository bookingRepo,
                          SeatRepository seatRepo,
                          FlightRepository flightRepo) {
        this.bookingRepo = bookingRepo;
        this.seatRepo = seatRepo;
        this.flightRepo = flightRepo;
    }

    public Booking book(BookingDTO dto) {

        Flight flight = flightRepo.findById(dto.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        Seat seat = seatRepo.findById(dto.getSeatId())
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        if (seat.getBooked()) {
            throw new RuntimeException("Already Booked");
        }

        Booking booking = new Booking();
        booking.setFlight(flight);
        booking.setSeat(seat);
        booking.setPassengerName(dto.getPassengerName());
        booking.setPassengerEmail(dto.getPassengerEmail());

        seat.setBooked(true);
        seatRepo.save(seat);

        return bookingRepo.save(booking);
    }

    public void cancel(Long id) {
        bookingRepo.deleteById(id);
    }

    public List<Booking> getAll() {
        return bookingRepo.findAll();
    }
}