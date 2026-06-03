import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";

interface PromoDish {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  deliveryTime: string;
  image: string;
  category: string;
  isPopular?: boolean;
}

const promoDishes: PromoDish[] = [
  {
    id: "1",
    name: "Phở Bò",
    price: 35000,
    oldPrice: 55000,
    rating: 4.9,
    reviews: 234,
    deliveryTime: "20-30 phút",
    image:
      "https://monngonmoingay.com/wp-content/uploads/2015/11/PhoBo-e1446825512455.jpg",
    category: "Phở",
    isPopular: true,
  },
  {
    id: "2",
    name: "Bánh Mì",
    price: 25000,
    oldPrice: 50000,
    rating: 4.8,
    reviews: 156,
    deliveryTime: "15-20 phút",
    image:
      "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=400",
    category: "Bánh Mì",
  },
  {
    id: "12",
    name: "Phở Tái Nạm",
    price: 48000,
    oldPrice: 60000,
    rating: 4.8,
    reviews: 201,
    deliveryTime: "20-30 phút",
    image:
      "https://mms.img.susercontent.com/vn-11134259-7ra0g-m6tm83lg7fx49c@resize_ss1242x600!@crop_w1242_h600_cT",
    category: "Phở",
    isPopular: true,
  },
  {
    id: "19",
    name: "Bún Thịt Nướng",
    price: 42000,
    oldPrice: 55000,
    rating: 4.6,
    reviews: 143,
    deliveryTime: "20-30 phút",
    image:
      "https://cdn.tgdd.vn/Files/2017/03/24/964440/cach-lam-bun-thit-nuong-ngon-7_760x450.jpg",
    category: "Bún",
  },
];

export default function PromotionsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showAllDishes, setShowAllDishes] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const { addItem } = useCart();

  const voucherCodes = [
    {
      id: "1",
      title: "Giảm 30.000đ cho đơn từ 99.000đ",
      description: "Áp dụng cho tất cả các món ăn trong thực đơn",
      code: "GIAM30K",
      discount: "30.000đ",
      minOrder: "99.000đ",
      validUntil: "31/05/2026",
      image: "https://images.unsplash.com/photo-1597345637412-9fd611e758f3?w=400",
      color: "bg-gradient-to-r from-[#ad2c00] to-[#d63600]",
    },
    {
      id: "2",
      title: "Giảm 20% cho khách hàng mới",
      description: "Chỉ áp dụng cho đơn hàng đầu tiên",
      code: "NEWUSER20",
      discount: "20%",
      minOrder: "0đ",
      validUntil: "30/06/2026",
      image: "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=400",
      color: "bg-gradient-to-r from-[#0066cc] to-[#0088ff]",
    },
  ];

  const upcomingPromotions = [
    {
      id: "4",
      title: "Flash Sale Cuối Tuần",
      description: "Giảm đến 50% cho các món ăn được chọn",
      startDate: "01/06/2026",
      image: "https://images.unsplash.com/photo-1594020292985-216a72a2c7ce?w=400",
    },
    {
      id: "5",
      title: "Combo Gia Đình",
      description: "Mua 3 món chính chỉ với giá 2 món",
      startDate: "05/06/2026",
      image: "https://images.unsplash.com/photo-1766050587783-1c90751275dd?w=400",
    },
  ];

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Đã sao chép mã ${code}`, {
      description: "Áp dụng mã tại trang thanh toán để nhận ưu đãi",
      duration: 2000,
    });

    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const visibleDishes = showAllDishes ? promoDishes : promoDishes.slice(0, 4);

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-[24px] sm:text-[36px] text-[#291712] mb-4">
            Khuyến Mãi & Ưu Đãi
          </h1>
          <p className="text-[#5d4038] text-[18px] max-w-[600px] mx-auto">
            Tiết kiệm ngay với các mã giảm giá hấp dẫn
          </p>
        </div>

        {/* Promotion Dishes */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-display font-semibold text-[20px] sm:text-[24px] text-[#291712]">
                Món Ăn Đang Khuyến Mãi
              </h2>
              <p className="text-[#5d4038] text-[14px] mt-1">
                {promoDishes.length} món đang giảm giá
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
              >
                <Link to={`/dish/${dish.id}`} className="block">
                  <div className="relative h-[180px]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#ad2c00] text-white text-[10px] font-semibold px-2 py-1 rounded uppercase">
                      -{Math.round(((dish.oldPrice - dish.price) / dish.oldPrice) * 100)}%
                    </div>
                    {dish.isPopular && (
                      <div className="absolute top-2 right-2 bg-[#785900] text-white text-[10px] font-semibold px-2 py-1 rounded uppercase">
                        PHỔ BIẾN
                      </div>
                    )}
                  </div>
                  <div className="p-4 pb-2">
                    <h3 className="font-['Inter'] font-bold text-[16px] text-[#291712] mb-2">
                      {dish.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#5d4038] text-[14px] line-through">
                        {dish.oldPrice.toLocaleString()}đ
                      </span>
                      <span className="font-['Inter'] font-bold text-[16px] text-[#ad2c00]">
                        {dish.price.toLocaleString()}đ
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] pt-3 border-t border-[#fddbd3]">
                      <div className="flex items-center gap-1">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="#FABD00">
                          <path d="M6.5 0L8.09 4.41L13 5.11L9.75 8.28L10.58 13L6.5 10.77L2.42 13L3.25 8.28L0 5.11L4.91 4.41L6.5 0Z" />
                        </svg>
                        <span className="font-semibold text-[#785900]">{dish.rating}</span>
                        <span className="text-[#5d4038]">({dish.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#5d4038]">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="#5D4038">
                          <path d="M6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C10.09 13 13 10.09 13 6.5C13 2.91 10.09 0 6.5 0ZM7 3.5H6V7L9.5 9.15L10 8.4L7 6.5V3.5Z" />
                        </svg>
                        <span>{dish.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="px-4 pb-4 flex gap-2">
                  <button
                    className="p-2 border-2 border-[#fddbd3] rounded-lg hover:border-[#ad2c00] hover:bg-[#fddbd3] transition-colors"
                    aria-label={`Thêm ${dish.name} vào yêu thích`}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 17.5L8.825 16.425C4.5 12.475 1.5 9.725 1.5 6.375C1.5 3.625 3.625 1.5 6.375 1.5C7.925 1.5 9.425 2.175 10 3.275C10.575 2.175 12.075 1.5 13.625 1.5C16.375 1.5 18.5 3.625 18.5 6.375C18.5 9.725 15.5 12.475 11.175 16.425L10 17.5Z"
                        stroke="#ad2c00"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      addItem({
                        dishId: dish.id,
                        name: dish.name,
                        price: dish.price,
                        quantity: 1,
                        image: dish.image,
                      });
                      toast.success(`Đã thêm ${dish.name} vào giỏ hàng`);
                    }}
                    className="flex-1 bg-[#ad2c00] text-white py-2 rounded-lg font-medium text-[14px] hover:bg-[#8a2300] transition-colors"
                  >
                    Thêm Nhanh
                  </button>
                </div>
              </div>
            ))}
          </div>
          {promoDishes.length > 4 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllDishes(!showAllDishes)}
                className="inline-flex items-center gap-2 bg-white border-2 border-[#ad2c00] text-[#ad2c00] px-6 py-2 rounded-lg font-medium hover:bg-[#fddbd3] transition-colors"
              >
                <span>{showAllDishes ? "Thu Gọn" : "Xem Thêm"}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform ${showAllDishes ? "rotate-180" : ""}`}
                >
                  <path
                    d="M3 6L8 11L13 6"
                    stroke="#ad2c00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Upcoming Promotions */}
        <div className="mb-12">
          <h2 className="font-display font-semibold text-[20px] sm:text-[24px] text-[#291712] mb-6">
            Ưu Đãi Sắp Diễn Ra
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingPromotions.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col sm:flex-row"
              >
                <div className="w-full h-[160px] sm:w-[180px] sm:h-[180px] shrink-0">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <div className="bg-[#ffe9e4] inline-block px-3 py-1 rounded-full text-[#ad2c00] text-[12px] font-semibold mb-3 self-start">
                    SẮP DIỄN RA
                  </div>
                  <h3 className="font-['Inter'] font-bold text-[18px] text-[#291712] mb-2">
                    {promo.title}
                  </h3>
                  <p className="text-[#5d4038] text-[14px] mb-3">
                    {promo.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#5d4038] text-[13px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M14 2H13V0H11V2H5V0H3V2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2ZM14 14H2V7H14V14ZM14 5H2V4H14V5Z" />
                    </svg>
                    <span>Bắt đầu: {promo.startDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voucher Codes */}
        <div className="mb-12">
          <h2 className="font-display font-semibold text-[20px] sm:text-[24px] text-[#291712] mb-6">
            Mã Giảm Giá
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {voucherCodes.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-[160px]">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute top-4 right-4 ${promo.color} text-white px-3 py-1 rounded-full font-bold text-[14px]`}
                  >
                    {promo.discount}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-['Inter'] font-bold text-[18px] text-[#291712] mb-2">
                    {promo.title}
                  </h3>
                  <p className="text-[#5d4038] text-[14px] mb-4">
                    {promo.description}
                  </p>

                  <div className="space-y-2 mb-4 text-[13px]">
                    <div className="flex items-center gap-2 text-[#5d4038]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14.4C4.5 14.4 1.6 11.5 1.6 8C1.6 4.5 4.5 1.6 8 1.6C11.5 1.6 14.4 4.5 14.4 8C14.4 11.5 11.5 14.4 8 14.4Z" />
                        <path d="M8.8 4H7.2V8.8L11.2 11.2L12 9.92L8.8 8V4Z" />
                      </svg>
                      <span>Hết hạn: {promo.validUntil}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5d4038]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M14 4H12V2C12 0.9 11.1 0 10 0H6C4.9 0 4 0.9 4 2V4H2C0.9 4 0 4.9 0 6V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V6C16 4.9 15.1 4 14 4ZM6 2H10V4H6V2ZM14 14H2V6H14V14Z" />
                      </svg>
                      <span>Đơn tối thiểu: {promo.minOrder}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#fddbd3] border-2 border-dashed border-[#ad2c00] rounded-lg px-3 py-2 font-['Inter'] font-bold text-[#ad2c00] text-center">
                      {promo.code}
                    </div>
                    <button
                      onClick={() => copyCode(promo.code)}
                      className={`px-4 py-2 min-h-[48px] rounded-lg font-medium transition-colors ${
                        copiedCode === promo.code
                          ? "bg-green-600 text-white"
                          : "bg-[#ad2c00] text-white hover:bg-[#8a2300]"
                      }`}
                    >
                      {copiedCode === promo.code ? "Đã sao chép" : "Sao chép"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Now CTA */}
        <div className="text-center mb-8">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 bg-[#ad2c00] text-white px-8 py-3 min-h-[48px] rounded-lg font-medium hover:bg-[#8a2300] transition-colors"
          >
            <span>Đặt Món Ngay</span>
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

        {/* How to Use Trigger (text/icon) */}
        <div className="text-center pt-6 border-t border-[#fddbd3]">
          <button
            onClick={() => setShowHowTo(true)}
            className="inline-flex items-center gap-2 text-[#ad2c00] hover:text-[#8a2300] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11.5H9V5H11V11.5Z" />
            </svg>
            <span className="font-medium underline">Cách sử dụng mã giảm giá</span>
          </button>
        </div>
      </div>

      {/* How to Use Modal */}
      {showHowTo && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowHowTo(false)}
        >
          <div
            className="bg-white rounded-xl max-w-[700px] w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[#fddbd3]">
              <h2 className="font-display font-semibold text-[22px] text-[#291712]">
                Cách Sử Dụng Mã Giảm Giá
              </h2>
              <button
                onClick={() => setShowHowTo(false)}
                className="p-2 hover:bg-[#fddbd3] rounded-lg transition-colors"
                aria-label="Đóng"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="#291712"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { n: 1, title: "Chọn Món Ăn", desc: "Thêm món ăn yêu thích vào giỏ hàng" },
                  { n: 2, title: "Nhập Mã", desc: "Nhập mã giảm giá tại trang thanh toán" },
                  { n: 3, title: "Áp Dụng", desc: 'Nhấn "Áp dụng" để giảm giá ngay' },
                  { n: 4, title: "Hoàn Tất", desc: "Hoàn tất đơn hàng và nhận ưu đãi" },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#fddbd3] rounded-full flex items-center justify-center shrink-0">
                      <span className="font-bold text-[20px] text-[#ad2c00]">{step.n}</span>
                    </div>
                    <div>
                      <h3 className="font-['Inter'] font-semibold text-[16px] text-[#291712] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-[#5d4038] text-[14px]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
