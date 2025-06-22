const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAi = new GoogleGenerativeAI(apiKey);

const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-flash',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",

};



    export const chatSession = model.startChat({
        generationConfig,
        history: [

              {
    role: 'user',
    parts: [
      {
        text: `Generate Travel Plan for Location: Roma, Roma Capitale, Lazio, Italia, for 3 Days and 2 Night for Just Me with a Cheap budget with a Flight details, Flight Price with Booking url, Hostels options list with HotelName,Hotel address, Price, hotel image url (must be a valid direct image URL from the web, no placeholders), geo cordinates, rating descriptions and Places to visit with placeName, Place Details, Place Image Url (actual image from the web, do not return "Image URL (Find online)"), Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit in JSON format`
      }
    ]
  },
  {
    role: 'model',
    parts: [
      {
        text: `I cannot provide real-time flight and hotel booking information, including URLs and prices, as these are dynamically changing. My capabilities are limited to generating text-based content. To find the best flight and accommodation deals, you'll need to use online travel agencies like Skyscanner, Kayak, Booking.com, Hostelworld, etc.

However, I can provide you with a sample 3-day/2-night budget travel plan for Rome. You will need to fill in the specific flight and accommodation details yourself using the websites mentioned above.

\`\`\`json
{
  "tripDetails": {
    "location": "Roma, Roma Capitale, Lazio, Italia",
    "totalDays": 3,
    "totalNights": 2,
    "budget": "cheap",
    "travelerCount": 1
  },
  "flights": [
    {
      "airline": "Your Airline",
      "flightNumber": "Your Flight Number",
      "departureAirport": "Your Departure Airport",
      "arrivalAirport": "Fiumicino Airport (FCO) or Ciampino Airport (CIA)",
      "departureDate": "YYYY-MM-DD",
      "returnDate": "YYYY-MM-DD",
      "price": "Your Price (Find on Skyscanner, Kayak etc.)",
      "bookingUrl": "Your Booking URL (After booking)"
    }
  ],
  "accommodation": [
    {
      "hotelName": "Hostel Name 1",
      "hotelAddress": "Hostel Address 1",
      "pricePerNight": "Your Price (Find on Hostelworld, Booking.com etc.)",
      "hotelImageUrl": "Your Image URL (Find on booking sites)",
      "geoCoordinates": "[Latitude, Longitude]", 
      "rating": "Rating (e.g., 4.0 stars)",
      "description": "Hostel Description" 
    },
    {
      "hotelName": "Hostel Name 2",
      "hotelAddress": "Hostel Address 2",
      "pricePerNight": "Your Price (Find on Hostelworld, Booking.com etc.)",
      "hotelImageUrl": "Your Image URL (Find on booking sites)",
      "geoCoordinates": "[Latitude, Longitude]",
      "rating": "Rating (e.g., 3.5 stars)",
      "description": "Hostel Description"
    }
  ],
  "itinerary": {
    "day1": {
      "date": "YYYY-MM-DD",
      "placesToVisit": [
        {
          "placeName": "Colosseum & Roman Forum",
          "placeDetails": "Iconic amphitheater and ruins of ancient Rome.",
          "placeImageUrl": "Image URL (Find online)",
          "geoCoordinates": "[Latitude, Longitude]",
          "ticketPricing": "Your Price (Check online)",
          "travelTime": "3-4 hours"
        },
        {
          "placeName": "Palatine Hill",
          "placeDetails": "One of the seven hills of Rome, offering panoramic views.",
          "placeImageUrl": "Image URL (Find online)",
          "geoCoordinates": "[Latitude, Longitude]",
          "ticketPricing": "Included with Colosseum ticket or separate price",
          "travelTime": "1-2 hours"
        }
      ]
    },
    "day2": {
      "date": "YYYY-MM-DD",
      "placesToVisit": [
        {
          "placeName": "Vatican City (St. Peter's Basilica & Vatican Museums)",
          "placeDetails": "The smallest country in the world, home to St. Peter's Basilica and the Sistine Chapel.",
          "placeImageUrl": "Image URL (Find online)",
          "geoCoordinates": "[Latitude, Longitude]",
          "ticketPricing": "Your Price (Check online, book in advance!)",
          "travelTime": "4-5 hours (easily takes longer)"
        },
        {
          "placeName": "Castel Sant'Angelo",
          "placeDetails": "Ancient mausoleum with stunning views from the top.",
          "placeImageUrl": "Image URL (Find online)",
          "geoCoordinates": "[Latitude, Longitude]",
          "ticketPricing": "Your Price (Check online)",
          "travelTime": "2 hours"
        }
      ]
    },
    "day3": {
      "date": "YYYY-MM-DD",
      "placesToVisit": [
        {
          "placeName": "Trevi Fountain",
          "placeDetails": "Famous Baroque fountain; toss a coin to ensure your return!",
          "placeImageUrl": "Image URL (Find online)",
          "geoCoordinates": "[Latitude, Longitude]",
          "ticketPricing": "Free",
          "travelTime": "30 minutes"
        },
        {
          "placeName": "Pantheon",
          "placeDetails": "Ancient Roman temple, now a church.",
          "placeImageUrl": "Image URL (Find online)",
          "geoCoordinates": "[Latitude, Longitude]",
          "ticketPricing": "Free",
          "travelTime": "1 hour"
        },
        {
          "placeName": "Piazza Navona",
          "placeDetails": "Lively square with beautiful fountains and street artists.",
          "placeImageUrl": "Image URL (Find online)",
          "geoCoordinates": "[Latitude, Longitude]",
          "ticketPricing": "Free",
          "travelTime": "1-2 hours"
        }
      ]
    }
  }
}
\`\`\`

Remember to replace the placeholder values with your actual information. Research the best times to visit each site to avoid crowds and heat. Enjoy your trip to Rome!`
      }
    ]
  },
  {
    role: 'user',
    parts: [
      {
        text: 'INSERT_INPUT_HERE'
      }
    ]
  }
],
        
    });

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE")
// console.log(result.response.text());

