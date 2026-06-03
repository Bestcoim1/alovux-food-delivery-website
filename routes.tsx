import { Link } from "react-router";

export default function AboutPage() {
  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-[24px] sm:text-[36px] text-[#291712] mb-4">
            Về Chúng Tôi
          </h1>
          <p className="text-[#5d4038] text-[16px] sm:text-[18px] max-w-[800px] mx-auto">
            Mang hương vị Việt Nam đích thực đến tận nhà bạn
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl p-4 sm:p-8 mb-8 shadow-sm">
          <h2 className="font-display font-semibold text-[18px] sm:text-[24px] text-[#291712] mb-4">
            Câu Chuyện Của Chúng Tôi
          </h2>
          <div className="space-y-4 text-[#5d4038] text-[16px] leading-[28px]">
            <p>
              ALOVUX được thành lập vào năm 2024 với sứ mệnh mang đến những món ăn Việt Nam truyền thống,
              chất lượng cao và giao hàng nhanh chóng đến tận tay khách hàng.
            </p>
            <p>
              Chúng tôi tin rằng mỗi bữa ăn không chỉ là thức ăn, mà còn là cầu nối văn hóa, là nơi sum họp
              gia đình và là những kỷ niệm đáng nhớ. Vì vậy, chúng tôi cam kết sử dụng nguyên liệu tươi ngon
              nhất, công thức nấu ăn truyền thống và dịch vụ giao hàng tận tâm.
            </p>
            <p>
              Với đội ngũ đầu bếp giàu kinh nghiệm và đội giao hàng chuyên nghiệp, chúng tôi tự hào phục vụ
              hơn 10,000 khách hàng mỗi tháng trên khắp thành phố.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-16 h-16 bg-[#fddbd3] rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 4L20 12L28 13L22 19L24 28L16 23L8 28L10 19L4 13L12 12L16 4Z"
                  fill="#AD2C00"
                />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[20px] text-[#291712] mb-2">
              Chất Lượng Hàng Đầu
            </h3>
            <p className="text-[#5d4038] text-[14px] leading-[22px]">
              Nguyên liệu tươi ngon được chọn lọc kỹ càng mỗi ngày, đảm bảo món ăn luôn đạt tiêu chuẩn cao nhất.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-16 h-16 bg-[#fddbd3] rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2C8.3 2 2 8.3 2 16C2 23.7 8.3 30 16 30C23.7 30 30 23.7 30 16C30 8.3 23.7 2 16 2ZM16 27C9.9 27 5 22.1 5 16C5 9.9 9.9 5 16 5C22.1 5 27 9.9 27 16C27 22.1 22.1 27 16 27ZM17 9H15V17L22 21L23 19L17 15.5V9Z"
                  fill="#AD2C00"
                />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[20px] text-[#291712] mb-2">
              Giao Hàng Nhanh Chóng
            </h3>
            <p className="text-[#5d4038] text-[14px] leading-[22px]">
              Cam kết giao hàng trong vòng 30 phút để món ăn luôn nóng hổi và giữ nguyên hương vị.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-16 h-16 bg-[#fddbd3] rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2C13.8 2 12 3.8 12 6C12 8.2 13.8 10 16 10C18.2 10 20 8.2 20 6C20 3.8 18.2 2 16 2ZM10 12C7.8 12 6 13.8 6 16C6 18.2 7.8 20 10 20C12.2 20 14 18.2 14 16C14 13.8 12.2 12 10 12ZM22 12C19.8 12 18 13.8 18 16C18 18.2 19.8 20 22 20C24.2 20 26 18.2 26 16C26 13.8 24.2 12 22 12ZM16 22C12.7 22 2 23.7 2 27V30H30V27C30 23.7 19.3 22 16 22Z"
                  fill="#AD2C00"
                />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[20px] text-[#291712] mb-2">
              Dịch Vụ Tận Tâm
            </h3>
            <p className="text-[#5d4038] text-[14px] leading-[22px]">
              Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn 24/7 với thái độ nhiệt tình, chuyên nghiệp.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm">
          <h2 className="font-display font-semibold text-[18px] sm:text-[24px] text-[#291712] mb-6">
            Liên Hệ Với Chúng Tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-['Inter'] font-semibold text-[18px] text-[#291712] mb-4">
                Thông Tin Liên Hệ
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center text-[#ad2c00]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 0C6.13 0 3 3.13 3 7C3 12.25 10 20 10 20C10 20 17 12.25 17 7C17 3.13 13.87 0 10 0ZM10 9.5C8.62 9.5 7.5 8.38 7.5 7C7.5 5.62 8.62 4.5 10 4.5C11.38 4.5 12.5 5.62 12.5 7C12.5 8.38 11.38 9.5 10 9.5Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#291712]">Địa Chỉ</p>
                    <p className="text-[#5d4038] text-[14px]">
                      123 Đường Lê Lợi, Quận 1<br />
                      Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center text-[#ad2c00]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M18 12.5C16.75 12.5 15.55 12.3 14.43 11.93C14.08 11.82 13.69 11.9 13.41 12.17L11.21 14.37C8.38 12.93 7.06 11.62 5.62 8.78L7.82 6.58C8.1 6.31 8.18 5.92 8.07 5.57C7.7 4.45 7.5 3.25 7.5 2C7.5 1.45 7.05 1 6.5 1H3C2.45 1 2 1.45 2 2C2 11.39 9.61 19 19 19C19.55 19 20 18.55 20 18V14.5C20 13.95 19.55 13.5 19 13.5H18V12.5Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#291712]">Hotline</p>
                    <p className="text-[#5d4038] text-[14px]">1900 1234</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center text-[#ad2c00]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M18 4H2C0.9 4 0 4.9 0 6V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V6C20 4.9 19.1 4 18 4ZM18 8L10 12.5L2 8V6L10 10.5L18 6V8Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#291712]">Email</p>
                    <p className="text-[#5d4038] text-[14px]">support@alovux.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center text-[#ad2c00]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.25 14.15L15 12.92L10.5 10.25V5Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#291712]">Giờ Làm Việc</p>
                    <p className="text-[#5d4038] text-[14px]">
                      Thứ 2 - Chủ Nhật: 7:00 - 22:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-['Inter'] font-semibold text-[18px] text-[#291712] mb-4">
                Gửi Tin Nhắn Cho Chúng Tôi
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-[#291712] text-[14px] font-medium mb-2">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border-2 border-[#fddbd3] rounded-lg focus:outline-none focus:border-[#ad2c00]"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-[#291712] text-[14px] font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border-2 border-[#fddbd3] rounded-lg focus:outline-none focus:border-[#ad2c00]"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[#291712] text-[14px] font-medium mb-2">
                    Tin Nhắn
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-[#fddbd3] rounded-lg focus:outline-none focus:border-[#ad2c00]"
                    placeholder="Nội dung tin nhắn của bạn..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#ad2c00] text-white py-3 min-h-[48px] rounded-lg font-medium hover:bg-[#8a2300] transition-colors"
                >
                  Gửi Tin Nhắn
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-[#ad2c00] text-white px-8 py-3 min-h-[48px] rounded-lg font-medium hover:bg-[#8a2300] transition-colors"
          >
            <span>Xem Thực Đơn</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
