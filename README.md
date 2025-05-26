# Xbox Product Page - React SPA

A modern, responsive single-page application showcasing Xbox products with an interactive shopping experience. Built with React, Material UI, and Redux.

![Xbox Series X/S Product Page](https://github.com/Decstro/ReactProductPage-SPA/raw/main/product-page.png)

## Features

- Responsive design that works on mobile, tablet, and desktop
- Interactive product carousel with custom navigation
- Product selection and quantity controls
- Secure checkout experience
- Animated transitions and modern UI elements

## Tech Stack

- React 18 with Hooks
- Vite for fast development and optimized builds
- Material UI for component styling
- Redux Toolkit for state management
- React Router for navigation
- Slick Carousel for product images

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Decstro/ReactProductPage-SPA.git
```

2. Navigate to the project directory:
```bash
cd ReactProductPage-SPA
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit:
```
http://localhost:5173
```

## Project Structure

```
src/
├── assets/           # Images and static resources
├── components/       # React components
├── redux/            # Redux store configuration
│   ├── slices/       # Redux Toolkit slices
│   └── store.js      # Redux store configuration
├── App.jsx           # Main application component
└── main.jsx          # Application entry point
```

## State Management

The application uses Redux Toolkit for state management with the following structure:

```json
{
  "products": {
    "items": [
      {
        "id": "xbox-series-x",
        "name": "Xbox Series X",
        "price": 499.99,
        "images": [],
        "rating": 4.5,
        "description": "Experience next-gen 4K gaming at 120 FPS"
      }
    ],
    "selectedProduct": "xbox-series-x",
    "status": "idle"
  },
  "transactions": {
    "items": [],
    "currentTransaction": {
      "productId": "xbox-series-x",
      "quantity": 1,
      "amount": 499.99,
      "status": "pending",
      "createdAt": "2023-07-20T12:34:56.789Z",
      "payment": null,
      "shipping": null,
      "metadata": {}
    },
    "status": "idle"
  }
}
```

## Building for Production

To build the application for production:

```bash
npm run build
```

The optimized build will be available in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Microsoft Xbox for design inspiration
- Material UI team for the component library
- Vite team for the excellent build tool
