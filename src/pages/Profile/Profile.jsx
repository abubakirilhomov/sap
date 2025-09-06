import React, { useEffect, useRef, useState } from "react";
import {
  User,
  GraduationCap,
  Hash,
  Coins,
  BookOpen,
  Award,
  Upload,
} from "lucide-react";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Profile Fetch
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/students/profile/");
      if (response.data.length > 0) {
        setProfile(response.data[0]);
      } else {
        setError("Ma'lumot topilmadi");
      }
    } catch (error) {
      console.error(error);
      setError("Ma'lumotlarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Image Upload
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return toast.error("Iltimos, rasm tanlang!");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setUploading(true);
      await axiosInstance.put(`/api/v1/students/profile/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Rasm muvaffaqiyatli yuklandi!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSelectedFile(null);
      setPreviewImage(null);
      await fetchProfile();
    } catch (err) {
      console.error("Image Upload Error:", err);
      if (err.response) {
        console.error("Response Data:", err.response.data);
        toast.error(
          `Xatolik: ${err.response.status} - ${JSON.stringify(
            err.response.data
          )}`
        );
      } else {
        toast.error("Serverga ulanib bo‘lmadi!");
      }
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="bg-base-100 p-8 rounded-xl shadow-lg border border-base-300 text-center">
          <User className="w-12 h-12 text-error mx-auto mb-4" />
          <p className="text-lg text-error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-base-200 rounded-2xl shadow-md p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border border-base-300 shadow-sm">
              <img
                src={
                  previewImage
                    ? previewImage
                    : `https://api.univibe.uz${profile.image}?v=${profile.image_updated_at}`
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-success rounded-full border border-base-100"></div>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-2xl font-semibold text-base-content capitalize">
              {profile.name} {profile.surname}
            </h1>
            <p className="flex items-center justify-center md:justify-start mt-1 text-base-content">
              <GraduationCap className="w-4 h-4 mr-2 text-primary" />
              {profile.faculty.faculty_name}
            </p>
            <p className="flex items-center justify-center md:justify-start text-base-content">
              <BookOpen className="w-4 h-4 mr-2 text-secondary" />
              {profile.grade.grade_name}
            </p>
          </div>
        </div>

        {/* Upload Image Form */}
        <form
          onSubmit={handleImageUpload}
          className="flex items-center space-x-4"
        >
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-sm file-input-bordered"
            ref={fileInputRef}
          />

          <button
            type="submit"
            disabled={uploading}
            className="btn btn-primary btn-sm flex items-center space-x-2"
          >
            {uploading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>Yuklash</span>
          </button>
        </form>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center bg-primary/10 text-primary rounded-lg p-3">
            <Coins className="w-6 h-6 mr-3" />
            <div>
              <p className="text-sm">Active Tokens</p>
              <p className="text-lg font-medium">
                {profile.active_tokens.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center bg-secondary/10 text-secondary rounded-lg p-3">
            <Hash className="w-6 h-6 mr-3" />
            <div>
              <p className="text-sm">University ID</p>
              <p className="text-lg font-medium">#{profile.university_id}</p>
            </div>
          </div>

          <div className="flex items-center bg-accent/10 text-accent rounded-lg p-3">
            <GraduationCap className="w-6 h-6 mr-3" />
            <div>
              <p className="text-sm">Grade Level</p>
              <p className="text-lg font-medium">{profile.grade.grade_name}</p>
            </div>
          </div>

          <div className="flex items-center bg-success/10 text-success rounded-lg p-3">
            <User className="w-6 h-6 mr-3" />
            <div>
              <p className="text-sm">Profile ID</p>
              <p className="text-lg font-medium">#{profile.id}</p>
            </div>
          </div>
        </div>

        {/* Extra Details */}
        <div className="bg-base-100 border border-base-300 p-4 rounded-xl space-y-3">
          <div className="flex items-center">
            <Award className="w-5 h-5 mr-2 text-warning" />
            <p className="text-base-content text-sm">
              O'rtacha ball: {profile.gpa || "4.2"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
