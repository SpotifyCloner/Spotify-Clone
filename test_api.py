# import requests
# import json
# import time

# BASE_URL = "http://127.0.0.1:8000"

# def wait_for_server():
#     print("Waiting for server to start...")
#     for _ in range(10):
#         try:
#             requests.get(BASE_URL)
#             print("Server is up!")
#             return True
#         except requests.exceptions.ConnectionError:
#             time.sleep(1)
#     print("Server failed to start.")
#     return False

# def check_docs():
#     print("\n--- Checking API Documentation (/docs) ---")
#     response = requests.get(f"{BASE_URL}/docs")
#     print(f"Status Code: {response.status_code}")
#     if response.status_code == 200:
#         print("Documentation is accessible.")
#     else:
#         print("Documentation check failed.")

# def test_endpoints():
#     if not wait_for_server():
#         return

#     check_docs()

#     # 1. Create User
#     print("\n--- Testing POST /users/ ---")
#     user_data = {
#         "name": "Test User",
#         "email": "testuser@example.com",
#         "password": "password123"
#     }
#     response = requests.post(f"{BASE_URL}/users/", json=user_data)
#     print(f"Status Code: {response.status_code}")
#     print(f"Response: {response.json()}")
#     if response.status_code == 200:
#         user_id = response.json()['id']
#     else:
#         print("Failed to create user. Exiting tests.")
#         return

#     # 2. Get Users
#     print("\n--- Testing GET /users/ ---")
#     response = requests.get(f"{BASE_URL}/users/")
#     print(f"Status Code: {response.status_code}")
#     print(f"Response: {response.json()}")

#     # 3. Get User by ID
#     print(f"\n--- Testing GET /users/{user_id} ---")
#     response = requests.get(f"{BASE_URL}/users/{user_id}")
#     print(f"Status Code: {response.status_code}")
#     print(f"Response: {response.json()}")

#     # 4. Update User
#     print(f"\n--- Testing PUT /users/{user_id} ---")
#     update_data = {
#         "name": "Updated Test User",
#         "email": "testuser@example.com",
#         "password": "newpassword123"
#     }
#     response = requests.put(f"{BASE_URL}/users/{user_id}", json=update_data)
#     print(f"Status Code: {response.status_code}")
#     print(f"Response: {response.json()}")

#     # 5. Delete User
#     print(f"\n--- Testing DELETE /users/{user_id} ---")
#     response = requests.delete(f"{BASE_URL}/users/{user_id}")
#     print(f"Status Code: {response.status_code}")
#     print(f"Response: {response.json()}")

#     # 6. Verify Deletion
#     print(f"\n--- Verifying Deletion (GET /users/{user_id}) ---")
#     response = requests.get(f"{BASE_URL}/users/{user_id}")
#     print(f"Status Code: {response.status_code}")
#     print(f"Response: {response.json()}")

# if __name__ == "__main__":
#     test_endpoints()
