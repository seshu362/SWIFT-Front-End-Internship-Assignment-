# Comments Dashboard Application

A React-based dashboard application for managing and viewing comments with user profiles. This application provides a paginated comments table with search, sort, and filtering capabilities, along with user profile management.

## Features

### Dashboard (Comments Screen)
- **Data Grid**: Displays 500 comments from JSONPlaceholder API in a paginated table
- **Custom Pagination**: Implemented without external libraries with page size options (10, 50, 100)
- **Search Functionality**: Partial search across name, email, and comment body
- **Sorting**: Custom sorting for Post ID, Name, and Email with three-state cycle (no sort → ascending → descending → no sort)
- **State Persistence**: Search, sort, pagination, and page size settings persist across page refreshes using localStorage
- **Responsive Design**: Mobile-optimized interface

### Profile Screen
- **User Data**: Displays user information from JSONPlaceholder Users API
- **Dynamic User ID**: Generates formatted user IDs based on user data
- **Navigation**: Seamless routing between dashboard and profile screens
- **User Avatar**: Displays user initials in avatar format

## Technical Specifications

### Built With
- **React** (Functional Components with Hooks)
- **React Router DOM** for navigation
- **React Icons** for UI icons
- **CSS** for styling
- **JSONPlaceholder API** for dummy data

### Key Components
- `Dashboard`: Main comments management interface
- `Profile`: User profile display component
- `CommentsTable`: Reusable table component with sorting
- `Pagination`: Custom pagination component
- `Header`: Navigation header with user info

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd comments-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── index.js
│   │   └── index.css
│   ├── Profile/
│   │   ├── index.js
│   │   └── index.css
│   ├── CommentsTable/
│   │   ├── index.js
│   │   └── index.css
│   ├── Pagination/
│   │   ├── index.js
│   │   └── index.css
│   └── Header/
│       ├── index.js
│       └── index.css
├── App.js
├── App.css
└── index.js
```

## API Endpoints

- **Comments**: `https://jsonplaceholder.typicode.com/comments`
- **Users**: `https://jsonplaceholder.typicode.com/users/{id}`

## Usage

### Dashboard Navigation
- Access the main dashboard at `/`
- Click on any comment row to navigate to the user profile
- Use the search bar to filter comments by name, email, or content
- Sort columns by clicking on column headers
- Navigate between pages using pagination controls
- Change page size using the dropdown selector

### Profile Navigation
- Access profile directly at `/profile` (shows user ID 1)
- Access specific user profile at `/profile/{userId}`
- Click "Welcome, {username}" to return to dashboard
- View user details including formatted User ID, contact info, and address

### State Persistence
The application automatically saves and restores:
- Search terms
- Sort configuration (column and direction)
- Current page number
- Page size selection

## Key Features Implementation

### Custom Pagination
- No external pagination libraries used
- Implements page navigation with Previous/Next buttons
- Dynamic page number display based on current page
- Configurable page sizes (10, 50, 100 items per page)

### Search Functionality
- Real-time search across multiple fields
- Case-insensitive partial matching
- Searches name, email, and comment body simultaneously

### Sorting Logic
- Three-state sorting cycle for each column
- Only one column can be sorted at a time
- Visual indicators (↑/↓) show current sort direction
- Sorts by display Post ID (formatted) rather than original API ID

### Responsive Design
- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Touch-friendly navigation elements

## Browser Compatibility

Tested and compatible with:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge

## Development Notes

### Data Transformation
- Post IDs are transformed from API response (1, 2, 3...) to display format (12345670, 12345671, 12345672...)
- User IDs are formatted using a combination of original ID and name-based hash
- Comments are truncated to 100 characters for table display

### Performance Considerations
- Efficient filtering and sorting algorithms
- Minimal re-renders using React hooks
- Optimized pagination to handle large datasets
