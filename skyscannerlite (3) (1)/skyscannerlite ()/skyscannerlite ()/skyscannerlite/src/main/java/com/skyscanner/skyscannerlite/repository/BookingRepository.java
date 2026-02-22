package com.skyscanner.skyscannerlite.repository;

import com.skyscanner.skyscannerlite.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}