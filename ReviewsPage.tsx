import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "preparing" | "delivering" | "completed" | "cancelled";
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  deliveryTime?: string;
  address: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ALV20240514001",
    date: "2024-05-14 10:30",
    status: "delivering",
    items: [
      { name: "Phở Bò Đặc Biệt", quantity: 2, price: 55000 },
      { name: "Bánh Mì Thịt Nướng", quantity: 1, price: 25000 },
    ],
    total: 135000,
    deliveryTime: "15-20 phút",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
  },
  {
    id: "2",
    orderNumber: "ALV20240513002",
    date: "2024-05-13 18:45",
    status: "completed",
    items: [
      { name: "Bún Chả Hà Nội", quantity: 1, price: 50000 },
      { name: "Chè Ba Màu", quantity: 2, price: 30000 },
    ],
    total: 110000,
    address: "456 Lê Lợi, Quận 1, TP.HCM",
  },
  {
    id: "3",
    orderNumber: "ALV20240512003",
    date: "2024-05-12 12:20",
    status: "completed",
    items: [
      { name: "Phở Bò Truyền Thống", quantity: 1, price: 45000 },
      { name: "Gỏi Cuốn Tôm Thịt", quantity: 3, price: 105000 },
    ],
    total: 150000,
    address: "789 Hai Bà Trưng, Quận 3, TP.HCM",
  },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [reviewingOrder, setReviewingOrder] = useState<Order | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<Order | null>(null);

  const statusColors = {
    pending: { bg: "bg-[#fff8f6]", text: "text-[#ad2c00]", label: "Chờ Xác Nhận" },
    preparing: { bg: "bg-[#fff8f6]", text: "text-[#ad2c00]", label: "Đang Chuẩn Bị" },
    delivering: { bg: "bg-[#fdc003]", text: "text-[#6c5000]", label: "Đang Giao" },
    completed: { bg: "bg-[#d4edda]", text: "text-[#155724]", label: "Hoàn Thành" },
    cancelled: { bg: "bg-[#f8d7da]", text: "text-[#721c24]", label: "Đã Hủy" },
  };

  const filteredOrders = mockOrders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "active") return ["pending", "preparing", "delivering"].includes(order.status);
    if (filter === "completed") return ["completed", "cancelled"].includes(order.status);
    return true;
  });

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      {/* Order Tracking Modal */}
      {trackingOrder && (
        <OrderTrackingModal
          order={trackingOrder}
          onClose={() => setTrackingOrder(null)}
        />
      )}

      {/* Review Modal */}
      {reviewingOrder && (
        <ReviewModal
          order={reviewingOrder}
          onClose={() => setReviewingOrder(null)}
        />
      )}

      {/* Cancel Order Modal */}
      {cancellingOrder && (
        <CancelOrderModal
          order={cancellingOrder}
          onClose={() => setCancellingOrder(null)}
        />
      )}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-[24px] sm:text-[32px] text-[#291712] mb-2">
            Đơn Hàng Của Tôi
          </h1>
          <p className="text-[#5d4038] text-[16px]">
            Theo dõi và quản lý đơn hàng của bạn
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-6 border-b border-[#fddbd3] overflow-x-auto">
          <button
            onClick={() => setFilter("all")}
            className={`pb-3 px-2 font-['Inter'] font-medium text-[16px] transition-colors relative ${
              filter === "all"
                ? "text-[#ad2c00]"
                : "text-[#5d4038] hover:text-[#ad2c00]"
            }`}
          >
            Tất Cả
            {filter === "all" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ad2c00]" />
            )}
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`pb-3 px-2 font-['Inter'] font-medium text-[16px] transition-colors relative ${
              filter === "active"
                ? "text-[#ad2c00]"
                : "text-[#5d4038] hover:text-[#ad2c00]"
            }`}
          >
            Đang Xử Lý
            {filter === "active" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ad2c00]" />
            )}
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`pb-3 px-2 font-['Inter'] font-medium text-[16px] transition-colors relative ${
              filter === "completed"
                ? "text-[#ad2c00]"
                : "text-[#5d4038] hover:text-[#ad2c00]"
            }`}
          >
            Đã Hoàn Thành
            {filter === "completed" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ad2c00]" />
            )}
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <div className="text-[#5d4038] mb-4">
                <svg
                  className="w-24 h-24 mx-auto mb-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="font-['Inter'] font-semibold text-[20px] text-[#291712] mb-2">
                Chưa Có Đơn Hàng
              </h3>
              <p className="text-[#5d4038] text-[16px]">
                Hãy khám phá thực đơn và đặt món ngay!
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="font-['Inter'] font-bold text-[16px] sm:text-[18px] text-[#291712]">
                        {order.orderNumber}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                          statusColors[order.status].bg
                        } ${statusColors[order.status].text}`}
                      >
                        {statusColors[order.status].label}
                      </span>
                    </div>
                    <p className="text-[#5d4038] text-[14px]">{order.date}</p>
                  </div>
                  {order.deliveryTime && (
                    <div className="flex items-center gap-2 bg-[#fff1ed] px-3 py-2 rounded-lg">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="#ad2c00">
                        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.4c-3.52 0-6.4-2.88-6.4-6.4S4.48 1.6 8 1.6s6.4 2.88 6.4 6.4-2.88 6.4-6.4 6.4z" />
                        <path d="M8.8 4H7.2v4.8l4 2.4.8-1.28-3.2-1.92V4z" />
                      </svg>
                      <span className="text-[#ad2c00] text-[13px] font-medium">
                        {order.deliveryTime}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#fddbd3] pt-4 mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#5d4038] text-[14px]">
                          {item.quantity}x
                        </span>
                        <span className="font-['Inter'] text-[15px] text-[#291712]">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[#5d4038] text-[15px]">
                        {item.price.toLocaleString()}đ
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-[#fddbd3]">
                  <div>
                    <p className="text-[#5d4038] text-[13px] mb-1">Địa chỉ giao hàng</p>
                    <p className="text-[#291712] text-[14px]">{order.address}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-[#5d4038] text-[13px] mb-1">Tổng cộng</p>
                    <p className="font-['Inter'] font-bold text-[20px] text-[#ad2c00]">
                      {order.total.toLocaleString()}đ
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:flex sm:gap-3 gap-2 mt-4">
                  {order.status === "delivering" && (
                    <>
                      <button
                        onClick={() => setTrackingOrder(order)}
                        className="flex-1 bg-[#ad2c00] text-white py-3 rounded-lg font-medium text-[14px] hover:bg-[#8a2300] transition-colors"
                      >
                        Theo Dõi Đơn Hàng
                      </button>
                      <button
                        onClick={() => setCancellingOrder(order)}
                        className="flex-1 border-2 border-[#5d4038] text-[#5d4038] py-3 rounded-lg font-medium text-[14px] hover:bg-[#fff8f6] transition-colors"
                      >
                        Hủy Đơn
                      </button>
                    </>
                  )}
                  {order.status === "completed" && (
                    <>
                      <button className="flex-1 bg-[#ad2c00] text-white py-3 rounded-lg font-medium text-[14px] hover:bg-[#8a2300] transition-colors">
                        Đặt Lại
                      </button>
                      <button
                        onClick={() => setReviewingOrder(order)}
                        className="flex-1 border-2 border-[#ad2c00] text-[#ad2c00] py-3 rounded-lg font-medium text-[14px] hover:bg-[#fff8f6] transition-colors"
                      >
                        Đánh Giá
                      </button>
                    </>
                  )}
                  {order.status === "pending" && (
                    <button
                      onClick={() => setCancellingOrder(order)}
                      className="flex-1 border-2 border-[#5d4038] text-[#5d4038] py-3 rounded-lg font-medium text-[14px] hover:bg-[#fff8f6] transition-colors"
                    >
                      Hủy Đơn
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Cancel Order Modal Component
function CancelOrderModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const handleConfirmCancel = () => {
    toast.success("Đơn hàng đã được hủy thành công", {
      description: `Mã đơn: ${order.orderNumber}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-[500px] w-full p-6 sm:p-8 mx-4">
        {/* Warning Icon */}
        <div className="w-16 h-16 bg-[#fff1ed] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ad2c00"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="font-['Inter'] font-bold text-[20px] sm:text-[24px] text-[#291712] mb-2">
            Xác Nhận Hủy Đơn Hàng
          </h3>
          <p className="text-[#5d4038] text-[16px] mb-4">
            Bạn có chắc chắn muốn hủy đơn hàng <span className="font-semibold text-[#291712]">{order.orderNumber}</span>?
          </p>
          <p className="text-[#5d4038] text-[14px]">
            Hành động này không thể hoàn tác.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleConfirmCancel}
            className="flex-1 bg-white border-2 border-[#ad2c00] text-[#ad2c00] py-3 rounded-lg font-semibold hover:bg-[#fff8f6] transition-colors"
          >
            Xác Nhận Hủy
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#ad2c00] text-white py-3 rounded-lg font-semibold hover:bg-[#8a2300] transition-colors"
          >
            Quay Lại
          </button>
        </div>
      </div>
    </div>
  );
}

// Order Tracking Modal Component
function OrderTrackingModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const trackingSteps = [
    {
      status: "confirmed",
      label: "Đơn hàng đã xác nhận",
      time: "10:30",
      completed: true,
      description: "Chúng tôi đã nhận và xác nhận đơn hàng của bạn",
    },
    {
      status: "preparing",
      label: "Đang chuẩn bị",
      time: "10:35",
      completed: true,
      description: "Nhà hàng đang chuẩn bị món ăn",
    },
    {
      status: "delivering",
      label: "Đang giao hàng",
      time: "10:50",
      completed: true,
      current: true,
      description: "Shipper đang trên đường giao hàng đến bạn",
      driver: {
        name: "Nguyễn Văn B",
        phone: "0987654321",
        vehicle: "Xe máy • 59A-12345",
      },
    },
    {
      status: "completed",
      label: "Giao thành công",
      time: "",
      completed: false,
      description: "Đơn hàng sẽ được giao trong 10-15 phút nữa",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#fddbd3] p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-['Inter'] font-bold text-[20px] sm:text-[24px] text-[#291712]">
                Theo Dõi Đơn Hàng
              </h3>
              <p className="text-[#5d4038] text-[14px] mt-1">
                Mã đơn: {order.orderNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#5d4038] hover:text-[#ad2c00] transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Timeline */}
          <div className="relative">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex gap-4 pb-8 last:pb-0">
                {/* Icon Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-[#28a745]"
                        : step.current
                        ? "bg-[#fdc003]"
                        : "bg-[#fddbd3]"
                    }`}
                  >
                    {step.completed ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="white"
                      >
                        <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" />
                      </svg>
                    ) : step.current ? (
                      <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                    ) : (
                      <div className="w-4 h-4 bg-[#926f66] rounded-full" />
                    )}
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div
                      className={`w-0.5 h-full mt-2 ${
                        step.completed ? "bg-[#28a745]" : "bg-[#fddbd3]"
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-['Inter'] font-semibold text-[16px] text-[#291712]">
                      {step.label}
                    </h4>
                    {step.time && (
                      <span className="text-[#5d4038] text-[13px]">
                        {step.time}
                      </span>
                    )}
                  </div>
                  <p className="text-[#5d4038] text-[14px] leading-[22px]">
                    {step.description}
                  </p>

                  {/* Driver Info */}
                  {step.current && step.driver && (
                    <div className="mt-3 bg-[#fff8f6] border border-[#fddbd3] rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-[#fddbd3] rounded-full flex items-center justify-center text-[20px]">
                          🏍️
                        </div>
                        <div>
                          <p className="font-['Inter'] font-semibold text-[15px] text-[#291712]">
                            {step.driver.name}
                          </p>
                          <p className="text-[#5d4038] text-[13px]">
                            {step.driver.vehicle}
                          </p>
                        </div>
                      </div>
                      <a
                        href={`tel:${step.driver.phone}`}
                        className="flex items-center justify-center gap-2 bg-[#ad2c00] text-white py-2 rounded-lg font-medium text-[14px] hover:bg-[#8a2300] transition-colors"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="white"
                        >
                          <path d="M14.4 10C13.4 10 12.44 9.84 11.54 9.54C11.29 9.46 10.99 9.52 10.79 9.72L9.38 11.13C7.5 10.18 5.82 8.5 4.87 6.62L6.28 5.21C6.48 5.01 6.54 4.71 6.46 4.46C6.16 3.56 6 2.6 6 1.6C6 1.16 5.84 0.8 5.6 0.8H1.6C1.16 0.8 0.8 1.16 0.8 1.6C0.8 9.11 6.89 15.2 14.4 15.2C14.84 15.2 15.2 14.84 15.2 14.4V10.4C15.2 9.96 14.84 9.6 14.4 9.6V10Z" />
                        </svg>
                        <span>Gọi cho tài xế</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div className="mt-6 pt-6 border-t border-[#fddbd3]">
            <h4 className="font-['Inter'] font-semibold text-[16px] text-[#291712] mb-3">
              Chi Tiết Đơn Hàng
            </h4>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-[14px]"
                >
                  <span className="text-[#5d4038]">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-[#291712]">
                    {item.price.toLocaleString()}đ
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#fddbd3]">
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] font-semibold text-[15px] text-[#291712]">
                  Tổng cộng
                </span>
                <span className="font-['Inter'] font-bold text-[18px] text-[#ad2c00]">
                  {order.total.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mt-4 p-4 bg-[#fff8f6] rounded-lg">
            <p className="text-[#5d4038] text-[13px] font-medium mb-1">
              Địa chỉ giao hàng:
            </p>
            <p className="text-[#291712] text-[14px]">{order.address}</p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 bg-[#ad2c00] text-white py-3 rounded-lg font-semibold hover:bg-[#8a2300] transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

// Review Modal Component
function ReviewModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (itemName: string, rating: number) => {
    setRatings({ ...ratings, [itemName]: rating });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-[500px] w-full p-6 sm:p-8 text-center mx-4">
          <div className="w-20 h-20 bg-[#d4edda] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle cx="20" cy="20" r="18" fill="#28a745" />
              <path
                d="M12 20L17 25L28 14"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="font-['Inter'] font-bold text-[20px] sm:text-[24px] text-[#291712] mb-2">
            Cảm ơn bạn!
          </h3>
          <p className="text-[#5d4038] text-[16px]">
            Đánh giá của bạn đã được gửi thành công
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#fddbd3] p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-['Inter'] font-bold text-[20px] sm:text-[24px] text-[#291712]">
                Đánh Giá Đơn Hàng
              </h3>
              <p className="text-[#5d4038] text-[14px] mt-1">
                Chia sẻ trải nghiệm của bạn
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#5d4038] hover:text-[#ad2c00] transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          {/* Rate Each Item */}
          <div className="space-y-4 mb-6">
            <h4 className="font-['Inter'] font-semibold text-[16px] text-[#291712]">
              Đánh giá món ăn
            </h4>
            {order.items.map((item, index) => (
              <div
                key={index}
                className="border-2 border-[#fddbd3] rounded-lg p-4"
              >
                <p className="font-['Inter'] font-medium text-[15px] text-[#291712] mb-3">
                  {item.name}
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRating(item.name, star)}
                      className="transition-transform hover:scale-110"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill={
                          (ratings[item.name] || 0) >= star
                            ? "#FABD00"
                            : "#E5E5E5"
                        }
                      >
                        <path d="M16 2L20.944 11.056L31 12.583L23.5 19.778L25.416 30L16 25.056L6.584 30L8.5 19.778L1 12.583L11.056 11.056L16 2Z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Overall Comment */}
          <div className="mb-6">
            <label className="block text-[#291712] text-[14px] font-medium mb-2">
              Nhận xét chung
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Chia sẻ trải nghiệm của bạn về món ăn, dịch vụ giao hàng..."
              className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none resize-none"
            />
          </div>

          {/* Upload Photos (Optional) */}
          <div className="mb-6">
            <label className="block text-[#291712] text-[14px] font-medium mb-2">
              Thêm ảnh (tuỳ chọn)
            </label>
            <div className="border-2 border-dashed border-[#fddbd3] rounded-lg p-6 text-center hover:border-[#ad2c00] transition-colors cursor-pointer">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-[#5d4038]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-[#5d4038] text-[14px]">
                Nhấn để tải ảnh lên
              </p>
              <p className="text-[#5d4038] text-[12px] mt-1">
                Tối đa 5 ảnh
              </p>
            </div>
          </div>

          {/* Delivery Rating */}
          <div className="mb-6 p-4 bg-[#fff8f6] rounded-lg">
            <p className="font-['Inter'] font-medium text-[15px] text-[#291712] mb-3">
              Đánh giá dịch vụ giao hàng
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRating("delivery", star)}
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill={
                      (ratings["delivery"] || 0) >= star ? "#FABD00" : "#E5E5E5"
                    }
                  >
                    <path d="M14 1.75L17.577 9.674L26.25 10.761L20.125 16.556L21.803 25.375L14 21.174L6.197 25.375L7.875 16.556L1.75 10.761L10.423 9.674L14 1.75Z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#ad2c00] text-white py-3 rounded-lg font-semibold hover:bg-[#8a2300] transition-colors"
            >
              Gửi Đánh Giá
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-[#fddbd3] text-[#5d4038] py-3 rounded-lg font-semibold hover:bg-[#fff8f6] transition-colors"
            >
              Bỏ Qua
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
