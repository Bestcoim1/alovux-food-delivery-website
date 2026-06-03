import { useEffect, useState } from "react";
import { Link } from "react-router";

interface OrderData {
  orderNumber: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  paymentMethod: string;
  timestamp: string;
}

export default function OrderConfirmationPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("last_order");
    if (savedOrder) {
      try {
        setOrderData(JSON.parse(savedOrder));
      } catch (error) {
        console.error("Failed to load order data:", error);
      }
    }
  }, []);

  if (!orderData) {
    return (
      <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-5 py-6 sm:py-12">
          <div className="bg-white rounded-xl p-6 sm:p-12 text-center">
            <p className="text-[#5d4038] text-[16px] mb-6">
              Không tìm thấy thông tin đơn hàng
            </p>
            <Link
              to="/menu"
              className="inline-block bg-[#ad2c00] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#8a2300] transition-colors"
              style={{ minHeight: 48 }}
            >
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      <div className="max-w-[800px] mx-auto px-4 sm:px-5 py-6 sm:py-12">
        <div className="bg-white rounded-xl p-6 sm:p-8 text-center mb-6">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#d4edda] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-[#155724]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="font-display font-bold text-[24px] sm:text-[32px] text-[#291712] mb-2">
            Đặt Hàng Thành Công!
          </h1>
          <p className="text-[#5d4038] text-[16px] sm:text-[18px] mb-6">
            Cảm ơn bạn đã đặt hàng tại ALOVUX
          </p>

          <div className="bg-[#fff8f6] rounded-lg p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[#5d4038] text-[14px]">Mã đơn hàng:</span>
              <span className="font-['Inter'] font-bold text-[20px] text-[#ad2c00]">
                {orderData.orderNumber}
              </span>
            </div>
            <p className="text-[#5d4038] text-[13px]">
              {new Date(orderData.timestamp).toLocaleString("vi-VN")}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-[#fddbd3] rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-[24px]">📦</span>
              </div>
              <p className="text-[#5d4038] text-[12px] font-medium">
                Đang chuẩn bị
              </p>
            </div>
            <div className="w-12 h-0.5 bg-[#fddbd3]"></div>
            <div>
              <div className="w-12 h-12 bg-[#fddbd3] rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-[24px]">🚚</span>
              </div>
              <p className="text-[#5d4038] text-[12px] font-medium">Đang giao</p>
            </div>
            <div className="w-12 h-0.5 bg-[#fddbd3]"></div>
            <div>
              <div className="w-12 h-12 bg-[#fddbd3] rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-[24px]">✅</span>
              </div>
              <p className="text-[#5d4038] text-[12px] font-medium">Hoàn thành</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl p-5 sm:p-6 mb-6">
          <h2 className="font-display font-semibold text-[20px] sm:text-[24px] text-[#291712] mb-4">
            Chi Tiết Đơn Hàng
          </h2>

          <div className="space-y-3 mb-4">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-['Inter'] font-medium text-[15px] text-[#291712]">
                    {item.name}
                  </h3>
                  <p className="text-[#5d4038] text-[13px]">
                    Số lượng: {item.quantity}
                  </p>
                </div>
                <span className="text-[#ad2c00] text-[16px] font-semibold">
                  {(item.price * item.quantity).toLocaleString()}đ
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#fddbd3] pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#5d4038] text-[15px]">
                Phương thức thanh toán
              </span>
              <span className="text-[#291712] font-medium text-[15px]">
                {orderData.paymentMethod === "cod"
                  ? "Thanh toán khi nhận hàng"
                  : "Thẻ tín dụng"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] font-semibold text-[18px] text-[#291712]">
                Tổng cộng
              </span>
              <span className="font-['Inter'] font-bold text-[24px] text-[#ad2c00]">
                {orderData.total.toLocaleString()}đ
              </span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#fff8f6] rounded-lg p-5 sm:p-6 mb-6">
          <h3 className="font-['Inter'] font-semibold text-[16px] text-[#291712] mb-3">
            📱 Theo Dõi Đơn Hàng
          </h3>
          <p className="text-[#5d4038] text-[14px] leading-relaxed mb-4">
            Bạn có thể theo dõi trạng thái đơn hàng trong mục{" "}
            <Link to="/orders" className="text-[#ad2c00] font-medium hover:underline">
              Đơn Hàng
            </Link>{" "}
            hoặc chúng tôi sẽ gửi thông báo qua số điện thoại đã đăng ký.
          </p>
          <p className="text-[#5d4038] text-[14px] leading-relaxed">
            🕐 Thời gian giao hàng dự kiến: <span className="font-medium text-[#291712]">20-30 phút</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            to="/orders"
            className="flex-1 bg-[#ad2c00] text-white py-3.5 rounded-lg font-semibold text-center hover:bg-[#8a2300] transition-colors"
            style={{ minHeight: 48 }}
          >
            Xem Đơn Hàng
          </Link>
          <Link
            to="/menu"
            className="flex-1 border-2 border-[#ad2c00] text-[#ad2c00] py-3.5 rounded-lg font-semibold text-center hover:bg-[#fff8f6] transition-colors"
            style={{ minHeight: 48 }}
          >
            Tiếp Tục Đặt Món
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-6 text-center">
          <p className="text-[#5d4038] text-[13px]">
            Cần hỗ trợ?{" "}
            <a href="#" className="text-[#ad2c00] font-medium hover:underline">
              Liên hệ chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
