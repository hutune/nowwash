// Giả lập Mock Data để làm UI Prototype

export type BagSize = "S" | "M" | "L";
export type OrderStatus =
  | "CREATED"
  | "PICKED_UP"
  | "IN_WORKSHOP"
  | "IN_PROCESS"
  | "QC_STAGE"
  | "READY_TO_DELIVER"
  | "OUT_FOR_DELIVERY"
  | "COMPLETED";

export interface Order {
  id: string;
  code: string;
  userName: string;
  phone: string;
  building: string;
  apartment: string;
  isSubscription: boolean;
  bagSize: BagSize;
  status: OrderStatus;
  createdAt: string;
  price: number;
  bagQr: string;
  sealQr: string;
  events: { time: string; label: string; staffName?: string }[];
}

export const PLANS = [
  { id: "p1", name: "Cá Nhân", price: 390000, bagSize: "S" as const, features: ["2 túi/tuần", "Roll-over túi chưa dùng", "Giao nhận T+1"], popular: false },
  { id: "p2", name: "Đôi", price: 590000, bagSize: "M" as const, features: ["Free 1 túi L đầu tháng", "Roll-over túi chưa dùng", "Vệ sinh giày giá gốc"], popular: true },
  { id: "p3", name: "Gia Đình", price: 890000, bagSize: "L" as const, features: ["Lấy đồ ưu tiên hỏa tốc", "Bảo hành 1 đổi 1", "Miễn phí tẩy mốc cơ bản"], popular: false },
];

export const BAG_CAPACITY = {
  S: "1.5 Máy (Tối đa 7kg)",
  M: "2 Máy (Tối đa 12kg)",
  L: "3 Máy (Tối đa 18kg)",
};

export const ORDER_FLOW: OrderStatus[] = [
  "CREATED",
  "PICKED_UP",
  "IN_WORKSHOP",
  "IN_PROCESS",
  "QC_STAGE",
  "READY_TO_DELIVER",
  "OUT_FOR_DELIVERY",
  "COMPLETED",
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "o1",
    code: "NW-240402-001",
    userName: "Nguyễn Thị Mai",
    phone: "0901234567",
    building: "Vinhomes Central Park - P3",
    apartment: "12A-05",
    isSubscription: true,
    bagSize: "M",
    status: "IN_PROCESS",
    createdAt: "2026-04-02T08:00:00Z",
    price: 0,
    bagQr: "BAG-VM-001-A",
    sealQr: "SEAL-7890-XYZ",
    events: [
      { time: "08:15", label: "Tạo đơn thành công" },
      { time: "08:30", label: "Nhân viên lấy đồ & Niêm phong", staffName: "Nhân Lê" },
      { time: "09:00", label: "Kiểm tra Seal tại xưởng", staffName: "Phát Nguyễn" },
      { time: "09:15", label: "Bắt đầu giặt mẻ riêng" },
    ],
  },
  {
    id: "o2",
    code: "NW-240402-002",
    userName: "Trần Văn Hùng",
    phone: "0912345678",
    building: "Vinhomes Central Park - L1",
    apartment: "08-12",
    isSubscription: false,
    bagSize: "S",
    status: "CREATED",
    createdAt: "2026-04-02T09:30:00Z",
    price: 79000,
    bagQr: "",
    sealQr: "",
    events: [{ time: "09:30", label: "Tạo đơn lẻ thành công" }],
  },
  {
    id: "o3",
    code: "NW-240402-003",
    userName: "Lê Phương Anh",
    phone: "0923456789",
    building: "Vinhomes Central Park - L4",
    apartment: "15-03",
    isSubscription: true,
    bagSize: "L",
    status: "COMPLETED",
    createdAt: "2026-04-01T15:00:00Z",
    price: 0,
    bagQr: "BAG-VL-045-C",
    sealQr: "SEAL-1234-ABC",
    events: [
      { time: "15:00 (Hôm qua)", label: "Tạo đơn thành công" },
      { time: "15:20 (Hôm qua)", label: "Lấy đồ & Niêm phong", staffName: "Bảo Trần" },
      { time: "16:00 (Hôm qua)", label: "Check-in xưởng", staffName: "Phát Nguyễn" },
      { time: "16:15 (Hôm qua)", label: "Đang giặt" },
      { time: "18:00 (Hôm qua)", label: "Kiểm tra QC Camera", staffName: "Thanh Trúc" },
      { time: "18:30 (Hôm qua)", label: "Sẵn sàng giao" },
      { time: "19:00 (Hôm qua)", label: "Bắt đầu giao" },
      { time: "19:15 (Hôm qua)", label: "Hoàn thành đơn", staffName: "Bảo Trần" },
    ],
  },
  {
    id: "o4",
    code: "NW-240402-004",
    userName: "Phạm Đức Anh",
    phone: "0934567890",
    building: "Vinhomes Central Park - P5",
    apartment: "20-11",
    isSubscription: true,
    bagSize: "M",
    status: "QC_STAGE",
    createdAt: "2026-04-02T06:00:00Z",
    price: 0,
    bagQr: "BAG-VM-012-B",
    sealQr: "SEAL-4567-DEF",
    events: [
      { time: "06:10", label: "Tạo đơn thành công" },
      { time: "06:30", label: "Lấy đồ", staffName: "Nhân Lê" },
      { time: "07:00", label: "Đang giặt" },
      { time: "08:45", label: "Vào phòng QC Camera Top-down" },
    ],
  },
  {
    id: "o5",
    code: "NW-240402-005",
    userName: "Hoàng Minh Tú",
    phone: "0945678901",
    building: "Vinhomes Central Park - L6",
    apartment: "05-09",
    isSubscription: false,
    bagSize: "S",
    status: "READY_TO_DELIVER",
    createdAt: "2026-04-01T20:00:00Z",
    price: 94000,
    bagQr: "BAG-VS-101-A",
    sealQr: "SEAL-8901-GHI",
    events: [
      { time: "20:00 (Hôm qua)", label: "Tạo đơn (Có thêm dịch vụ Tẩy lẻ)" },
      { time: "20:30 (Hôm qua)", label: "Nhận đồ" },
      { time: "08:00", label: "Đã qua QC, treo lên giá chờ Ship" },
    ],
  },
];

export const CLUSTER_STATS = {
  ordersToday: 32,
  ordersPending: 8,
  activeSubscribers: 89,
  totalCustomers: 127,
  revenue: 12450000,
  qcPassRate: 97.3,
};

export const formatVND = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
