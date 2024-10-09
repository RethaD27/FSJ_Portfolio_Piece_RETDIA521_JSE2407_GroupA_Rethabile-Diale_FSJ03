# QuickCart Emporium

Welcome to **QuickCart Emporium**, a modern e-commerce web application built using Next.js. This project is designed to showcase an elegant and responsive user interface, providing features like pagination, product listing with image carousels, and customer reviews. 

QuickCart Emporium focuses on providing a smooth user experience with a dynamic product grid, image galleries, and an interactive review system. The application is highly scalable and optimized for performance, ensuring a seamless browsing experience.

## Vercel URL: (#https://quickcart-emporium-2h5t6p7uh-rethabile-s-projects.vercel.app)

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage Examples](#usage-examples)

## Introduction

QuickCart Emporium is a Next.js-based e-commerce application designed to demonstrate the capabilities of a modern, interactive online store. It includes the following features:

- Product listings with an image carousel for each product.
- Customer reviews with star ratings.
- Pagination for easy navigation between different pages of products.
- A responsive design, ensuring a consistent experience on both desktop and mobile devices.

The project aims to provide a simple but scalable architecture for e-commerce applications and can be extended further with more features, such as shopping carts, user authentication, and payment integrations.

## Technologies Used

This project leverages modern web technologies to build a high-performance and responsive application:

- **Next.js**: Framework for server-rendered React applications.
- **React**: For building interactive user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling the components.
- **JSDoc**: Used to document the code for better understanding and maintainability.
- **API**: Custom API for fetching products and handling product details.

## Features

- **Product Listings**: Display products in a responsive grid, with a dynamic image carousel and details for each product.
- **Pagination**: Efficient navigation across product pages.
- **Customer Reviews**: Display reviews with a 5-star rating system.
- **Responsive Design**: The application is fully responsive and works well on all screen sizes.
- **Next.js Routing**: Dynamic routing for product detail pages.

## Project Structure

```
├── components
│   ├── FilterSort.js          // Handles product filtering and sorting
|   ├── GoBackButton.js        // Provides a button to navigate back to the previous page
│   ├── Header.js              // Contains the main header and navigation
│   ├── ImageGallery.js        // Displays product images with a carousel-like effect
│   ├── Pagination.js          // Handles pagination logic and UI
│   ├── ProductGrid.js         // Displays a grid of ProductCard components
│   ├── Reviews.js             // Displays customer reviews with star ratings
├── pages
│   ├── index.js               // Main page with product listings, filtering, sorting, and pagination
│   ├── product/[id].js        // Product detail page
|   ├── ReviewsSection.js      // Detailed reviews section for product details page
├── public                     // Contains static assets like images
├── styles
│   └── globals.css            // Global styles using Tailwind CSS
├── layout.js                  // Defines the main layout structure for pages
├── loading.js                 // Displays loading indicators during page transitions or data loading
├── page.js                    // Contains the main logic for rendering the homepage content
├── README.md                  // Project documentation
├── next.config.js             // Next.js configuration
├── package.json               // Project dependencies
```

### Explanation of Root Files:

- **layout.js**:  
   This file defines the primary layout for your application, including shared components like the header and footer. It wraps around all other pages and ensures consistency in the UI design across different routes.

- **loading.js**:  
   Responsible for showing a loading spinner or indicator while the content or data is being fetched. This file enhances the user experience by providing visual feedback during loading states.

- **page.js**:  
   The main page file for rendering the homepage content. This file is used as the entry point for the application's homepage, where it integrates components like `FilterSort`, `ProductGrid`, and `Pagination`.

## Setup Instructions

To run this project locally, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher)
- **npm**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/quickcart-emporium.git
   cd quickcart-emporium
   ```

2. Install dependencies:

   Using npm:

   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run the following command:

Using npm:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Building for Production

To create an optimized build for production, run:

```bash
npm run build
```

Then start the application:

```bash
npm start
```

## Usage Examples

### Pagination

The `Pagination` component allows users to navigate between pages. It displays **Previous** and **Next** buttons and shows the current page number:

```jsx
<Pagination currentPage={1} totalPages={10} />
```

### Product Grid

The `ProductGrid` component renders a list of products, each displayed in a `ProductCard` with an image carousel and product details:

```jsx
<ProductGrid products={products} />
```

Each `ProductCard` contains product images that can be navigated using the carousel:

```jsx
<ProductCard product={product} />
```

### Reviews

The `Reviews` component renders customer reviews, including a star rating and review comments:

```jsx
<Reviews reviews={reviewsData} />
```

### Filtering and Sorting

The `FilterSort` component allows users to sort products and filter them based on various criteria:

```jsx
<FilterSort products={products} setFilteredProducts={setFilteredProducts} />
```

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request. For major changes, please open an issue first to discuss the changes.
