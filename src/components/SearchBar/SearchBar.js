import style from "../SearchBar/Searchbar.module.css";
import searchIcon from "../../assets/search.png";
import calendarIcon from "../../assets/calendar.png";
import roomIcon from "../../assets/bed.png";
import { useState, useRef } from "react";
import placedata from ".././../assets/data.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const places = placedata.places;
  const popupRef = useRef(null);
  const autoCompleteref = useRef(null);
  const [guestDetails, setGuestDetails] = useState({
    adults: 0,
    children: 0,
    rooms: 0,
    petFriendly: false,
  });
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState("");
  const [suggestPlace, setSuggestPlace] = useState(null);

  const hadnleDestination = (e) => {
    autoCompleteref.current.style.display = "block";
    const value = e.target.value;
    setDestination(value);
    const filteredSuggestions = places.filter((place) =>
      place.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestPlace(filteredSuggestions);
  };

  const handleSelectedPlace = (item) => {
    setDestination(item);
    autoCompleteref.current.style.display = "none";
  };
  const handleDecrementAdults = () => {
    setGuestDetails({
      ...guestDetails,
      adults: Math.max(guestDetails.adults - 1, 0),
    });
  };

  const handleIncrementAdults = () => {
    if (guestDetails.rooms === 0) {
      setGuestDetails({
        ...guestDetails,
        rooms: 1,
        adults: guestDetails.adults + 1,
      });
    } else if (guestDetails.rooms / guestDetails.adults > 0.5) {
      setGuestDetails({
        ...guestDetails,
        adults: guestDetails.adults + 1,
      });
    }
  };
  const handleDecrementChildren = () => {
    setGuestDetails({
      ...guestDetails,
      children: Math.max(guestDetails.children - 1, 0),
    });
  };

  const handleIncrementChildren = () => {
    if (guestDetails.rooms === 0) {
      setGuestDetails({
        ...guestDetails,
        rooms: 1,
        children: guestDetails.children + 1,
      });
    } else {
      setGuestDetails({
        ...guestDetails,
        children: guestDetails.children + 1,
      });
    }
  };

  const handlePetfriendly = (e) => {
    setGuestDetails((prevDetails) => ({
      ...prevDetails,
      petFriendly: e.target.checked,
    }));
  };

  const handleMaxdate = () => {
    const currentDate = new Date();
    const maxdate = checkIn
      ? new Date(
          checkIn.getFullYear() + 1,
          checkIn.getMonth(),
          checkIn.getDate()
        )
      : new Date(
          currentDate.getFullYear() + 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );

    return maxdate;
  };

  const handlereset = () => {
    setGuestDetails({
      adults: 0,
      children: 0,
      rooms: 0,
      petFriendly: false,
    });
  };

  const handleSearch = () => {
    const data = {
      destinationPlace: destination,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      noOfAdults: guestDetails.adults,
      noOfChildren: guestDetails.children,
      petFriendly: guestDetails.petFriendly ? "Yes" : "No",
      noOfRoomsRequired: guestDetails.rooms,
    };
    console.log(data);
  };
  return (
    <>
      <div className={style.searchcontainer}>
        <div className={style.destination}>
          <img src={searchIcon} alt="search_icon" className={style.icons} />
          <div>
            <p className={style.labels}>Landmark</p>
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={hadnleDestination}
            />
          </div>
        </div>
        <div className={style.borderBetween}></div>
        <div className={style.checkIn}>
          <img src={calendarIcon} alt="search_icon" className={style.icons} />
          <div>
            <p className={style.labels}>Check in</p>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              minDate={new Date()}
              maxDate={handleMaxdate()}
              className={style.datePick}
              dateFormat="dd-MM-yyyy"
              placeholderText="--/--/----"
            />
          </div>
        </div>
        <div className={style.checkOut}>
          <div>
            <p className={style.labels}>Check out</p>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              className={style.datePick}
              minDate={new Date()}
              maxDate={handleMaxdate()}
              dateFormat="dd-MM-yyyy"
              placeholderText="--/--/----"
            />
          </div>
        </div>
        <div className={style.borderBetween}></div>
        <div
          className={style.GuestAndRoom}
          onClick={() => {
            popupRef.current.style.display = "block";
          }}
        >
          <img src={roomIcon} alt="room_icon" className={style.icons} />
          <div>
            <p className={style.labels}>Guests and rooms</p>
            <span>
              {guestDetails.adults + guestDetails.children} Guests,{" "}
              {guestDetails.rooms} Room
            </span>
          </div>
        </div>
        <button className={style.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Guest room popup start here */}
      <section className={style.guestRoomPopup} ref={popupRef}>
        <h5>Guest & Rooms:</h5>
        <div className={style.adults}>
          <span>Adults</span>
          <div className={style.numbersBox}>
            <div className={style.decrement}>
              <span onClick={handleDecrementAdults}>-</span>
            </div>
            <div className={style.count}>
              <span>{guestDetails.adults}</span>
            </div>
            <div className={style.increment}>
              <span onClick={handleIncrementAdults}>+</span>
            </div>
          </div>
        </div>
        <div className={style.children}>
          <span>Children</span>
          <div className={style.numbersBox}>
            <div className={style.decrement}>
              <span onClick={handleDecrementChildren}>-</span>
            </div>
            <div className={style.count}>
              <span>{guestDetails.children}</span>
            </div>
            <div className={style.increment}>
              <span onClick={handleIncrementChildren}>+</span>
            </div>
          </div>
        </div>
        <div className={style.rooms}>
          <span>Rooms</span>
          <div className={style.numbersBox}>
            <div className={style.decrement}>
              <span
                onClick={() => {
                  setGuestDetails({
                    ...guestDetails,
                    rooms: Math.max(guestDetails.rooms - 1, 0),
                  });
                }}
              >
                -
              </span>
            </div>
            <div className={style.count}>
              <span>{guestDetails.rooms}</span>
            </div>
            <div className={style.increment}>
              <span
                onClick={() => {
                  setGuestDetails({
                    ...guestDetails,
                    rooms: guestDetails.rooms + 1,
                  });
                }}
              >
                +
              </span>
            </div>
          </div>
        </div>
        <div className={style.petFriendly}>
          <div>
            <span>Pet-friendly</span>
            <span>Only show stays that allow pets</span>
          </div>
          <input type="checkbox" onChange={handlePetfriendly} />
        </div>
        <div className={style.buttons}>
          <button onClick={handlereset}>RESET</button>
          <button
            onClick={() => {
              popupRef.current.style.display = "none";
            }}
          >
            APPLY
          </button>
        </div>
      </section>
      {/* Guest room popup end here */}

      {/* suggestive text */}
      <ul className={style.autoCompletePlace} ref={autoCompleteref}>
        {suggestPlace !== null
          ? suggestPlace.map((item, index) => (
              <li key={index} onClick={() => handleSelectedPlace(item)}>
                {item}
              </li>
            ))
          : null}
      </ul>
      {/* suggestive text end here */}
    </>
  );
};

export default SearchBar;
