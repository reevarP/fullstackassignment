import LoginPage from "../Pages/LoginPage/LoginPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";

export const routingArray = [
    {
        path: "/",
        element: <RegisterPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
    },
];
