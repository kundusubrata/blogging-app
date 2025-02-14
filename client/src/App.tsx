import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/layout/Home";
import Footer from "./components/layout/Footer";
import BlogDetails from "./components/layout/BlogDetails";
import MyProfile from "./components/profile/MyProfile";
import CreatePost from "./components/profile/CreatePost";
import MyPosts from "./components/profile/MyPosts";
import AllPosts from "./components/profile/AllPosts";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import EditPost from "./components/profile/EditPost";
import { Toaster } from "sonner";
import ScrollToTop from "./utils/ScrollToTop";
import ProtectiveRoute from "./components/auth/ProtectiveRoute";
import NotFound from "./components/layout/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Toaster richColors position="top-center" />
      <div className="container max-w-4xl min-h-screen mt-16 mx-auto p-16 text-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/my-profile"
            element={
              <ProtectiveRoute>
                <MyProfile />
              </ProtectiveRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectiveRoute>
                <CreatePost />
              </ProtectiveRoute>
            }
          />
          <Route
            path="/my-posts"
            element={
              <ProtectiveRoute>
                <MyPosts />
              </ProtectiveRoute>
            }
          />
          <Route
            path="/all-posts"
            element={
              <ProtectiveRoute admin={true}>
                <AllPosts />
              </ProtectiveRoute>
            }
          />
          <Route
            path="/edit-post/:id"
            element={
              <ProtectiveRoute>
                <EditPost />
              </ProtectiveRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
