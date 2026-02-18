export interface TripData {
    source: string;
  destination: string;
  people: string;
  travelers: number;
  budget: string;
  duration: number;
  specialRequests: string;
}

export interface TravelPlan {
  hotel: {
    name: string;
    imageurl: string;
    geocoordinates: {
      lat: number;
      lng: number;
    };
    price: {
      total: string;
      per_night: string;
      currency: string;
    };
    link: string;
  }[];

  how_to_reach: {
    train: {
      source_station: string;
      dest_station: string;
      departure_time: string;
      arrival_time: string;
      total_time: string;
    }[];
    car: {
      distance: string;
      time: string;
    };
    flights: {
      source_airport: string;
      dest_airport: string;
      departure_time: string;
      arrival_time: string;
      total_time: string;
    }[];
  };

  tovisit: {
    name: string;
    imageurl: string;
    geocoordinates: {
      lat: number;
      lng: number;
    };
    notes: string;
  }[];

  youtubeguide: {
    title: string;
    thumbnail: string;
    link: string;
  }[];

  itinerary: {
    place: string;
    imageurl: string;
    timetovisit: string;
  }[][];
}
