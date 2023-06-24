import { useState, useEffect, useContext, createContext, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getProfile } from "./firebase"; // Import auth from firebase.js
import { useCourseList } from "./components/Pyp/PypListContext";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/MainPage/HomeScreen";
import UploadScreen from "./components/Pyp/UploadScreen";
import SearchScreen from "./components/Pyp/SearchScreen";
import ProfileScreen from "./components/MainPage/ProfileScreen";
import PypList from "./components/Pyp/PypList";
import Pyp from "./components/Pyp/Pyp";
import LoadingScreen from "./components/LoadingScreen";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function App() {
  const route = [
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "/upload",
      element: <UploadScreen />,
    },
    {
      path: "/search",
      element: <SearchScreen />,
    },
    {
      path: "/profile",
      element: <ProfileScreen />,
    },
  ];
  const { courses, fetchPypNames } = useCourseList();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [routes, setRoutes] = useState(route);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setSession(user);
    });
  }, []);

  const handleUser = useCallback(async () => {
    if (session) {
      const profile = await getProfile(session.uid);
      setProfile(profile);
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    handleUser();
  }, [handleUser]);

  const getRoutes = () => {
    courses.forEach(async course => {
      route.push({
        path: `/search/${course.courseCode}`,
        element: <PypList courseCode={course.courseCode} />
      });

      await fetchPypNames(course.courseCode, (pypNames) => {
        pypNames.forEach(pypName => {
          route.push({
            path: `/search/${course.courseCode}/${pypName.pypYear}${pypName.semester}${pypName.midOrFinals}`,
            element: <Pyp pypName={pypName} />
          });
        });
      });
    });
  };

  useEffect(() => {
    getRoutes();
    setRoutes(route);
    // eslint-disable-next-line
  }, [courses, fetchPypNames]);

  return (
    <div>
      {session ? (
        loading ? (
          <LoadingScreen />
        ) : (
        <UserContext.Provider value={{profile, handleUser}}>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </UserContext.Provider>
      )) : (
        <LoginScreen />
      )}
    </div>
  );
}