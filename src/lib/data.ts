export const revenueSeries = [
  { month: "Jan", revenue: 12400, users: 820 },
  { month: "Feb", revenue: 15800, users: 932 },
  { month: "Mar", revenue: 14200, users: 1010 },
  { month: "Apr", revenue: 18900, users: 1180 },
  { month: "May", revenue: 21300, users: 1290 },
  { month: "Jun", revenue: 19700, users: 1340 },
  { month: "Jul", revenue: 24800, users: 1510 },
  { month: "Aug", revenue: 27100, users: 1622 },
];

export const requestsSeries = [
  { day: "Mon", requests: 4200 },
  { day: "Tue", requests: 5100 },
  { day: "Wed", requests: 4800 },
  { day: "Thu", requests: 6200 },
  { day: "Fri", requests: 7100 },
  { day: "Sat", requests: 3900 },
  { day: "Sun", requests: 3400 },
];

export const users = [
  { id: "u1", name: "Amelia Hart", email: "amelia.hart@example.com", role: "Owner", status: "Active", lastActive: "2 hours ago", project: "alumni-api" },
  { id: "u2", name: "Ben Osei", email: "ben.osei@example.com", role: "Admin", status: "Active", lastActive: "5 hours ago", project: "dry-apps-mobile" },
  { id: "u3", name: "Chen Wei", email: "chen.wei@example.com", role: "Developer", status: "Invited", lastActive: "—", project: "dns-portal" },
  { id: "u4", name: "Dara Putri", email: "dara.putri@example.com", role: "Developer", status: "Active", lastActive: "1 day ago", project: "laundry-web" },
  { id: "u5", name: "Farid Hakim", email: "farid.hakim@example.com", role: "Viewer", status: "Suspended", lastActive: "12 days ago", project: "dns-services" },
  { id: "u6", name: "Grace Lim", email: "grace.lim@example.com", role: "Admin", status: "Active", lastActive: "30 min ago", project: "alumni-api" },
  { id: "u7", name: "Hendra Saputra", email: "hendra.s@example.com", role: "Developer", status: "Active", lastActive: "3 hours ago", project: "dry-apps-mobile" },
  { id: "u8", name: "Ines Marchetti", email: "ines.m@example.com", role: "Viewer", status: "Invited", lastActive: "—", project: "dns-portal" },
];

export const invoices = [
  { id: "INV-2026-0148", date: "Aug 24, 2026", plan: "Pro — Monthly", amount: "$25.00", status: "Paid" },
  { id: "INV-2026-0122", date: "Jul 24, 2026", plan: "Pro — Monthly", amount: "$25.00", status: "Paid" },
  { id: "INV-2026-0098", date: "Jun 24, 2026", plan: "Pro — Monthly", amount: "$25.00", status: "Paid" },
  { id: "INV-2026-0071", date: "May 24, 2026", plan: "Pro — Monthly", amount: "$25.00", status: "Paid" },
  { id: "INV-2026-0045", date: "Apr 24, 2026", plan: "Free → Pro upgrade", amount: "$12.50", status: "Refunded" },
  { id: "INV-2026-0019", date: "Mar 24, 2026", plan: "Free", amount: "$0.00", status: "Paid" },
];

export const files = [
  { name: "brand-guidelines.pdf", type: "PDF", size: "4.2 MB", modified: "Today, 10:24 AM", shared: true },
  { name: "onboarding-flow.fig", type: "Figma", size: "18.7 MB", modified: "Yesterday", shared: true },
  { name: "q3-report.xlsx", type: "Sheet", size: "1.1 MB", modified: "Aug 27, 2026", shared: false },
  { name: "database-schema.sql", type: "Code", size: "84 KB", modified: "Aug 25, 2026", shared: false },
  { name: "team-photo.png", type: "Image", size: "6.5 MB", modified: "Aug 21, 2026", shared: true },
  { name: "roadmap-notes.md", type: "Doc", size: "22 KB", modified: "Aug 18, 2026", shared: false },
  { name: "api-contract-v2.docx", type: "Doc", size: "310 KB", modified: "Aug 14, 2026", shared: true },
];

export const notifications = [
  { id: "n1", title: "New order received", desc: "Order #ORD-3391 from Dara Putri", time: "2 min ago", unread: true },
  { id: "n2", title: "Server CPU spike", desc: "alumni-api crossed 85% usage", time: "1 hour ago", unread: true },
  { id: "n3", title: "New message", desc: "Grace Lim sent you a message", time: "3 hours ago", unread: true },
  { id: "n4", title: "Payment received", desc: "Invoice INV-2026-0148 was paid", time: "Yesterday", unread: false },
  { id: "n5", title: "Backup completed", desc: "Daily database backup finished", time: "2 days ago", unread: false },
];

export const products = [
  { id: "p1", name: "Wireless Keyboard Pro", category: "Peripherals", price: "$79.00", stock: 142, sold: 320, status: "Active" },
  { id: "p2", name: "Mechanical Mouse X2", category: "Peripherals", price: "$49.00", stock: 8, sold: 210, status: "Low stock" },
  { id: "p3", name: "27\" 4K Monitor", category: "Displays", price: "$389.00", stock: 34, sold: 96, status: "Active" },
  { id: "p4", name: "USB-C Dock Station", category: "Accessories", price: "$129.00", stock: 0, sold: 155, status: "Out of stock" },
  { id: "p5", name: "Ergonomic Chair", category: "Furniture", price: "$449.00", stock: 21, sold: 58, status: "Active" },
  { id: "p6", name: "Noise Cancelling Headset", category: "Audio", price: "$159.00", stock: 63, sold: 274, status: "Active" },
];

export const orders = [
  { id: "ORD-3391", customer: "Dara Putri", date: "Aug 30, 2026", items: 3, total: "$267.00", status: "Processing" },
  { id: "ORD-3388", customer: "Ben Osei", date: "Aug 29, 2026", items: 1, total: "$79.00", status: "Shipped" },
  { id: "ORD-3379", customer: "Chen Wei", date: "Aug 28, 2026", items: 2, total: "$538.00", status: "Delivered" },
  { id: "ORD-3364", customer: "Amelia Hart", date: "Aug 27, 2026", items: 4, total: "$725.00", status: "Delivered" },
  { id: "ORD-3350", customer: "Farid Hakim", date: "Aug 25, 2026", items: 1, total: "$129.00", status: "Cancelled" },
  { id: "ORD-3341", customer: "Grace Lim", date: "Aug 24, 2026", items: 2, total: "$208.00", status: "Shipped" },
];

export const chatContacts = [
  { id: "c1", name: "Grace Lim", lastMessage: "Sounds good, I'll review the PR today.", time: "10:42 AM", unread: 2, online: true },
  { id: "c2", name: "Ben Osei", lastMessage: "Can we push the release to Friday?", time: "9:15 AM", unread: 0, online: true },
  { id: "c3", name: "Chen Wei", lastMessage: "Invited you to dns-portal", time: "Yesterday", unread: 0, online: false },
  { id: "c4", name: "Dara Putri", lastMessage: "Uploaded the new mockups to Drive", time: "Yesterday", unread: 1, online: false },
  { id: "c5", name: "Farid Hakim", lastMessage: "Thanks for the update!", time: "Mon", unread: 0, online: false },
  { id: "c6", name: "Hendra Saputra", lastMessage: "Let's sync tomorrow morning.", time: "Mon", unread: 0, online: true },
];

export const chatMessages: Record<string, { id: string; from: "me" | "them"; text: string; time: string }[]> = {
  c1: [
    { id: "m1", from: "them", text: "Hey! Did you get a chance to look at the auth flow PR?", time: "10:30 AM" },
    { id: "m2", from: "me", text: "Yep, looking at it now — the token refresh logic looks solid.", time: "10:35 AM" },
    { id: "m3", from: "them", text: "Great, let me know if anything needs changes.", time: "10:37 AM" },
    { id: "m4", from: "me", text: "Will do. Should be done reviewing in the next hour.", time: "10:40 AM" },
    { id: "m5", from: "them", text: "Sounds good, I'll review the PR today.", time: "10:42 AM" },
  ],
};

export const projectTasks = [
  {
    id: "t1",
    title: "Redesign onboarding flow",
    project: "dns-portal",
    assignee: "Dara Putri",
    priority: "High",
    status: "Todo",
    due: "Sep 3, 2026",
    progress: 0,
  },
  {
    id: "t2",
    title: "Set up CI pipeline for staging",
    project: "alumni-api",
    assignee: "Grace Lim",
    priority: "Medium",
    status: "Todo",
    due: "Sep 5, 2026",
    progress: 0,
  },
  {
    id: "t3",
    title: "Migrate auth service to v2",
    project: "alumni-api",
    assignee: "Ben Osei",
    priority: "High",
    status: "In Progress",
    due: "Sep 1, 2026",
    progress: 60,
  },
  {
    id: "t4",
    title: "Build ecommerce product grid",
    project: "dry-apps-mobile",
    assignee: "Hendra Saputra",
    priority: "Medium",
    status: "In Progress",
    due: "Sep 2, 2026",
    progress: 35,
  },
  {
    id: "t5",
    title: "Write API docs for webhooks",
    project: "laundry-web",
    assignee: "Chen Wei",
    priority: "Low",
    status: "In Review",
    due: "Aug 31, 2026",
    progress: 90,
  },
  {
    id: "t6",
    title: "QA pass on chat notifications",
    project: "dns-services",
    assignee: "Ines Marchetti",
    priority: "Medium",
    status: "In Review",
    due: "Aug 31, 2026",
    progress: 80,
  },
  {
    id: "t7",
    title: "Ship dark mode toggle",
    project: "simplebase",
    assignee: "Amelia Hart",
    priority: "High",
    status: "Done",
    due: "Aug 28, 2026",
    progress: 100,
  },
  {
    id: "t8",
    title: "Fix pagination bug on Users table",
    project: "simplebase",
    assignee: "Farid Hakim",
    priority: "Low",
    status: "Done",
    due: "Aug 27, 2026",
    progress: 100,
  },
];

export const events = [
  { id: "e1", title: "Sprint planning", time: "09:00 – 09:45", date: 3, color: "phosphor-green" },
  { id: "e2", title: "Design review — Drive UI", time: "11:00 – 12:00", date: 3, color: "silver-mist" },
  { id: "e3", title: "1:1 with Grace", time: "14:00 – 14:30", date: 6, color: "silver-mist" },
  { id: "e4", title: "Release: v2.4.0", time: "All day", date: 12, color: "phosphor-green" },
  { id: "e5", title: "Client call — Telkomsel", time: "10:00 – 10:30", date: 17, color: "silver-mist" },
  { id: "e6", title: "Security audit due", time: "All day", date: 21, color: "phosphor-green" },
  { id: "e7", title: "Team retro", time: "16:00 – 16:45", date: 27, color: "silver-mist" },
];
