# Web Hiring Platform Application

A React-based application designed for admins to manage job postings, track candidate applications, and create job-specific assessments. This application streamlines the hiring process by providing tools to post jobs, review candidate details, and assign tailored assessments.

## Features

1. **Dashboard for Managing Job Postings**
   - Admins can view, add, edit, and delete job postings.
   - Each job listing includes:
     - Job title
     - Job description
     - Number of candidates who have applied

2. **Candidate Tracking & Details**
   - View a list of candidates who have applied for each job.
   - For each candidate:
     - Display candidate name, resume link/document, application date, and application status.
   - Detailed candidate profile view, including:
     - Contact details, skills, experience, and status update options.

3. **Job-Specific Test/Assessment Creation**
   - Admins can create unique assessments for each job.
   - On the assessment creation page:
     - Select job from a dropdown.
     - Create, add, or edit multiple-choice questions for each job.
   - Each job has its distinct assessment.

4. **User Interface & Experience**
   - Intuitive and responsive design (desktop and mobile-friendly).
   - Consistent UI using Material-UI or Ant Design.
   - State management via Redux or React Context API.
   - Navigation with React Router for easy access to different sections.

## Technologies Used

- **React** for the front-end framework.
- **Material-UI/Ant Design** for UI components.
- **Redux/React Context API** for state management.
- **React Router** for routing.
- **Local Storage / Mock APIs** for simulated data persistence (optional).

## Setup and Running Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/project-repo-name
  
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```
   - The app will run at `http://localhost:3000` by default.

4. **Build for Production**
   ```bash
   npm run build
   ```
   - Builds the app for production in the `build` folder.

## Deployment

- The application is deployed on [Platform Name - e.g., Vercel, Netlify, GitHub Pages].
- Access the live application [here](deployment-link).

## Testing & Validation

- Tested for performance and error-free functionality.
- Sample data (e.g., job postings, candidates, assessments) provided to demonstrate the application features.

## Folder Structure

- `/src` - Contains main source files.
  - `/components` - Reusable UI components.
  - `/pages` - Different pages like Dashboard, Candidate Details, and Assessments.
  - `/redux` or `/context` - For state management.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.
