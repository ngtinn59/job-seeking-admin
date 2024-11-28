import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import JobSeekerManagement from "../pages/JobSeekerManagement";
import RecruiterManagement from "../pages/RecruiterManagement";
import JobPostingManagement from "../pages/JobPostingManagement";
import CompanyManagement from "../pages/CompanyManagement";
import CompanySizeManagement from "../pages/CompanySizeManagement";
import WorkplaceManagement from "../pages/WorkplaceManagement";
import LanguageManagement from "../pages/LanguageManagement";
import JobCategoriesManagement from "../pages/JobCategoriesManagement";
import CompanyTypeManagement from "../pages/CompanyTypeManagement";
import EmploymentTypeManagement from "../pages/EmploymentTypeManagement";
import EducationLevelManagement from "../pages/EducationLevelManagement";
import DesiredJobLevelManagement from "../pages/DesiredJobLevelManagement";
import ExperienceLevelManagement from "../pages/ExperienceLevelManagement";
import CountryManagement from "../pages/CountryManagement";
import CityManagement from "../pages/CityManagement";
import DistrictManagement from "../pages/DistrictManagement";
import ProfileManagement from "../pages/ProfileManagement";
import SettingManagement from "../pages/SettingManagement";
import ReportManagement from "../pages/ReportManagement";

const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Dashboard />,
        path: "/",
      },
      {
        element: <JobSeekerManagement />,
        path: "/job-seeker-management",
      },
      {
        element: <RecruiterManagement />,
        path: "/recruiter-management",
      },
      {
        element: <JobPostingManagement />,
        path: "/job-posting-management",
      },
      {
        element: <CompanyManagement />,
        path: "/company-management",
      },
      {
        element: <CompanyTypeManagement />,
        path: "/company-type-management",
      },
      {
        element: <CompanySizeManagement />,
        path: "/company-size-management",
      },
      {
        element: <WorkplaceManagement />,
        path: "/workplace-management",
      },
      {
        element: <LanguageManagement />,
        path: "/language-management",
      },
      {
        element: <JobCategoriesManagement />,
        path: "/job-categories-management",
      },
      {
        element: <EmploymentTypeManagement />,
        path: "/employment-type-management",
      },
      {
        element: <EducationLevelManagement />,
        path: "/education-level-management",
      },
      {
        element: <DesiredJobLevelManagement />,
        path: "/desired-job-level-management",
      },
      {
        element: <ExperienceLevelManagement />,
        path: "/experience-level-management",
      },
      {
        element: <CountryManagement />,
        path: "/country-management",
      },
      {
        element: <CityManagement />,
        path: "/city-management",
      },
      {
        element: <DistrictManagement />,
        path: "/district-management",
      },
      {
        element: <ReportManagement />,
        path: "/report-management",
      },
      {
        element: <ProfileManagement />,
        path: "/profile-management",
      },
      {
        element: <SettingManagement />,
        path: "/setting-management",
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
