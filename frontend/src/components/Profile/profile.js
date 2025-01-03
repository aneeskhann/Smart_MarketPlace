import React, { useContext } from "react";
import { StoreContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom"; // Ensure you're using React Router

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(StoreContext); // Assume you manage the user context
  const navigate = useNavigate(); // Hook to navigate between pages

  const logout = () => {
    // Clear the user's session/token
    localStorage.removeItem("access_Token"); // If you store the token in localStorage
    setCurrentUser(null)// Clear user context
    navigate("/login"); // Redirect to the login page
  };

  if (!currentUser) {
    return <p>No user logged in.</p>;
  }

  return (
    <section className="py-10 my-auto divide-gray-200">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div
          className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-700"
        >
          <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
            Profile
          </h1>
          <h2 className="text-grey text-sm mb-4 dark:text-gray-500">Welcome, {currentUser.username}!</h2>
          <button
            onClick={logout}
            className="text-grey text-sm mb-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Logout
          </button>

          {/* Other profile content */}
        </div>
      </div>
    </section>
  );
};

export default Profile;
