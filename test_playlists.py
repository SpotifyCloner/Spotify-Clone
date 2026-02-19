# import requests
# import time

# BASE_URL = "http://127.0.0.1:8000"

# def wait_for_server():
#     print("Waiting for server to start...")
#     for _ in range(5):
#         try:
#             requests.get(BASE_URL)
#             print("Server is up!")
#             return True
#         except requests.exceptions.ConnectionError:
#             time.sleep(1)
#             print("Server not accessible yet...")
#     return False

# def test_playlists():
#     if not wait_for_server():
#         print("Server is not running. Please start the server with 'uvicorn main:app --reload'")
#         return

#     # 1. Create User
#     print("\n--- 1. Create User ---")
#     user_data = {
#         "name": "Playlist Tester",
#         "email": "playlist_tester@example.com",
#         "password": "securepassword"
#     }
#     # Clean up if exists (optional, simply ignore error if strict, or handle unique email)
#     # For simplicity, we just try to create.
#     response = requests.post(f"{BASE_URL}/users/", json=user_data)
#     if response.status_code == 400: # Already exists?
#         print("User might already exist, fetching details...")
#         # Try login or just known ID lookup if we had it. 
#         # But let's just use email lookup if we implemented it, or list users and find.
#         # Simplest: assume fresh DB or just fail if exists for this test script logic.
#         # Let's try to get all users and find this one.
#         users_resp = requests.get(f"{BASE_URL}/users/")
#         users = users_resp.json()
#         target_user = next((u for u in users if u['email'] == user_data['email']), None)
#         if target_user:
#             user_id = target_user['id']
#             print(f"Found existing user ID: {user_id}")
#         else:
#             print("Could not create or find user.")
#             return
#     elif response.status_code == 200:
#         user_id = response.json()['id']
#         print(f"Created User ID: {user_id}")
#     else:
#         print(f"Failed to create user: {response.text}")
#         return

#     # 2. Create Playlist
#     print("\n--- 2. Create Playlist ---")
#     playlist_data = {
#         "name": "My Dashboard Jams",
#         "user_id": user_id
#     }
#     response = requests.post(f"{BASE_URL}/playlists/", json=playlist_data)
#     print(f"Status: {response.status_code}, Body: {response.json()}")
#     if response.status_code == 200:
#         playlist_id = response.json()['id']
#     else:
#         print("Failed to create playlist")
#         return

#     # 3. Add Song
#     print("\n--- 3. Add Song to Playlist ---")
#     song_data = {"track_id": "dQw4w9WgXcQ"} # Rick Roll
#     response = requests.post(f"{BASE_URL}/playlists/{playlist_id}/add-song", json=song_data)
#     print(f"Status: {response.status_code}, Body: {response.json()}")

#     # 4. Add Duplicate Song (Should Fail)
#     print("\n--- 4. Add Duplicate Song (Expect Failure) ---")
#     response = requests.post(f"{BASE_URL}/playlists/{playlist_id}/add-song", json=song_data)
#     print(f"Status: {response.status_code}, Body: {response.json()}")

#     # 5. Get User Playlists
#     print("\n--- 5. Get User Playlists ---")
#     response = requests.get(f"{BASE_URL}/playlists/user/{user_id}")
#     print(f"Status: {response.status_code}, Body: {response.json()}")

#     # 6. Get Songs in Playlist
#     print("\n--- 6. Get Songs in Playlist ---")
#     response = requests.get(f"{BASE_URL}/playlists/{playlist_id}/songs")
#     print(f"Status: {response.status_code}, Body: {response.json()}")

#     # 7. Remove Song
#     print("\n--- 7. Remove Song ---")
#     response = requests.delete(f"{BASE_URL}/playlists/{playlist_id}/remove-song/dQw4w9WgXcQ")
#     print(f"Status: {response.status_code}, Body: {response.json()}")

#     # 8. Delete Playlist
#     print("\n--- 8. Delete Playlist ---")
#     response = requests.delete(f"{BASE_URL}/playlists/{playlist_id}")
#     print(f"Status: {response.status_code}, Body: {response.json()}")

#     print("\n--- Test Complete ---")

# if __name__ == "__main__":
#     test_playlists()
