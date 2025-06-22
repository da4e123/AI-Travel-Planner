
export const SelectTravelesList = [
    {
        id:1,
        title:'Just Me',
        desc:'A solo traveler in exploraiton',
        icon: '✈️',
        people:'1', 
    },
    {
        id:2,
        title:'Couple',
        desc:'Two travelers in tandem',
        icon: '🍷',
        people:'2 People', 
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving family',
        icon: '👨‍👩‍👧‍👦',
        people:'3 to 5 People', 
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon: '🧑‍🤝‍🧑',
        people:'5 to 10 People', 
    },
    

]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay consicious of costs',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don\'t worry about cost',
        icon: '💸',
    }
]

export const AirlinesList = [
  { name: 'Turkish Airlines', code: 'TK', bookingUrl: 'https://www.turkishairlines.com' },
  { name: 'Wizz Air', code: 'W6', bookingUrl: 'https://wizzair.com' },
  { name: 'Lufthansa', code: 'LH', bookingUrl: 'https://lufthansa.com' },
  { name: 'Qatar Airways', code: 'QR', bookingUrl: 'https://qatarairways.com' },
  { name: 'Ryanair', code: 'FR', bookingUrl: 'https://www.ryanair.com' }
];

// export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {totalDays} Days and {totalNights} Night for {traveler} with a {budget} budget with photo reference for that place, a Flight details, Flight Price with Booking url, Hostels options list with HotelName,Hotel address, Price, hotel image url, geo cordinates, rating descriptions and Places to visit with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit in JSON format"

export const AI_PROMPT = `
Generate a Travel Plan for:

- Location: {location}
- Duration: {totalDays} Days and {totalNights} Nights
- Traveler Type: {traveler}
- Budget: {budget}

The plan should include:

1. 📸 A photo reference for the destination.
2. ✈️ Flight details:
   - Airline name (choose random from AirlinesList that is above)
   - Departure & arrival airports
   - Approximate price 
   - Booking URL (can be sample or popular site)
3. 🏨 Hostels/Hotel options(3 options):
   - Hotel name
   - Address
   - Approximate price per night
   - Hotel image URL (preferably from Google Maps or Booking.com if available)
   - Geo coordinates
   - Rating & short description
4. 📅 Day-by-day itinerary and places to visit for each of the {totalDays}:
   - Place name
   - Place description
   - Place image URL
   - Geo coordinates
   - Ticket pricing (estimated)
   - Time to travel to/from each place
   - Best time to visit each place per day

Please return the entire response in **JSON format** with structured fields. Use approximate or average pricing where exact data is not available.
`;
