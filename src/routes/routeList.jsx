import Home from "../pages/Home";
import Login from "../pages/Login";
import UserDetail from "../pages/UserDetail";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAfterLogin from "./ProtectedAfterLogin";
import Register from "../pages/Register";


export const routeList = [
    {
        path: "/",
        element: (
        <ProtectedRoute>
            <Home />
        </ProtectedRoute>
        ),

    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: (
            <ProtectedAfterLogin>
                <Login />
            </ProtectedAfterLogin>
        ),
    },
    {
        path: "/user-detail/:id",
        element: (
            <ProtectedRoute>
                <UserDetail />
            </ProtectedRoute>
            ),
    },
];