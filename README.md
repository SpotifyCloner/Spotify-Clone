# 🎵 MusicHub - Personal Music Player & Library Manager

A modern, user-friendly music application that gives you full control over your listening experience. Stream songs, search your library, manage playlists, and personalize your profile — all in one sleek app.

![App Screenshot](https://via.placeholder.com/800x400?text=MusicHub+Screenshot+Here)
*(Replace with actual screenshot or GIF demo)*

---

## ✨ Features

* **Instant Playback** — Listen to songs right away with smooth controls (play/pause, next/prev, seek, volume)
* **Powerful Search** — Quickly find songs, albums, and artists
* **Playlist Management** — Create, update, edit, rename, and delete playlists
* **Track Controls** — Add/remove songs from playlists with ease
* **User Profile** — Update your display name, avatar, preferences, and more
* **Clean & Responsive UI** — Beautiful design that works on desktop and mobile
* **Fast & Personal** — Your own music library, no ads, full privacy

---

## 🚀 Tech Stack

* **Frontend:** React + Tailwind CSS
* **Backend/API:** FastAPI
* **Database:** SQLite / PostgreSQL
* **Audio Playback:** HTML5 Audio / Howler.js
* **Other:** TypeScript (optional), Vite

---

## 🔗 API Endpoints

Base URL:

```
http://127.0.0.1:8000
```

### 👤 Users

#### ➜ Create User

* **POST** `/users/`

**Request Body**

```json
{
  "name": "Manual Tester",
  "email": "manualtest@example.com",
  "password": "securepassword"
}
```

**Response:** `200 OK`

---

### 📁 Playlists

#### ➜ Create Playlist

* **POST** `/playlists/`

**Request Body**

```json
{
  "name": "My Manual Jams",
  "user_id": 1
}
```

**Response:** `200 OK`

---

#### ➜ Get User Playlists

* **GET** `/playlists/user/{user_id}`

**Example**

```
GET /playlists/user/1
```

**Response:** `200 OK`

---

#### ➜ Delete Playlist

* **DELETE** `/playlists/{playlist_id}`

**Example**

```
DELETE /playlists/1
```

**Response:** `200 OK`

---

### 🎶 Playlist Songs

#### ➜ Add Song to Playlist

* **POST** `/playlists/{playlist_id}/add-song`

**Request Body**

```json
{
  "track_id": "dQw4w9WgXcQ"
}
```

**Response:** `200 OK`

---

#### ➜ Get Songs in Playlist

* **GET** `/playlists/{playlist_id}/songs`

**Example**

```
GET /playlists/1/songs
```

**Response:** `200 OK`

---

#### ➜ Remove Song from Playlist

* **DELETE** `/playlists/{playlist_id}/remove-song/{track_id}`

**Example**

```
DELETE /playlists/1/remove-song/dQw4w9WgXcQ
```

**Response:** `200 OK`

---

## 📸 Screenshots

(Add 3–5 screenshots here – home screen, search, playlist view, profile, player bar)

| Home / Player         | Search Results        | Playlist Editor       |
| --------------------- | --------------------- | --------------------- |
| ![Screenshot 1](link) | ![Screenshot 2](link) | ![Screenshot 3](link) |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/MusicHub.git
cd MusicHub
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run backend (FastAPI)

```bash
uvicorn main:app --reload
```

### 4️⃣ Run frontend

```bash
npm run dev
```

---

## 🧪 Postman Manual Testing Guide

Follow in order.

**Server must be running:**

```bash
uvicorn main:app --reload
```

### Step 1: Create User

* **POST** `http://127.0.0.1:8000/users/`
  ✅ Copy returned **USER_ID**

---

### Step 2: Create Playlist

* **POST** `http://127.0.0.1:8000/playlists/`
  ✅ Use your USER_ID
  ✅ Copy returned **PLAYLIST_ID**

---

### Step 3: Add Song

* **POST** `http://127.0.0.1:8000/playlists/{PLAYLIST_ID}/add-song`

---

### Step 4: Get User Playlists

* **GET** `http://127.0.0.1:8000/playlists/user/{USER_ID}`

---

### Step 5: Get Songs in Playlist

* **GET** `http://127.0.0.1:8000/playlists/{PLAYLIST_ID}/songs`

---

### Step 6: Remove Song

* **DELETE** `http://127.0.0.1:8000/playlists/{PLAYLIST_ID}/remove-song/{track_id}`

---

### Step 7: Delete Playlist

* **DELETE** `http://127.0.0.1:8000/playlists/{PLAYLIST_ID}`

---

## 🔮 Future Plans

* Offline mode & caching
* Dark/light theme toggle
* Lyrics integration
* Equalizer & audio effects
* Cross-device sync

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License – see the LICENSE file for details.

---

Made with ❤️ for music lovers.
**Star ⭐ the repo if you like it!**
