// src/components/pages/Sidebar.jsx
import {
  BoomBox,
  CirclePlus,
  Heart,
  House,
  LogOut,
  MessageCircle,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const leftSidebar = [
  {
    icon: <House />,
    text: "Home",
  },
  {
    icon: <Search />,
    text: "Search",
  },
  {
    icon: <TrendingUp />,
    text: "Explore",
  },
  {
    icon: <MessageCircle />,
    text: "Messages",
  },
  {
    icon: <Heart />,
    text: "Notification",
  },
  {
    icon: <BoomBox />,
    text: "Boom",
  },
  {
    icon: <CirclePlus />,
    text: "Create",
  },
  {
    icon: <Users />,
    text: "People",
  },
  {
    icon: (
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  {
    icon: <LogOut />,
    text: "Logout",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem("token");
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") logoutHandler();
  };

  return (
    <aside className="flexd top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen bg-white">
      <div className="flex flex-col">
        <h1>LOGO</h1>
        <section>
          {leftSidebar.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center gap-4 relative text-black hover:text-pink hover:bg-pinkHover cursor-pointer rounded-lg p-3 my-2"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            );
          })}
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
