import { useState, FormEvent } from "react";

type TabType = "profile" | "addresses" | "payment" | "settings";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const tabs = [
    { id: "profile" as TabType, name: "Thông Tin Cá Nhân", icon: "👤" },
    { id: "addresses" as TabType, name: "Địa Chỉ", icon: "📍" },
    { id: "payment" as TabType, name: "Thanh Toán", icon: "💳" },
    { id: "settings" as TabType, name: "Cài Đặt", icon: "⚙️" },
  ];

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-[24px] sm:text-[32px] text-[#291712] mb-2">
            Tài Khoản Của Tôi
          </h1>
          <p className="text-[#5d4038] text-[16px]">
            Quản lý thông tin cá nhân và cài đặt tài khoản
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-[280px] lg:shrink-0">
            <div className="bg-white rounded-xl p-4 lg:sticky lg:top-[84px]">
              <div className="flex items-center gap-4 p-4 mb-4 bg-[#fff8f6] rounded-lg">
                <div className="w-16 h-16 bg-[#fddbd3] rounded-full flex items-center justify-center text-[24px]">
                  👤
                </div>
                <div>
                  <h3 className="font-['Inter'] font-semibold text-[16px] text-[#291712]">
                    Nguyễn Văn A
                  </h3>
                  <p className="text-[#5d4038] text-[13px]">nguyenvana@email.com</p>
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-[#fddbd3] text-[#ad2c00] font-medium"
                        : "text-[#5d4038] hover:bg-[#fff8f6]"
                    }`}
                  >
                    <span className="text-[20px]">{tab.icon}</span>
                    <span className="font-['Inter'] text-[15px]">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "addresses" && <AddressesTab />}
            {activeTab === "payment" && <PaymentTab />}
            {activeTab === "settings" && <SettingsTab />}
          </main>
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-[#d4edda] border border-[#c3e6cb] rounded-lg p-4 flex items-center gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="shrink-0"
          >
            <circle cx="10" cy="10" r="9" fill="#28a745" />
            <path
              d="M6 10L9 13L14 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <p className="text-[#155724] font-medium text-[15px]">
              Cập nhật thành công!
            </p>
            <p className="text-[#155724] text-[13px]">
              Thông tin cá nhân của bạn đã được cập nhật.
            </p>
          </div>
        </div>
      )}

      <h2 className="font-display font-semibold text-[20px] sm:text-[24px] text-[#291712] mb-6">
        Thông Tin Cá Nhân
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#291712] text-[14px] font-medium mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              defaultValue="Nguyễn Văn A"
              className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#291712] text-[14px] font-medium mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              defaultValue="0912345678"
              className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#291712] text-[14px] font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            defaultValue="nguyenvana@email.com"
            className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[#291712] text-[14px] font-medium mb-2">
            Ngày sinh
          </label>
          <input
            type="date"
            defaultValue="1990-01-01"
            className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[#291712] text-[14px] font-medium mb-2">
            Giới tính
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                defaultChecked
                className="w-4 h-4 text-[#ad2c00] focus:ring-[#ad2c00]"
              />
              <span className="text-[#291712] text-[14px]">Nam</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                className="w-4 h-4 text-[#ad2c00] focus:ring-[#ad2c00]"
              />
              <span className="text-[#291712] text-[14px]">Nữ</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                className="w-4 h-4 text-[#ad2c00] focus:ring-[#ad2c00]"
              />
              <span className="text-[#291712] text-[14px]">Khác</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="bg-[#ad2c00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#8a2300] transition-colors"
          >
            Lưu Thay Đổi
          </button>
          <button
            type="button"
            className="border-2 border-[#fddbd3] text-[#5d4038] px-6 py-3 rounded-lg font-medium hover:bg-[#fff8f6] transition-colors"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

function AddressesTab() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      name: "Nhà Riêng",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "0912345678",
      isDefault: true,
    },
    {
      id: "2",
      name: "Văn Phòng",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
      phone: "0912345678",
      isDefault: false,
    },
  ]);

  const handleAddAddress = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddress = {
      id: String(addresses.length + 1),
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      isDefault: false,
    };
    setAddresses([...addresses, newAddress]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-[500px] w-full p-4 sm:p-6 mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-['Inter'] font-bold text-[20px] text-[#291712]">
                Thêm Địa Chỉ Mới
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
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

            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className="block text-[#291712] text-[14px] font-medium mb-2">
                  Tên địa chỉ
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Nhà riêng, Văn phòng..."
                  className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#291712] text-[14px] font-medium mb-2">
                  Địa chỉ chi tiết
                </label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[#291712] text-[14px] font-medium mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="0912345678"
                  className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#ad2c00] text-white py-3 rounded-lg font-medium hover:bg-[#8a2300] transition-colors"
                >
                  Thêm Địa Chỉ
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border-2 border-[#fddbd3] text-[#5d4038] py-3 rounded-lg font-medium hover:bg-[#fff8f6] transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="font-display font-semibold text-[20px] sm:text-[24px] text-[#291712]">
            Địa Chỉ Của Tôi
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#ad2c00] text-white px-4 py-3 rounded-lg font-medium text-[14px] hover:bg-[#8a2300] transition-colors"
          >
            + Thêm Địa Chỉ Mới
          </button>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border-2 border-[#fddbd3] rounded-lg p-4 hover:border-[#ad2c00] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-['Inter'] font-semibold text-[16px] text-[#291712]">
                    {address.name}
                  </h3>
                  {address.isDefault && (
                    <span className="bg-[#fdc003] text-[#6c5000] text-[11px] font-medium px-2 py-0.5 rounded">
                      Mặc định
                    </span>
                  )}
                </div>
                <button className="text-[#ad2c00] text-[14px] font-medium hover:underline">
                  Chỉnh sửa
                </button>
              </div>
              <p className="text-[#291712] text-[15px] mb-2">{address.address}</p>
              <p className="text-[#5d4038] text-[14px]">Điện thoại: {address.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentTab() {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cards, setCards] = useState([
    {
      id: "1",
      type: "visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
  ]);

  const handleAddCard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cardNumber = formData.get("cardNumber") as string;
    const newCard = {
      id: String(cards.length + 1),
      type: "visa",
      last4: cardNumber.slice(-4),
      expiry: formData.get("expiry") as string,
      isDefault: false,
    };
    setCards([...cards, newCard]);
    setShowAddCardModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Add Card Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-[500px] w-full p-4 sm:p-6 mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-['Inter'] font-bold text-[20px] text-[#291712]">
                Thêm Thẻ Mới
              </h3>
              <button
                onClick={() => setShowAddCardModal(false)}
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

            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label className="block text-[#291712] text-[14px] font-medium mb-2">
                  Số thẻ
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#291712] text-[14px] font-medium mb-2">
                  Tên trên thẻ
                </label>
                <input
                  type="text"
                  name="cardName"
                  required
                  placeholder="NGUYEN VAN A"
                  className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#291712] text-[14px] font-medium mb-2">
                    Ngày hết hạn
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#291712] text-[14px] font-medium mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    required
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-[#fff8f6] rounded-lg p-4 flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="#ad2c00"
                  className="shrink-0 mt-0.5"
                >
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" />
                </svg>
                <p className="text-[#5d4038] text-[13px] leading-[20px]">
                  Thông tin thẻ của bạn được mã hóa và bảo mật. Chúng tôi không lưu trữ mã CVV.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#ad2c00] text-white py-3 rounded-lg font-medium hover:bg-[#8a2300] transition-colors"
                >
                  Thêm Thẻ
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="flex-1 border-2 border-[#fddbd3] text-[#5d4038] py-3 rounded-lg font-medium hover:bg-[#fff8f6] transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="font-display font-semibold text-[20px] sm:text-[24px] text-[#291712]">
            Phương Thức Thanh Toán
          </h2>
          <button
            onClick={() => setShowAddCardModal(true)}
            className="bg-[#ad2c00] text-white px-4 py-3 rounded-lg font-medium text-[14px] hover:bg-[#8a2300] transition-colors"
          >
            + Thêm Thẻ Mới
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border-2 border-[#fddbd3] rounded-lg p-4 hover:border-[#ad2c00] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-[#1a1f71] rounded flex items-center justify-center text-white text-[10px] font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-['Inter'] font-medium text-[16px] text-[#291712]">
                      •••• {card.last4}
                    </p>
                    <p className="text-[#5d4038] text-[13px]">Hết hạn {card.expiry}</p>
                  </div>
                  {card.isDefault && (
                    <span className="bg-[#fdc003] text-[#6c5000] text-[11px] font-medium px-2 py-0.5 rounded">
                      Mặc định
                    </span>
                  )}
                </div>
                <button className="text-[#ad2c00] text-[14px] font-medium hover:underline">
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#fddbd3] pt-6">
          <h3 className="font-['Inter'] font-semibold text-[18px] text-[#291712] mb-4">
            Thanh Toán Khi Nhận Hàng
          </h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-2 border-[#926f66] text-[#ad2c00] focus:ring-[#ad2c00]"
            />
            <span className="text-[#291712] text-[15px]">
              Cho phép thanh toán tiền mặt khi nhận hàng
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 sm:p-6">
        <h2 className="font-display font-semibold text-[20px] sm:text-[24px] text-[#291712] mb-6">
          Cài Đặt Tài Khoản
        </h2>

        <div className="space-y-6">
          <div className="pb-6 border-b border-[#fddbd3]">
            <h3 className="font-['Inter'] font-semibold text-[18px] text-[#291712] mb-4">
              Thông Báo
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-[#291712] text-[15px] font-medium">
                    Thông báo đơn hàng
                  </p>
                  <p className="text-[#5d4038] text-[13px]">
                    Nhận thông báo về trạng thái đơn hàng
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-2 border-[#926f66] text-[#ad2c00] focus:ring-[#ad2c00]"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-[#291712] text-[15px] font-medium">
                    Khuyến mãi & Ưu đãi
                  </p>
                  <p className="text-[#5d4038] text-[13px]">
                    Nhận thông báo về các chương trình khuyến mãi
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-2 border-[#926f66] text-[#ad2c00] focus:ring-[#ad2c00]"
                />
              </label>
            </div>
          </div>

          <div className="pb-6 border-b border-[#fddbd3]">
            <h3 className="font-['Inter'] font-semibold text-[18px] text-[#291712] mb-4">
              Bảo Mật
            </h3>
            <button className="text-[#ad2c00] text-[15px] font-medium hover:underline">
              Đổi mật khẩu
            </button>
          </div>

          <div>
            <h3 className="font-['Inter'] font-semibold text-[18px] text-[#291712] mb-4">
              Ngôn Ngữ & Khu Vực
            </h3>
            <select className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none">
              <option>Tiếng Việt</option>
              <option>English</option>
            </select>
          </div>

          <div className="pt-6 border-t border-[#fddbd3]">
            <button className="text-[#721c24] text-[15px] font-medium hover:underline">
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
