import { useState } from "react";
import { Link } from "react-router";

interface Review {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  date: string;
  dishName: string;
  comment: string;
  images?: string[];
  helpful: number;
  verified: boolean;
}

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "helpful">("recent");

  const stats = {
    averageRating: 4.8,
    totalReviews: 2847,
    ratings: [
      { stars: 5, count: 2156, percentage: 76 },
      { stars: 4, count: 512, percentage: 18 },
      { stars: 3, count: 114, percentage: 4 },
      { stars: 2, count: 43, percentage: 1 },
      { stars: 1, count: 22, percentage: 1 },
    ],
  };

  const reviews: Review[] = [
    {
      id: "1",
      customerName: "Nguyễn Thị Mai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      rating: 5,
      date: "14/05/2026",
      dishName: "Phở Bò Truyền Thống",
      comment:
        "Phở rất ngon, nước dùng đậm đà, thịt bò tươi và mềm. Giao hàng nhanh chóng, món ăn vẫn còn nóng khi nhận. Nhân viên giao hàng rất lịch sự. Sẽ đặt lại!",
      images: [
        "https://monngonmoingay.com/wp-content/uploads/2015/11/PhoBo-e1446825512455.jpg",
        "https://images.unsplash.com/photo-1631709497146-a239ef373cf1?w=200",
      ],
      helpful: 24,
      verified: true,
    },
    {
      id: "2",
      customerName: "Trần Văn Minh",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      rating: 5,
      date: "13/05/2026",
      dishName: "Bánh Mì Thịt Nướng",
      comment:
        "Bánh mì giòn rụm, nhân thịt nướng thơm ngon, rau sống tươi. Giá cả hợp lý, giao hàng đúng giờ. Đây là quán bánh mì yêu thích của tôi!",
      images: ["https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=200"],
      helpful: 18,
      verified: true,
    },
    {
      id: "3",
      customerName: "Lê Hoài An",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      rating: 4,
      date: "12/05/2026",
      dishName: "Bún Chả Hà Nội",
      comment:
        "Bún chả ngon, chả nướng thơm. Tuy nhiên lần này nước chấm hơi nhạt so với lần trước. Nhưng nhìn chung vẫn rất hài lòng với chất lượng món ăn.",
      helpful: 12,
      verified: true,
    },
    {
      id: "4",
      customerName: "Phạm Đức Anh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      rating: 5,
      date: "11/05/2026",
      dishName: "Cơm Tấm Sườn Bì",
      comment:
        "Cơm tấm xuất sắc! Sườn nướng mềm, thơm, bì giòn tan. Đặc biệt là nước mắm pha vừa miệng. Đóng gói cẩn thận, không bị đổ. Rất recommend!",
      images: [
        "https://images.unsplash.com/photo-1766050587783-1c90751275dd?w=200",
      ],
      helpful: 31,
      verified: true,
    },
    {
      id: "5",
      customerName: "Võ Thị Hương",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      rating: 5,
      date: "10/05/2026",
      dishName: "Gỏi Cuốn Tôm Thịt",
      comment:
        "Gỏi cuốn tươi ngon, tôm to, rau sống tươi xanh. Nước chấm đậm đà. Đóng gói rất kỹ, không bị dính vào nhau. Giá hợp lý cho chất lượng như vậy.",
      helpful: 15,
      verified: true,
    },
    {
      id: "6",
      customerName: "Đỗ Minh Tuấn",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      rating: 4,
      date: "09/05/2026",
      dishName: "Cơm Gà Xối Mỡ",
      comment:
        "Cơm gà ngon, gà mềm, cơm thơm. Có chút tiếc là phần ăn hơi nhỏ so với giá tiền. Nhưng về mặt hương vị thì không có gì để chê.",
      helpful: 8,
      verified: true,
    },
    {
      id: "7",
      customerName: "Bùi Thị Lan",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
      rating: 5,
      date: "08/05/2026",
      dishName: "Chè Ba Màu",
      comment:
        "Chè rất ngon, ngọt vừa phải, đậu và thạch mềm. Đóng trong hộp nhựa kín, không bị tràn. Giao hàng nhanh, món tráng miệng hoàn hảo!",
      helpful: 9,
      verified: false,
    },
    {
      id: "8",
      customerName: "Hoàng Văn Hải",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      rating: 5,
      date: "07/05/2026",
      dishName: "Cơm Chiên Dương Châu",
      comment:
        "Cơm chiên rất ngon, nhiều topping, xúc xích, tôm, trứng. Cơm rang kỹ, không bị dính. App đặt hàng dễ dùng, shipper giao đúng địa chỉ. 10/10!",
      images: ["https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200"],
      helpful: 22,
      verified: true,
    },
  ];

  const filteredReviews = reviews
    .filter((review) => (filterRating ? review.rating === filterRating : true))
    .sort((a, b) => {
      if (sortBy === "helpful") {
        return b.helpful - a.helpful;
      }
      return 0; // Keep original order for "recent"
    });

  const renderStars = (rating: number, size: number = 16) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill={star <= rating ? "#FABD00" : "#E5E5E5"}
          >
            <path d="M8 0L10.472 5.528L16 6.416L12 10.296L12.944 16L8 13.384L3.056 16L4 10.296L0 6.416L5.528 5.528L8 0Z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-[24px] sm:text-[36px] text-[#291712] mb-4">
            Đánh Giá Khách Hàng
          </h1>
          <p className="text-[#5d4038] text-[18px] max-w-[600px] mx-auto">
            Ý kiến chân thực từ những khách hàng đã sử dụng dịch vụ của chúng tôi
          </p>
        </div>

        {/* Overall Stats */}
        <div className="bg-white rounded-xl p-4 sm:p-8 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Average Rating */}
            <div className="text-center md:border-r border-[#fddbd3]">
              <div className="text-[64px] font-bold text-[#ad2c00] leading-none mb-2">
                {stats.averageRating}
              </div>
              <div className="flex justify-center mb-3">
                {renderStars(5, 24)}
              </div>
              <p className="text-[#5d4038] text-[16px]">
                Dựa trên <span className="font-bold">{stats.totalReviews.toLocaleString()}</span> đánh giá
              </p>
            </div>

            {/* Right: Rating Breakdown */}
            <div className="space-y-2">
              {stats.ratings.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-[14px] text-[#291712] font-medium">
                      {rating.stars}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="#FABD00">
                      <path d="M6 0L7.854 4.146L12 4.812L9 7.722L9.708 12L6 9.888L2.292 12L3 7.722L0 4.812L4.146 4.146L6 0Z" />
                    </svg>
                  </div>
                  <div className="flex-1 h-2 bg-[#fddbd3] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FABD00]"
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <span className="text-[14px] text-[#5d4038] w-12 text-right">
                    {rating.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#5d4038] text-[14px] font-medium">
              Lọc theo:
            </span>
            <button
              onClick={() => setFilterRating(null)}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                filterRating === null
                  ? "bg-[#ad2c00] text-white"
                  : "bg-white text-[#5d4038] border border-[#fddbd3] hover:border-[#ad2c00]"
              }`}
            >
              Tất Cả
            </button>
            {[5, 4, 3, 2, 1].map((stars) => (
              <button
                key={stars}
                onClick={() => setFilterRating(stars)}
                className={`px-4 py-2 rounded-lg text-[14px] font-medium flex items-center gap-1 transition-colors ${
                  filterRating === stars
                    ? "bg-[#ad2c00] text-white"
                    : "bg-white text-[#5d4038] border border-[#fddbd3] hover:border-[#ad2c00]"
                }`}
              >
                <span>{stars}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 0L7.854 4.146L12 4.812L9 7.722L9.708 12L6 9.888L2.292 12L3 7.722L0 4.812L4.146 4.146L6 0Z" />
                </svg>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <span className="text-[#5d4038] text-[14px] font-medium">
              Sắp xếp:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "helpful")}
              className="flex-1 lg:flex-none px-4 py-2 border-2 border-[#fddbd3] rounded-lg text-[14px] focus:outline-none focus:border-[#ad2c00] bg-white"
            >
              <option value="recent">Mới nhất</option>
              <option value="helpful">Hữu ích nhất</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <img
                  src={review.avatar}
                  alt={review.customerName}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-['Inter'] font-semibold text-[16px] text-[#291712]">
                          {review.customerName}
                        </h3>
                        {review.verified && (
                          <span className="bg-[#d4edda] text-[#155724] text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                              <path d="M5 0L6.545 3.455L10 4.045L7.5 6.455L8.09 10L5 8.273L1.91 10L2.5 6.455L0 4.045L3.455 3.455L5 0Z" />
                            </svg>
                            Đã mua
                          </span>
                        )}
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-[#5d4038] text-[13px]">
                      {review.date}
                    </span>
                  </div>

                  {/* Dish Name */}
                  <p className="text-[#ad2c00] text-[14px] font-medium mb-2">
                    {review.dishName}
                  </p>

                  {/* Comment */}
                  <p className="text-[#5d4038] text-[15px] leading-[24px] mb-3">
                    {review.comment}
                  </p>

                  {/* Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review ${index + 1}`}
                          className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center gap-4 pt-3 border-t border-[#fddbd3]">
                    <button className="flex items-center gap-2 text-[#5d4038] hover:text-[#ad2c00] transition-colors text-[14px]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M1 7C1 5.9 1.9 5 3 5H5L7 2H9L8 5H12C13.1 5 14 5.9 14 7V8L12 14H4L1 8V7ZM15 10V15H13V10H15Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Hữu ích ({review.helpful})</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#5d4038] hover:text-[#ad2c00] transition-colors text-[14px]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14ZM7 4V9H9V4H7ZM7 10V12H9V10H7Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Báo cáo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border-2 border-[#ad2c00] text-[#ad2c00] px-8 py-3 rounded-lg font-medium hover:bg-[#ad2c00] hover:text-white transition-colors">
            Xem Thêm Đánh Giá
          </button>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#ad2c00] to-[#d63600] rounded-xl p-8 mt-12 text-center text-white">
          <h2 className="font-display font-bold text-[20px] sm:text-[24px] mb-3">
            Bạn Đã Thử Món Ăn Của Chúng Tôi Chưa?
          </h2>
          <p className="text-[16px] mb-6 opacity-90">
            Đặt món ngay hôm nay và chia sẻ trải nghiệm của bạn!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/menu"
              className="bg-white text-[#ad2c00] px-8 py-3 rounded-lg font-medium hover:bg-[#fff8f6] transition-colors"
            >
              Xem Thực Đơn
            </Link>
            <Link
              to="/orders"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Đơn Hàng Của Tôi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
