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

function App() {
  return (
    <Router>
      <Header />
      <div className="container max-w-4xl min-h-screen mt-16 mx-auto p-16 text-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
