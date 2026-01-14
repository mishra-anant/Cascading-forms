import { useState } from "react";
import "./App.css";
import { Country, State, City } from "country-state-city";

export default function App() {
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);

    if (countryCode) {
      const fetchedStates = State.getStatesOfCountry(countryCode);
      setStates(fetchedStates);
    } else {
      setStates([]);
    }

    // reset lower fields
    setSelectedState(null);
    setCities([]);
    setSelectedCity(null);
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);

    if (stateCode && selectedCountry) {
      const fetchedCities = City.getCitiesOfState(selectedCountry, stateCode);
      setCities(fetchedCities);
    } else {
      setCities([]);
    }

    setSelectedCity(null);
  };

  return (
    <div className="container">
      <div className="row">
        {/* Country */}
        <div className="col">
          <select
            className="form-select"
            value={selectedCountry || ""}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="col">
          <select
            className="form-select"
            disabled={!selectedCountry}
            value={selectedState || ""}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="col">
          <select
            className="form-select"
            disabled={!selectedState}
            value={selectedCity || ""}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
