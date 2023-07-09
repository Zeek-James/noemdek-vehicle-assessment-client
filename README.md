Vehicle Schedule App API Documentation

This API documentation provides information about the endpoints and data structures used in the Vehicle Schedule App.

Base URL
The base URL for all API endpoints is: http://localhost:3440

Endpoint
GET /vehicles

Retrieve the list of vehicles with their schedules.

Response

Status Code: 200 (OK)
Response Body:

[
{
"id": 1,
"schedules": [
{
"startDate": "2023-07-09",
"endDate": "2023-07-09",
"startTime": "09:00 AM",
"endTime": "11:00 AM",
"driver": "Wisdom Ademola",
"client": "Clinton",
"clientsCompany": "British Petroleum",
"service": "Full Dental Rental",
"pickUpLocation": "Zuma Close, Osborne Phase 1 Estate, Ikoyi",
"dropOffLocation": "Same as Pickup Location",
"createdBy": "Adekunle Ajasin"
},
// More schedule objects...
],
"status": true,
"size": "Full Size SUV",
"brand": "Lexus GLS 500"
},
// More vehicle objects...
]

Data Structures
VehicleProps

id: number (The unique identifier for the vehicle)
status: boolean (The availability status of the vehicle)
size: string (The size or type of the vehicle)
brand: string (The brand or model of the vehicle)
schedules: ScheduleProps[] (An array of schedule objects associated with the vehicle)

ScheduleProps

startDate: string (The start date of the schedule in YYYY-MM-DD format)
endDate: string (The end date of the schedule in YYYY-MM-DD format)
startTime: string (The start time of the schedule)
endTime: string (The end time of the schedule)
driver: string (The name of the driver assigned to the schedule)
client: string (The name of the client associated with the schedule)
clientsCompany: string (The company name of the client)
service: string (The type of service or rental)
pickUpLocation: string (The pick-up location for the schedule)
dropOffLocation: string (The drop-off location for the schedule)
createdBy: string (The name of the user who created the schedule)
