import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (success) {
        navigate("/");
      } else {
        setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
        setIsLoading(false);
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu xác nhận không khớp.");
        setIsLoading(false);
        return;
      }
      register(formData.name, formData.email, formData.phone, formData.password);
      navigate("/");
    }
  };

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
        <div className="max-w-[400px] sm:max-w-[480px] mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display font-bold text-[24px] sm:text-[32px] text-[#291712] mb-2">
                {isLogin ? "Đăng Nhập" : "Đăng Ký"}
              </h1>
              <p className="text-[#5d4038] text-[15px]">
                {isLogin
                  ? "Chào mừng bạn quay lại ALOVUX"
                  : "Tạo tài khoản để bắt đầu đặt món"}
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#fddbd3] rounded-lg py-3 hover:border-[#ad2c00] transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M18.1713 8.36788H17.5V8.33329H10V11.6666H14.7096C14.0225 13.6071 12.1762 15 10 15C7.23875 15 5 12.7612 5 9.99996C5 7.23871 7.23875 4.99996 10 4.99996C11.2746 4.99996 12.4342 5.48079 13.3171 6.26621L15.6742 3.90913C14.1858 2.52204 12.195 1.66663 10 1.66663C5.39792 1.66663 1.66667 5.39788 1.66667 9.99996C1.66667 14.602 5.39792 18.3333 10 18.3333C14.6021 18.3333 18.3333 14.602 18.3333 9.99996C18.3333 9.44121 18.2758 8.89579 18.1713 8.36788Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M2.6275 6.12121L5.36542 8.12913C6.10625 6.29496 7.90042 5 10 5C11.2746 5 12.4342 5.48083 13.3171 6.26625L15.6742 3.90917C14.1858 2.52208 12.195 1.66667 10 1.66667C6.79917 1.66667 4.02333 3.47375 2.6275 6.12121Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M10 18.3333C12.1525 18.3333 14.1083 17.5095 15.5871 16.17L13.0079 13.9875C12.1431 14.6452 11.0864 15.0009 10 15C7.82917 15 5.98667 13.6179 5.29542 11.6891L2.58167 13.783C3.96042 16.4816 6.76125 18.3333 10 18.3333Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M18.1713 8.36796H17.5V8.33337H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3354 18.3333 14.1667 18.3333 10C18.3333 9.44129 18.2758 8.89587 18.1713 8.36796Z"
                    fill="#1976D2"
                  />
                </svg>
                <span className="font-medium text-[#291712]">
                  Tiếp tục với Google
                </span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white rounded-lg py-3 hover:bg-[#166FE5] transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 14.84 3.44 18.87 8 19.8V13H6V10H8V7.5C8 5.57 9.57 4 11.5 4H14V7H12C11.45 7 11 7.45 11 8V10H14V13H11V19.95C16.05 19.45 20 15.19 20 10Z" />
                </svg>
                <span className="font-medium">Tiếp tục với Facebook</span>
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[#fddbd3]"></div>
              <span className="text-[#5d4038] text-[13px]">Hoặc</span>
              <div className="flex-1 h-px bg-[#fddbd3]"></div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-[14px]">{error}</p>
              </div>
            )}

            {/* Login/Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-[#291712] text-[14px] font-medium mb-2">
                      Họ và Tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:outline-none focus:border-[#ad2c00] transition-colors"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-[#291712] text-[14px] font-medium mb-2">
                      Số Điện Thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:outline-none focus:border-[#ad2c00] transition-colors"
                      placeholder="0901234567"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[#291712] text-[14px] font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:outline-none focus:border-[#ad2c00] transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-[#291712] text-[14px] font-medium mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:outline-none focus:border-[#ad2c00] transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-[#291712] text-[14px] font-medium mb-2">
                    Xác nhận Mật khẩu
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:outline-none focus:border-[#ad2c00] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-2 border-[#926f66] text-[#ad2c00] focus:ring-[#ad2c00]"
                    />
                    <span className="text-[#5d4038] text-[13px]">
                      Ghi nhớ đăng nhập
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-[#ad2c00] text-[13px] font-medium hover:underline"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              )}

              {!isLogin && (
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 rounded border-2 border-[#926f66] text-[#ad2c00] focus:ring-[#ad2c00] mt-1"
                  />
                  <span className="text-[#5d4038] text-[13px] leading-[20px]">
                    Tôi đồng ý với{" "}
                    <Link to="/terms" className="text-[#ad2c00] hover:underline">
                      Điều khoản sử dụng
                    </Link>{" "}
                    và{" "}
                    <Link to="/help" className="text-[#ad2c00] hover:underline">
                      Chính sách bảo mật
                    </Link>
                  </span>
                </label>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#ad2c00] text-white py-3 rounded-lg font-semibold hover:bg-[#8a2300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? "Đang xử lý..."
                  : isLogin
                  ? "Đăng Nhập"
                  : "Đăng Ký"}
              </button>
            </form>

            {/* Toggle Login/Register */}
            <div className="text-center mt-6">
              <p className="text-[#5d4038] text-[14px]">
                {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                  className="text-[#ad2c00] font-medium hover:underline"
                >
                  {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                </button>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#fddbd3] rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-[20px]">🎁</span>
              </div>
              <p className="text-[#5d4038] text-[12px] font-medium">
                Ưu đãi độc quyền
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#fddbd3] rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-[20px]">⚡</span>
              </div>
              <p className="text-[#5d4038] text-[12px] font-medium">
                Đặt hàng nhanh
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#fddbd3] rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-[20px]">💰</span>
              </div>
              <p className="text-[#5d4038] text-[12px] font-medium">
                Tích điểm đổi quà
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-[#5d4038] text-[14px] hover:text-[#ad2c00] transition-colors inline-flex items-center gap-1"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 13L5 8L10 3"
                />
              </svg>
              <span>Quay về Trang chủ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
