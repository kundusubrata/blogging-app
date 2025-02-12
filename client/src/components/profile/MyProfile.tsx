import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MetaData from "../layout/MetaData";
import { useUpdateMyProfileMutation } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type FormState = {
  firstname: string;
  lastname: string;
  email: string;
};

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    firstname: "",
    lastname: "",
    email: "",
  });
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const [updateMyProfile, { isLoading: isUpdating, error, isSuccess }] =
    useUpdateMyProfileMutation();

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      });
    }
    if (error) {
      if ("data" in error) {
        toast.error(
          (error.data as { message?: string })?.message || "An error occurred"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    if (isSuccess) {
      toast.success("Profile updated successfully");
      navigate("/my-profile");
    }
  }, [user, error, isSuccess, navigate]);

  const handleSave = () => {
    updateMyProfile(formData);
    setIsEditing(false);
  };
  const handleCancel = () => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      });
    }
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <MetaData title="My Profile" />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-center">My Profile</h1>
        <div className="space-y-4 border shadow rounded-md p-8 mt-8">
          {isEditing ? (
            <div className="flex flex-wrap items-center gap-4">
              <label className="text-sm font-semibold">First Name: </label>
              <Input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              <label className="text-sm font-semibold">First Name: </label>
              <p>{formData.firstname}</p>
            </div>
          )}
          {isEditing ? (
            <div className="flex flex-wrap items-center gap-4">
              <label className="text-sm font-semibold">Last Name: </label>
              <Input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              <label className="text-sm font-semibold">Last Name: </label>
              <p>{formData.lastname}</p>
            </div>
          )}
          {isEditing ? (
            <div className="flex flex-wrap items-center gap-4">
              <label className="text-sm font-semibold">Email: </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              <label className="text-sm font-semibold">Email: </label>
              <p>{formData.email}</p>
            </div>
          )}
          {isEditing ? (
            <div className="flex gap-4">
              <Button onClick={handleSave} className="bg-blue-500 text-white">
                {isUpdating ? "Updating..." : "Save"}
              </Button>
              <Button onClick={handleCancel} className="bg-gray-300">
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
