// /* eslint-disable react/prop-types */
// import { useMemo, useState, createContext, useContext, useEffect } from "react";


// const UserContext = createContext();
// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const getCurrentUser = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );
//         if (response.status === 200) {
//           const data = await response.json();
//           setUser(data);
//           setIsLoading(false);
//         } else {
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error(error);
//         setIsLoading(false);
//       }
//     };
//     getCurrentUser();
//   }, []);

//   const value = useMemo(
//     () => ({
//       user,
//       setUser,
//       isLoading,
//       setIsLoading,
//     }),
//     [user, isLoading]
//   );
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }
// const useUser = () => useContext(UserContext);
// // eslint-disable-next-line react-refresh/only-export-components
// export default useUser;



import { useMemo, useState, createContext, useContext, useEffect } from "react";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setUser(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      setIsLoading,
    }),
    [user, isLoading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

const useUser = () => useContext(UserContext);
// eslint-disable-next-line react-refresh/only-export-components
export default useUser;

