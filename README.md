# Dickinson Discourse

A modern, student-built platform designed to foster collaboration and intellectual exchange within the Dickinson College community. Built with React, Supabase, and Tailwind CSS, this platform enables students and faculty to share research, discuss academic ideas, and engage in civic discourse.

## 🌟 Features

### Core Functionality
- **Create Posts**: Rich text posts with optional images, YouTube videos, and tags
- **Home Feed**: Browse and search posts with filtering by major/department
- **Post Interactions**: Upvote posts, leave comments, and engage in discussions
- **User Authentication**: Secure anonymous authentication for safe participation
- **Post Management**: Edit and delete your own posts with secret key authentication

### Advanced Features
- **Department-Specific Discussions**: Filter by Dickinson's 40+ majors
- **Media Support**: Upload images directly or add YouTube videos
- **Post Categories**: Flag posts as "Question" or "Opinion"
- **Responsive Design**: Accessible design compliant with ADA standards
- **Dark/Light Theme**: Customizable interface with theme switching
- **Search & Filter**: Find posts by title, tags, or department

## 🛠️ Tech Stack

### Frontend
- **React 17.0.2** - User interface framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **React Spinners** - Loading animations
- **React YouTube** - YouTube video integration
- **UUID** - Unique identifier generation

### Backend & Database
- **Supabase** - Backend-as-a-Service (PostgreSQL + Auth + Storage)
- **Express.js** - Backend API server
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dickinson-discourse
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd discourse-backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_KEY=your_supabase_anon_key
   ```
   
   Create a `.env` file in the `discourse-backend` directory:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_service_role_key
   PORT=5000
   ```

5. **Supabase Setup**
   
   In your Supabase project, create the following tables:
   
   **posts table:**
   ```sql
   CREATE TABLE posts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     title TEXT NOT NULL,
     content TEXT,
     category TEXT,
     tags TEXT[],
     image_url TEXT,
     image_alt TEXT,
     youtube_url TEXT,
     upvotes INTEGER DEFAULT 0,
     secret_key UUID DEFAULT gen_random_uuid(),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
   
   **comments table:**
   ```sql
   CREATE TABLE comments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
     user_id UUID REFERENCES auth.users(id),
     content TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
   
   **Storage bucket:**
   - Create a storage bucket named `post-images`
   - Set appropriate RLS policies for public read access

6. **Start the development servers**
   
   Frontend (in root directory):
   ```bash
   npm start
   ```
   
   Backend (in discourse-backend directory):
   ```bash
   cd discourse-backend
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🔒 Security Features

### API Key Management
- ✅ All Supabase credentials stored in environment variables
- ✅ No hardcoded API keys in source code
- ✅ Proper .gitignore configuration for .env files
- ✅ Anonymous authentication for user privacy

### Data Protection
- ✅ Row Level Security (RLS) policies in Supabase
- ✅ Secret key authentication for post editing/deletion
- ✅ Input validation and sanitization
- ✅ CORS configuration for secure API access

## 📁 Project Structure

```
dickinson-discourse/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── CreatePost.js   # Post creation form
│   │   └── Settings.js     # User settings and theme
│   ├── pages/              # Page components
│   │   ├── Home.js         # Main feed page
│   │   ├── Post.js         # Individual post view
│   │   └── About.js        # About page
│   ├── App.js              # Main application component
│   ├── supabaseClient.js   # Supabase client configuration
│   └── index.js            # Application entry point
├── discourse-backend/       # Express.js backend server
│   ├── index.js            # Backend entry point
│   └── package.json        # Backend dependencies
├── public/                 # Static assets
├── package.json            # Frontend dependencies
└── README.md              # Project documentation
```

## 🎨 Customization

### Themes
The application supports customizable themes through CSS variables:
- Background colors
- Text colors
- Card backgrounds
- Border colors

### Dickinson Branding
- Dickinson Red (#D31145)
- Dickinson Gold (#F4C95D)
- Serif fonts for headings
- Responsive design for all devices

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting platform
3. Set environment variables in your hosting platform

### Backend Deployment
1. Deploy the `discourse-backend` folder to your server
2. Set environment variables on your server
3. Ensure CORS is configured for your frontend domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

    Copyright [2025] [Hung Nguyen]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

## 🙏 Acknowledgments

- Dickinson College for inspiration and academic context
- Supabase team for the excellent backend-as-a-service platform
- React and Tailwind CSS communities for the amazing tools
- All contributors and testers who helped improve this platform

## 📞 Support

For questions, issues, or contributions, please:
1. Check existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

---

**Built with ❤️ for the Dickinson College community**