import { useState } from "react";
import { Link } from "react-router";

interface FooterSection {
  title: string;
  links: { label: string; to: string }[];
}

const sections: FooterSection[] = [
  {
    title: "Liên Kết",
    links: [
      { label: "Thực Đơn", to: "/menu" },
      { label: "Khuyến Mãi", to: "/promotions" },
      { label: "Về Chúng Tôi", to: "/about" },
      { label: "Đơn Hàng", to: "/orders" },
    ],
  },
  {
    title: "Hỗ Trợ",
    links: [
      { label: "Trung Tâm Trợ Giúp", to: "/help" },
      { label: "Đánh Giá Khách Hàng", to: "/reviews" },
      { label: "Liên Hệ", to: "/about" },
      { label: "Điều Khoản Sử Dụng", to: "/terms" },
    ],
  },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (title: string) =>
    setOpenSection((prev) => (prev === title ? null : title));

  return (
    <footer className="bg-[#291712] text-white py-10 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="flex flex-col md:grid md:grid-cols-4 md:gap-8 gap-6 mb-8">
          {/* Brand Section */}
          <div>
            <h2 className="font-display font-bold text-[24px] text-[#ad2c00] mb-3">
              ALOVUX
            </h2>
            <p className="text-[#fff8f6] text-[14px] leading-[22px] mb-4">
              Mang hương vị Việt Nam đích thực đến tận nhà bạn với dịch vụ giao hàng nhanh chóng và chất lượng.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-11 h-11 bg-[#ad2c00] rounded-full flex items-center justify-center hover:bg-[#d63600] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 14.84 3.44 18.87 8 19.8V13H6V10H8V7.5C8 5.57 9.57 4 11.5 4H14V7H12C11.45 7 11 7.45 11 8V10H14V13H11V19.95C16.05 19.45 20 15.19 20 10Z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-11 h-11 bg-[#ad2c00] rounded-full flex items-center justify-center hover:bg-[#d63600] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.64 7.4C14.65 7.56 14.65 7.72 14.65 7.88C14.65 11.9 11.57 16.52 6.04 16.52C4.42 16.52 2.9 16.03 1.62 15.18C1.85 15.2 2.07 15.21 2.31 15.21C3.66 15.21 4.89 14.74 5.87 13.95C4.6 13.93 3.54 13.11 3.18 11.98C3.64 12.05 4.06 12.05 4.54 11.93C3.17 11.65 2.14 10.44 2.14 8.99C2.14 8.98 2.14 8.96 2.14 8.95C2.53 9.17 2.98 9.3 3.46 9.32C2.16 8.43 1.77 6.63 2.59 5.26C4.09 7.11 6.37 8.3 8.92 8.45C8.55 6.85 9.74 5.28 11.37 5.28C12.13 5.28 12.82 5.6 13.31 6.13C13.93 6.01 14.51 5.78 15.04 5.47C14.82 6.11 14.38 6.63 13.81 6.97C14.37 6.91 14.9 6.75 15.4 6.54C15.04 7.07 14.58 7.54 14.04 7.91L14.64 7.4Z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-11 h-11 bg-[#ad2c00] rounded-full flex items-center justify-center hover:bg-[#d63600] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M10 0C7.28 0 7 0.01 5.97 0.06C2.64 0.22 0.22 2.64 0.06 5.97C0.01 7 0 7.28 0 10C0 12.72 0.01 13 0.06 14.03C0.22 17.36 2.64 19.78 5.97 19.94C7 19.99 7.28 20 10 20C12.72 20 13 19.99 14.03 19.94C17.36 19.78 19.78 17.36 19.94 14.03C19.99 13 20 12.72 20 10C20 7.28 19.99 7 19.94 5.97C19.78 2.64 17.36 0.22 14.03 0.06C13 0.01 12.72 0 10 0ZM10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5ZM16 4C16.55 4 17 4.45 17 5C17 5.55 16.55 6 16 6C15.45 6 15 5.55 15 5C15 4.45 15.45 4 16 4Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links + Support (accordion on mobile) */}
          {sections.map((section) => {
            const open = openSection === section.title;
            return (
              <div key={section.title} className="border-t md:border-t-0 border-[#5d4038]">
                <button
                  type="button"
                  onClick={() => toggle(section.title)}
                  className="md:hidden w-full flex items-center justify-between py-3"
                  aria-expanded={open}
                >
                  <span className="font-['Inter'] font-semibold text-[16px]">
                    {section.title}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M3 6L8 11L13 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <h3 className="hidden md:block font-['Inter'] font-semibold text-[16px] mb-4">
                  {section.title}
                </h3>
                <ul
                  className={`space-y-2 text-[14px] pb-3 md:pb-0 ${
                    open ? "block" : "hidden md:block"
                  }`}
                >
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="block py-1 text-[#fff8f6] hover:text-[#ad2c00] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Contact Info */}
          <div className="border-t md:border-t-0 border-[#5d4038] pt-4 md:pt-0">
            <h3 className="font-['Inter'] font-semibold text-[16px] mb-3 md:mb-4">
              Liên Hệ
            </h3>
            <ul className="space-y-3 text-[14px]">
              <li className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#ad2c00" className="mt-1 shrink-0">
                  <path d="M8 0C5.04 0 2 2.08 2 5.6C2 9.8 8 16 8 16C8 16 14 9.8 14 5.6C14 2.08 10.96 0 8 0ZM8 7.6C6.68 7.6 5.6 6.52 5.6 5.2C5.6 3.88 6.68 2.8 8 2.8C9.32 2.8 10.4 3.88 10.4 5.2C10.4 6.52 9.32 7.6 8 7.6Z" />
                </svg>
                <span className="text-[#fff8f6]">
                  123 Đường Lê Lợi, Quận 1<br />TP.HCM, Việt Nam
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#ad2c00" className="shrink-0">
                  <path d="M14.4 10C13.4 10 12.44 9.84 11.54 9.54C11.29 9.46 10.99 9.52 10.79 9.72L9.38 11.13C7.5 10.18 5.82 8.5 4.87 6.62L6.28 5.21C6.48 5.01 6.54 4.71 6.46 4.46C6.16 3.56 6 2.6 6 1.6C6 1.16 5.84 0.8 5.6 0.8H1.6C1.16 0.8 0.8 1.16 0.8 1.6C0.8 9.11 6.89 15.2 14.4 15.2C14.84 15.2 15.2 14.84 15.2 14.4V10.4C15.2 9.96 14.84 9.6 14.4 9.6V10Z" />
                </svg>
                <span className="text-[#fff8f6]">1900 1234</span>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#ad2c00" className="shrink-0">
                  <path d="M14.4 3.2H1.6C0.72 3.2 0 3.92 0 4.8V11.2C0 12.08 0.72 12.8 1.6 12.8H14.4C15.28 12.8 16 12.08 16 11.2V4.8C16 3.92 15.28 3.2 14.4 3.2ZM14.4 6.4L8 9.6L1.6 6.4V4.8L8 8L14.4 4.8V6.4Z" />
                </svg>
                <span className="text-[#fff8f6] break-all">support@alovux.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#5d4038] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-['Inter'] text-[13px] text-[#fff8f6]">
            © 2026 ALOVUX Giao Đồ Ăn. Bảo lưu mọi quyền.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-[13px]">
            <Link to="/terms" className="text-[#fff8f6] hover:text-[#ad2c00] transition-colors">
              Điều Khoản Sử Dụng
            </Link>
            <Link to="/help" className="text-[#fff8f6] hover:text-[#ad2c00] transition-colors">
              Chính Sách Bảo Mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
