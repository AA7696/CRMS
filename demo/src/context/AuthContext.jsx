import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens }}>
      {children}
    </AuthContext.Provider>
  );
};