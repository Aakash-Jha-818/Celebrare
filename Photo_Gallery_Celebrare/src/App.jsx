import React, { useEffect, useReducer, useState } from "react";
import Loader from "./components/Loader";
import useFetchPhotos from "./hooks/useFetchPhotos";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

const App = () => {
  // Data comes from the  my custom  hook  named as useFetchPhots
  const { photos: img, loading: isLoading, error } = useFetchPhotos(30);
  const [query, setQuery] = useState("");

  const searchUser = (e) => {
    // Dynamically update the query state with the input box's current value( As my user types)
    setQuery(e.target.value);
  };

  // Filter the images according to the user's typed query...
  const filteredImg = img.filter((val) =>
    val.author.toLowerCase().includes(query.toLowerCase()),
  );

  // Reducer: pure function, only returns the new favourites list (array of photo ids)
  const reducer = (state, action) => {
    switch (
      action.type // we could go with if else too ,
    ) {
      case "toggleFav":
        return state.includes(action.id)
          ? state.filter((id) => id !== action.id) // already fav -> remove it no need to include
          : [...state, action.id]; // not fav -> add it to our local storagte
      default:
        return state;
    }
  };

  // Lazy initial state: read saved favourites from localStorage on first load
  const [favs, dispatch] = useReducer(reducer, [], () => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favs));
  }, [favs]);

  return (
    <div>
      <div className="fixed top-1/2 left-1/2 items-center justify-center">
        {isLoading && <Loader />}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>

      <div className="searchBar flex fixed w-full items-center justify-center border-2 border-black-100 rounded">
        <input
          type="text"
          onKeyUp={(e) => searchUser(e)}
          name="searchBar"
          id="searchBar"
          placeholder="Search By Authors"
          className="outline-0"
        />
      </div>

      <div className="imgCard min-h-screen gap-2 p-8 border-4 border-red-500 flex flex-col items-center md:grid lg:grid md:grid-cols-2 lg:grid-cols-4">
        {filteredImg.map((val, idx) => {
          return (
            <div
              key={idx}
              className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs"
            >
              <img
                className="rounded-base"
                src={val.download_url}
                alt="image"
              />
              <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">
                {val.author}
              </h5>
              <button
                onClick={() => dispatch({ type: "toggleFav", id: val.id })}
                className="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium border-none hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                {favs.includes(val.id) ? (
                  <FaHeart className="text-red-500 overflow-hidden" size={30} />
                ) : (
                  <FaRegHeart
                    className="hover:text-red-500 overflow-hidden"
                    size={30}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
