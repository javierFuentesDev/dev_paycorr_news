# NYT Articles Viewer

A modern Angular application to browse articles from The New York Times. The application supports switching between a card view and a table view, and includes elegant skeleton loaders for both layouts.

## Features

- **Switchable Views**: Toggle between a card view and a table view for displaying articles.
- **Skeleton Loaders**: Interactive loaders with animations for both card and table views.
- **Offline Access**: Articles are cached in local storage to provide offline access.
- **Responsive Design**: Fully responsive interface using Bootstrap.
- **Dynamic Notifications**: User feedback with Notiflix notifications.

---

## Technologies Used

### Core Technologies

- **Angular**: Framework for building the application (`16.2.12`).
- **Angular CLI**: Command-line interface for Angular (`16.2.16`).
- **Node.js**: Server-side runtime (`18.20.5`).
- **Package Manager**: npm (`10.8.2`).

### Third-Party Libraries

- **Bootstrap**: Styling framework for responsive design (`^5.3.3`).
- **Bootstrap Icons**: Icon library for UI enhancements (`^1.11.3`).
- **Notiflix**: Notifications and loading indicators (`^3.2.7`).

---

# Prerequisites

### Node.js and NVM

This project requires **Node.js**. If you manage multiple Node.js versions, it is recommended to use **NVM** (Node Version Manager):

1. **Install NVM**:  
   Follow the instructions from the [official NVM repository](https://github.com/nvm-sh/nvm#installing-and-updating).

2. **Install Node.js with NVM**:
   ```bash
   nvm install 18
   nvm use 18
   ```

3. **Check Installed Node.js Version:**:
   ```bash
    node -v
   ```

---

## Getting Started

To set up the application locally:

1. ### Clone the Repository:

   ```bash
      git clone https://github.com/javierFuentesDev/dev_paycorr_news.git
      cd dev_paycorr_news
   ```

2. ### Install Dependencies:
   Ensure you’re using the correct Node.js version with nvm use before running:

   ```bash 
      npm install
   ```

3. ### Start the Development Server:

   ```bash 
      ng serve
   ```

4. ### Access the Application:

Open your browser and go to http://localhost:4200.
