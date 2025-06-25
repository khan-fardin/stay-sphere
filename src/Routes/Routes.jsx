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
                    path: '/registration',
                    Component: Registration,
                },
                {
                    path: '/login',
                    Component: Login,
                },
                {
                    loader: () => fetch("https://stay-sphere-server-ashen.vercel.app/rooms"),
                    hydrateFallbackElement: <Loading />,
                    path: '/rooms',
                    Component: Rooms,
                },
                {
                    path: '/my-bookings',
                    element: <PrivateRoutes>
                        <MyBookings />
                    </PrivateRoutes>,
                },
                {
                    path: 'rooms/room-details/:id',
                    element:
                        <PrivateRoutes>
                            <RoomDetails />
                        </PrivateRoutes>,
                },
            ],
        },
    ]
);