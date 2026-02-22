package com.skyscanner.skyscannerlite.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skyscanner.skyscannerlite.dto.BookingDTO;
import com.skyscanner.skyscannerlite.entity.Booking;
import com.skyscanner.skyscannerlite.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    private final BookingService service;

    // ✔ Constructor Injection (Best for Java 21 + Eclipse)
    public BookingController(BookingService service) {
        this.service = service;
    }

   
    @PostMapping
    public Booking book(@RequestBody BookingDTO dto) {
        return service.book(dto);
    }
    @DeleteMapping("/{id}")
    public void cancel(@PathVariable Long id) {
        service.cancel(id);
    }

    @GetMapping
    public List<Booking> all() {
        return service.getAll();
    }
}