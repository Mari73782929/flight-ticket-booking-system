package com.skyscanner.skyscannerlite.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skyscanner.skyscannerlite.dto.BookingDTO;
import com.skyscanner.skyscannerlite.entity.Booking;
import com.skyscanner.skyscannerlite.entity.Seat;
import com.skyscanner.skyscannerlite.entity.Flight;
import com.skyscanner.skyscannerlite.repository.BookingRepository;
import com.skyscanner.skyscannerlite.repository.SeatRepository;
import com.skyscanner.skyscannerlite.repository.FlightRepository;

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

    // ✅ BOOK TICKET
    public Booking book(BookingDTO dto) {

        // 🔎 Find Flight
        Flight flight = flightRepo.findById(dto.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        // 🔎 Find Seat
        Seat seat = seatRepo.findById(dto.getSeatId())
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        // 🚨 Check seat belongs to selected flight
        if (!seat.getFlight().getId().equals(flight.getId())) {
            throw new RuntimeException("Seat does not belong to this flight");
        }

        // 🚨 Check already booked
        if (seat.getBooked()) {
            throw new RuntimeException("Already Booked");
        }

        // ✅ Mark seat as booked
        seat.setBooked(true);
        seatRepo.save(seat);

        // ✅ Create Booking
        Booking booking = new Booking();
        booking.setFlight(flight);
        booking.setSeat(seat);
        booking.setPassengerName(dto.getPassengerName());
        booking.setPassengerEmail(dto.getPassengerEmail());

        return bookingRepo.save(booking);
    }

    // ✅ CANCEL BOOKING
    public void cancel(Long id) {

        Booking booking = bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // 🔄 Free the seat
        Seat seat = booking.getSeat();
        seat.setBooked(false);
        seatRepo.save(seat);

        bookingRepo.delete(booking);
    }

    // ✅ GET ALL BOOKINGS
    public List<Booking> getAll() {
        return bookingRepo.findAll();
    }
}
