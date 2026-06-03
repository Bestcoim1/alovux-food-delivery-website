import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { useCart } from "../contexts/CartContext";

interface Dish {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  deliveryTime: string;
  image: string;
  category: string;
  isPopular?: boolean;
}

const dishes: Dish[] = [
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
    id: "3",
    name: "Bún Chả Hà Nội",
    price: 50000,
    rating: 4.7,
    reviews: 189,
    deliveryTime: "25-35 phút",
    image:
      "https://images.unsplash.com/photo-1583316175701-0bc5f25a0a44?w=400",
    category: "Bún",
  },
  {
    id: "4",
    name: "Gỏi Cuốn Tôm Thịt",
    price: 35000,
    rating: 4.6,
    reviews: 142,
    deliveryTime: "15-25 phút",
    image:
      "https://images.unsplash.com/photo-1594020292985-216a72a2c7ce?w=400",
    category: "Gỏi Cuốn",
  },
  {
    id: "5",
    name: "Cơm Tấm Sườn Bì",
    price: 45000,
    rating: 4.8,
    reviews: 198,
    deliveryTime: "20-30 phút",
    image:
      "https://images.unsplash.com/photo-1766050587783-1c90751275dd?w=400",
    category: "Cơm",
    isPopular: true,
  },
  {
    id: "6",
    name: "Cơm Gà Xối Mỡ",
    price: 40000,
    rating: 4.7,
    reviews: 167,
    deliveryTime: "20-25 phút",
    image:
      "https://images.unsplash.com/photo-1677354469663-dc918927fd93?w=400",
    category: "Cơm",
  },
  {
    id: "7",
    name: "Cơm Chiên Dương Châu",
    price: 38000,
    rating: 4.6,
    reviews: 145,
    deliveryTime: "15-20 phút",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    category: "Cơm",
  },
  {
    id: "8",
    name: "Chè Ba Màu",
    price: 20000,
    rating: 4.9,
    reviews: 223,
    deliveryTime: "10-15 phút",
    image:
      "https://lanvienhotel.com.vn/wp-content/uploads/2025/07/che-ba-mau-huong-vi-tuoi-mat-cua-mua-he-tai-trung-tam-thanh-pho.jpg",
    category: "Chè",
  },
  {
    id: "9",
    name: "Chè Bưởi",
    price: 18000,
    rating: 4.7,
    reviews: 134,
    deliveryTime: "10-15 phút",
    image:
      "https://file.hstatic.net/200000721249/file/che_buoi_d13d44779d7d4a6ea7b5881361285169.jpg",
    category: "Chè",
  },
  {
    id: "10",
    name: "Chè Đậu Đỏ",
    price: 15000,
    rating: 4.5,
    reviews: 98,
    deliveryTime: "10-15 phút",
    image:
      "https://media.vneconomy.vn/images/upload/2021/04/21/che1-15613482836781632518551.jpg",
    category: "Chè",
  },
  // Phở
  {
    id: "11",
    name: "Phở Gà",
    price: 40000,
    rating: 4.7,
    reviews: 178,
    deliveryTime: "20-30 phút",
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
    category: "Phở",
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
    id: "13",
    name: "Phở Bò Viên",
    price: 42000,
    rating: 4.6,
    reviews: 156,
    deliveryTime: "20-30 phút",
    image:
      "https://anhtuyetfood.com/uploads/source/tin-tuc/pho-bo-480x480.webp",
    category: "Phở",
  },
  // Bánh Mì
  {
    id: "14",
    name: "Bánh Mì Chả Lụa",
    price: 22000,
    rating: 4.6,
    reviews: 132,
    deliveryTime: "15-20 phút",
    image:
      "https://nemchasaungoc.com/tenants/tiemchachica/upload/ckeditors/2021-10/banh-mi-cha-lua.jpg",
    category: "Bánh Mì",
  },
  {
    id: "15",
    name: "Bánh Mì Pate Trứng",
    price: 28000,
    rating: 4.7,
    reviews: 178,
    deliveryTime: "15-20 phút",
    image:
      "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/176285/Originals/cach-lam-banh-mi-pate-trung-16.jpg",
    category: "Bánh Mì",
    isPopular: true,
  },
  {
    id: "16",
    name: "Bánh Mì Xíu Mại",
    price: 30000,
    rating: 4.5,
    reviews: 112,
    deliveryTime: "15-20 phút",
    image:
      "https://www.huongnghiepaau.com/wp-content/uploads/2024/04/banh-mi-xiu-mai.jpg",
    category: "Bánh Mì",
  },
  // Bún
  {
    id: "17",
    name: "Bún Bò Huế",
    price: 55000,
    rating: 4.8,
    reviews: 210,
    deliveryTime: "25-35 phút",
    image:
      "https://i.ytimg.com/vi/CSI9ildGX9s/maxresdefault.jpg",
    category: "Bún",
    isPopular: true,
  },
  {
    id: "18",
    name: "Bún Riêu Cua",
    price: 45000,
    rating: 4.7,
    reviews: 165,
    deliveryTime: "25-35 phút",
    image:
      "https://i.ytimg.com/vi/Xb-s5pPlbbc/maxresdefault.jpg",
    category: "Bún",
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
  // Gỏi Cuốn
  {
    id: "20",
    name: "Gỏi Cuốn Chay",
    price: 28000,
    rating: 4.5,
    reviews: 89,
    deliveryTime: "15-20 phút",
    image:
      "https://cdn.hstatic.net/files/200000700229/article/goi-cuon-chay-1_4a0a40700a874972b0acebbe67475747.jpg",
    category: "Gỏi Cuốn",
  },
  {
    id: "21",
    name: "Bò Bía",
    price: 25000,
    rating: 4.4,
    reviews: 76,
    deliveryTime: "15-20 phút",
    image:
      "https://cdn.tgdd.vn/Files/2020/04/14/1248966/cach-lam-bo-bia-ngot-thom-ngon-hap-dan-goi-nho-tu.jpg",
    category: "Gỏi Cuốn",
  },
  {
    id: "22",
    name: "Chả Giò Rế",
    price: 35000,
    rating: 4.7,
    reviews: 154,
    deliveryTime: "15-25 phút",
    image:
      "https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=400",
    category: "Gỏi Cuốn",
    isPopular: true,
  },
  // Cơm
  {
    id: "23",
    name: "Cơm Bò Lúc Lắc",
    price: 55000,
    rating: 4.8,
    reviews: 187,
    deliveryTime: "20-30 phút",
    image:
      "https://thaoduocvn.net/wp-content/uploads/2023/10/com-bo-luc-lac2.jpg",
    category: "Cơm",
  },
  // Chè
  {
    id: "24",
    name: "Chè Khúc Bạch",
    price: 25000,
    rating: 4.6,
    reviews: 112,
    deliveryTime: "10-15 phút",
    image:
      "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_9_28_638315335535725712_che-khuc-bach-thumb.jpg",
    category: "Chè",
  },
];

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("q");
  const [selectedCategory, setSelectedCategory] =
    useState("Tất Cả");
  const [priceFilter, setPriceFilter] = useState<string | null>(
    null,
  );
  const [specialFilters, setSpecialFilters] = useState<
    string[]
  >([]);
  const [sortBy, setSortBy] = useState<
    "popular" | "price-low" | "price-high" | "rating"
  >("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const categories = [
      "Tất Cả",
      "Phở",
      "Bánh Mì",
      "Bún",
      "Cơm",
      "Gỏi Cuốn",
      "Chè",
    ];
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const toggleSpecialFilter = (filter: string) => {
    setSpecialFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  };

  let filteredDishes = [...dishes];

  // Category filter
  if (selectedCategory !== "Tất Cả") {
    filteredDishes = filteredDishes.filter(
      (dish) => dish.category === selectedCategory,
    );
  }

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredDishes = filteredDishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(query) ||
        dish.category.toLowerCase().includes(query),
    );
  }

  // Special filters
  if (specialFilters.includes("promotion")) {
    filteredDishes = filteredDishes.filter(
      (dish) => dish.oldPrice,
    );
  }
  if (specialFilters.includes("popular")) {
    filteredDishes = filteredDishes.filter(
      (dish) => dish.isPopular,
    );
  }

  // Price filter
  if (priceFilter === "under30k") {
    filteredDishes = filteredDishes.filter(
      (dish) => dish.price < 30000,
    );
  } else if (priceFilter === "30to50k") {
    filteredDishes = filteredDishes.filter(
      (dish) => dish.price >= 30000 && dish.price <= 50000,
    );
  }

  // Sorting
  if (sortBy === "price-low") {
    filteredDishes.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredDishes.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredDishes.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "popular") {
    filteredDishes.sort((a, b) => b.reviews - a.reviews);
  }

  const getCategoryCount = (categoryName: string) => {
    if (categoryName === "Tất Cả") return dishes.length;
    return dishes.filter((d) => d.category === categoryName)
      .length;
  };

  const categories = [
    { name: "Tất Cả", count: getCategoryCount("Tất Cả") },
    { name: "Phở", count: getCategoryCount("Phở") },
    { name: "Bánh Mì", count: getCategoryCount("Bánh Mì") },
    { name: "Bún", count: getCategoryCount("Bún") },
    { name: "Cơm", count: getCategoryCount("Cơm") },
    { name: "Gỏi Cuốn", count: getCategoryCount("Gỏi Cuốn") },
    { name: "Chè", count: getCategoryCount("Chè") },
  ];

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-4 sm:py-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full mb-4 bg-white border-2 border-[#fddbd3] rounded-lg px-4 py-3 flex items-center justify-between text-[#291712] font-medium text-[14px]"
          style={{ minHeight: '48px' }}
        >
          <span>Bộ Lọc</span>
          <span className="text-[#ad2c00]">{showFilters ? '▲' : '▼'}</span>
        </button>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-[260px] lg:shrink-0`}>
            <div className="bg-white rounded-lg p-4 lg:sticky lg:top-[84px] space-y-6">
              {/* Categories */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowCategories((v) => !v)}
                  aria-expanded={showCategories}
                  aria-controls="category-list"
                  className="lg:hidden w-full flex items-center justify-between mb-3"
                  style={{ minHeight: '44px' }}
                >
                  <h2 className="font-display font-semibold text-[18px] text-[#291712]">
                    Danh Mục
                    {selectedCategory !== "Tất Cả" && (
                      <span className="ml-2 font-['Inter'] font-normal text-[13px] text-[#ad2c00]">
                        · {selectedCategory}
                      </span>
                    )}
                  </h2>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`text-[#ad2c00] transition-transform ${showCategories ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <h2 className="hidden lg:block font-display font-semibold text-[18px] text-[#291712] mb-3">
                  Danh Mục
                </h2>
                <div
                  id="category-list"
                  className={`${showCategories ? 'block' : 'hidden'} lg:block space-y-1`}
                >
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() =>
                        setSelectedCategory(category.name)
                      }
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.name
                          ? "bg-[#fddbd3] text-[#ad2c00] font-medium"
                          : "text-[#5d4038] hover:bg-[#fddbd3]/50"
                      }`}
                    >
                      <span className="font-['Inter'] text-[14px]">
                        {category.name}
                      </span>
                      <span className="text-[12px] text-[#5d4038]">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Filters */}
              <div className="pt-4 border-t border-[#fddbd3]">
                <h3 className="font-['Inter'] font-semibold text-[16px] text-[#291712] mb-3">
                  Lọc Đặc Biệt
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={specialFilters.includes(
                        "promotion",
                      )}
                      onChange={() =>
                        toggleSpecialFilter("promotion")
                      }
                      className="w-4 h-4 rounded border-2 border-[#926f66] text-[#ad2c00] focus:ring-[#ad2c00]"
                    />
                    <span className="text-[14px] text-[#291712]">
                      Đang khuyến mãi
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={specialFilters.includes(
                        "popular",
                      )}
                      onChange={() =>
                        toggleSpecialFilter("popular")
                      }
                      className="w-4 h-4 rounded border-2 border-[#926f66] text-[#ad2c00] focus:ring-[#ad2c00]"
                    />
                    <span className="text-[14px] text-[#291712]">
                      Bán chạy
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-[#fddbd3]">
                <h3 className="font-['Inter'] font-semibold text-[16px] text-[#291712] mb-3">
                  Mức Giá
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() =>
                      setPriceFilter(
                        priceFilter === "under30k"
                          ? null
                          : "under30k",
                      )
                    }
                    className={`w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors ${
                      priceFilter === "under30k"
                        ? "bg-[#fddbd3] text-[#ad2c00] font-medium"
                        : "text-[#5d4038] hover:bg-[#fddbd3]/50"
                    }`}
                  >
                    Dưới 30.000đ
                  </button>
                  <button
                    onClick={() =>
                      setPriceFilter(
                        priceFilter === "30to50k"
                          ? null
                          : "30to50k",
                      )
                    }
                    className={`w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors ${
                      priceFilter === "30to50k"
                        ? "bg-[#fddbd3] text-[#ad2c00] font-medium"
                        : "text-[#5d4038] hover:bg-[#fddbd3]/50"
                    }`}
                  >
                    30.000đ - 50.000đ
                  </button>
                </div>
              </div>

              {/* Sort */}
              <div className="pt-4 border-t border-[#fddbd3]">
                <h3 className="font-['Inter'] font-semibold text-[16px] text-[#291712] mb-3">
                  Sắp Xếp
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as any)
                  }
                  className="w-full px-3 py-2 border-2 border-[#fddbd3] rounded-lg text-[14px] text-[#291712] focus:border-[#ad2c00] focus:outline-none"
                >
                  <option value="popular">Phổ biến</option>
                  <option value="price-low">
                    Giá thấp đến cao
                  </option>
                  <option value="price-high">
                    Giá cao đến thấp
                  </option>
                  <option value="rating">Đánh giá cao</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="font-display font-semibold text-[24px] text-[#291712] mb-2">
                Khám Phá Thực Đơn
              </h1>
              <p className="text-[#5d4038] text-[14px]">
                {filteredDishes.length} món ăn
              </p>
            </div>

            {/* Dish Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <Link
                    to={`/dish/${dish.id}`}
                    className="block"
                  >
                    <div className="relative h-[160px] sm:h-[200px]">
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

                    <div className="p-4 pb-2">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-['Inter'] font-bold text-[16px] text-[#291712]">
                          {dish.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        {dish.oldPrice && (
                          <span className="text-[#5d4038] text-[14px] line-through">
                            {dish.oldPrice.toLocaleString()}đ
                          </span>
                        )}
                        <span className="font-['Inter'] font-bold text-[16px] text-[#ad2c00]">
                          {dish.price.toLocaleString()}đ
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#fddbd3]">
                        <div className="flex items-center gap-3 text-[12px]">
                          <div className="flex items-center gap-1">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="#FABD00"
                              aria-hidden="true"
                            >
                              <path d="M6.5 0L8.09 4.41L13 5.11L9.75 8.28L10.58 13L6.5 10.77L2.42 13L3.25 8.28L0 5.11L4.91 4.41L6.5 0Z" />
                            </svg>
                            <span className="font-semibold text-[#785900]">
                              {dish.rating}
                            </span>
                            <span className="text-[#5d4038]">
                              ({dish.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#5d4038]">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="#5D4038"
                              aria-hidden="true"
                            >
                              <path d="M6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C10.09 13 13 10.09 13 6.5C13 2.91 10.09 0 6.5 0ZM6.5 11.7C3.63 11.7 1.3 9.37 1.3 6.5C1.3 3.63 3.63 1.3 6.5 1.3C9.37 1.3 11.7 3.63 11.7 6.5C11.7 9.37 9.37 11.7 6.5 11.7ZM7 3.5H6V7L9.5 9.15L10 8.4L7 6.5V3.5Z" />
                            </svg>
                            <span>{dish.deliveryTime}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[#5d4038] text-[11px] mt-2 italic">
                        Nhấn để xem chi tiết và tùy chỉnh
                      </p>
                    </div>
                  </Link>

                  <div className="px-4 pb-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      style={{ minWidth: '44px', minHeight: '44px' }}
                      className="p-2 border-2 border-[#fddbd3] rounded-lg hover:border-[#ad2c00] hover:bg-[#fddbd3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2 flex items-center justify-center"
                      aria-label={`Thêm ${dish.name} vào yêu thích`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M10 17.5L8.825 16.425C4.5 12.475 1.5 9.725 1.5 6.375C1.5 3.625 3.625 1.5 6.375 1.5C7.925 1.5 9.425 2.175 10 3.275C10.575 2.175 12.075 1.5 13.625 1.5C16.375 1.5 18.5 3.625 18.5 6.375C18.5 9.725 15.5 12.475 11.175 16.425L10 17.5Z"
                          stroke="#ad2c00"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem({
                          dishId: dish.id,
                          name: dish.name,
                          price: dish.price,
                          quantity: 1,
                          image: dish.image,
                        });
                      }}
                      style={{ minHeight: '48px' }}
                      className="flex-1 bg-[#ad2c00] text-white py-3 rounded-lg font-medium text-[14px] hover:bg-[#8a2300] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad2c00] focus-visible:ring-offset-2"
                    >
                      Thêm Nhanh
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}