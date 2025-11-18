const products = [
  //LAU VIET
  {
    id: 1,
    category: "lau-viet",
    title: "Lẩu Bò Ba Toa",
    img: "../../src/assets/images/Lau-vn/lau-bo.jpg",
    price: 250000,
    desc: "Lẩu bò trứ danh Đà Lạt với nạm, gân, đuôi bò thơm lừng quế hồi.",
  },
  {
    id: 2,
    category: "lau-viet",
    title: "Lẩu Gà Lá É",
    img: "../../src/assets/images/Lau-vn/lau-ga-la-e.jpg",
    price: 190000,
    desc: "Vị ngọt thanh của gà ta kết hợp vị cay nồng, bùi bùi của lá é Phú Yên.",
  },
  {
    id: 3,
    category: "lau-viet",
    title: "Lẩu Cá Kèo Rau Đắng",
    img: "../../src/assets/images/Lau-vn/Lau-ca-keo-rau-dang.jpg",
    price: 180000,
    desc: "Cá kèo tươi sống, nước lẩu chua dịu ăn kèm rau đắng giòn ngon.",
  },
  {
    id: 4,
    category: "lau-viet",
    title: "Lẩu Mắm Miền Tây",
    img: "../../src/assets/images/Lau-vn/lau-mam.jpg",
    price: 220000,
    desc: "Đậm đà hương vị mắm cá linh, ăn kèm bông súng, kèo nèo và thịt quay.",
  },
  {
    id: 5,
    category: "lau-viet",
    title: "Lẩu Riêu Cua Bắp Bò",
    img: "../../src/assets/images/Lau-vn/Lau-rieu-cua-suon-sun-bo.png",
    price: 280000,
    desc: "Nước dùng ngọt thanh từ cua đồng, riêu cua vàng óng, bắp bò giòn sần sật.",
  },
  {
    id: 6,
    category: "lau-viet",
    title: "Lẩu Cá Đuối Vũng Tàu",
    img: "../../src/assets/images/Lau-vn/Lau-ca-duoi.jpg",
    price: 195000,
    desc: "Thịt cá đuối sụn giòn, nước lẩu chua cay nấu cùng măng chua.",
  },
  {
    id: 7,
    category: "lau-viet",
    title: "Lẩu Vịt Nấu Chao",
    img: "../../src/assets/images/Lau-vn/vit-nau-chao.jpg",
    price: 210000,
    desc: "Thịt vịt mềm béo ngậy hòa quyện cùng vị bùi bùi, thơm nức của chao đỏ.",
  },
  {
    id: 8,
    category: "lau-viet",
    title: "Lẩu Ếch Măng Cay",
    img: "../../src/assets/images/Lau-vn/Lau-ech (1).jpg",
    price: 170000,
    desc: "Thịt ếch xào săn chắc, nước dùng cay nồng ấm bụng, đặc sản miền Bắc.",
  },
  {
    id: 9,
    category: "lau-viet",
    title: "Lẩu Cá Lăng Măng Chua",
    img: "../../src/assets/images/Lau-vn/Lau-ca-lang-mang-cay.jpg",
    price: 260000,
    desc: "Cá lăng sông Đà ít xương, thịt ngọt, nấu măng chua giải nhiệt mùa hè.",
  },
  {
    id: 10,
    category: "lau-viet",
    title: "Lẩu Dê Thuốc Bắc",
    img: "../../src/assets/images/Lau-vn/lau-de.jpg",
    price: 320000,
    desc: "Dê núi Ninh Bình hầm kỹ với các vị thuốc bắc bổ dưỡng, tốt cho sức khỏe.",
  },
  {
    id: 11,
    category: "lau-viet",
    title: "Lẩu Cháo Chim Bồ Câu",
    img: "../../src/assets/images/Lau-vn/Lau-chao-chim-bo-cau.jpeg",
    price: 290000,
    desc: "Cháo sánh mịn, ngọt lịm từ thịt chim câu, thích hợp bồi bổ người mới ốm dậy.",
  },
  {
    id: 12,
    category: "lau-viet",
    title: "Lẩu Hải Sản Chua Cay",
    img: "../../src/assets/images/Lau-vn/lau-hai-san.jpg",
    price: 240000,
    desc: "Tôm, mực, nghêu tươi rói nấu theo phong cách chua cay thuần Việt.",
  },
  {
    id: 13,
    category: "lau-viet",
    title: "Lẩu Lươn Xứ Nghệ",
    img: "../../src/assets/images/Lau-vn/lau-luon.jpg",
    price: 230000,
    desc: "Lươn đồng béo vàng, nước dùng cay nồng của nghệ và ớt chỉ thiên.",
  },
  {
    id: 14,
    category: "lau-viet",
    title: "Lẩu Gà Ớt Hiểm",
    img: "../../src/assets/images/Lau-vn/lau-ga-ot-hiem.jpg",
    price: 200000,
    desc: "Gà tiềm ớt hiểm xanh, vị cay thanh không gắt, nước dùng ngọt lịm.",
  },
  {
    id: 15,
    category: "lau-viet",
    title: "Lẩu Trâu Nhúng Mẻ",
    img: "../../src/assets/images/Lau-vn/lau-trau.jpg",
    price: 240000,
    desc: "Thịt trâu tươi thái mỏng nhúng nước mẻ chua thanh, cuốn bánh tráng.",
  },
  {
    id: 16,
    category: "lau-viet",
    title: "Lẩu Bần Phù Sa",
    img: "../../src/assets/images/Lau-vn/lau-ban.jpg",
    price: 190000,
    desc: "Lẩu nấu từ trái bần chín, vị chua thanh tao dân dã miền Tây sông nước.",
  },

  //LAU THAI
  {
    id: 17,
    category: "lau-thai",
    title: "Lẩu Thái Tomyum Cốt Dừa",
    img: "../../src/assets/images/Lau-thai/tomyum-cot-dua.jpg",
    price: 260000,
    desc: "Vị chua cay béo ngậy từ nước cốt dừa, chuẩn vị Tomyum Kung.",
  },
  {
    id: 18,
    category: "lau-thai",
    title: "Lẩu Thái Hải Sản Khổng Lồ",
    img: "../../src/assets/images/Lau-thai/hai-san-khong-lo.jpg",
    price: 350000,
    desc: "Mẹt hải sản đầy ắp tôm càng, mực, bạch tuộc tươi sống.",
  },
  {
    id: 19,
    category: "lau-thai",
    title: "Lẩu Thái Bò Mỹ",
    img: "../../src/assets/images/Lau-thai/bo-my.jpg",
    price: 230000,
    desc: "Ba chỉ bò Mỹ cuộn nấm kim châm nhúng nước lẩu chua cay.",
  },
  {
    id: 20,
    category: "lau-thai",
    title: "Lẩu Suki Thái Lan",
    img: "../../src/assets/images/Lau-thai/suki.jpg",
    price: 210000,
    desc: "Lẩu Suki ăn kèm sốt chấm tương đỏ đặc biệt của người Thái.",
  },
  {
    id: 21,
    category: "lau-thai",
    title: "Lẩu Tôm Càng Xanh",
    img: "../../src/assets/images/Lau-thai/tom-cang.jpg",
    price: 390000,
    desc: "Những chú tôm càng xanh to bự, gạch tôm béo ngậy hòa vào nước lẩu.",
  },
  {
    id: 22,
    category: "lau-thai",
    title: "Lẩu Cá Diêu Hồng Thái",
    img: "../../src/assets/images/Lau-thai/ca-dieu-hong.jpg",
    price: 180000,
    desc: "Cá diêu hồng chiên sơ, nấu lẩu chua cay kiểu Thái rất bắt cơm.",
  },
  {
    id: 23,
    category: "lau-thai",
    title: "Lẩu Thái Nghêu Húng Quế",
    img: "../../src/assets/images/Lau-thai/ngheu.jpg",
    price: 160000,
    desc: "Vị ngọt từ nghêu kết hợp hương thơm nồng của lá húng quế tây.",
  },
  {
    id: 24,
    category: "lau-thai",
    title: "Lẩu Thái Chay",
    img: "../../src/assets/images/Lau-thai/chay.jpg",
    price: 150000,
    desc: "Thanh đạm với rau củ, nấm và đậu hũ nhưng vẫn đậm đà vị Thái.",
  },
  {
    id: 25,
    category: "lau-thai",
    title: "Lẩu Mực Khổng Lồ",
    img: "../../src/assets/images/Lau-thai/muc-khong-lo.jpg",
    price: 299000,
    desc: "Mực nang khổng lồ giòn sần sật, chấm muối ớt xanh siêu ngon.",
  },
  {
    id: 26,
    category: "lau-thai",
    title: "Lẩu Thái 9 Tầng Mây",
    img: "../../src/assets/images/Lau-thai/chin-tang-may.jpg",
    price: 450000,
    desc: "Tháp thịt bò và hải sản 9 tầng, phù hợp cho nhóm đông người.",
  },
  {
    id: 27,
    category: "lau-thai",
    title: "Lẩu Bạch Tuộc Chua Cay",
    img: "../../src/assets/images/Lau-thai/bach-tuoc.jpg",
    price: 220000,
    desc: "Bạch tuộc tươi nhúng lẩu Thái, giòn dai sần sật.",
  },
  {
    id: 28,
    category: "lau-thai",
    title: "Lẩu Đầu Cá Hồi",
    img: "../../src/assets/images/Lau-thai/dau-ca-hoi.jpg",
    price: 170000,
    desc: "Đầu cá hồi béo ngậy nấu canh chua kiểu Thái, ăn không bị ngán.",
  },
  {
    id: 29,
    category: "lau-thai",
    title: "Lẩu Khô Thái Lan",
    img: "../../src/assets/images/Lau-thai/lau-kho.jpg",
    price: 240000,
    desc: "Lẩu xào khô độc đáo, sốt Thái sền sệt đậm đà.",
  },
  {
    id: 30,
    category: "lau-thai",
    title: "Lẩu Sườn Heo Ớt Hiểm",
    img: "../../src/assets/images/Lau-thai/suon-heo.jpg",
    price: 280000,
    desc: "Tháp sườn heo hầm mềm, phủ đầy ớt xanh cay tê tái (Leng Saeb).",
  },
  {
    id: 31,
    category: "lau-thai",
    title: "Lẩu Ghẹ Kiểu Thái",
    img: "../../src/assets/images/Lau-thai/lau-ghe.jpg",
    price: 320000,
    desc: "Ghẹ tươi ngọt thịt nấu cùng nước dùng chua cay.",
  },
  {
    id: 32,
    category: "lau-thai",
    title: "Lẩu Ếch Tomyum",
    img: "../../src/assets/images/Lau-thai/lau-ech-thai.jpg",
    price: 190000,
    desc: "Biến tấu mới lạ với thịt ếch dai ngon trong nước lẩu Tomyum.",
  },

  //LẨU HÀN
  {
    id: 33,
    category: "lau-han",
    title: "Lẩu Kim Chi Thịt Heo",
    img: "../../src/assets/images/Lau-han/kim-chi.jpg",
    price: 220000,
    desc: "Vị chua cay của kim chi cải thảo muối kỹ kết hợp ba chỉ heo béo ngậy.",
  },
  {
    id: 34,
    category: "lau-han",
    title: "Lẩu Budae Jjigae (Quân Đội)",
    img: "../../src/assets/images/Lau-han/budae.jpg",
    price: 250000,
    desc: "Lẩu thập cẩm với xúc xích, thịt hộp, phô mai, mì gói và đậu hũ.",
  },
  {
    id: 35,
    category: "lau-han",
    title: "Lẩu Bò Bulgogi",
    img: "../../src/assets/images/Lau-han/bulgogi.jpg",
    price: 280000,
    desc: "Nước lẩu ngọt dịu từ nấm và sốt Bulgogi, thịt bò mềm tan.",
  },
  {
    id: 36,
    category: "lau-han",
    title: "Lẩu Tokbokki Buffet",
    img: "../../src/assets/images/Lau-han/tokbokki.jpg",
    price: 139000,
    desc: "Lẩu bánh gạo cay Hàn Quốc với chả cá, trứng và các loại topping.",
  },
  {
    id: 37,
    category: "lau-han",
    title: "Lẩu Nấm Hàn Quốc",
    img: "../../src/assets/images/Lau-han/lau-nam.jpg",
    price: 240000,
    desc: "Thanh đạm với các loại nấm kim châm, đùi gà, nấm hương Hàn Quốc.",
  },
  {
    id: 38,
    category: "lau-han",
    title: "Lẩu Hải Sản Cay (Haemul)",
    img: "../../src/assets/images/Lau-han/haemul.jpg",
    price: 320000,
    desc: "Nước dùng cay nồng ớt bột Gochugaru với ghẹ, tôm, vẹm xanh.",
  },
  {
    id: 39,
    category: "lau-han",
    title: "Lẩu Đậu Hũ Non (Sundubu)",
    img: "../../src/assets/images/Lau-han/sundubu.jpg",
    price: 190000,
    desc: "Đậu hũ non mềm mịn, cay nồng, thường ăn kèm trứng lòng đào.",
  },
  {
    id: 40,
    category: "lau-han",
    title: "Lẩu Bạch Tuộc Xào Cay",
    img: "../../src/assets/images/Lau-han/bach-tuoc.jpg",
    price: 270000,
    desc: "Bạch tuộc tươi sống xào trên chảo gang với sốt cay đặc biệt.",
  },
  {
    id: 41,
    category: "lau-han",
    title: "Lẩu Chả Cá Xiên (Odeng)",
    img: "../../src/assets/images/Lau-han/odeng.jpg",
    price: 180000,
    desc: "Những xiên chả cá nóng hổi trong nước dùng củ cải thanh ngọt.",
  },
  {
    id: 42,
    category: "lau-han",
    title: "Lẩu Gà Cay Phô Mai",
    img: "../../src/assets/images/Lau-han/ga-cay.jpg",
    price: 260000,
    desc: "Gà xào cay phủ lớp phô mai Mozzarella kéo sợi béo ngậy.",
  },
  {
    id: 43,
    category: "lau-han",
    title: "Lẩu Mandu (Bánh Xếp)",
    img: "../../src/assets/images/Lau-han/mandu.jpg",
    price: 210000,
    desc: "Lẩu bánh xếp nhân thịt và kim chi size khổng lồ.",
  },
  {
    id: 44,
    category: "lau-han",
    title: "Lẩu Shabu Shabu Hàn",
    img: "../../src/assets/images/Lau-han/shabu.jpg",
    price: 290000,
    desc: "Phong cách nhúng bò thái lát mỏng với nước dùng trong.",
  },
  {
    id: 45,
    category: "lau-han",
    title: "Lẩu Xương Hầm Gamjatang",
    img: "../../src/assets/images/Lau-han/gamjatang.jpg",
    price: 300000,
    desc: "Xương heo hầm nhừ với khoai tây và rau củ, nước dùng đậm đà.",
  },
  {
    id: 46,
    category: "lau-han",
    title: "Lẩu Tương Đậu Doenjang",
    img: "../../src/assets/images/Lau-han/tuong-dau.jpg",
    price: 200000,
    desc: "Hương vị truyền thống từ tương đậu lên men, tốt cho sức khỏe.",
  },
  {
    id: 47,
    category: "lau-han",
    title: "Lẩu Rabokki",
    img: "../../src/assets/images/Lau-han/rabokki.jpg",
    price: 160000,
    desc: "Sự kết hợp giữa mì Ramyeon và bánh gạo Tokbokki trong một nồi lẩu.",
  },
  {
    id: 48,
    category: "lau-han",
    title: "Lẩu Gà Tần Sâm",
    img: "../../src/assets/images/Lau-han/ga-tan-sam.jpg",
    price: 350000,
    desc: "Gà nguyên con hầm sâm, táo đỏ, món ăn đại bổ của người Hàn.",
  },

  //LẨU NHẬT
  {
    id: 49,
    category: "lau-nhat",
    title: "Lẩu Sukiyaki",
    img: "../../src/assets/images/Lau-nhat/sukiyaki.jpg",
    price: 320000,
    desc: "Lẩu bò trứ danh Nhật Bản với nước dùng mặn ngọt từ nướng tương và rượu Mirin.",
  },
  {
    id: 50,
    category: "lau-nhat",
    title: "Lẩu Shabu Shabu",
    img: "../../src/assets/images/Lau-nhat/shabu-shabu.jpg",
    price: 310000,
    desc: "Thanh đạm với nước dùng Kombu, nhúng thịt bò Wagyu thái lát siêu mỏng.",
  },
  {
    id: 51,
    category: "lau-nhat",
    title: "Lẩu Miso",
    img: "../../src/assets/images/Lau-nhat/miso.jpg",
    price: 280000,
    desc: "Nước lẩu đậm đà hương vị tương Miso truyền thống, ăn kèm mì Udon.",
  },
  {
    id: 52,
    category: "lau-nhat",
    title: "Lẩu Sữa Đậu Nành (Tonyu)",
    img: "../../src/assets/images/Lau-nhat/tonyu.jpg",
    price: 260000,
    desc: "Nước dùng trắng sữa, béo ngậy, lạ miệng và rất tốt cho sức khỏe.",
  },
  {
    id: 53,
    category: "lau-nhat",
    title: "Lẩu Sumo (Chankonabe)",
    img: "../../src/assets/images/Lau-nhat/chankonabe.jpg",
    price: 450000,
    desc: "Nồi lẩu khổng lồ giàu đạm dành cho các võ sĩ Sumo, đầy ắp thịt và hải sản.",
  },
  {
    id: 54,
    category: "lau-nhat",
    title: "Lẩu Curry Nhật",
    img: "../../src/assets/images/Lau-nhat/curry.jpg",
    price: 290000,
    desc: "Hương vị cà ri Nhật Bản thơm nồng, nước sốt sánh quyện.",
  },
  {
    id: 55,
    category: "lau-nhat",
    title: "Lẩu Oden",
    img: "../../src/assets/images/Lau-nhat/oden.jpg",
    price: 180000,
    desc: "Món lẩu đường phố với chả cá, củ cải, trứng luộc trong nước dùng Dashi.",
  },
  {
    id: 56,
    category: "lau-nhat",
    title: "Lẩu Đầu Cá Hồi Miso",
    img: "../../src/assets/images/Lau-nhat/ca-hoi-miso.jpg",
    price: 240000,
    desc: "Đầu cá hồi béo nấu cùng tương Miso, không tanh mà rất ngọt nước.",
  },
  {
    id: 57,
    category: "lau-nhat",
    title: "Lẩu Cua Tuyết (Kani)",
    img: "../../src/assets/images/Lau-nhat/kani.jpg",
    price: 650000,
    desc: "Sang trọng với chân cua tuyết Hokkaido ngọt thịt.",
  },
  {
    id: 58,
    category: "lau-nhat",
    title: "Lẩu Hàu (Kaki)",
    img: "../../src/assets/images/Lau-nhat/kaki.jpg",
    price: 380000,
    desc: "Những con hàu sữa béo múp nấu cùng tương Miso đỏ.",
  },
  {
    id: 59,
    category: "lau-nhat",
    title: "Lẩu Nấm Nhật Bản",
    img: "../../src/assets/images/Lau-nhat/nam-nhat.jpg",
    price: 250000,
    desc: "Tổng hợp các loại nấm quý như Maitake, Shiitake, Enoki thanh mát.",
  },
  {
    id: 60,
    category: "lau-nhat",
    title: "Lẩu Kim Chi Kiểu Nhật",
    img: "../../src/assets/images/Lau-nhat/kimchi-nhat.jpg",
    price: 270000,
    desc: "Biến tấu Kimchi Nabe với vị cay dịu hơn phiên bản Hàn Quốc.",
  },
  {
    id: 61,
    category: "lau-nhat",
    title: "Lẩu Vịt (Kamo Nabe)",
    img: "../../src/assets/images/Lau-nhat/kamo.jpg",
    price: 300000,
    desc: "Thịt vịt thái lát ăn kèm hành boa-rô và nước dùng Shoyu.",
  },
  {
    id: 62,
    category: "lau-nhat",
    title: "Lẩu Lòng Bò (Motsunabe)",
    img: "../../src/assets/images/Lau-nhat/motsunabe.jpg",
    price: 290000,
    desc: "Đặc sản Fukuoka với lòng bò béo ngậy, hẹ và tỏi.",
  },
  {
    id: 63,
    category: "lau-nhat",
    title: "Lẩu Hải Sản (Yosenabe)",
    img: "../../src/assets/images/Lau-nhat/yosenabe.jpg",
    price: 350000,
    desc: "Lẩu thập cẩm hải sản, món ăn phổ biến nhất trong các gia đình Nhật.",
  },
  {
    id: 64,
    category: "lau-nhat",
    title: "Lẩu Cá Ankang",
    img: "../../src/assets/images/Lau-nhat/ankang.jpg",
    price: 420000,
    desc: "Lẩu cá chày (cá lồng đèn) gan béo ngậy, được ví như gan ngỗng biển.",
  },

  //Nuoc uong
  {
    id: 65,
    category: "nuoc-uong",
    title: "Coca Cola Tươi",
    img: "../../src/assets/images/Nuoc/coca.jpg",
    price: 25000,
    desc: "Nước ngọt có ga sảng khoái, uống kèm lẩu cực đã.",
  },
  {
    id: 66,
    category: "nuoc-uong",
    title: "Trà Sữa Truyền Thống",
    img: "../../src/assets/images/Nuoc/tra-sua.jpg",
    price: 35000,
    desc: "Trà sữa đậm vị trà, béo vị sữa, có trân châu đen.",
  },
  {
    id: 67,
    category: "nuoc-uong",
    title: "Trà Đào Cam Sả",
    img: "../../src/assets/images/Nuoc/tra-dao.jpg",
    price: 45000,
    desc: "Thanh mát, giải nhiệt với những miếng đào giòn ngọt.",
  },
  {
    id: 68,
    category: "nuoc-uong",
    title: "Nước Ép Cam",
    img: "../../src/assets/images/Nuoc/ep-cam.jpg",
    price: 40000,
    desc: "Cam tươi vắt nguyên chất, bổ sung Vitamin C.",
  },
  {
    id: 69,
    category: "nuoc-uong",
    title: "Nước Ép Dưa Hấu",
    img: "../../src/assets/images/Nuoc/dua-hau.jpg",
    price: 35000,
    desc: "Ngọt mát tự nhiên, màu đỏ bắt mắt.",
  },
  {
    id: 70,
    category: "nuoc-uong",
    title: "Trà Vải Hoa Hồng",
    img: "../../src/assets/images/Nuoc/tra-vai.jpg",
    price: 45000,
    desc: "Hương thơm hoa hồng quyến rũ kết hợp vị ngọt của vải thiều.",
  },
  {
    id: 71,
    category: "nuoc-uong",
    title: "Soda Chanh Đường",
    img: "../../src/assets/images/Nuoc/soda-chanh.jpg",
    price: 30000,
    desc: "Sủi bọt mát lạnh, chua ngọt cân bằng.",
  },
  {
    id: 72,
    category: "nuoc-uong",
    title: "Soda Blue Ocean",
    img: "../../src/assets/images/Nuoc/blue-ocean.jpg",
    price: 35000,
    desc: "Màu xanh biển đẹp mắt, hương vị bạc hà mát lạnh.",
  },
  {
    id: 73,
    category: "nuoc-uong",
    title: "Bia Heineken",
    img: "../../src/assets/images/Nuoc/ken.jpg",
    price: 28000,
    desc: "Bia lon ướp lạnh, phù hợp cho các bữa tiệc lẩu.",
  },
  {
    id: 74,
    category: "nuoc-uong",
    title: "Bia Tiger Crystal",
    img: "../../src/assets/images/Nuoc/tiger.jpg",
    price: 25000,
    desc: "Bia tinh thể mát lạnh, uống êm dịu.",
  },
  {
    id: 75,
    category: "nuoc-uong",
    title: "Rượu Soju Truyền Thống",
    img: "../../src/assets/images/Nuoc/soju.jpg",
    price: 75000,
    desc: "Rượu quốc dân Hàn Quốc, êm dịu, dễ uống.",
  },
  {
    id: 76,
    category: "nuoc-uong",
    title: "Rượu Soju Vị Đào",
    img: "../../src/assets/images/Nuoc/soju-dao.jpg",
    price: 80000,
    desc: "Soju hương đào ngọt ngào, thích hợp cho phái nữ.",
  },
  {
    id: 77,
    category: "nuoc-uong",
    title: "Rượu Mơ Nhật (Umeshu)",
    img: "../../src/assets/images/Nuoc/ruou-mo.jpg",
    price: 90000,
    desc: "Rượu mơ ngâm chua ngọt, kích thích vị giác.",
  },
  {
    id: 78,
    category: "nuoc-uong",
    title: "Nước Suối Dasani",
    img: "../../src/assets/images/Nuoc/suoi.jpg",
    price: 15000,
    desc: "Nước tinh khiết đóng chai.",
  },
  {
    id: 79,
    category: "nuoc-uong",
    title: "Trà Gạo Rang (Genmaicha)",
    img: "../../src/assets/images/Nuoc/tra-gao.jpg",
    price: 25000,
    desc: "Trà Nhật thơm mùi gạo rang, giúp tiêu hóa tốt sau khi ăn lẩu.",
  },
  {
    id: 80,
    category: "nuoc-uong",
    title: "Sữa Tươi Trân Châu Đường Đen",
    img: "../../src/assets/images/Nuoc/sua-tuoi.jpg",
    price: 40000,
    desc: "Sữa tươi béo ngậy kết hợp đường đen Hàn Quốc thơm lừng.",
  },
];

let currentPage = 1;
const itemsPerPage = 12;
let currentFilteredList = [];

// Hàm định dạng tiền tệ
function vnd(price) {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

// Hàm vẽ sản phẩm ra màn hình
function renderProducts(listData) {
  const grid = document.getElementById("product-list");
  grid.innerHTML = "";

  if (listData.length === 0) {
    grid.innerHTML =
      '<p style="text-align:center; width:100%; grid-column: 1/-1; padding: 20px; color: #666;">Không tìm thấy món ăn nào.</p>';
    return;
  }

  let html = "";
  listData.forEach((item) => {
    html += `
          <div class="product-card">
              <img src="${item.img}" alt="${
      item.title
    }" class="product-card__image" loading="lazy" />
              <div class="product-card__content">
                  <h3 class="product-card__name">${item.title}</h3>
                  <p class="product-card__price">Giá: ${vnd(item.price)}</p>
                  <button class="product-card__button" onclick="detailProduct(${
                    item.id
                  })">
                      ĐẶT MÓN
                  </button>
              </div>
          </div>
          `;
  });
  grid.innerHTML = html;
}

// Hàm tính toán phân trang
function loadPageData() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = currentFilteredList.slice(start, end);

  renderProducts(pageData);
  renderPaginationButton();
}

// Hàm vẽ nút số trang (1, 2, 3...)
function renderPaginationButton() {
  let paginationContainer = document.getElementById("pagination");

  // Tạo khung phân trang nếu chưa có
  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination";
    paginationContainer.className = "pagination-container";
    document.querySelector(".product-section").appendChild(paginationContainer);
  }

  paginationContainer.innerHTML = "";
  const pageCount = Math.ceil(currentFilteredList.length / itemsPerPage);

  if (pageCount <= 1) return; // Ít món quá thì không cần phân trang

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("page-btn");
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", function () {
      currentPage = i;
      loadPageData();
      // Cuộn lên đầu danh sách sản phẩm cho dễ xem
      document
        .getElementById("product-list")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    });

    paginationContainer.appendChild(btn);
  }
}

// Hàm lọc danh mục (Filter)
function filterCategory(categoryName) {
  currentPage = 1; // Reset về trang 1

  if (categoryName === "all") {
    currentFilteredList = products;
  } else {
    currentFilteredList = products.filter((p) => p.category === categoryName);
  }

  loadPageData(); // Tải dữ liệu trang 1 của danh mục đó
}

function detailProduct(id) {
  const modal = document.querySelector(".modal.product-detail");
  const product = products.find((p) => p.id === id);

  if (!product) return;

  // 1. Tạo HTML (Lưu ý: Đã XÓA onclick ở 2 nút bấm cuối cùng)
  const html = `
        <div class="modal-header">
            <img class="product-image" src="${product.img}" alt="${
    product.title
  }">
        </div>
        <div class="modal-body">
            <h2 class="product-title">${product.title}</h2>
            <div class="product-control">
                <div class="priceBox">
                    <span class="current-price">${vnd(product.price)}</span>
                </div>
                <div class="buttons_added">
                    <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this)">
                    <input class="input-qty" type="number" value="1" min="1" readonly>
                    <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this)">
                </div>
            </div>
            <p class="product-description">${product.desc}</p>
        </div>
        <div class="notebox">
            <p class="notebox-title">GHI CHÚ</p>
            <textarea class="text-note" id="popup-detail-note" placeholder="Ví dụ: Không hành, ít cay..."></textarea>
        </div>
        <div class="modal-footer">
            <div class="price-total">
                <span class="thanhtien">Thành tiền</span>
                <span class="price">${vnd(product.price)}</span>
            </div>
            <div class="modal-footer-control">
                <button class="button-datmonngay">ĐẶT MÓN NGAY</button>
            </div>
        </div>
    `;

  // 2. Đổ HTML vào modal và hiện lên
  const contentBox = document.getElementById("product-detail-content");
  contentBox.innerHTML = html;
  modal.classList.add("open");

  // 3. XỬ LÝ SỰ KIỆN CLICK CHO CÁC NÚT (Logic kiểm tra đăng nhập ở đây)

  // --- Nút ĐẶT MÓN NGAY ---
  const btnBuyNow = contentBox.querySelector(".button-datmonngay");
  btnBuyNow.addEventListener("click", () => {
    if (checkLogin()) {
      // Nếu đã đăng nhập: Xử lý đặt hàng (Alert hoặc logic thanh toán)
      alert(`Đã đặt hàng thành công món: ${product.title}`);
      modal.classList.remove("open"); // Đóng popup
    } else {
      // Nếu CHƯA đăng nhập: Chuyển trang
      alert("Vui lòng đăng nhập để đặt món!");
      // Sửa đường dẫn 'login.html' cho đúng với file đăng nhập của bạn
      modal.classList.remove("open"); // Đóng modal món ăn trước
      openLoginModal(); 
    }
  });

  // --- Nút THÊM VÀO GIỎ ---
  const btnAddToCart = contentBox.querySelector(".button-dat");
  btnAddToCart.addEventListener("click", () => {
    if (checkLogin()) {
      alert("Đã thêm vào giỏ hàng!");
      // Logic thêm vào giỏ hàng (localStorage) viết ở đây...
    } else {
      alert("Bạn cần đăng nhập để thêm vào giỏ!");
      window.location.href = "/login.html";
    }
  });

  // 4. Logic tính tiền khi tăng giảm số lượng (Giữ nguyên)
  const qtyInput = contentBox.querySelector(".input-qty");
  const priceDisplay = contentBox.querySelector(".price");
  const btns = contentBox.querySelectorAll(".is-form");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        let qty = parseInt(qtyInput.value);
        priceDisplay.innerText = vnd(qty * product.price);
      }, 0);
    });
  });
}

// Hàm hỗ trợ tăng giảm số lượng
function increasingNumber(e) {
  let qty = e.parentNode.querySelector(".input-qty");
  qty.value = parseInt(qty.value) + 1;
}

function decreasingNumber(e) {
  let qty = e.parentNode.querySelector(".input-qty");
  if (parseInt(qty.value) > 1) {
    qty.value = parseInt(qty.value) - 1;
  }
}

// Đóng Modal khi bấm ra ngoài hoặc bấm nút X
document.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal.open");
  if (modal && (e.target === modal || e.target.closest(".modal-close"))) {
    modal.classList.remove("open");
  }
});

// Khởi tạo trang

document.addEventListener("DOMContentLoaded", () => {
  filterCategory("all");
  if (typeof initHeroSlider === "function") initHeroSlider();
  if (typeof initCategoryScroll === "function") initCategoryScroll();
});

// Hàm kiểm tra trạng thái đăng nhập
function checkLogin() {
  // Kiểm tra xem trong bộ nhớ có lưu thông tin user chưa
  // 'currentuser' là key bạn dùng lúc lưu khi đăng nhập (dựa theo code mẫu ban đầu bạn gửi)
  const user = localStorage.getItem("currentuser");

  if (user) {
    return true; // Đã đăng nhập
  } else {
    return false; // Chưa đăng nhập
  }
}
