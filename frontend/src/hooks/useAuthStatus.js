import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  const { user } = useSelector((state) => state?.auth);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else if (!user) {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};
