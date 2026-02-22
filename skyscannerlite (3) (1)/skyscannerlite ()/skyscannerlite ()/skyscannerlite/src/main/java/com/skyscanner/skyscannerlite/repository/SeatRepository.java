package com.skyscanner.skyscannerlite.repository;

import com.skyscanner.skyscannerlite.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {
}