export const SYSTEM_LOG_TIP = {
  bilgi: "bilgi",
  uyari: "uyari",
  kritik: "kritik",
  sistem: "sistem",
};

export const SYSTEM_LOG_FILTERS = [
  { id: "tumu", label: "All" },
  { id: SYSTEM_LOG_TIP.uyari, label: "Warning" },
  { id: SYSTEM_LOG_TIP.kritik, label: "Critical" },
  { id: SYSTEM_LOG_TIP.sistem, label: "System" },
  { id: SYSTEM_LOG_TIP.bilgi, label: "Info" },
];
