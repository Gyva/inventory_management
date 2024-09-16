# Inventory Management System
This project is an Inventory Management System built using Django and Django REST Framework. It allows users with different roles (Logistic Officer, Coordinator, and Head of Department) to manage equipment and equipment requests.

### Features
* **User Authentication:** Users can register, log in, log out, and change their passwords.
* **Role-Based Permissions:**
    * Logistic Officers can register equipment, view the equipment they've added, and modify or delete it if it's not requested.
    * Coordinators can request equipment.
    * Heads of Department (HoD) can approve or reject requests.
* **Inventory Management:**
    * Equipment quantities are automatically updated based on requests.
    * Requested quantities cannot exceed available quantities or be less than zero.
# Project Structure
* inventory/: Contains the main logic for the project.
  * models.py: Defines the data models.
  * serializers.py: Handles the conversion of data between models and JSON.
  * views.py: Defines the logic for handling requests.
  * urls.py: Maps URLs to views.
    
# Installation
## Prerequisites
  * Python 3.x
  * Django 3.x or higher
  * Django REST Framework
# Setup
1. Clone the repository:
     git clone https://github.com/Gyva/inventory_management.git or git@github.com:Gyva/inventory_management.git
      cd inventory_management

2. Create a virtual environment:
  
     python3 -m venv env
     source env/bin/activate
3. Install the required packages

4. Apply migrations:

     python manage.py migrate
  
5. Create a superuser:
  
     python manage.py createsuperuser
  
6. Run the server:
  
     python manage.py runserver
  
# Usage
## Authentication
  * Login: Obtain an authentication token by sending a POST request to /api/api-token-auth/ with your username      and password.
  * Change Password: Send a PUT request to /api/change-password/ with the old password and the new password. 
    Include the token in the header.
  * Logout: Send a POST request to /api/logout/ to log out the user. Include the token in the header.
    
# Managing Equipment
  * **View Equipment:** Logistic Officers can view the equipment they've added by sending a GET request to       /api/equipment/.
  * **Add Equipment:** Logistic Officers can add new equipment by sending a POST request to /api/equipment/.
  * **Modify Equipment:** Logistic Officers can update the details of equipment they've added by sending a PUT or   PATCH request to /api/equipment/{id}/.
  * **Delete Equipment:** Logistic Officers can delete equipment they've added by sending a DELETE request to /api/equipment/{id}/ if the equipment hasn't been requested.
    
# Requesting Equipment
  * **Request Equipment:** Coordinators can request equipment by sending a POST request to /api/requests/.
  * **Approve/Reject Requests:** HoDs can approve or reject requests by sending a PATCH request to   /api/requests/{id}/.
    
# Testing
Use tools like Postman or curl to test the API endpoints. Make sure to include the authentication token in the headers for protected endpoints.

# Contributing
  1. Fork the repository.
  2. Create a new branch (git checkout -b feature-branch).
  3. Make your changes.
  4. Commit your changes (git commit -m 'Add some feature').
  5. Push to the branch (git push origin feature-branch).
  6. Create a new Pull Request.
