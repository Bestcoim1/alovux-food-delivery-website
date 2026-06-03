import { useState } from "react";
import { Link } from "react-router";

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState("order");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const categories = [
    { id: "order", name: "Đặt Hàng", icon: "🛒" },
    { id: "payment", name: "Thanh Toán", icon: "💳" },
    { id: "delivery", name: "Giao Hàng", icon: "🚚" },
    { id: "account", name: "Tài Khoản", icon: "👤" },
    { id: "promotion", name: "Khuyến Mãi", icon: "🎁" },
  ];

  const faqs = {
    order: [
      {
        id: "o1",
        question: "Làm thế nào để đặt món ăn?",
        answer:
          "Bạn có thể đặt món ăn bằng cách: 1) Duyệt thực đơn và chọn món ăn yêu thích, 2) Thêm vào giỏ hàng, 3) Xem lại đơn hàng và điền thông tin giao hàng, 4) Chọn phương thức thanh toán và hoàn tất đơn hàng.",
      },
      {
        id: "o2",
        question: "Tôi có thể hủy đơn hàng không?",
        answer:
          "Bạn có thể hủy đơn hàng miễn phí trong vòng 5 phút sau khi đặt. Sau thời gian này, vui lòng liên hệ hotline 1900 1234 để được hỗ trợ.",
      },
      {
        id: "o3",
        question: "Tôi có thể đặt trước món ăn không?",
        answer:
          "Có, bạn có thể đặt trước món ăn cho bất kỳ thời gian nào trong ngày. Chỉ cần chọn 'Đặt hàng trước' tại trang thanh toán và chọn thời gian mong muốn.",
      },
      {
        id: "o4",
        question: "Số lượng đặt tối thiểu là bao nhiêu?",
        answer:
          "Không có giới hạn số lượng đặt tối thiểu. Tuy nhiên, một số chương trình khuyến mãi có thể yêu cầu giá trị đơn hàng tối thiểu.",
      },
    ],
    payment: [
      {
        id: "p1",
        question: "Những phương thức thanh toán nào được chấp nhận?",
        answer:
          "Chúng tôi chấp nhận: Tiền mặt khi nhận hàng (COD), Thẻ ATM nội địa, Thẻ Visa/Mastercard, Ví điện tử (MoMo, ZaloPay, VNPay), và Chuyển khoản ngân hàng.",
      },
      {
        id: "p2",
        question: "Thanh toán có an toàn không?",
        answer:
          "Tất cả giao dịch thanh toán trực tuyến đều được mã hóa SSL và xử lý qua cổng thanh toán bảo mật của các đối tác uy tín.",
      },
      {
        id: "p3",
        question: "Tôi có thể thay đổi phương thức thanh toán sau khi đặt hàng không?",
        answer:
          "Để thay đổi phương thức thanh toán, vui lòng liên hệ ngay với chúng tôi qua hotline 1900 1234 trong vòng 5 phút sau khi đặt hàng.",
      },
    ],
    delivery: [
      {
        id: "d1",
        question: "Thời gian giao hàng là bao lâu?",
        answer:
          "Thời gian giao hàng tiêu chuẩn là 20-30 phút tùy thuộc vào khoảng cách và lưu lượng giao thông. Bạn có thể theo dõi trạng thái đơn hàng trong thời gian thực.",
      },
      {
        id: "d2",
        question: "Phí giao hàng được tính như thế nào?",
        answer:
          "Phí giao hàng được tính dựa trên khoảng cách từ nhà hàng đến địa điểm giao hàng. Phí dao động từ 10.000đ - 30.000đ. Đơn hàng từ 50.000đ có thể được miễn phí ship với mã khuyến mãi.",
      },
      {
        id: "d3",
        question: "Khu vực nào được giao hàng?",
        answer:
          "Hiện tại chúng tôi phục vụ giao hàng trong nội thành TP.HCM, bao gồm tất cả các quận. Chúng tôi đang mở rộng dịch vụ đến các tỉnh thành khác.",
      },
      {
        id: "d4",
        question: "Tôi có thể theo dõi đơn hàng không?",
        answer:
          "Có, bạn có thể theo dõi đơn hàng trong thời gian thực tại trang 'Đơn hàng của tôi'. Bạn sẽ nhận được thông báo qua SMS và email về trạng thái đơn hàng.",
      },
    ],
    account: [
      {
        id: "a1",
        question: "Làm thế nào để tạo tài khoản?",
        answer:
          "Nhấn vào 'Đăng ký' ở góc trên cùng, điền thông tin cá nhân và email. Bạn sẽ nhận được email xác nhận để kích hoạt tài khoản.",
      },
      {
        id: "a2",
        question: "Tôi quên mật khẩu, làm thế nào để lấy lại?",
        answer:
          "Nhấn vào 'Quên mật khẩu' tại trang đăng nhập, nhập email đã đăng ký và làm theo hướng dẫn trong email để đặt lại mật khẩu mới.",
      },
      {
        id: "a3",
        question: "Làm thế nào để cập nhật thông tin tài khoản?",
        answer:
          "Đăng nhập vào tài khoản, vào mục 'Tài khoản' và chọn 'Chỉnh sửa hồ sơ' để cập nhật thông tin cá nhân, địa chỉ và số điện thoại.",
      },
    ],
    promotion: [
      {
        id: "pr1",
        question: "Làm thế nào để sử dụng mã giảm giá?",
        answer:
          "Tại trang thanh toán, nhập mã giảm giá vào ô 'Mã khuyến mãi' và nhấn 'Áp dụng'. Giá trị giảm giá sẽ được tự động tính vào tổng đơn hàng.",
      },
      {
        id: "pr2",
        question: "Tôi có thể sử dụng nhiều mã giảm giá cùng lúc không?",
        answer:
          "Mỗi đơn hàng chỉ có thể áp dụng một mã giảm giá. Tuy nhiên, các chương trình khuyến mãi tự động có thể được kết hợp với mã giảm giá.",
      },
      {
        id: "pr3",
        question: "Làm thế nào để biết về các chương trình khuyến mãi mới?",
        answer:
          "Đăng ký nhận email để không bỏ lỡ các chương trình khuyến mãi mới nhất. Bạn cũng có thể theo dõi trang 'Khuyến mãi' hoặc fanpage của chúng tôi.",
      },
    ],
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-[24px] sm:text-[36px] text-[#291712] mb-4">
            Trung Tâm Hỗ Trợ
          </h1>
          <p className="text-[#5d4038] text-[16px] sm:text-[18px] max-w-[600px] mx-auto">
            Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-[#fddbd3] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="#AD2C00">
                <path d="M28 18.5C25.5 18.5 23.1 18.15 20.86 17.52C20.32 17.36 19.73 17.5 19.36 17.86L16.53 20.69C12.57 18.64 10.58 16.67 8.52 12.68L11.35 9.85C11.72 9.48 11.86 8.89 11.7 8.35C11.07 6.09 10.72 3.69 10.72 1.19C10.72 0.54 10.18 0 9.53 0H1.19C0.54 0 0 0.54 0 1.19C0 18.5 14.5 33 31.81 33C32.46 33 33 32.46 33 31.81V23.47C33 22.82 32.46 22.28 31.81 22.28H28V18.5Z" />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[18px] text-[#291712] mb-2">
              Hotline
            </h3>
            <p className="text-[#ad2c00] font-bold text-[20px] mb-2">
              1900 1234
            </p>
            <p className="text-[#5d4038] text-[13px]">24/7 - Miễn phí</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-[#fddbd3] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="#AD2C00">
                <path d="M28 6H4C2.9 6 2 6.9 2 8V24C2 25.1 2.9 26 4 26H28C29.1 26 30 25.1 30 24V8C30 6.9 29.1 6 28 6ZM28 10L16 17L4 10V8L16 15L28 8V10Z" />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[18px] text-[#291712] mb-2">
              Email
            </h3>
            <p className="text-[#ad2c00] font-bold text-[16px] mb-2">
              support@alovux.vn
            </p>
            <p className="text-[#5d4038] text-[13px]">Phản hồi trong 24h</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-[#fddbd3] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="#AD2C00">
                <path d="M16 2C8.3 2 2 8.3 2 16C2 23.7 8.3 30 16 30C23.7 30 30 23.7 30 16C30 8.3 23.7 2 16 2ZM22 17H17V22H15V17H10V15H15V10H17V15H22V17Z" />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[18px] text-[#291712] mb-2">
              Chat Trực Tuyến
            </h3>
            <button className="bg-[#ad2c00] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#8a2300] transition-colors text-[14px]">
              Bắt Đầu Chat
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm">
          <h2 className="font-display font-semibold text-[18px] sm:text-[24px] text-[#291712] mb-6">
            Câu Hỏi Thường Gặp
          </h2>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium text-[14px] transition-colors ${
                  activeCategory === category.id
                    ? "bg-[#ad2c00] text-white"
                    : "bg-[#fff8f6] text-[#5d4038] hover:bg-[#fddbd3]"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {faqs[activeCategory as keyof typeof faqs].map((faq) => (
              <div
                key={faq.id}
                className="border-2 border-[#fddbd3] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-[#fff8f6] transition-colors"
                >
                  <span className="font-['Inter'] font-semibold text-[16px] text-[#291712] text-left">
                    {faq.question}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`transition-transform ${
                      openFaqId === faq.id ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#291712"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {openFaqId === faq.id && (
                  <div className="px-4 pb-4">
                    <p className="text-[#5d4038] text-[15px] leading-[24px]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gradient-to-r from-[#ad2c00] to-[#d63600] rounded-xl p-4 sm:p-8 mt-8 text-center text-white">
          <h2 className="font-display font-bold text-[18px] sm:text-[24px] mb-3">
            Vẫn Cần Hỗ Trợ?
          </h2>
          <p className="text-[16px] mb-6 opacity-90">
            Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng giúp đỡ bạn
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/about"
              className="bg-white text-[#ad2c00] px-6 py-3 min-h-[48px] rounded-lg font-medium hover:bg-[#fff8f6] transition-colors"
            >
              Liên Hệ Chúng Tôi
            </Link>
            <Link
              to="/menu"
              className="bg-transparent border-2 border-white text-white px-6 py-3 min-h-[48px] rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Xem Thực Đơn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
