import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 text-black px-32 py-6">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <nav>
          <ul className="space-y-2">
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>Categories</li>
          </ul>
        </nav>
        <div className="text-center">
          <p className="font-semibold mb-2">Follow Us:</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Facebook size={18} color="white" />
              <p>Facebook</p>
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={18} color="white" />
              <p>Instagram</p>
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={18} color="white" />
              <p>Twitter</p>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={18} color="white" />
              <p>Linkedin</p>
            </li>
          </ul>
        </div>
        <div className="max-w-xs">
          <Input placeholder="Enter your email" />
          <p className="mt-2 text-sm">
            Subscribe to our newsletter to get the latest updates straight to
            your inbox!
          </p>
        </div>
      </div>
      <div className="mt-8 text-center border-t border-black/50 pt-4">
        <p>© 2025 Blogging App. All Rights Reserved by kundusubrata</p>
      </div>
    </footer>
  );
};

export default Footer;
