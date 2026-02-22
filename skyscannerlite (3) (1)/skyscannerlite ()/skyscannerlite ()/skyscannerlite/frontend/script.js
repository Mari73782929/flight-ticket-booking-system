// Your original script.js content - I'm keeping it exactly as you had
const BASE_URL = "http://localhost:8080/api";

/* ================= SEARCH FLIGHTS ================= */
async function searchFlights() {
    const source = document.getElementById("searchSource").value.trim();
    const destination = document.getElementById("searchDestination").value.trim();

    if (!source || !destination) {
        alert("Enter Source and Destination");
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:8080/api/flights/search?source=${source}&destination=${destination}`
        );

        if (!response.ok) throw new Error();

        const data = await response.json();

        if (data.length === 0) {
            document.getElementById("flightResults").innerHTML = "<h3>No Flights Found</h3>";
            return;
        }

        let output = `
        <table border="1" style="width:100%; border-collapse:collapse;">
            <tr>
                <th>Flight ID</th>
                <th>Flight No</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Seats</th>
            </tr>
        `;

        data.forEach(flight => {
            let seatInfo = "";

            if (flight.seats && flight.seats.length > 0) {
                flight.seats.forEach(seat => {
                    seatInfo += `
                        Seat: ${seat.seatNumber} 
                        (₹${seat.price}) 
                        - ${seat.booked ? "Booked ❌" : "Available ✅"}
                        <br>
                    `;
                });
            } else {
                seatInfo = "No Seats";
            }

            output += `
            <tr>
                <td>${flight.id}</td>
                <td>${flight.flightNumber}</td>
                <td>${flight.source}</td>
                <td>${flight.destination}</td>
                <td>${flight.date}</td>
                <td>${seatInfo}</td>
            </tr>
            `;
        });

        output += "</table>";
        document.getElementById("flightResults").innerHTML = output;

    } catch (error) {
        alert("Error Searching Flights");
        console.error(error);
    }
}

/* ================= ADD FLIGHT ================= */
async function addFlight() {
    const flightNumber = document.getElementById("flightNumber").value;
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const departureTime = document.getElementById("departureTime").value;
    const arrivalTime = document.getElementById("arrivalTime").value;

    if (!flightNumber || !source || !destination || !date || !departureTime || !arrivalTime) {
        alert("All fields required");
        return;
    }

    const flight = {
        flightNumber: flightNumber,
        source: source,
        destination: destination,
        date: date,
        departureTime: date + "T" + departureTime + ":00",
        arrivalTime: date + "T" + arrivalTime + ":00"
    };

    try {
        const response = await fetch(`${BASE_URL}/flights`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flight)
        });

        if (!response.ok) throw new Error();

        alert("Flight Added Successfully");

    } catch (error) {
        alert("Flight Add Failed");
    }
}
/* ================= DELETE FLIGHT ================= */
async function deleteFlight() {
    const id = document.getElementById("deleteFlightId").value;

    if (!id) {
        alert("Enter Flight ID");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/flights/${id}`, { method: "DELETE" });

        if (!response.ok) throw new Error();

        alert("Flight Deleted Successfully");

    } catch {
        alert("Flight Delete Failed");
    }
}

/* ================= ADD SEAT ================= */
async function addSeat() {
    const flightId = document.getElementById("seatFlightId").value;
    const seatNumber = document.getElementById("seatNumber").value;
    const price = document.getElementById("price") ? document.getElementById("price").value : 0;

    if (!flightId || !seatNumber) {
        alert("Flight ID and Seat Number required");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/seats/${flightId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                seatNumber: seatNumber,
                price: parseFloat(price)
            })
        });

        if (!response.ok) {
            const text = await response.text();
            alert("Error: " + text);
            return;
        }

        const data = await response.json();
        alert("Seat Added Successfully with ID: " + data.id);

    } catch (error) {
        alert("Server Error");
        console.error(error);
    }
}

/* ================= DELETE SEAT ================= */
async function deleteSeat() {
    const seatId = document.getElementById("deleteSeatId").value;

    if (!seatId) {
        alert("Enter Seat ID");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/seats/${seatId}`, { method: "DELETE" });

        if (!response.ok) throw new Error();

        alert("Seat Deleted Successfully");

    } catch {
        alert("Seat Delete Failed");
    }
}

/* ================= BOOK TICKET ================= */
async function bookTicket() {
    const flightId = document.getElementById("bookingFlightId").value;
    const seatId = document.getElementById("bookingSeatId").value;
    const passengerName = document.getElementById("passengerName").value;
    const passengerEmail = document.getElementById("passengerEmail").value;

    if (!flightId || !seatId || !passengerName || !passengerEmail) {
        alert("All fields required");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                flightId: parseInt(flightId),
                seatId: parseInt(seatId),
                passengerName,
                passengerEmail
            })
        });

        if (!response.ok) {
            const error = await response.text();
            alert(error);
            return;
        }

        const data = await response.json();
        alert("Booking Successful. Booking ID: " + data.id);

    } catch (error) {
        alert("Server Error");
    }
}

/* ================= CANCEL BOOKING ================= */
async function cancelBooking() {
    const id = document.getElementById("cancelBookingId").value;

    if (!id) {
        alert("Enter Booking ID");
        return;
    }

    const response = await fetch(`http://localhost:8080/api/bookings/${id}`, { method: "DELETE" });

    if (response.ok) {
        alert("Booking Cancelled Successfully");
    } else {
        alert("Cancel Failed");
    }
}

/* ================= VIEW BOOKINGS ================= */
async function viewBookings() {
    try {
        const response = await fetch("http://localhost:8080/api/bookings");

        if (!response.ok) throw new Error();

        const data = await response.json();

        let output = `
            <table border="1" style="width:100%; border-collapse:collapse;">
                <tr>
                    <th>Booking ID</th>
                    <th>Passenger</th>
                    <th>Email</th>
                    <th>Flight</th>
                    <th>Seat</th>
                </tr>
        `;

        data.forEach(b => {
            output += `
                <tr>
                    <td>${b.id}</td>
                    <td>${b.passengerName}</td>
                    <td>${b.passengerEmail}</td>
                    <td>${b.flight.flightNumber}</td>
                    <td>${b.seat.seatNumber}</td>
                </tr>
            `;
        });

        output += "</table>";
        document.getElementById("bookingResults").innerHTML = output;

    } catch (err) {
        alert("Error loading bookings");
        console.error(err);
    }
}