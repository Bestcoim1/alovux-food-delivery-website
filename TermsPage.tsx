import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import { useCart } from "../contexts/CartContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{
    code: string;
    discount: number;
    type: "percent" | "fixed";
  } | null>(null);
  const [voucherError, setVoucherError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Card payment state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  // Mock voucher list
  const availableVouchers = [
    { code: "GIAM30K", discount: 30000, type: "fixed" as const, minOrder: 99000 },
    { code: "NEWUSER20", discount: 20, type: "percent" as const, minOrder: 0 },
    { code: "FREESHIP", discount: 20000, type: "fixed" as const, minOrder: 50000 },
  ];

  const deliveryFee = 20000;
  const discount = appliedVoucher
    ? appliedVoucher.type === "percent"
      ? (totalPrice * appliedVoucher.discount) / 100
      : appliedVoucher.discount
    : 0;
  const finalTotal = Math.max(0, totalPrice + deliveryFee - discount);

  const handleApplyVoucher = () => {
    setVoucherError("");
    const voucher = availableVouchers.find(
      (v) => v.code.toUpperCase() === voucherCode.toUpperCase()
    );

    if (!voucher) {
      setVoucherError("Mã voucher không hợp lệ");
      return;
    }

    if (totalPrice < voucher.minOrder) {
      setVoucherError(`Đơn hàng tối thiểu ${voucher.minOrder.toLocaleString()}đ`);
      return;
    }

    setAppliedVoucher({
      code: voucher.code,
      discount: voucher.discount,
      type: voucher.type,
    });
    setVoucherError("");
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode("");
    setVoucherError("");
  };

  const validateForm = (formData: FormData): boolean => {
    const errors: { [key: string]: string } = {};

    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!fullName || fullName.trim().length < 2) {
      errors.fullName = "Vui lòng nhập họ và tên (ít nhất 2 ký tự)";
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phone || !phoneRegex.test(phone.replace(/\s/g, ""))) {
      errors.phone = "Số điện thoại không hợp lệ (10-11 số)";
    }

    if (!address || address.trim().length < 10) {
      errors.address = "Vui lòng nhập địa chỉ giao hàng chi tiết";
    }

    if (paymentMethod === "card") {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
        errors.cardNumber = "Số thẻ không hợp lệ";
      }
      if (!cardName || cardName.trim().length < 3) {
        errors.cardName = "Vui lòng nhập tên chủ thẻ";
      }
      if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        errors.cardExpiry = "Ngày hết hạn không hợp lệ (MM/YY)";
      }
      if (!cardCVV || cardCVV.length < 3) {
        errors.cardCVV = "CVV không hợp lệ";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (!validateForm(formData)) {
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const orderData = {
      orderNumber: `ALV${Date.now()}`,
      items: items,
      total: finalTotal,
      paymentMethod,
      timestamp: new Date().toISOString(),
    };

    // Store order in localStorage for confirmation page
    localStorage.setItem("last_order", JSON.stringify(orderData));

    clearCart();
    navigate("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-6 sm:py-12">
          <div className="bg-white rounded-xl p-6 sm:p-12 text-center">
            <h3 className="font-['Inter'] font-semibold text-[24px] text-[#291712] mb-2">
              Giỏ Hàng Trống
            </h3>
            <p className="text-[#5d4038] text-[16px] mb-6">
              Vui lòng thêm món vào giỏ hàng trước khi thanh toán
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

  const steps = [
    { number: 1, name: "Giỏ Hàng", completed: true },
    { number: 2, name: "Giao Hàng", completed: currentStep > 2 },
    { number: 3, name: "Thanh Toán", completed: currentStep > 3 },
    { number: 4, name: "Xác Nhận", completed: false },
  ];

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display font-bold text-[24px] sm:text-[32px] text-[#291712] mb-2">
            Thanh Toán
          </h1>
          <p className="text-[#5d4038] text-[14px] sm:text-[16px] mb-6">
            Vui lòng điền thông tin để hoàn tất đơn hàng
          </p>

          {/* Step Indicator */}
          <div className="flex items-start justify-between mb-6 sm:mb-8 max-w-3xl">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center min-w-0">
                  <div
                    className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-[11px] sm:text-[14px] transition-colors shrink-0 ${
                      step.number === currentStep || step.completed
                        ? "bg-[#ad2c00] text-white"
                        : "bg-[#fddbd3] text-[#5d4038]"
                    }`}
                  >
                    {step.completed ? (
                      <>
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" className="sm:hidden">
                          <path d="M5 10L8 13L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="hidden sm:block">
                          <path d="M5 10L8 13L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`text-[9px] sm:text-[13px] mt-1.5 font-medium text-center leading-tight px-0.5 ${step.number === currentStep ? "text-[#ad2c00]" : "text-[#5d4038]"}`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-1.5 sm:mx-3 mt-[-10px] sm:mt-[-14px] shrink ${step.completed ? "bg-[#ad2c00]" : "bg-[#fddbd3]"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
          {/* Left Side - Form */}
          <div className="flex-1 space-y-3 sm:space-y-5">
            {/* Delivery Information */}
            <div className="bg-white rounded-xl p-4 sm:p-6">
              <h2 className="font-display font-semibold text-[18px] sm:text-[22px] text-[#291712] mb-3 sm:mb-4">
                Thông Tin Giao Hàng
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#291712] text-[14px] font-medium mb-2">
                    Họ và tên <span className="text-[#ad2c00]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Nguyễn Văn A"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                      formErrors.fullName ? "border-red-500" : "border-[#fddbd3] focus:border-[#ad2c00]"
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-red-600 text-[12px] mt-1 flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0ZM7.7 10.5H6.3V9.1H7.7V10.5ZM7.7 7.7H6.3V3.5H7.7V7.7Z" />
                      </svg>
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#291712] text-[14px] font-medium mb-2">
                      Số điện thoại <span className="text-[#ad2c00]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="0912345678"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                        formErrors.phone ? "border-red-500" : "border-[#fddbd3] focus:border-[#ad2c00]"
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-red-600 text-[12px] mt-1 flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                          <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0ZM7.7 10.5H6.3V9.1H7.7V10.5ZM7.7 7.7H6.3V3.5H7.7V7.7Z" />
                        </svg>
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#291712] text-[14px] font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#291712] text-[14px] font-medium mb-2">
                    Địa chỉ giao hàng <span className="text-[#ad2c00]">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="123 Nguyễn Huệ, Quận 1, TP.HCM"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                      formErrors.address ? "border-red-500" : "border-[#fddbd3] focus:border-[#ad2c00]"
                    }`}
                  />
                  {formErrors.address && (
                    <p className="text-red-600 text-[12px] mt-1 flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0ZM7.7 10.5H6.3V9.1H7.7V10.5ZM7.7 7.7H6.3V3.5H7.7V7.7Z" />
                      </svg>
                      {formErrors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#291712] text-[14px] font-medium mb-2">
                    Ghi chú đơn hàng
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Ví dụ: Gọi trước khi giao, không giao sau 8h tối..."
                    className="w-full px-4 py-3 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-4 sm:p-6">
              <h2 className="font-display font-semibold text-[18px] sm:text-[22px] text-[#291712] mb-3 sm:mb-4">
                Phương Thức Thanh Toán
              </h2>

              <div className="space-y-3">
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === "cod"
                      ? "border-[#ad2c00] bg-[#fff8f6]"
                      : "border-[#fddbd3] hover:bg-[#fff8f6]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value as "cod")}
                    className="w-5 h-5 text-[#ad2c00] focus:ring-[#ad2c00]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[24px]">💵</span>
                      <p className="font-['Inter'] font-semibold text-[16px] text-[#291712]">
                        Thanh toán khi nhận hàng (COD)
                      </p>
                    </div>
                    <p className="text-[#5d4038] text-[13px] ml-8">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === "card"
                      ? "border-[#ad2c00] bg-[#fff8f6]"
                      : "border-[#fddbd3] hover:bg-[#fff8f6]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value as "card")}
                    className="w-5 h-5 text-[#ad2c00] focus:ring-[#ad2c00]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[24px]">💳</span>
                      <p className="font-['Inter'] font-semibold text-[16px] text-[#291712]">
                        Thẻ tín dụng / Thẻ ghi nợ
                      </p>
                    </div>
                    <p className="text-[#5d4038] text-[13px] ml-8">
                      Visa, Mastercard, JCB
                    </p>
                  </div>
                </label>

                {/* Card Payment Form */}
                {paymentMethod === "card" && (
                  <div className="mt-4 p-4 bg-[#fff8f6] rounded-lg border-2 border-[#fddbd3] space-y-4">
                    <div>
                      <label className="block text-[#291712] text-[14px] font-medium mb-2">
                        Số thẻ <span className="text-[#ad2c00]">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, "");
                          const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
                          setCardNumber(formatted);
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                          formErrors.cardNumber ? "border-red-500" : "border-[#fddbd3] focus:border-[#ad2c00]"
                        }`}
                      />
                      {formErrors.cardNumber && (
                        <p className="text-red-600 text-[12px] mt-1">{formErrors.cardNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[#291712] text-[14px] font-medium mb-2">
                        Tên chủ thẻ <span className="text-[#ad2c00]">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="NGUYEN VAN A"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                          formErrors.cardName ? "border-red-500" : "border-[#fddbd3] focus:border-[#ad2c00]"
                        }`}
                      />
                      {formErrors.cardName && (
                        <p className="text-red-600 text-[12px] mt-1">{formErrors.cardName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#291712] text-[14px] font-medium mb-2">
                          Ngày hết hạn <span className="text-[#ad2c00]">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + "/" + value.slice(2, 4);
                            }
                            setCardExpiry(value);
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                            formErrors.cardExpiry ? "border-red-500" : "border-[#fddbd3] focus:border-[#ad2c00]"
                          }`}
                        />
                        {formErrors.cardExpiry && (
                          <p className="text-red-600 text-[12px] mt-1">{formErrors.cardExpiry}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[#291712] text-[14px] font-medium mb-2">
                          CVV <span className="text-[#ad2c00]">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ""))}
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                            formErrors.cardCVV ? "border-red-500" : "border-[#fddbd3] focus:border-[#ad2c00]"
                          }`}
                        />
                        {formErrors.cardCVV && (
                          <p className="text-red-600 text-[12px] mt-1">{formErrors.cardCVV}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <aside className="w-full lg:w-[380px] lg:shrink-0">
            <div className="bg-white rounded-xl p-4 sm:p-6 lg:sticky lg:top-[84px]">
              <h2 className="font-display font-semibold text-[18px] sm:text-[22px] text-[#291712] mb-3 sm:mb-4">
                Đơn Hàng ({totalItems} món)
              </h2>

              {/* Status Indicators */}
              <div className="mb-4 p-3 bg-[#fff8f6] rounded-lg space-y-2 text-[13px]">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#ad2c00" strokeWidth="2" />
                    <path d="M5 8L7 10L11 6" stroke="#ad2c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[#5d4038]">Đã có {totalItems} món trong giỏ</span>
                </div>
                <div className="flex items-center gap-2">
                  {paymentMethod ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="#ad2c00" strokeWidth="2" />
                        <path d="M5 8L7 10L11 6" stroke="#ad2c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#5d4038]">
                        Thanh toán: {paymentMethod === "cod" ? "COD" : "Thẻ"}
                      </span>
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="#fddbd3" strokeWidth="2" />
                      </svg>
                      <span className="text-[#5d4038]">Chưa chọn thanh toán</span>
                    </>
                  )}
                </div>
                {appliedVoucher && (
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#ad2c00" strokeWidth="2" />
                      <path d="M5 8L7 10L11 6" stroke="#ad2c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#5d4038]">Đã áp dụng mã giảm giá</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3 mb-4 max-h-[200px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-['Inter'] font-medium text-[14px] text-[#291712] truncate">
                        {item.name}
                      </h3>
                      {item.size && (
                        <p className="text-[#5d4038] text-[12px]">
                          {item.size === "regular" ? "Thường" : "Đặc Biệt"}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[#5d4038] text-[13px]">
                          x{item.quantity}
                        </span>
                        <span className="text-[#ad2c00] text-[14px] font-semibold">
                          {((item.price + (item.toppings?.reduce((sum, t) => sum + t.price, 0) || 0)) * item.quantity).toLocaleString()}đ
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voucher Section */}
              <div className="border-t border-[#fddbd3] pt-4 mb-4">
                <h3 className="font-['Inter'] font-medium text-[15px] text-[#291712] mb-3">
                  Mã Giảm Giá
                </h3>
                {!appliedVoucher ? (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                        placeholder="Nhập mã voucher"
                        className="flex-1 px-3 py-2 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none text-[14px]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyVoucher}
                        className="bg-[#ad2c00] text-white px-4 py-2 rounded-lg font-medium text-[14px] hover:bg-[#8a2300] transition-colors"
                        style={{ minHeight: 48 }}
                      >
                        Áp dụng
                      </button>
                    </div>
                    {voucherError && (
                      <p className="text-[#721c24] text-[12px] mt-2 flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                          <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0ZM7.7 10.5H6.3V9.1H7.7V10.5ZM7.7 7.7H6.3V3.5H7.7V7.7Z" />
                        </svg>
                        {voucherError}
                      </p>
                    )}
                    {/* Available Vouchers */}
                    <div className="mt-3 space-y-2">
                      <p className="text-[#5d4038] text-[12px] font-medium">
                        Mã khả dụng:
                      </p>
                      {availableVouchers.map((voucher) => (
                        <button
                          key={voucher.code}
                          type="button"
                          onClick={() => {
                            setVoucherCode(voucher.code);
                            setVoucherError("");
                          }}
                          className="w-full text-left p-2 border border-[#fddbd3] rounded-lg hover:border-[#ad2c00] hover:bg-[#fff8f6] transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-['Inter'] font-bold text-[12px] text-[#ad2c00]">
                              {voucher.code}
                            </span>
                            <span className="text-[#5d4038] text-[11px]">
                              {voucher.type === "percent"
                                ? `Giảm ${voucher.discount}%`
                                : `Giảm ${voucher.discount.toLocaleString()}đ`}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#d4edda] border border-[#c3e6cb] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle cx="8" cy="8" r="7" fill="#28a745" />
                          <path
                            d="M5 8L7 10L11 6"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="font-['Inter'] font-bold text-[14px] text-[#155724]">
                          {appliedVoucher.code}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveVoucher}
                        className="text-[#155724] hover:text-[#0e4b1f] text-[12px] font-medium underline"
                      >
                        Xóa
                      </button>
                    </div>
                    <p className="text-[#155724] text-[12px]">
                      Giảm{" "}
                      {appliedVoucher.type === "percent"
                        ? `${appliedVoucher.discount}%`
                        : `${appliedVoucher.discount.toLocaleString()}đ`}
                    </p>
                  </div>
                )}
              </div>

              {/* Note Section */}
              <div className="border-t border-[#fddbd3] pt-4 mb-4">
                <label className="block text-[#291712] text-[14px] font-medium mb-2">
                  Ghi Chú
                </label>
                <textarea
                  name="orderNote"
                  rows={3}
                  placeholder="Ghi chú thêm cho đơn hàng..."
                  className="w-full px-3 py-2 border-2 border-[#fddbd3] rounded-lg focus:border-[#ad2c00] focus:outline-none resize-none text-[14px]"
                />
              </div>

              <div className="border-t border-[#fddbd3] pt-4 space-y-3 mb-4">
                <div className="flex items-center justify-between text-[15px]">
                  <span className="text-[#5d4038]">Tạm tính</span>
                  <span className="text-[#291712] font-medium">
                    {totalPrice.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex items-center justify-between text-[15px]">
                  <span className="text-[#5d4038]">Phí giao hàng</span>
                  <span className="text-[#291712] font-medium">
                    {deliveryFee.toLocaleString()}đ
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-[15px]">
                    <span className="text-[#5d4038]">Giảm giá</span>
                    <span className="text-[#ad2c00] font-medium">
                      -{discount.toLocaleString()}đ
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-[#fddbd3] pt-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-['Inter'] font-semibold text-[16px] sm:text-[18px] text-[#291712]">
                    Tổng cộng
                  </span>
                  <span className="font-['Inter'] font-bold text-[20px] sm:text-[24px] text-[#ad2c00]">
                    {finalTotal.toLocaleString()}đ
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#ad2c00] text-white py-3 sm:py-3.5 rounded-lg font-semibold text-[15px] sm:text-[16px] hover:bg-[#8a2300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minHeight: 48 }}
              >
                {isProcessing ? "Đang xử lý..." : "Đặt Hàng"}
              </button>

              <Link
                to="/cart"
                className="block w-full text-center mt-3 text-[#ad2c00] text-[14px] font-medium hover:underline"
              >
                ← Quay lại giỏ hàng
              </Link>

              <div className="mt-6 p-4 bg-[#fff8f6] rounded-lg">
                <p className="text-[#5d4038] text-[13px] leading-relaxed">
                  🔒 Thông tin của bạn được mã hóa và bảo mật. Chúng tôi không
                  lưu trữ thông tin thẻ thanh toán.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
