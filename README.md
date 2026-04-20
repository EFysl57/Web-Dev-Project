# Web-Dev-Project

#Online Store Databridge

## 📌 Project Description

This is a fullstack web application for an online grocery store built with **Angular (frontend)** and **Django REST Framework (backend)**.

Users can:

* browse products
* add items to the cart
* update item quantities
* remove items from the cart
* register and log in
* edit their profile

---

## Technologies

### Frontend:

* Angular
* TypeScript
* HTML/CSS
* Template-driven forms (`ngModel`)

### Backend:

* Django
* Django REST Framework
* JWT Authentication (SimpleJWT)

---

## Authentication

Implemented **token-based authentication** using JWT:

* `POST /api/login/` — user login
* `POST /api/logout/` — user logout (refresh token is blacklisted)

After login, the user receives:

* `access` token (used for authenticated requests)
* `refresh` token (used to obtain a new access token)

---

## Cart Functionality

The cart supports both **guest users** and **authenticated users**:

* Guests: cart is stored in session
* Authenticated users: cart is stored in the database

### Features:

* Add to cart
* View cart
* Update quantity (PUT)
* Remove items
* Calculate total price

---

## User Profile

Users can view and update their profile:

* Username
* Email
* Phone
* Password

Profile supports:

* `GET /api/profile/` — fetch user data
* `PUT /api/profile/` — update user data

---

## 🔧 API Endpoints (Main)

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| POST   | `/api/login/`            | Login                |
| POST   | `/api/logout/`           | Logout               |
| GET    | `/api/products/`         | Get all products     |
| GET    | `/api/products/<id>/`    | Get product details  |
| GET    | `/api/cart/`             | Get cart             |
| POST   | `/api/cart/add/`         | Add item to cart     |
| PUT    | `/api/cart/update/<id>/` | Update item quantity |
| DELETE | `/api/cart/remove/<id>/` | Remove item          |
| GET    | `/api/profile/`          | Get profile          |
| PUT    | `/api/profile/`          | Update profile       |

---

## Features

* Full CRUD operations for cart
* Token-based authentication
* Guest cart + user cart support
* Profile editing
* Clean frontend-backend separation

---

## How to Run

### Backend:

```bash
python manage.py migrate
python manage.py runserver
```

### Frontend:

```bash
ng serve
```

---

## 📍 Future Improvements

* Order system
* Payment integration
* Product search & filters

---

## 👨‍💻 Authors
Kadirsizov Askar, Issabekov Galymzhan, Sakenuly Daniyar.
