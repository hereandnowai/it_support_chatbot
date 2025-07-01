
import React from 'react';
import { BlogIcon, LinkedInIcon, InstagramIcon, GitHubIcon, XIcon, YouTubeIcon } from './icons'; // Import new icons

const socialMediaLinks = [
  { platform: 'blog', url: "https://hereandnowai.com/blog", icon: BlogIcon },
  { platform: 'linkedin', url: "https://www.linkedin.com/company/hereandnowai/", icon: LinkedInIcon },
  { platform: 'instagram', url: "https://instagram.com/hereandnow_ai", icon: InstagramIcon },
  { platform: 'github', url: "https://github.com/hereandnowai", icon: GitHubIcon },
  { platform: 'x', url: "https://x.com/hereandnow_ai", icon: XIcon },
  { platform: 'youtube', url: "https://youtube.com/@hereandnow_ai", icon: YouTubeIcon }
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#004040] text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-1 text-[#FFDF00]">HERE AND NOW AI</p>
        <p className="mb-3 text-sm italic opacity-90">designed with passion for innovation</p>
        <div className="flex justify-center flex-wrap gap-x-3 sm:gap-x-4 mb-3">
          {socialMediaLinks.map(({ platform, url, icon: IconComponent }) => (
            <a 
              key={platform} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-300 hover:text-[#FFDF00] capitalize text-sm py-1 transition-colors duration-150"
              aria-label={`HERE AND NOW AI on ${platform}`}
            >
              <IconComponent className="w-4 h-4 mr-1.5" />
              {platform} 
            </a>
          ))}
        </div>
        <div className="text-xs text-gray-400 space-y-1">
            <p>
            &copy; {new Date().getFullYear()} HERE AND NOW AI - Artificial Intelligence Research Institute. All rights reserved.
            </p>
            <p>
            Contact: <a href="mailto:info@hereandnowai.com" className="hover:text-[#FFDF00] underline">info@hereandnowai.com</a> | Phone: <a href="tel:+919962961000" className="hover:text-[#FFDF00] underline">+91 996 296 1000</a>
            </p>
            <p>
            <a href="https://hereandnowai.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFDF00] underline">www.hereandnowai.com</a>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
