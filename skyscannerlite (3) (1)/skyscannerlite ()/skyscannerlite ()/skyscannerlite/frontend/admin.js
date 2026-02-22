const BASE_URL = "http://localhost:8080/api";

// Admin Login
function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Simple authentication (you can change credentials)
    if (username === 'admin' && password === 'admin123') {
        document.getElementById('adminLoginSection').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadAdminStats();
    } else {
        alert('Invalid credentials! Use admin/admin123');
    }
}

function adminLogout() {
    document.getElementById('adminLoginSection').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
}

// Load Admin Stats
async function loadAdminStats() {
    try {
        // Load flights count
        const flightsResponse = await fetch(`${BASE_URL}/flights`);
        if (flightsResponse.ok) {
            const flights = await flightsResponse.json();
            document.getElementById('totalFlights').textContent = flights.length;
        }
        
        // Load bookings
        const bookingsResponse = await fetch(`${BASE_URL}/bookings`);
        if (bookingsResponse.ok) {
            const bookings = await bookingsResponse.json();
            document.getElementById('totalBookings').textContent = bookings.length;
            
            // Calculate total seats (rough estimate)
            let totalSeats = 0;
            const flights = await flightsResponse.json();
            flights.forEach(flight => {
                if (flight.seats) totalSeats += flight.seats.length;
            });
            document.getElementById('totalSeats').textContent = totalSeats;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// ADD FLIGHT
async function addFlight() {
    const flightNumber = document.getElementById("flightNumber").value;
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const departureTime = document.getElementById("departureTime").value;
    const arrivalTime = document.getElementById("arrivalTime").value;
    const date = document.getElementById("date").value;

    console.log({
        flightNumber,
        source,
        destination,
        date,
        departureTime,
        arrivalTime
    });

    if (!flightNumber || !source || !destination || !departureTime || !arrivalTime || !date) {
        alert("All fields required");
        return;
    }

    const flight = {
        flightNumber: flightNumber,
        source: source,
        destination: destination,
        date: date,  // ✅ Correct
        departureTime: departureTime + ":00",
        arrivalTime: arrivalTime + ":00"
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
        console.error(error);
    }
}

// DELETE FLIGHT
async function deleteFlight() {
    const id = document.getElementById("deleteFlightId").value;

    if (!id) {
        alert("Enter Flight ID");
        return;
    }

    if (!confirm(`Are you sure you want to delete Flight ID: ${id}?`)) {
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/flights/${id}`, { method: "DELETE" });

        if (!response.ok) throw new Error();

        alert("✅ Flight Deleted Successfully");
        loadAdminStats();
        document.getElementById("deleteFlightId").value = '';

    } catch {
        alert("❌ Flight Delete Failed");
    }
}

// ADD SEAT/*
async function addSeat() {
    const flightId = document.getElementById("seatFlightId").value;
    const seatNumber = document.getElementById("seatNumber").value;
    const price = document.getElementById("price").value || 0;

    if (!flightId || !seatNumber) {
        alert("Flight ID and Seat Number required");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/seats/${flightId}`, {
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
        alert(`✅ Seat Added Successfully with ID: ${data.id}`);
        loadAdminStats();
        
        // Clear form
        document.getElementById("seatFlightId").value = '';
        document.getElementById("seatNumber").value = '';
        document.getElementById("price").value = '';

    } catch (error) {
        alert("❌ Server Error");
        console.error(error);
    }
}

// DELETE SEAT
async function deleteSeat() {
    const seatId = document.getElementById("deleteSeatId").value;

    if (!seatId) {
        alert("Enter Seat ID");
        return;
    }

    if (!confirm(`Are you sure you want to delete Seat ID: ${seatId}?`)) {
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/seats/${seatId}`, { method: "DELETE" });

        if (!response.ok) throw new Error();

        alert("✅ Seat Deleted Successfully");
        loadAdminStats();
        document.getElementById("deleteSeatId").value = '';

    } catch {
        alert("❌ Seat Delete Failed");
    }
}

// VIEW ALL BOOKINGS
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
                    <th>Email</th>
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
                    <td>${b.passengerEmail}</td>
                    <td>${b.flight ? b.flight.flightNumber : 'N/A'}</td>
                    <td>${b.seat ? b.seat.seatNumber : 'N/A'}</td>
                    <td><span style="color: green;">✓ Booked</span></td>
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