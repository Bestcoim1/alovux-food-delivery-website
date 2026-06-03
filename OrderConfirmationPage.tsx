import { Link } from "react-router";

export default function HomePage() {
  const categories = [
    { name: "Phở", image: "https://monngonmoingay.com/wp-content/uploads/2015/11/PhoBo-e1446825512455.jpg" },
    { name: "Bánh Mì", image: "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=400" },
    { name: "Gỏi Cuốn", image: "https://images.unsplash.com/photo-1594020292985-216a72a2c7ce?w=400" },
    { name: "Cơm", image: "https://images.unsplash.com/photo-1766050587783-1c90751275dd?w=400" },
    { name: "Chè", image: "https://lanvienhotel.com.vn/wp-content/uploads/2025/07/che-ba-mau-huong-vi-tuoi-mat-cua-mua-he-tai-trung-tam-thanh-pho.jpg" },
  ];

  const featuredDishes = [
    {
      id: "1",
      name: "Phở Bò Truyền Thống",
      price: 45000,
      rating: 4.9,
      reviews: 234,
      deliveryTime: "20-30 phút",
      description: "Phở bò hầm với nước dùng thơm ngon, thịt bò mềm, rau thơm tươi ngon...",
      image: "https://monngonmoingay.com/wp-content/uploads/2015/11/PhoBo-e1446825512455.jpg",
    },
    {
      id: "2",
      name: "Bánh Mì Thịt Nướng",
      price: 25000,
      rating: 4.8,
      reviews: 156,
      deliveryTime: "15-20 phút",
      description: "Bánh mì giòn tan với thịt nướng thơm lừng, rau sống và nước sốt đặc biệt...",
      image: "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=400",
      isPopular: true,
    },
    {
      id: "3",
      name: "Bún Chả Hà Nội",
      price: 50000,
      rating: 4.7,
      reviews: 189,
      deliveryTime: "25-35 phút",
      description: "Bún tươi với chả nướng thơm phức, thịt nướng hấp dẫn và nước chấm chua ngọt...",
      image: "https://images.unsplash.com/photo-1583316175701-0bc5f25a0a44?w=400",
    },
    {
      id: "4",
      name: "Gỏi Cuốn Tôm Thịt",
      price: 35000,
      rating: 4.6,
      reviews: 142,
      deliveryTime: "15-25 phút",
      description: "Gỏi cuốn tươi mát với tôm, thịt, bún, rau sống và nước chấm đậm đà...",
      image: "https://images.unsplash.com/photo-1594020292985-216a72a2c7ce?w=400",
    },
  ];

  return (
    <div className="bg-[#fff8f6] pt-[68px]">
      {/* Hero Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-5 py-4 sm:py-6">
        <div className="relative min-h-[420px] sm:h-[500px] rounded-xl overflow-hidden shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200"
            alt="Vietnamese Food"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative bg-gradient-to-b sm:bg-gradient-to-r from-[rgba(41,23,18,0.85)] via-[rgba(41,23,18,0.7)] sm:via-[rgba(41,23,18,0.7)] to-[rgba(41,23,18,0.5)] sm:to-[rgba(41,23,18,0.3)] flex items-center min-h-[420px] sm:h-[500px]">
            <div className="w-full max-w-[680px] px-5 sm:px-12 py-8 sm:py-0 flex flex-col items-start">
              <div className="bg-[#ad2c00] inline-block px-3 py-1 rounded-full mb-4 sm:mb-6">
                <span className="font-['Inter'] font-semibold text-[12px] text-white uppercase tracking-wider">
                  KHUYẾN MÃI SỐC
                </span>
              </div>
              <h1 className="font-display font-extrabold text-[26px] leading-[32px] tracking-tight sm:text-[44px] sm:leading-[54px] sm:tracking-normal text-white mb-3 sm:mb-6 whitespace-nowrap">
                Muốn ăn ngon thì ALOVUX!
              </h1>
              <p className="font-['Inter'] text-[15px] leading-[22px] sm:text-[16px] sm:leading-[24px] text-white/90 mb-1.5">
                Trải nghiệm hương vị đặc trưng của ẩm thực Việt Nam ngay tại nhà bạn.
              </p>
              <p className="font-['Inter'] text-[15px] leading-[22px] sm:text-[16px] sm:leading-[24px] text-white/90 mb-6 sm:mb-8">
                Đặt ngay và nhận giảm giá 20% cho đơn hàng đầu tiên.
              </p>
              <Link
                to="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ad2c00] text-white px-8 py-4 rounded-lg font-semibold text-[16px] shadow-md hover:bg-[#8a2300] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#291712]"
                style={{ minHeight: "52px" }}
              >
                <span>Đặt Món Ngay</span>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
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
      </section>

      {/* Categories Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
        <div className="flex items-end justify-between mb-5 sm:mb-6 gap-3">
          <div>
            <h2 className="font-display font-bold text-[24px] leading-[30px] sm:text-[28px] sm:leading-[36px] tracking-tight text-[#291712] mb-1">
              Danh Mục Món Ăn
            </h2>
            <p className="text-[#5d4038] text-[14px] leading-[20px] sm:text-[15px]">
              Khám phá đa dạng món ăn Việt Nam yêu thích
            </p>
          </div>
          <Link
            to="/menu"
            className="shrink-0 flex items-center gap-1 text-[#ad2c00] font-['Inter'] text-[14px] sm:text-[16px] font-medium hover:underline"
          >
            <span>Xem Tất Cả</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="#AD2C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/menu?category=${encodeURIComponent(category.name)}`}
                className="group flex-shrink-0 w-[120px]"
              >
                <div className="bg-white rounded-2xl p-3 text-center hover:shadow-lg transition-all">
                  <div className="w-[88px] h-[88px] mx-auto rounded-full bg-gradient-to-br from-[#fddbd3] to-[#fff1ed] overflow-hidden shadow-md mb-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-['Inter'] font-bold text-[16px] leading-[20px] text-[#291712]">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/menu?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                <div className="w-[120px] h-[120px] mx-auto rounded-full bg-gradient-to-br from-[#fddbd3] to-[#fff1ed] overflow-hidden shadow-md group-hover:scale-105 transition-transform mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-['Inter'] font-bold text-[18px] text-[#291712] mb-1">
                  {category.name}
                </h3>
                <p className="text-[#5d4038] text-[13px]">
                  Món ăn truyền thống
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
        <h2 className="font-display font-bold text-[24px] leading-[30px] sm:text-[28px] sm:leading-[36px] tracking-tight text-[#291712] mb-5 sm:mb-6">
          Món Ăn Nổi Bật
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {featuredDishes.map((dish) => (
            <div key={dish.id} className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Link
                to={`/dish/${dish.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2 rounded-xl"
              >
                <div className="relative h-[140px] sm:h-[200px]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  {dish.isPopular && (
                    <div className="absolute top-2 left-2 bg-[#ad2c00] text-white text-[10px] font-semibold px-2 py-1 rounded uppercase">
                      PHỔ BIẾN
                    </div>
                  )}
                </div>

                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="font-['Inter'] font-bold text-[15px] leading-[20px] sm:text-[16px] sm:leading-[22px] text-[#291712] line-clamp-1">
                      {dish.name}
                    </h3>
                    <span className="font-['Inter'] font-bold text-[15px] leading-[20px] sm:text-[16px] sm:leading-[22px] text-[#ad2c00] shrink-0">
                      {dish.price.toLocaleString()}đ
                    </span>
                  </div>

                  <p className="text-[#5d4038] text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] mb-3 line-clamp-2">
                    {dish.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#fddbd3]">
                    <div className="flex items-center gap-3 text-[12px]">
                      <div className="flex items-center gap-1">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="#FABD00" aria-hidden="true">
                          <path d="M6.5 0L8.09 4.41L13 5.11L9.75 8.28L10.58 13L6.5 10.77L2.42 13L3.25 8.28L0 5.11L4.91 4.41L6.5 0Z" />
                        </svg>
                        <span className="font-semibold text-[#785900]">
                          {dish.rating}
                        </span>
                        <span className="text-[#5d4038]">({dish.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#5d4038]">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="#5D4038" aria-hidden="true">
                          <path d="M6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C10.09 13 13 10.09 13 6.5C13 2.91 10.09 0 6.5 0ZM6.5 11.7C3.63 11.7 1.3 9.37 1.3 6.5C1.3 3.63 3.63 1.3 6.5 1.3C9.37 1.3 11.7 3.63 11.7 6.5C11.7 9.37 9.37 11.7 6.5 11.7ZM7 3.5H6V7L9.5 9.15L10 8.4L7 6.5V3.5Z" />
                        </svg>
                        <span>{dish.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2 z-10"
                style={{ minWidth: "44px", minHeight: "44px" }}
                aria-label={`Thêm ${dish.name} vào yêu thích`}
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M10 17.5L8.825 16.425C4.5 12.475 1.5 9.725 1.5 6.375C1.5 3.625 3.625 1.5 6.375 1.5C7.925 1.5 9.425 2.175 10 3.275C10.575 2.175 12.075 1.5 13.625 1.5C16.375 1.5 18.5 3.625 18.5 6.375C18.5 9.725 15.5 12.475 11.175 16.425L10 17.5Z"
                    stroke="#291712"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-display font-bold text-[24px] leading-[30px] sm:text-[28px] sm:leading-[36px] tracking-tight text-[#291712] mb-2">
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <p className="text-[#5d4038] text-[14px] leading-[20px] sm:text-[14px]">
            Hơn 2,800 đánh giá từ khách hàng hài lòng
          </p>
        </div>

        <div className="md:grid md:grid-cols-3 gap-6 mb-6 flex md:flex-none overflow-x-auto md:overflow-visible -mx-4 md:mx-0 px-4 md:px-0 snap-x snap-mandatory md:snap-none gap-4 md:gap-6 [&>div]:flex-shrink-0 [&>div]:w-[85%] md:[&>div]:w-auto [&>div]:snap-start">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                alt="Nguyễn Thị Mai"
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <h4 className="font-['Inter'] font-semibold text-[14px] text-[#291712]">
                  Nguyễn Thị Mai
                </h4>
                <div className="flex gap-0.5" role="img" aria-label="Đánh giá 5 sao">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="12" height="12" viewBox="0 0 12 12" fill="#FABD00" aria-hidden="true">
                      <path d="M6 0L7.854 4.146L12 4.812L9 7.722L9.708 12L6 9.888L2.292 12L3 7.722L0 4.812L4.146 4.146L6 0Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[#5d4038] text-[14px] leading-[22px]">
              "Phở rất ngon, nước dùng đậm đà. Giao hàng nhanh chóng, món ăn vẫn còn nóng. Sẽ đặt lại!"
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                alt="Trần Văn Minh"
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <h4 className="font-['Inter'] font-semibold text-[14px] text-[#291712]">
                  Trần Văn Minh
                </h4>
                <div className="flex gap-0.5" role="img" aria-label="Đánh giá 5 sao">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="12" height="12" viewBox="0 0 12 12" fill="#FABD00" aria-hidden="true">
                      <path d="M6 0L7.854 4.146L12 4.812L9 7.722L9.708 12L6 9.888L2.292 12L3 7.722L0 4.812L4.146 4.146L6 0Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[#5d4038] text-[14px] leading-[22px]">
              "Bánh mì giòn rụm, nhân thịt nướng thơm ngon. Đây là quán bánh mì yêu thích của tôi!"
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                alt="Lê Hoài An"
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <h4 className="font-['Inter'] font-semibold text-[14px] text-[#291712]">
                  Lê Hoài An
                </h4>
                <div className="flex gap-0.5" role="img" aria-label="Đánh giá 4 sao">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="12" height="12" viewBox="0 0 12 12" fill={star <= 4 ? "#FABD00" : "#E5E5E5"} aria-hidden="true">
                      <path d="M6 0L7.854 4.146L12 4.812L9 7.722L9.708 12L6 9.888L2.292 12L3 7.722L0 4.812L4.146 4.146L6 0Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[#5d4038] text-[14px] leading-[22px]">
              "Bún chả ngon, chả nướng thơm. Rất hài lòng với chất lượng món ăn và dịch vụ!"
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 text-[#ad2c00] font-medium hover:underline"
          >
            <span>Xem Tất Cả Đánh Giá</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke="#AD2C00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
