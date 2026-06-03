import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext";

interface Topping {
  id: string;
  name: string;
  price: number;
}

interface DishSize {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface DishData {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  images: string[];
  sizes: DishSize[];
  toppings: Topping[];
}

const dishesData: Record<string, DishData> = {
  "1": {
    id: "1",
    name: "Phở Bò ALOVUX Đặc Biệt",
    description: "Phở bò truyền thống với nước dùng hầm xương nhiều giờ, thịt bò tươi ngon, bánh phở dai mềm. Phục vụ kèm rau thơm, giá đỗ, chanh và tương ớt.",
    rating: 4.9,
    reviews: 234,
    deliveryTime: "20-30 phút",
    images: [
      "https://monngonmoingay.com/wp-content/uploads/2015/11/PhoBo-e1446825512455.jpg",
    ],
    sizes: [
      { id: "regular", name: "Phở Thường", description: "Tô Vừa", price: 35000 },
      { id: "large", name: "Phở Đặc Biệt", description: "Tô Lớn", price: 55000 },
    ],
    toppings: [
      { id: "noodles", name: "Thêm Phở", price: 5000 },
      { id: "beef", name: "Thêm Thịt Bò", price: 10000 },
      { id: "quay", name: "Thêm Quẩy", price: 8000 },
      { id: "meatballs", name: "Thêm Bò Viên", price: 10000 },
      { id: "herbs", name: "Thêm Rau Thơm", price: 5000 },
    ],
  },
  "2": {
    id: "2",
    name: "Bánh Mì Thịt Nướng",
    description: "Bánh mì Việt Nam giòn tan với nhân thịt nướng thơm lừng, pate đặc trưng, rau sống tươi mát và nước sốt đặc biệt. Món ăn sáng hoàn hảo cho người Việt.",
    rating: 4.8,
    reviews: 156,
    deliveryTime: "15-20 phút",
    images: [
      "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=800",
    ],
    sizes: [
      { id: "regular", name: "Bánh Mì Thường", description: "Size Vừa", price: 25000 },
      { id: "large", name: "Bánh Mì Đặc Biệt", description: "Size Lớn", price: 35000 },
    ],
    toppings: [
      { id: "pate", name: "Thêm Pate", price: 5000 },
      { id: "egg", name: "Thêm Trứng Ốp La", price: 8000 },
      { id: "cheese", name: "Thêm Phô Mai", price: 10000 },
      { id: "sausage", name: "Thêm Xúc Xích", price: 10000 },
    ],
  },
  "3": {
    id: "3",
    name: "Bún Chả Hà Nội",
    description: "Món ăn đặc sản Hà Nội với bún tươi, chả nướng thơm phức, thịt nướng hấp dẫn và nước chấm chua ngọt cân bằng. Kèm theo rau sống và các loại gia vị truyền thống.",
    rating: 4.7,
    reviews: 189,
    deliveryTime: "25-35 phút",
    images: [
      "https://images.unsplash.com/photo-1583316175701-0bc5f25a0a44?w=800",
    ],
    sizes: [
      { id: "regular", name: "Bún Chả Thường", description: "Phần Vừa", price: 45000 },
      { id: "large", name: "Bún Chả Đặc Biệt", description: "Phần Lớn", price: 60000 },
    ],
    toppings: [
      { id: "noodles", name: "Thêm Bún", price: 5000 },
      { id: "cha", name: "Thêm Chả", price: 15000 },
      { id: "meat", name: "Thêm Thịt Nướng", price: 15000 },
      { id: "springroll", name: "Thêm Nem Rán", price: 12000 },
    ],
  },
  "4": {
    id: "4",
    name: "Gỏi Cuốn Tôm Thịt",
    description: "Gỏi cuốn tươi mát với tôm luộc, thịt ba chỉ, bún tươi, rau sống và bánh tráng cuốn dai ngon. Chấm kèm nước tương đậu phộng hoặc tương đen đậm đà.",
    rating: 4.6,
    reviews: 142,
    deliveryTime: "15-25 phút",
    images: [
      "https://images.unsplash.com/photo-1594020292985-216a72a2c7ce?w=800",
    ],
    sizes: [
      { id: "regular", name: "Gỏi Cuốn Thường", description: "6 cuốn", price: 35000 },
      { id: "large", name: "Gỏi Cuốn Đặc Biệt", description: "10 cuốn", price: 55000 },
    ],
    toppings: [
      { id: "shrimp", name: "Thêm Tôm", price: 15000 },
      { id: "pork", name: "Thêm Thịt", price: 10000 },
      { id: "sauce", name: "Thêm Nước Chấm", price: 5000 },
    ],
  },
  "5": {
    id: "5",
    name: "Cơm Tấm Sườn Bì",
    description: "Cơm tấm Sài Gòn đặc trưng với sườn nướng thơm nức, bì giòn tan, chả trứng béo ngậy. Ăn kèm dưa leo, cà chua và nước mắm pha chua ngọt.",
    rating: 4.8,
    reviews: 198,
    deliveryTime: "20-30 phút",
    images: [
      "https://images.unsplash.com/photo-1766050587783-1c90751275dd?w=800",
    ],
    sizes: [
      { id: "regular", name: "Cơm Tấm Thường", description: "Phần Vừa", price: 40000 },
      { id: "large", name: "Cơm Tấm Đặc Biệt", description: "Phần Lớn", price: 55000 },
    ],
    toppings: [
      { id: "suon", name: "Thêm Sườn Nướng", price: 20000 },
      { id: "cha", name: "Thêm Chả Trứng", price: 10000 },
      { id: "bi", name: "Thêm Bì", price: 10000 },
      { id: "egg", name: "Thêm Trứng Ốp La", price: 8000 },
    ],
  },
  "6": {
    id: "6",
    name: "Cơm Gà Xối Mỡ",
    description: "Cơm thơm mềm với gà luộc mềm ngọt, xối mỡ hành thơm phức. Ăn kèm dưa leo, canh súp và nước tương gừng đặc biệt.",
    rating: 4.7,
    reviews: 167,
    deliveryTime: "20-25 phút",
    images: [
      "https://images.unsplash.com/photo-1677354469663-dc918927fd93?w=800",
    ],
    sizes: [
      { id: "regular", name: "Cơm Gà Thường", description: "Phần Vừa", price: 38000 },
      { id: "large", name: "Cơm Gà Đặc Biệt", description: "Phần Lớn", price: 50000 },
    ],
    toppings: [
      { id: "chicken", name: "Thêm Gà", price: 20000 },
      { id: "soup", name: "Thêm Canh", price: 10000 },
      { id: "rice", name: "Thêm Cơm", price: 5000 },
    ],
  },
  "7": {
    id: "7",
    name: "Cơm Chiên Dương Châu",
    description: "Cơm chiên Dương Châu với tôm, xúc xích, trứng, rau củ đầy đủ. Món cơm chiên thơm ngon với hương vị đậm đà, đầy đủ dinh dưỡng.",
    rating: 4.6,
    reviews: 145,
    deliveryTime: "15-20 phút",
    images: [
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    ],
    sizes: [
      { id: "regular", name: "Cơm Chiên Thường", description: "Phần Vừa", price: 35000 },
      { id: "large", name: "Cơm Chiên Đặc Biệt", description: "Phần Lớn", price: 48000 },
    ],
    toppings: [
      { id: "shrimp", name: "Thêm Tôm", price: 15000 },
      { id: "sausage", name: "Thêm Xúc Xích", price: 10000 },
      { id: "egg", name: "Thêm Trứng", price: 8000 },
    ],
  },
  "8": {
    id: "8",
    name: "Chè Ba Màu",
    description: "Chè ba màu truyền thống với đậu xanh, đậu đỏ, thạch lá nếp, nước cốt dừa béo ngậy và đá bào mát lạnh. Món tráng miệng tuyệt vời cho ngày hè.",
    rating: 4.9,
    reviews: 223,
    deliveryTime: "10-15 phút",
    images: [
      "https://lanvienhotel.com.vn/wp-content/uploads/2025/07/che-ba-mau-huong-vi-tuoi-mat-cua-mua-he-tai-trung-tam-thanh-pho.jpg",
    ],
    sizes: [
      { id: "regular", name: "Chè Thường", description: "Ly Vừa", price: 20000 },
      { id: "large", name: "Chè Đặc Biệt", description: "Ly Lớn", price: 28000 },
    ],
    toppings: [
      { id: "coconut", name: "Thêm Cốt Dừa", price: 5000 },
      { id: "toppings", name: "Thêm Topping", price: 8000 },
      { id: "ice", name: "Thêm Đá", price: 3000 },
    ],
  },
  "9": {
    id: "9",
    name: "Chè Bưởi",
    description: "Chè bưởi thanh mát với múi bưởi tươi, thạch, nước đường thanh nhẹ. Món chè đặc trưng miền Nam với vị ngọt thanh tự nhiên từ trái bưởi.",
    rating: 4.7,
    reviews: 134,
    deliveryTime: "10-15 phút",
    images: [
      "https://file.hstatic.net/200000721249/file/che_buoi_d13d44779d7d4a6ea7b5881361285169.jpg",
    ],
    sizes: [
      { id: "regular", name: "Chè Thường", description: "Ly Vừa", price: 18000 },
      { id: "large", name: "Chè Đặc Biệt", description: "Ly Lớn", price: 25000 },
    ],
    toppings: [
      { id: "grapefruit", name: "Thêm Bưởi", price: 8000 },
      { id: "jelly", name: "Thêm Thạch", price: 5000 },
      { id: "ice", name: "Thêm Đá", price: 3000 },
    ],
  },
  "10": {
    id: "10",
    name: "Chè Đậu Đỏ",
    description: "Chè đậu đỏ nóng truyền thống với đậu đỏ mềm, nước đường ngọt vừa. Món chè ấm áp, bổ dưỡng cho những ngày se lạnh hoặc tráng miệng sau bữa ăn.",
    rating: 4.5,
    reviews: 98,
    deliveryTime: "10-15 phút",
    images: ["https://media.vneconomy.vn/images/upload/2021/04/21/che1-15613482836781632518551.jpg"],
    sizes: [
      { id: "regular", name: "Chè Thường", description: "Ly Vừa", price: 15000 },
      { id: "large", name: "Chè Đặc Biệt", description: "Ly Lớn", price: 22000 },
    ],
    toppings: [
      { id: "coconut", name: "Thêm Cốt Dừa", price: 5000 },
      { id: "beans", name: "Thêm Đậu Đỏ", price: 5000 },
      { id: "glutinous", name: "Thêm Khoai Mỡ", price: 8000 },
    ],
  },
  "11": {
    id: "11", name: "Phở Gà",
    description: "Phở gà thơm ngon với nước dùng trong vắt được hầm từ xương gà, thịt gà ta dai mềm, kèm hành lá, ngò gai và tiêu xay.",
    rating: 4.7, reviews: 178, deliveryTime: "20-30 phút",
    images: ["https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800"],
    sizes: [
      { id: "regular", name: "Phở Thường", description: "Tô Vừa", price: 40000 },
      { id: "large", name: "Phở Đặc Biệt", description: "Tô Lớn", price: 55000 },
    ],
    toppings: [
      { id: "chicken", name: "Thêm Thịt Gà", price: 12000 },
      { id: "quay", name: "Thêm Quẩy", price: 8000 },
      { id: "herbs", name: "Thêm Rau Thơm", price: 5000 },
    ],
  },
  "12": {
    id: "12", name: "Phở Tái Nạm",
    description: "Phở bò tái nạm với thịt bò tái mềm ngọt và nạm bò dai giòn, nước dùng đậm đà thấm từng sợi phở.",
    rating: 4.8, reviews: 201, deliveryTime: "20-30 phút",
    images: ["https://mms.img.susercontent.com/vn-11134259-7ra0g-m6tm83lg7fx49c@resize_ss1242x600!@crop_w1242_h600_cT"],
    sizes: [
      { id: "regular", name: "Phở Thường", description: "Tô Vừa", price: 48000 },
      { id: "large", name: "Phở Đặc Biệt", description: "Tô Lớn", price: 65000 },
    ],
    toppings: [
      { id: "beef", name: "Thêm Thịt Bò", price: 15000 },
      { id: "nam", name: "Thêm Nạm", price: 12000 },
      { id: "quay", name: "Thêm Quẩy", price: 8000 },
    ],
  },
  "13": {
    id: "13", name: "Phở Bò Viên",
    description: "Phở bò viên dai giòn, viên thịt bò tươi được vo tay với nước dùng đậm đà, hành ngò thơm nức.",
    rating: 4.6, reviews: 156, deliveryTime: "20-30 phút",
    images: ["https://anhtuyetfood.com/uploads/source/tin-tuc/pho-bo-480x480.webp"],
    sizes: [
      { id: "regular", name: "Phở Thường", description: "Tô Vừa", price: 42000 },
      { id: "large", name: "Phở Đặc Biệt", description: "Tô Lớn", price: 58000 },
    ],
    toppings: [
      { id: "meatballs", name: "Thêm Bò Viên", price: 12000 },
      { id: "quay", name: "Thêm Quẩy", price: 8000 },
    ],
  },
  "14": {
    id: "14", name: "Bánh Mì Chả Lụa",
    description: "Bánh mì chả lụa truyền thống với chả lụa thơm béo, pate, dưa leo, đồ chua và rau thơm tươi mát.",
    rating: 4.6, reviews: 132, deliveryTime: "15-20 phút",
    images: ["https://nemchasaungoc.com/tenants/tiemchachica/upload/ckeditors/2021-10/banh-mi-cha-lua.jpg"],
    sizes: [
      { id: "regular", name: "Bánh Mì Thường", description: "Size Vừa", price: 22000 },
      { id: "large", name: "Bánh Mì Đặc Biệt", description: "Size Lớn", price: 32000 },
    ],
    toppings: [
      { id: "cha", name: "Thêm Chả Lụa", price: 10000 },
      { id: "pate", name: "Thêm Pate", price: 5000 },
      { id: "egg", name: "Thêm Trứng", price: 8000 },
    ],
  },
  "15": {
    id: "15", name: "Bánh Mì Pate Trứng",
    description: "Bánh mì pate trứng đậm đà với pate gan béo ngậy, trứng ốp la, bơ và rau thơm.",
    rating: 4.7, reviews: 178, deliveryTime: "15-20 phút",
    images: ["https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/176285/Originals/cach-lam-banh-mi-pate-trung-16.jpg"],
    sizes: [
      { id: "regular", name: "Bánh Mì Thường", description: "Size Vừa", price: 28000 },
      { id: "large", name: "Bánh Mì Đặc Biệt", description: "Size Lớn", price: 38000 },
    ],
    toppings: [
      { id: "pate", name: "Thêm Pate", price: 5000 },
      { id: "egg", name: "Thêm Trứng Ốp La", price: 8000 },
      { id: "cheese", name: "Thêm Phô Mai", price: 10000 },
    ],
  },
  "16": {
    id: "16", name: "Bánh Mì Xíu Mại",
    description: "Bánh mì xíu mại nóng hổi với viên xíu mại mềm thấm nước sốt cà chua đậm đà.",
    rating: 4.5, reviews: 112, deliveryTime: "15-20 phút",
    images: ["https://www.huongnghiepaau.com/wp-content/uploads/2024/04/banh-mi-xiu-mai.jpg"],
    sizes: [
      { id: "regular", name: "Bánh Mì Thường", description: "Size Vừa", price: 30000 },
      { id: "large", name: "Bánh Mì Đặc Biệt", description: "Size Lớn", price: 40000 },
    ],
    toppings: [
      { id: "xiumai", name: "Thêm Xíu Mại", price: 12000 },
      { id: "sauce", name: "Thêm Nước Sốt", price: 5000 },
    ],
  },
  "17": {
    id: "17", name: "Bún Bò Huế",
    description: "Bún bò Huế cay nồng đặc trưng xứ Huế với nước dùng đậm sả và mắm ruốc, kèm thịt bò, giò heo và chả cua.",
    rating: 4.8, reviews: 210, deliveryTime: "25-35 phút",
    images: ["https://i.ytimg.com/vi/CSI9ildGX9s/maxresdefault.jpg"],
    sizes: [
      { id: "regular", name: "Bún Bò Thường", description: "Tô Vừa", price: 55000 },
      { id: "large", name: "Bún Bò Đặc Biệt", description: "Tô Lớn", price: 70000 },
    ],
    toppings: [
      { id: "beef", name: "Thêm Thịt Bò", price: 15000 },
      { id: "gio", name: "Thêm Giò Heo", price: 18000 },
      { id: "chacua", name: "Thêm Chả Cua", price: 12000 },
    ],
  },
  "18": {
    id: "18", name: "Bún Riêu Cua",
    description: "Bún riêu cua đồng thanh ngọt với nước dùng cua đậm vị, đậu hũ, cà chua và rau sống tươi mát.",
    rating: 4.7, reviews: 165, deliveryTime: "25-35 phút",
    images: ["https://i.ytimg.com/vi/Xb-s5pPlbbc/maxresdefault.jpg"],
    sizes: [
      { id: "regular", name: "Bún Thường", description: "Tô Vừa", price: 45000 },
      { id: "large", name: "Bún Đặc Biệt", description: "Tô Lớn", price: 60000 },
    ],
    toppings: [
      { id: "rieu", name: "Thêm Riêu Cua", price: 15000 },
      { id: "tofu", name: "Thêm Đậu Hũ", price: 8000 },
    ],
  },
  "19": {
    id: "19", name: "Bún Thịt Nướng",
    description: "Bún thịt nướng thơm phức với thịt heo ướp sả nướng vàng giòn, kèm chả giò, rau sống và nước mắm chua ngọt.",
    rating: 4.6, reviews: 143, deliveryTime: "20-30 phút",
    images: ["https://cdn.tgdd.vn/Files/2017/03/24/964440/cach-lam-bun-thit-nuong-ngon-7_760x450.jpg"],
    sizes: [
      { id: "regular", name: "Bún Thường", description: "Tô Vừa", price: 42000 },
      { id: "large", name: "Bún Đặc Biệt", description: "Tô Lớn", price: 55000 },
    ],
    toppings: [
      { id: "meat", name: "Thêm Thịt Nướng", price: 15000 },
      { id: "springroll", name: "Thêm Chả Giò", price: 10000 },
    ],
  },
  "20": {
    id: "20", name: "Gỏi Cuốn Chay",
    description: "Gỏi cuốn chay thanh mát với đậu hũ chiên, nấm đông cô, bún, rau sống cuốn trong bánh tráng mỏng.",
    rating: 4.5, reviews: 89, deliveryTime: "15-20 phút",
    images: ["https://cdn.hstatic.net/files/200000700229/article/goi-cuon-chay-1_4a0a40700a874972b0acebbe67475747.jpg"],
    sizes: [
      { id: "regular", name: "Gỏi Cuốn Thường", description: "6 cuốn", price: 28000 },
      { id: "large", name: "Gỏi Cuốn Đặc Biệt", description: "10 cuốn", price: 45000 },
    ],
    toppings: [
      { id: "tofu", name: "Thêm Đậu Hũ", price: 8000 },
      { id: "sauce", name: "Thêm Nước Chấm", price: 5000 },
    ],
  },
  "21": {
    id: "21", name: "Bò Bía",
    description: "Bò bía dân dã với lạp xưởng, củ sắn, trứng, tôm khô và rau thơm cuốn trong bánh tráng mỏng dai.",
    rating: 4.4, reviews: 76, deliveryTime: "15-20 phút",
    images: ["https://cdn.tgdd.vn/Files/2020/04/14/1248966/cach-lam-bo-bia-ngot-thom-ngon-hap-dan-goi-nho-tu.jpg"],
    sizes: [
      { id: "regular", name: "Bò Bía Thường", description: "6 cuốn", price: 25000 },
      { id: "large", name: "Bò Bía Đặc Biệt", description: "10 cuốn", price: 40000 },
    ],
    toppings: [
      { id: "lapxuong", name: "Thêm Lạp Xưởng", price: 10000 },
      { id: "shrimp", name: "Thêm Tôm Khô", price: 8000 },
    ],
  },
  "22": {
    id: "22", name: "Chả Giò Rế",
    description: "Chả giò rế giòn rụm với vỏ rế mỏng vàng đều, nhân tôm thịt và miến đậm vị, chấm với nước mắm chua ngọt.",
    rating: 4.7, reviews: 154, deliveryTime: "15-25 phút",
    images: ["https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=800"],
    sizes: [
      { id: "regular", name: "Chả Giò Thường", description: "6 cái", price: 35000 },
      { id: "large", name: "Chả Giò Đặc Biệt", description: "12 cái", price: 60000 },
    ],
    toppings: [
      { id: "sauce", name: "Thêm Nước Chấm", price: 5000 },
      { id: "salad", name: "Thêm Rau Sống", price: 5000 },
    ],
  },
  "23": {
    id: "23", name: "Cơm Bò Lúc Lắc",
    description: "Cơm bò lúc lắc với thịt bò mềm xào lửa lớn cùng hành tây, ớt chuông, ăn kèm cơm trắng và xà lách trộn.",
    rating: 4.8, reviews: 187, deliveryTime: "20-30 phút",
    images: ["https://thaoduocvn.net/wp-content/uploads/2023/10/com-bo-luc-lac2.jpg"],
    sizes: [
      { id: "regular", name: "Cơm Thường", description: "Phần Vừa", price: 55000 },
      { id: "large", name: "Cơm Đặc Biệt", description: "Phần Lớn", price: 72000 },
    ],
    toppings: [
      { id: "beef", name: "Thêm Thịt Bò", price: 20000 },
      { id: "egg", name: "Thêm Trứng Ốp La", price: 8000 },
    ],
  },
  "24": {
    id: "24", name: "Chè Khúc Bạch",
    description: "Chè khúc bạch mát lạnh với thạch khúc bạch dai mềm, nhãn nhục ngọt thanh và nước đường hạnh nhân thơm dịu.",
    rating: 4.6, reviews: 112, deliveryTime: "10-15 phút",
    images: ["https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_9_28_638315335535725712_che-khuc-bach-thumb.jpg"],
    sizes: [
      { id: "regular", name: "Chè Thường", description: "Ly Vừa", price: 25000 },
      { id: "large", name: "Chè Đặc Biệt", description: "Ly Lớn", price: 35000 },
    ],
    toppings: [
      { id: "longan", name: "Thêm Nhãn", price: 5000 },
      { id: "jelly", name: "Thêm Thạch", price: 5000 },
    ],
  },
};

export default function DishDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("regular");
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const dish = dishesData[id || "1"];

  if (!dish) {
    return (
      <div className="bg-[#fff8f6] min-h-screen pt-[68px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[22px] sm:text-[32px] font-bold text-[#291712] mb-4">Không tìm thấy món ăn</h1>
          <Link to="/menu" className="text-[#ad2c00] hover:underline">
            Quay lại thực đơn
          </Link>
        </div>
      </div>
    );
  }

  const selectedSizeData = dish.sizes.find((s) => s.id === selectedSize) || dish.sizes[0];
  const basePrice = selectedSizeData.price;
  const toppingsPrice = selectedToppings.reduce((sum, toppingId) => {
    const topping = dish.toppings.find((t) => t.id === toppingId);
    return sum + (topping?.price || 0);
  }, 0);
  const totalPrice = (basePrice + toppingsPrice) * quantity;

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAddToCart = () => {
    const selectedToppingDetails = dish.toppings.filter((t) =>
      selectedToppings.includes(t.id)
    );

    addItem({
      dishId: id || "1",
      name: dish.name,
      price: basePrice,
      quantity,
      image: dish.images[0],
      size: selectedSize,
      toppings: selectedToppingDetails,
    });

    // Show success feedback
    navigate("/cart");
  };

  return (
    <div className="bg-[#fff8f6] min-h-screen pt-[68px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-4 sm:py-8">
        {/* Back to Menu */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-[#ad2c00] font-medium mb-6 hover:underline"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 13L5 8L10 3" stroke="#AD2C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Quay lại thực đơn</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Side - Image */}
          <div className="w-full lg:w-[612px] lg:shrink-0">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
              <div className="relative h-[260px] sm:h-[380px] lg:h-[459px]">
                <img
                  src={dish.images[0]}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-[#fdc003] px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="#6C5000">
                      <path d="M6.5 0L8.09 4.41L13 5.11L9.75 8.28L10.58 13L6.5 10.77L2.42 13L3.25 8.28L0 5.11L4.91 4.41L6.5 0Z" />
                    </svg>
                    <span className="text-[12px] font-medium text-[#6c5000]">{dish.rating}</span>
                  </div>
                  <div className="bg-[#fff8f6] px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="#AD2C00">
                      <path d="M6 0C4.4087 0 2.88258 0.632141 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6C0 9.3 6 14 6 14C6 14 12 9.3 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 0 6 0ZM6 8C5.46957 8 4.96086 7.78929 4.58579 7.41421C4.21071 7.03914 4 6.53043 4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4C6.53043 4 7.03914 4.21071 7.41421 4.58579C7.78929 4.96086 8 5.46957 8 6C8 6.53043 7.78929 7.03914 7.41421 7.41421C7.03914 7.78929 6.53043 8 6 8Z" />
                    </svg>
                    <span className="text-[12px] font-medium text-[#ad2c00]">{dish.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex-1">
            <div className="pb-6 border-b border-[#fddbd3] mb-6">
              <h1 className="font-display font-bold text-[24px] text-[#291712] mb-2">
                {dish.name}
              </h1>
              <p className="text-[#5d4038] text-[16px] leading-[24px] mb-4">
                {dish.description}
              </p>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="#FABD00">
                    <path d="M8 0L10.472 5.528L16 6.416L12 10.472L12.944 16L8 13.528L3.056 16L4 10.472L0 6.416L5.528 5.528L8 0Z" />
                  </svg>
                  <span className="font-semibold text-[#785900] text-[15px]">{dish.rating}</span>
                  <span className="text-[#5d4038] text-[14px]">({dish.reviews} đánh giá)</span>
                </div>
                <span className="text-[#5d4038] text-[14px]">• {dish.deliveryTime}</span>
              </div>
              <p className="font-['Inter'] font-semibold text-[24px] sm:text-[32px] text-[#ad2c00]">
                {basePrice.toLocaleString()}đ
              </p>
            </div>

            {/* Size Selection */}
            {dish.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-['Inter'] font-semibold text-[20px] text-[#291712] mb-4">
                  Chọn Kích Cỡ
                </h3>
                <div className="flex gap-2">
                  {dish.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                        selectedSize === size.id
                          ? "bg-[#fff1ed] border-[#ad2c00]"
                          : "bg-white border-[#fddbd3] hover:border-[#ad2c00]/50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedSize === size.id
                              ? "border-[#ad2c00]"
                              : "border-[#926f66]"
                          }`}
                        >
                          {selectedSize === size.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ad2c00]" />
                          )}
                        </div>
                        <span className="font-['Inter'] font-semibold text-[16px] text-[#291712]">
                          {size.name}
                        </span>
                      </div>
                      <p className="text-[#5d4038] text-[13px] ml-7">{size.description}</p>
                      <p className="text-[#ad2c00] text-[16px] font-semibold ml-7 mt-1">
                        {size.price.toLocaleString()}đ
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Toppings */}
            {dish.toppings.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-['Inter'] font-semibold text-[20px] text-[#291712]">
                    Thêm Topping
                  </h3>
                  <span className="bg-[#ffe9e4] px-2 py-1 rounded text-[#5d4038] text-[12px] font-medium">
                    Tuỳ Chọn
                  </span>
                </div>
                <p className="text-[#5d4038] text-[13px] mb-3 italic">
                  Bạn có thể chọn nhiều topping
                </p>
                <div className="space-y-2">
                  {dish.toppings.map((topping) => (
                    <label
                      key={topping.id}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border-2 transition-all ${
                        selectedToppings.includes(topping.id)
                          ? "bg-[#fff1ed] border-[#ad2c00]"
                          : "bg-white border-[#fddbd3] hover:border-[#ad2c00]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedToppings.includes(topping.id)}
                          onChange={() => toggleTopping(topping.id)}
                          className="w-5 h-5 rounded border-2 border-[#926f66] text-[#ad2c00] focus:ring-[#ad2c00]"
                        />
                        <span className="font-['Inter'] text-[15px] text-[#291712]">
                          {topping.name}
                        </span>
                      </div>
                      <span className="text-[#ad2c00] text-[14px] font-semibold">
                        +{topping.price.toLocaleString()}đ
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] font-semibold text-[20px] text-[#291712]">
                  Số Lượng
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 border-2 border-[#fddbd3] rounded-lg flex items-center justify-center hover:bg-[#fff8f6] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8H13"
                        stroke="#291712"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <span className="font-['Inter'] font-semibold text-[20px] text-[#291712] w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 border-2 border-[#fddbd3] rounded-lg flex items-center justify-center hover:bg-[#fff8f6] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 3V13M3 8H13"
                        stroke="#291712"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#ad2c00] text-white py-4 rounded-lg flex items-center justify-between px-8 font-semibold text-[18px] shadow-md hover:bg-[#8a2300] transition-colors"
              >
                <span className="font-['Inter']">
                  Thêm Vào Giỏ
                </span>
                <span className="font-['Inter'] font-bold">
                  {totalPrice.toLocaleString()}đ
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
