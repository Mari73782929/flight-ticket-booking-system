package com.skyscanner.skyscannerlite.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class FlightDTO {

    public String flightNumber;
    public String source;
    public String destination;
    public LocalDate date;
    public LocalDateTime departureTime;
    public LocalDateTime arrivalTime;
}