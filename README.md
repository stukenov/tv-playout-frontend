# TV Playout Frontend

> Real-time TV channel playout dashboard — manage broadcast schedules, media, and live streams from one intuitive UI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel&logoColor=white)](https://laravel.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

Modern React-based user interface for TV broadcast playout system. Built with Laravel Inertia.js, React, TypeScript, and shadcn/ui components. This frontend provides an intuitive interface for managing TV schedules, media content, and live streaming operations.

This is the UI layer for the [tv-playout-backend](https://github.com/stukenov/tv-playout-backend) API — see [Related projects](#related-projects).

> **Screenshots:** _Coming soon._ Drop dashboard, schedule, and live-stream captures here (e.g. `docs/screenshots/`) to showcase the interface.

## Features

### Schedule Management
- Visual timeline interface with drag-and-drop scheduling
- Calendar view for date selection
- Schedule blocks with programs, ads, and live broadcasts
- Real-time schedule status (past, current, upcoming)
- Time-based schedule editing
- Support for recurring schedule patterns

### Media Library
- File browser with folder navigation
- Video upload with progress tracking
- Media preview and playback controls
- Search and filtering capabilities
- Thumbnail previews
- Media metadata display

### Live Streaming Dashboard
- Real-time stream monitoring
- Stream control panel (start, stop, restart)
- Multiple encoder settings
- Adaptive Bitrate (ABR) configuration
- Stream health indicators
- Recording management

### Dashboard
- Quick access to key features
- Recent activities overview
- System status indicators
- Quick actions menu

## Technology Stack

- **Framework**: Laravel 11 with Inertia.js
- **Frontend**: React 18 with TypeScript
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Drag & Drop**: react-beautiful-dnd
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Build Tool**: Vite

## Installation

1. Clone the repository
```bash
git clone https://github.com/stukenov/tv-playout-frontend.git
cd tv-playout-frontend
```

2. Install PHP dependencies
```bash
composer install
```

3. Install Node.js dependencies
```bash
npm install
```

4. Configure environment
```bash
cp .env.example .env
php artisan key:generate
```

5. Configure database in `.env` file
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Run migrations
```bash
php artisan migrate
```

7. Build frontend assets
```bash
npm run build
```

8. Start development servers
```bash
# Terminal 1 - Laravel backend
php artisan serve

# Terminal 2 - Vite dev server
npm run dev
```

## Development

### Frontend Development
```bash
npm run dev
```
This starts the Vite development server with hot module replacement.

### Build for Production
```bash
npm run build
```
Compiles TypeScript and bundles assets for production.

### Type Checking
```bash
npx tsc --noEmit
```

## Project Structure

```
resources/js/
├── Components/       # Reusable React components
│   └── ui/          # shadcn/ui components
├── Layouts/         # Page layouts
├── Pages/           # Inertia.js pages
│   ├── Auth/        # Authentication pages
│   ├── Profile/     # User profile pages
│   ├── Dashboard.tsx
│   ├── Schedule.tsx # Schedule management
│   ├── Media.tsx    # Media library
│   └── Live.tsx     # Live streaming dashboard
├── types/           # TypeScript type definitions
└── lib/             # Utility functions
```

## Key Features in Detail

### Schedule Page (`Schedule.tsx`)
- Drag-and-drop schedule blocks
- Time-based visual timeline
- Block management (create, edit, delete)
- Status indicators (past, current, upcoming)
- Type-based color coding (program, ad, announcement, live)

### Media Page (`Media.tsx`)
- Hierarchical folder structure
- Upload dialog with progress tracking
- Video preview player
- Media information panel
- Search functionality

### Live Page (`Live.tsx`)
- Stream management controls
- Encoder configuration
- ABR settings
- Real-time stream monitoring
- Recording controls

## API Integration

This frontend connects to the Laravel backend API. Configure the API base URL in `.env`:

```
VITE_API_URL=http://localhost:8000/api
```

## Requirements

- PHP 8.2+
- Node.js 18+
- Composer
- MySQL 8.0+ or PostgreSQL 13+

## Related projects

- **[tv-playout-backend](https://github.com/stukenov/tv-playout-backend)** — the companion API this UI talks to. Handles schedule management, playlist automation, and broadcast control, built with Laravel.

## License

MIT License

Copyright (c) 2025 Saken Tukenov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
