import React, { createContext, useState } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [paidTotal, setPaidTotal] = useState(null);


    const authInfo = {
        user,
        setUser,
        paidTotal,
        setPaidTotal

    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;