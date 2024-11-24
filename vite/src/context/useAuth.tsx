import React, { createContext, useState, ReactNode, FC } from "react";
import { auth } from "../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


interface AuthContextType {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  toggleShowPassword: () => void;
  login: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert("Please fill in the required details");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully!");
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        confirmPassword,
        showPassword,
        setEmail,
        setPassword,
        setConfirmPassword,
        toggleShowPassword,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
