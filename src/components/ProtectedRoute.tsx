import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

type AccessStatus = "loading" | "unauthenticated" | "forbidden" | "owner";

const ProtectedRoute = () => {
  const [status, setStatus] = useState<AccessStatus>("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("unauthenticated");
        return;
      }

      try {
        const userDocument = await getDoc(doc(db, "Users", user.uid));
        setStatus(
          userDocument.data()?.role === "owner" ? "owner" : "forbidden",
        );
      } catch (error) {
        console.error("Unable to verify administrator role.", error);
        setStatus("forbidden");
      }
    });

    return unsubscribe;
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Checking access...
      </div>
    );
  }

  if (status !== "owner") {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
