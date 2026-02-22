package com.skyscanner.skyscannerlite.repository;

import com.skyscanner.skyscannerlite.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    @Query("SELECT f FROM Flight f WHERE LOWER(TRIM(f.source)) = LOWER(TRIM(:source)) AND LOWER(TRIM(f.destination)) = LOWER(TRIM(:destination))")
    List<Flight> searchFlights(@Param("source") String source,
                               @Param("destination") String destination);
}