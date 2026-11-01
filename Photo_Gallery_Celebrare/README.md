# Photo Gallery

A React photo gallery built as an assignment for **[Celebrare]**.
It fetches photos from the Picsum API, lets you search by author, and lets you mark photos as favourites that stay saved even after a page refresh.

## Features

- Fetches 30 photos from the [Picsum Photos API](https://picsum.photos/)
- Loading spinner while data is being fetched, and an error message if the request fails
- Search photos by author name
- Heart icon to favourite or unfavourite a photo
- Favourites are saved in `localStorage` and restored on refresh
- Responsive grid layout (1 column on mobile, 2 on tablet, 4 on desktop)

## Tech Stack

| Tool | Purpose |
|---|---|
| React | UI library |
| Vite | Build tool and dev server |
| Tailwind CSS | Styling |
| Axios | API requests |
| react-icons | Heart icons |

## Project Structure

```
src/
├── components/
│   └── Loader.jsx          # Loading spinner
├── hooks/
│   └── useFetchPhotos.js   # Custom hook for fetching photos
├── App.jsx                 # Main gallery component
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# 1. Clone the repository
git clone <YOUR-REPO-URL>
cd <YOUR-PROJECT-FOLDER>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## React Concepts Used

### 1. `useReducer` for favourites

Favourites are stored as an array of photo ids and managed with `useReducer` instead of `useState`.

- The reducer is a pure function with one action, `toggleFav`. If the id is already in the list it is removed, otherwise it is added.
- Persistence is handled outside the reducer:
  - A lazy initializer (third argument of `useReducer`) reads `localStorage` on first load.
  - A `useEffect` with `[favs]` as the dependency saves the list to `localStorage` whenever it changes.

```js
dispatch({ type: "toggleFav", id: photo.id });
```

### 2. Custom hook: `useFetchPhotos`

All fetching logic lives in `src/hooks/useFetchPhotos.js`. The component does not call the API directly.

```js
const { photos, loading, error } = useFetchPhotos(30);
```

- `photos`: the array of photos from the API
- `loading`: `true` while the request is running
- `error`: an error message if the request fails, otherwise `null`

The hook uses an `ignore` flag in its cleanup function so state is not updated after the component unmounts.

### 3. `useMemo`

The filtered photo list is wrapped in `useMemo` with `[img, query]` as dependencies. This way the list is only re-filtered when the photos or the search text change, and not on unrelated re-renders such as clicking a heart.

### 4. `useCallback`

The search handler is wrapped in `useCallback` with an empty dependency array, because it only uses `setQuery`, which is stable. This keeps the function reference the same across renders.

## How Favourites Persistence Works

```
Heart click
   -> dispatch({ type: "toggleFav", id })
   -> reducer returns the new favourites array
   -> useEffect saves it to localStorage ("favorites")
   -> on refresh, the useReducer initializer reads it back
```

To check it: open DevTools, go to **Application > Local Storage**, and look for the `favorites` key.

## Assignment Checklist

- [x] Favourites managed with `useReducer` (not `useState`)
- [x] Favourites persist across refreshes using `localStorage`
- [x] Fetch logic extracted into `useFetchPhotos` returning `photos`, `loading`, `error`
- [x] Component uses the hook and does not fetch directly
- [x] `useCallback` on the search handler
- [x] `useMemo` for the filtered photo list

## Author

**[Aakash Jha]**
Submitted to **[Celebrare]**

- GitHub: [your-username](https://github.com/Aakash-Jha-818)
- Email: aakashjha819@gmail.com

## License

This project was created for assessment purposes.
