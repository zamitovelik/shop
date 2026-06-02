# ShopHub - E-Commerce React Application

A modern, fully-functional e-commerce application built with React, TypeScript, Vite, and Zustand. The application fetches products from the DummyJSON API and displays them with comprehensive features like sorting, pagination, and detailed product views.

## Features

✨ **Core Features:**
- 📦 Product listing with 12 items per page
- 🔍 Advanced sorting (by title, price, stock)
- 📊 Ascending/Descending order toggle
- ▶️ ◀️ Pagination with forward/backward navigation
- 💎 Product detail page with dynamic routing
- 🖼️ Image carousel using Swiper for product images
- 💰 Discount calculation and display
- 📈 Stock availability tracking
- ⭐ Product ratings display
- 🎨 Beautiful, responsive UI design
- 🚀 Fast, optimized performance with Vite

## Tech Stack

- **Frontend Framework:** React 19.2.6
- **Language:** TypeScript
- **Build Tool:** Vite 8.0.12
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **UI Components:** Swiper (for image carousel)
- **Styling:** CSS3 with modern features
- **Linting:** ESLint with React and TypeScript support

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ProductCard.tsx       # Individual product card component
│   ├── SortFilter.tsx        # Sort and filter controls
│   └── Pagination.tsx        # Custom pagination component
├── pages/              # Page components
│   ├── ProductsPage.tsx      # Main products listing page
│   └── ProductDetailPage.tsx # Individual product detail page
├── services/           # API and external services
│   └── api.ts              # Axios API client with DummyJSON endpoints
├── store/              # State management
│   └── productStore.ts     # Zustand store for products
├── styles/             # CSS stylesheets
│   ├── global.css          # Global styles
│   ├── ProductCard.css     # Product card styles
│   ├── SortFilter.css      # Filter styles
│   ├── Pagination.css      # Pagination styles
│   ├── ProductsPage.css    # Products page styles
│   └── ProductDetailPage.css # Detail page styles
├── types/              # TypeScript type definitions
│   └── product.ts          # Product and API response types
├── App.tsx             # Main app component with routing
├── App.css             # App layout styles
└── main.tsx            # Application entry point
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone or extract the project:**
```bash
cd magazin
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The application will start at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Main Products Page

1. **Viewing Products:**
   - The main page displays 12 products from the DummyJSON API
   - Each product card shows:
     - Product image with discount badge
     - Product title and description
     - Stock quantity
     - Original price (strikethrough) and discounted price
     - "View Details" button

2. **Sorting:**
   - Use the "Sort By" dropdown to sort by:
     - Default (API order)
     - Title (alphabetically A-Z)
     - Price (ascending by default)
     - Stock (quantity available)
   
3. **Order Control:**
   - Toggle between Ascending (↑) and Descending (↓) order
   - Works with all sort options

4. **Pagination:**
   - Navigate through pages using the pagination buttons
   - Shows page numbers with ellipsis for large page counts
   - "Previous" and "Next" buttons for easy navigation
   - Automatically scrolls to top when changing pages

### Product Detail Page

1. **Access Product Details:**
   - Click on any product card or "View Details" button
   - You'll be redirected to the product detail page with the product ID in the URL

2. **Product Information:**
   - Full-size product image
   - Product title, category, and description
   - Original and discounted prices
   - Discount percentage savings
   - Stock status (In Stock / Out of Stock)
   - Quantity available
   - Product rating
   - Add to Cart button

3. **Image Carousel:**
   - If the product has multiple images, they display in a Swiper carousel
   - Use left/right arrows to navigate images
   - Click pagination dots to jump to a specific image
   - Thumbnail gallery below for quick selection

4. **Navigation:**
   - Click "← Back to Products" to return to the main page
   - Maintains the previous sort and filter settings

## API Integration

The application uses the [DummyJSON API](https://dummyjson.com/) for product data.

### API Endpoints Used:

1. **Get Products with Pagination:**
   ```
   GET https://dummyjson.com/products?limit=12&skip=0
   ```

2. **Get Products with Sorting:**
   ```
   GET https://dummyjson.com/products?limit=12&skip=0&sortBy=price&order=asc
   ```

3. **Get Single Product:**
   ```
   GET https://dummyjson.com/products/:id
   ```

### Response Data Fields Used:
- `id` - Product ID
- `title` - Product name
- `description` - Product details
- `price` - Original price
- `discountPercentage` - Discount amount in percentage
- `thumbnail` - Product preview image
- `images` - Array of product images
- `stock` - Available quantity
- `category` - Product category
- `brand` - Product brand
- `rating` - Product rating

## State Management with Zustand

The application uses Zustand for state management. Key store actions:

```typescript
// Fetch products with pagination and sorting
fetchProducts(page?: number)

// Update sort field
setSortBy(sortBy: string)

// Update sort order
setSortOrder(order: 'asc' | 'desc')

// Change page
setCurrentPage(page: number)

// Fetch single product
fetchProductById(id: number)
```

## Styling & Responsive Design

The application is fully responsive with:
- **Desktop:** Multi-column grid layout
- **Tablet:** Adjusted grid and sidebar layout
- **Mobile:** Single/dual-column layout with optimized touch targets

CSS Features:
- Modern gradients for headers
- Smooth transitions and hover effects
- Flexible grid layouts
- Mobile-first responsive design
- Accessible color contrasts

## Customization Guide

### Adding New Sort Options:

1. Update the `SortFilter.tsx` component:
```tsx
<option value="newField">New Field</option>
```

2. The API will automatically use the new sort field

### Changing Items Per Page:

In `src/store/productStore.ts`:
```typescript
itemsPerPage: 12,  // Change this value
```

### Updating Colors:

Edit the gradient colors in CSS files:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modifying Product Card Display:

Edit `src/components/ProductCard.tsx` to add/remove fields

## Performance Optimizations

- ✅ Lazy loading with Vite
- ✅ Optimized images with placeholder handling
- ✅ Efficient state management with Zustand
- ✅ HTTP request caching at API level
- ✅ CSS modules for scoped styling
- ✅ TypeScript for type safety

## Error Handling

The application includes error handling for:
- Failed API requests with user-friendly error messages
- Missing or broken images (placeholder fallback)
- Out-of-stock products (disabled Add to Cart button)
- Network issues with retry capability

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint checks
npm run preview  # Preview production build
```

## Future Enhancements

Potential features to add:
- 🛒 Shopping cart functionality
- 💳 Checkout process
- 👤 User authentication
- ❤️ Wishlist/favorites
- 📝 Product reviews and comments
- 🔎 Advanced search and filters
- 💬 Live chat support
- 📱 Mobile app with React Native

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Images Not Loading
- Check internet connection (API requires external image URLs)
- Browser console for CORS errors
- Images have fallback placeholders

### Sorting Not Working
- Ensure the API is accessible
- Check browser console for error messages
- Verify sort field names match API field names

## License

This project is created for educational purposes. Use freely for learning and development.

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify API connectivity
3. Ensure all dependencies are installed
4. Try clearing browser cache and restarting dev server

---

**Happy Shopping! 🛍️**
