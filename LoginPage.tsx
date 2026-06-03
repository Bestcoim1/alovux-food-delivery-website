import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletedItem, setDeletedItem] = useState<{ id: string; name: string } | null>(null);

  const handleClearCart = () => {
    clearCart();
    setShowDeleteConfirm(false);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    setDeletedItem({ id, name });
    setTimeout(() => setDeletedItem(null), 3000);
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
          <div className="bg-white rounded-xl p-6 sm:p-12 text-center">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[24px] text-[#291712] mb-2">
              Giỏ Hàng Trống
            </h3>
            <p className="text-[#5d4038] text-[16px] mb-6">
              Hãy thêm món ăn vào giỏ hàng để tiếp tục!
            </p>
            <Link
              to="/menu"
              className="inline-block bg-[#ad2c00] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#8a2300] transition-colors"
              style={{ minHeight: 48 }}
            >
              Khám Phá Thực Đơn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-[450px] w-full p-6 mx-4 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#f8d7da] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 20a2 2 0 110-4 2 2 0 010 4zm2-7h-4V9h4v6z" fill="#721c24" />
                </svg>
              </div>
              <h3 className="font-['Inter'] font-bold text-[20px] text-[#291712] mb-2">
                Xóa toàn bộ giỏ hàng?
              </h3>
              <p className="text-[#5d4038] text-[15px]">
                Hành động này không thể hoàn tác. Tất cả {totalItems} món sẽ bị xóa khỏi giỏ hàng.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 border-2 border-[#fddbd3] text-[#5d4038] py-3 rounded-lg font-semibold hover:bg-[#fff8f6] transition-colors"
                style={{ minHeight: 48 }}
              >
                Hủy
              </button>
              <button
                onClick={handleClearCart}
                className="flex-1 bg-[#721c24] text-white py-3 rounded-lg font-semibold hover:bg-[#5a1419] transition-colors"
                style={{ minHeight: 48 }}
              >
                Xóa Giỏ Hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {deletedItem && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#291712] text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-4 animate-slide-up">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" />
          </svg>
          <span className="text-[14px]">Đã xóa <strong>{deletedItem.name}</strong> khỏi giỏ hàng</span>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display font-bold text-[24px] sm:text-[32px] text-[#291712] mb-2">
            Giỏ Hàng Của Tôi
          </h1>
          <p className="text-[#5d4038] text-[14px] sm:text-[16px]">
            {totalItems} món trong giỏ hàng
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shrink-0"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-['Inter'] font-bold text-[16px] text-[#291712]">
                        {item.name}
                      </h3>
                      {item.size && (
                        <p className="text-[#5d4038] text-[13px]">
                          Kích cỡ: {item.size === "regular" ? "Thường" : "Đặc Biệt"}
                        </p>
                      )}
                      {item.toppings && item.toppings.length > 0 && (
                        <p className="text-[#5d4038] text-[13px]">
                          Topping: {item.toppings.map((t) => t.name).join(", ")}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-[#721c24] hover:text-[#ad2c00] transition-colors"
                      title={`Xóa ${item.name}`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 6L14 14M6 14L14 6"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 border-2 border-[#fddbd3] rounded-lg flex items-center justify-center hover:bg-[#fff8f6] transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6H10"
                            stroke="#291712"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <span className="font-['Inter'] font-semibold text-[16px] text-[#291712] w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 border-2 border-[#fddbd3] rounded-lg flex items-center justify-center hover:bg-[#fff8f6] transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M6 2V10M2 6H10"
                            stroke="#291712"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="font-['Inter'] font-bold text-[18px] text-[#ad2c00]">
                      {((item.price + (item.toppings?.reduce((sum, t) => sum + t.price, 0) || 0)) * item.quantity).toLocaleString()}đ
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-[#721c24] text-[14px] font-medium hover:underline"
            >
              Xóa Tất Cả
            </button>
          </div>

          {/* Order Summary */}
          <aside className="w-full lg:w-[380px] lg:shrink-0">
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:sticky lg:top-[84px]">
              <h2 className="font-display font-semibold text-[20px] text-[#291712] mb-4">
                Tổng Đơn Hàng
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-[15px]">
                  <span className="text-[#5d4038]">Tạm tính ({totalItems} món)</span>
                  <span className="text-[#291712] font-medium">
                    {totalPrice.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex items-center justify-between text-[15px]">
                  <span className="text-[#5d4038]">Phí giao hàng</span>
                  <span className="text-[#291712] font-medium">20.000đ</span>
                </div>
                <div className="flex items-center justify-between text-[15px]">
                  <span className="text-[#5d4038]">Giảm giá</span>
                  <span className="text-[#ad2c00] font-medium">-0đ</span>
                </div>
              </div>

              <div className="border-t border-[#fddbd3] pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-['Inter'] font-semibold text-[18px] text-[#291712]">
                    Tổng cộng
                  </span>
                  <span className="font-['Inter'] font-bold text-[24px] text-[#ad2c00]">
                    {(totalPrice + 20000).toLocaleString()}đ
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="block w-full bg-[#ad2c00] text-white py-3 rounded-lg font-semibold text-center hover:bg-[#8a2300] transition-colors"
                  style={{ minHeight: 48 }}
                >
                  Thanh Toán
                </Link>
                <Link
                  to="/menu"
                  className="block w-full border-2 border-[#ad2c00] text-[#ad2c00] py-3 rounded-lg font-semibold text-center hover:bg-[#fff8f6] transition-colors"
                >
                  Thêm Món
                </Link>
              </div>

              <div className="mt-6 p-4 bg-[#fff8f6] rounded-lg">
                <p className="text-[#5d4038] text-[13px] leading-relaxed">
                  💡 Mẹo: Đơn hàng từ 99.000đ sẽ được miễn phí giao hàng!
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
