# CMS Project

A mini **Content Management System (CMS)** built with **Laravel 12** for the backend, **React.js** for the admin panel, and **Blade templates** for the public website.

It supports **page management**, **posts/blogs**, **media uploads**, **publish/unpublish**, and a **dark mode admin panel**.

---

## Features

### Admin Panel (React.js)

* Manage **Pages** and **Posts**

  * Add, edit, delete content
  * Publish / Unpublish toggle
* **Media Upload** support
* **Filter and search** functionality
* **Dark/Light mode** support
* Responsive layout
* Data management with **Redux Toolkit**

### Public Website (Laravel + Blade)

* Home page
* Blog listing page


### Backend (Laravel 12 API)

* RESTful API for posts/pages
* JSON responses with `status`, `message`, `data`
* Validation for title and content
* CRUD operations
* Toggle publish/unpublish
* Handles **FormData** for media upload

---

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd backend
   ```
2. Install dependencies:

   ```bash
   composer install
   ```
3. Copy `.env.example` to `.env` and configure database:

   ```bash
   cp .env.example .env
   ```
4. Generate application key:

   ```bash
   php artisan key:generate
   ```
5. Run migrations:

   ```bash
   php artisan migrate
   ```
6. Start the server:

   ```bash
   php artisan serve
   ```

   The backend will run at `http://127.0.0.1:8000`

---

### Admin Panel (React)

1. Navigate to admin panel folder:

   ```bash
   cd admin
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the development server:

   ```bash
   npm start
   ```
4. Access the admin panel at `http://localhost:3000`

---

### Public Website (Blade)

* Already served via Laravel backend.
* Accessible at `http://127.0.0.1:8000`

---



## Admin Panel Features

* **DataTable** with pagination, search, and filter
* **Modal forms** for Add/Edit page
* **Publish/Unpublish toggle**
* Dark mode support with localStorage persistence
* Redux Toolkit for state management


