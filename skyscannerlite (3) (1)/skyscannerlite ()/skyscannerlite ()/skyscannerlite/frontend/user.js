const BASE_URL = "http://localhost:8080/api";

// SEARCH FLIGHTS
async function searchFlights() {
    const source = document.getElementById("searchSource").value.trim();
    const destination = document.getElementById("searchDestination").value.trim();

    if (!source || !destination) {
        alert("Enter Source and Destination");
        return;
    }

    try {
        const response = await fetch(
            `${BASE_URL}/flights/search?source=${source}&destination=${destination}`
        );

        if (!response.ok) throw new Error();

        const data = await response.json();

        if (data.length === 0) {
            document.getElementById("flightResults").innerHTML = "<h3>No Flights Found</h3>";
            return;
        }

        let output = `
            <table>
                <tr>
                    <th>Flight No</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Available Seats</th>
                </tr>
        `;

        data.forEach(flight => {
            let availableSeats = 0;
            if (flight.seats && flight.seats.length > 0) {
                availableSeats = flight.seats.filter(seat => !seat.booked).length;
            }

            output += `
                <tr>
                    <td>${flight.flightNumber}</td>
                    <td>${flight.source}</td>
                    <td>${flight.destination}</td>
                    <td>${flight.date}</td>
                    <td>${flight.departureTime || 'N/A'}</td>
                    <td>${flight.arrivalTime || 'N/A'}</td>
                    <td>${availableSeats}</td>
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

// BOOK TICKET
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
        const response = await fetch(`${BASE_URL}/bookings`, {
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
        alert(`✅ Booking Successful!\nBooking ID: ${data.id}`);
        
        // Send WhatsApp confirmation
     
        
        // Clear form
        document.getElementById("bookingFlightId").value = '';
        document.getElementById("bookingSeatId").value = '';
        document.getElementById("passengerName").value = '';
        document.getElementById("passengerEmail").value = '';

    } catch (error) {
        alert("❌ Server Error");
    }
}

// CANCEL BOOKING
async function cancelBooking() {
    const id = document.getElementById("cancelBookingId").value;

    if (!id) {
        alert("Enter Booking ID");
        return;
    }

    if (!confirm(`Are you sure you want to cancel Booking ID: ${id}?`)) {
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/bookings/${id}`, { method: "DELETE" });

        if (response.ok) {
            alert("✅ Booking Cancelled Successfully");
            document.getElementById("cancelBookingId").value = '';
            
            // Send WhatsApp notification
            const message = `*Booking Cancelled*%0A%0A*Booking ID:* ${id}%0A*Status:* Cancelled`;
            window.open(`https://wa.me/918072817958?text=${message}`, '_blank');
        } else {
            alert("❌ Cancel Failed");
        }
    } catch (error) {
        alert("❌ Server Error");
    }
}

// VIEW MY BOOKINGS
async function viewBookings() {
    try {
        const response = await fetch(`${BASE_URL}/bookings`);

        if (!response.ok) throw new Error();

        const data = await response.json();

        if (data.length === 0) {
            document.getElementById("bookingResults").innerHTML = "<h3>No Bookings Found</h3>";
            return;
        }

        let output = `
            <table>
                <tr>
                    <th>Booking ID</th>
                    <th>Passenger</th>
                    <th>Flight</th>
                    <th>Seat</th>
                    <th>Status</th>
                </tr>
        `;

        data.forEach(b => {
            output += `
                <tr>
                    <td>${b.id}</td>
                    <td>${b.passengerName}</td>
                    <td>${b.flight ? b.flight.flightNumber : 'N/A'}</td>
                    <td>${b.seat ? b.seat.seatNumber : 'N/A'}</td>
                    <td><span style="color: green;">✓ Confirmed</span></td>
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