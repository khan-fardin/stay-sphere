import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Public/Home";
import Login from "../Pages/Public/Login";
import Registration from "../Pages/Public/Registration";
import Rooms from "../Pages/Public/Rooms";
import ErrorPage from "../Pages/Public/ErrorPage";
import MyBookings from "../Pages/Private/MyBookings";
import RoomDetails from "../Pages/Private/RoomDetails";
import Loading from "../Pages/Public/Loading";
import PrivateRoutes from "../Provider/PrivateRoutes";
import About from "../Pages/Public/About";
import Contact from "../Pages/Public/Contact";

export const router = createBrowserRouter(
    [
        {
            path: '/',
            Component: MainLayout,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    path: '/',
                    Component: Home,
                },
                {
                    loader: () => fetch("https://stay-sphere-server-ashen.vercel.app/rooms"),
                    hydrateFallbackElement: <Loading />,
                    path: '/rooms',
                    Component: Rooms,
                },
                {
                    path: '/my-bookings',
                    element: <MyBookings />,
                },
                {
                    path: 'rooms/room-details/:id',
                    element: <RoomDetails />,
                },
                {
                    path: '/about-us',
                    Component: About,
                },
                {
                    path: '/contact',
                    Component: Contact,
                },
            ],
        },
        {
            path: '/registration',
            Component: Registration,
        },
        {
            path: '/login',
            Component: Login,
        },
    ]
);