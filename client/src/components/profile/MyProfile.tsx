import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type FormState = {
  name: string;
  email: string;
  password: string;
};

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    name: "John Doe",
    email: "John@gmail.com",
    password: "Hello123",
  });

  const handleSave = () => {
    console.log("Saved data:", formData);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setFormData({
      name: "John Doe",
      email: "John@gmail.com",
      password: "Hello123",
    });
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center">My Profile</h1>
      <div className="space-y-4 border shadow rounded-md p-8 mt-8">
        {isEditing ? (
          <div className="flex flex-wrap items-center gap-4">
            <label className="text-sm font-semibold">Name: </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            <label className="text-sm font-semibold">Name: </label>
            <p>{formData.name}</p>
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
        {isEditing && (
          <div className="flex flex-wrap items-center gap-4">
            <label className="text-sm font-semibold">Password: </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        )}
        {isEditing ? (
          <div className="flex gap-4">
            <Button onClick={handleSave} className="bg-blue-500 text-white">
              Save
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
  );
};

export default MyProfile;

