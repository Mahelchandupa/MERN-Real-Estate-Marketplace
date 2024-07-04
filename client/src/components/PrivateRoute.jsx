import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {

    const { currentUser } = useSelector(state => state.user)

    return currentUser ? children : <Navigate to='/sign-in' />
}

export default PrivateRoute