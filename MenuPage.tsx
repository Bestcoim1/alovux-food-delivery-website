import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const popularDishes = [
  { id: "1", name: "Phở Bò", category: "Phở", image: "https://monngonmoingay.com/wp-content/uploads/2015/11/PhoBo-e1446825512455.jpg" },
  { id: "2", name: "Bánh Mì", category: "Bánh Mì", image: "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=200" },
  { id: "5", name: "Cơm Tấm", category: "Cơm", image: "https://images.unsplash.com/photo-1766050587783-1c90751275dd?w=200" },
  { id: "8", name: "Chè Ba Màu", category: "Chè", image: "https://lanvienhotel.com.vn/wp-content/uploads/2025/07/che-ba-mau-huong-vi-tuoi-mat-cua-mua-he-tai-trung-tam-thanh-pho.jpg" },
];

const quickCategories = ["Phở", "Bánh Mì", "Cơm", "Chè"];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isMoreMenuActive = () => {
    return (
      isActive("/orders") ||
      isActive("/account") ||
      isActive("/reviews") ||
      isActive("/about") ||
      isActive("/help")
    );
  };

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMoreMenu(false);
        setShowUserMenu(false);
        setShowSearchModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <header className="bg-[#fff8f6] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[68px] fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1280px] mx-auto h-full px-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 hover:bg-[#fddbd3] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2"
            aria-label="Menu điều hướng"
            aria-expanded={showMobileMenu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D4038" strokeWidth="2">
              {showMobileMenu ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          <Link to="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2 rounded">
            <h1 className="font-display font-extrabold text-[24px] text-[#ad2c00]">
              ALOVUX
            </h1>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className={`font-['Inter'] font-semibold text-[15px] pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2 rounded ${
              isActive("/")
                ? "text-[#ad2c00] border-b-2 border-[#ad2c00]"
                : "text-[#5d4038] hover:text-[#ad2c00]"
            } transition-colors`}
          >
            Trang Chủ
          </Link>
          <Link
            to="/menu"
            className={`font-['Inter'] font-semibold text-[15px] pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2 rounded ${
              isActive("/menu")
                ? "text-[#ad2c00] border-b-2 border-[#ad2c00]"
                : "text-[#5d4038] hover:text-[#ad2c00]"
            } transition-colors`}
          >
            Thực Đơn
          </Link>
          <Link
            to="/promotions"
            className={`font-['Inter'] font-semibold text-[15px] pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2 rounded ${
              isActive("/promotions")
                ? "text-[#ad2c00] border-b-2 border-[#ad2c00]"
                : "text-[#5d4038] hover:text-[#ad2c00]"
            } transition-colors`}
          >
            Khuyến Mãi
          </Link>
          <div className="relative" ref={moreMenuRef}>
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`font-['Inter'] font-semibold text-[15px] pb-1 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2 rounded ${
                isMoreMenuActive()
                  ? "text-[#ad2c00] border-b-2 border-[#ad2c00]"
                  : "text-[#5d4038] hover:text-[#ad2c00]"
              } transition-colors`}
              aria-label="Menu thêm"
              aria-expanded={showMoreMenu}
            >
              <span>Thêm</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
                className={`transition-transform ${showMoreMenu ? "rotate-180" : ""}`}
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {showMoreMenu && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg py-2 w-48 z-50">
                <Link
                  to="/orders"
                  onClick={() => setShowMoreMenu(false)}
                  className={`block px-4 py-2 transition-colors text-[15px] ${
                    isActive("/orders")
                      ? "bg-[#fddbd3] text-[#ad2c00] font-semibold"
                      : "text-[#5d4038] hover:bg-[#fddbd3] hover:text-[#ad2c00]"
                  }`}
                >
                  Đơn Hàng
                </Link>
                <Link
                  to="/account"
                  onClick={() => setShowMoreMenu(false)}
                  className={`block px-4 py-2 transition-colors text-[15px] ${
                    isActive("/account")
                      ? "bg-[#fddbd3] text-[#ad2c00] font-semibold"
                      : "text-[#5d4038] hover:bg-[#fddbd3] hover:text-[#ad2c00]"
                  }`}
                >
                  Tài Khoản
                </Link>
                <Link
                  to="/reviews"
                  onClick={() => setShowMoreMenu(false)}
                  className={`block px-4 py-2 transition-colors text-[15px] ${
                    isActive("/reviews")
                      ? "bg-[#fddbd3] text-[#ad2c00] font-semibold"
                      : "text-[#5d4038] hover:bg-[#fddbd3] hover:text-[#ad2c00]"
                  }`}
                >
                  Đánh Giá
                </Link>
                <Link
                  to="/about"
                  onClick={() => setShowMoreMenu(false)}
                  className={`block px-4 py-2 transition-colors text-[15px] ${
                    isActive("/about")
                      ? "bg-[#fddbd3] text-[#ad2c00] font-semibold"
                      : "text-[#5d4038] hover:bg-[#fddbd3] hover:text-[#ad2c00]"
                  }`}
                >
                  Về Chúng Tôi
                </Link>
                <Link
                  to="/help"
                  onClick={() => setShowMoreMenu(false)}
                  className={`block px-4 py-2 transition-colors text-[15px] ${
                    isActive("/help")
                      ? "bg-[#fddbd3] text-[#ad2c00] font-semibold"
                      : "text-[#5d4038] hover:bg-[#fddbd3] hover:text-[#ad2c00]"
                  }`}
                >
                  Trợ Giúp
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearchModal(true)}
            className="p-2 hover:bg-[#fddbd3] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2"
            aria-label="Tìm kiếm món ăn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#5D4038">
              <path d="M19.4686 17.6431L15.2313 13.4058C16.465 11.7111 17.0141 9.61346 16.7691 7.53163C16.5242 5.44981 15.5031 3.53694 13.9098 2.17485C12.3164 0.812767 10.268 0.101664 8.17342 0.183486C6.07883 0.265309 4.09214 1.13404 2.60991 2.61627C1.12768 4.0985 0.258953 6.08519 0.17713 8.17978C0.0953077 10.2744 0.806411 12.3228 2.1685 13.9161C3.53058 15.5095 5.44345 16.5305 7.52528 16.7755C9.6071 17.0205 11.7047 16.4713 13.3995 15.2377L17.6368 19.475C17.8797 19.7179 18.2092 19.8544 18.5527 19.8544C18.8962 19.8544 19.2257 19.7179 19.4686 19.475C19.7115 19.2321 19.848 18.9026 19.848 18.5591C19.848 18.2155 19.7115 17.8861 19.4686 17.6431Z" />
            </svg>
          </button>

          <Link
            to="/cart"
            className="relative p-2 hover:bg-[#fddbd3] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2"
            aria-label={`Giỏ hàng (${totalItems} món)`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M16 11V7C16 4.79 14.21 3 12 3H8C5.79 3 4 4.79 4 7V11M5 9H15L16 20H4L5 9Z"
                stroke="#AD2C00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#fdc003] text-[#6c5000] text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="hidden lg:inline-flex bg-[#ad2c00] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#8a2300] transition-colors text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2"
            >
              Đăng Nhập
            </Link>
          ) : (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 hover:bg-[#fddbd3] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2"
                aria-label="Menu người dùng"
                aria-expanded={showUserMenu}
              >
                <div className="w-8 h-8 bg-[#ad2c00] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-[14px]">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  className={`transition-transform ${showUserMenu ? "rotate-180" : ""}`}
                >
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {showUserMenu && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg py-2 w-48 z-50">
                  <div className="px-4 py-2 border-b border-[#fddbd3]">
                    <p className="font-semibold text-[#291712] text-[14px]">{user?.name}</p>
                    <p className="text-[#5d4038] text-[12px]">{user?.email}</p>
                  </div>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-[#5d4038] hover:bg-[#fddbd3] hover:text-[#ad2c00] transition-colors text-[14px]"
                  >
                    Tài Khoản
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-[#5d4038] hover:bg-[#fddbd3] hover:text-[#ad2c00] transition-colors text-[14px]"
                  >
                    Đơn Hàng
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[#ad2c00] hover:bg-[#fddbd3] transition-colors text-[14px]"
                  >
                    Đăng Xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-t border-[#fddbd3] shadow-lg">
          <nav className="max-w-[1280px] mx-auto px-5 py-4 flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setShowMobileMenu(false)}
              className={`font-['Inter'] font-semibold text-[15px] py-2 ${
                isActive("/")
                  ? "text-[#ad2c00]"
                  : "text-[#5d4038] hover:text-[#ad2c00]"
              } transition-colors`}
            >
              Trang Chủ
            </Link>
            <Link
              to="/menu"
              onClick={() => setShowMobileMenu(false)}
              className={`font-['Inter'] font-semibold text-[15px] py-2 ${
                isActive("/menu")
                  ? "text-[#ad2c00]"
                  : "text-[#5d4038] hover:text-[#ad2c00]"
              } transition-colors`}
            >
              Thực Đơn
            </Link>
            <Link
              to="/promotions"
              onClick={() => setShowMobileMenu(false)}
              className={`font-['Inter'] font-semibold text-[15px] py-2 ${
                isActive("/promotions")
                  ? "text-[#ad2c00]"
                  : "text-[#5d4038] hover:text-[#ad2c00]"
              } transition-colors`}
            >
              Khuyến Mãi
            </Link>
            <div className="border-t border-[#fddbd3] pt-3 mt-1">
              <Link
                to="/orders"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-[#5d4038] hover:text-[#ad2c00] transition-colors text-[15px]"
              >
                Đơn Hàng
              </Link>
              <Link
                to="/account"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-[#5d4038] hover:text-[#ad2c00] transition-colors text-[15px]"
              >
                Tài Khoản
              </Link>
              <Link
                to="/reviews"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-[#5d4038] hover:text-[#ad2c00] transition-colors text-[15px]"
              >
                Đánh Giá
              </Link>
              <Link
                to="/about"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-[#5d4038] hover:text-[#ad2c00] transition-colors text-[15px]"
              >
                Về Chúng Tôi
              </Link>
              <Link
                to="/help"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-[#5d4038] hover:text-[#ad2c00] transition-colors text-[15px]"
              >
                Trợ Giúp
              </Link>
            </div>
            {!isAuthenticated && (
              <div className="border-t border-[#fddbd3] pt-3 mt-1">
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="block bg-[#ad2c00] text-white text-center px-4 py-3 rounded-lg font-semibold text-[15px] hover:bg-[#8a2300] transition-colors"
                  style={{ minHeight: "48px" }}
                >
                  Đăng Nhập
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
          onClick={() => {
            setShowSearchModal(false);
            setSearchQuery("");
          }}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[600px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#fddbd3]">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#5D4038">
                  <path d="M19.4686 17.6431L15.2313 13.4058C16.465 11.7111 17.0141 9.61346 16.7691 7.53163C16.5242 5.44981 15.5031 3.53694 13.9098 2.17485C12.3164 0.812767 10.268 0.101664 8.17342 0.183486C6.07883 0.265309 4.09214 1.13404 2.60991 2.61627C1.12768 4.0985 0.258953 6.08519 0.17713 8.17978C0.0953077 10.2744 0.806411 12.3228 2.1685 13.9161C3.53058 15.5095 5.44345 16.5305 7.52528 16.7755C9.6071 17.0205 11.7047 16.4713 13.3995 15.2377L17.6368 19.475C17.8797 19.7179 18.2092 19.8544 18.5527 19.8544C18.8962 19.8544 19.2257 19.7179 19.4686 19.475C19.7115 19.2321 19.848 18.9026 19.848 18.5591C19.848 18.2155 19.7115 17.8861 19.4686 17.6431Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Bạn muốn ăn gì hôm nay?"
                  className="flex-1 outline-none text-[#291712] text-[16px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      navigate(`/menu?q=${encodeURIComponent(searchQuery)}`);
                      setShowSearchModal(false);
                      setSearchQuery("");
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    setSearchQuery("");
                  }}
                  className="p-2 hover:bg-[#fddbd3] rounded-lg transition-colors"
                  aria-label="Đóng tìm kiếm"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#5D4038" strokeWidth="2">
                    <line x1="15" y1="5" x2="5" y2="15" />
                    <line x1="5" y1="5" x2="15" y2="15" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 max-h-[500px] overflow-y-auto">
              {!searchQuery ? (
                <>
                  {/* Quick Categories */}
                  <div className="mb-6">
                    <h3 className="text-[#5d4038] text-[13px] font-semibold mb-3 uppercase tracking-wide">
                      Danh Mục Phổ Biến
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {quickCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            navigate(`/menu?category=${encodeURIComponent(category)}`);
                            setShowSearchModal(false);
                            setSearchQuery("");
                          }}
                          className="px-4 py-2 bg-[#fddbd3] text-[#ad2c00] rounded-full text-[14px] font-medium hover:bg-[#ad2c00] hover:text-white transition-colors"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Dishes */}
                  <div>
                    <h3 className="text-[#5d4038] text-[13px] font-semibold mb-3 uppercase tracking-wide">
                      Món Nổi Bật
                    </h3>
                    <div className="space-y-2">
                      {popularDishes.map((dish) => (
                        <Link
                          key={dish.id}
                          to={`/dish/${dish.id}`}
                          onClick={() => {
                            setShowSearchModal(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#fddbd3] transition-colors"
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-[#291712] text-[14px]">{dish.name}</p>
                            <p className="text-[#5d4038] text-[12px]">{dish.category}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <p className="text-[#5d4038] text-[13px] mb-3">
                    Nhấn Enter để tìm kiếm "{searchQuery}"
                  </p>
                  {popularDishes
                    .filter((dish) =>
                      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      dish.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice(0, 3)
                    .map((dish) => (
                      <Link
                        key={dish.id}
                        to={`/dish/${dish.id}`}
                        onClick={() => {
                          setShowSearchModal(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#fddbd3] transition-colors"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-[#291712] text-[14px]">{dish.name}</p>
                          <p className="text-[#5d4038] text-[12px]">{dish.category}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
