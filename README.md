## **AI Travel Planner**

AI Travel Planner is a informational mobile applicatio made in React Native using Expo v50 and 
the React Native Elements UI framework.For internal state management it uses useState hook from React,
Fetch API for fetching data from Nominatim(OpenStreetMap), Unsplash API for generating the image for searched place,
Expo Router for page routing and Firebase for user authentication and saving the results from generate plan. 
It is also use the Gemini 1.5 model for generating the plan based on the name of city.



# **Features**
- Custom UI elements
- Folder based routing
- State management
- Reusable components for inputs, buttons
- User authentication using Firebase (Login and Register)
- Navigation between screens using React Navigation
- Options for choosing the budget, number of people and days (CalendarPicker)
- Searching city using Nominatim(OpenStreetMap) API
- Generate image for place with Unsplash API
- Integration of AI - Gemini 1.5 model
- Location-based suggestions (e.g., nearby attractions)
- Generate travel plan based on user preferences and AI analysis


# **Design Patterns**

- Component-Based Architecture: UI elements are separated into reusable and independent components for better application functionality.
- Singleton: for user authentication with Firebase and generate plan with AI model
- Custom Hooks: used for state management,reusable stateful logic, fetching data from external API
- Navigation: using stack navigation to enable smooth transitions between main screens and detail views

