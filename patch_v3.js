const fs = require('fs');

let path = 'src/app/page.tsx';
let content = fs.readFileSync(path, 'utf-8');

const dictCode = `
const i18n = {
  ar: {
    heroTitle: "KAC8 ID",
    heroDesc: "اصنع هويتك الرقمية الفاخرة",
    tabId: "الهوية الرقمية",
    tabPrank: "الشهادات والمقالب",
    profileSetup: "إعداد الملف الشخصي",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "مثال: خالد...",
    username: "اسم المستخدم (للرابط)",
    usernamePlaceholder: "مثال: khaled99",
    bio: "النبذة (Bio)",
    bioPlaceholder: "اكتب نبذة قصيرة عنك...",
    profilePic: "رابط الصورة الشخصية",
    profilePicPlaceholder: "https://...",
    socialX: "رابط منصة X",
    socialInsta: "رابط انستقرام",
    socialGithub: "رابط قيت هب",
    generateId: "اعتماد الهوية",
    prankSetup: "إصدار شهادة / مقلب",
    targetName: "اسم الضحية / البطل",
    targetPlaceholder: "الاسم...",
    fakeTitle: "اللقب الوهمي / التهمة",
    selectTemplate: "اختر القالب",
    generatePrank: "إصدار",
    successMsg: "تم الاعتماد!",
    shareX: "شارك على X",
    shareWa: "شارك واتساب",
    savePdf: "تحميل PDF",
    savePng: "تحميل صورة",
    saveSnap: "تحميل لسناب شات",
    newId: "إصدار جديد",
    hallOfFame: "قاعة المشاهير العالمية",
    views: "زيارة"
  },
  en: {
    heroTitle: "KAC8 ID",
    heroDesc: "The Elite Digital Persona Builder",
    tabId: "Digital ID",
    tabPrank: "Certs & Pranks",
    profileSetup: "Profile Setup",
    fullName: "Full Name",
    fullNamePlaceholder: "e.g., Khaled...",
    username: "Username (for URL)",
    usernamePlaceholder: "e.g., khaled99",
    bio: "Bio",
    bioPlaceholder: "Short bio about yourself...",
    profilePic: "Profile Picture URL",
    profilePicPlaceholder: "https://...",
    socialX: "X (Twitter) Link",
    socialInsta: "Instagram Link",
    socialGithub: "GitHub Link",
    generateId: "Generate ID",
    prankSetup: "Certificate / Prank Setup",
    targetName: "Target Name",
    targetPlaceholder: "Name...",
    fakeTitle: "Fictional Title / Crime",
    selectTemplate: "Select Template",
    generatePrank: "Execute",
    successMsg: "CERTIFIED!",
    shareX: "Share on X",
    shareWa: "WhatsApp",
    savePdf: "Save PDF",
    savePng: "Save PNG",
    saveSnap: "Snapchat Format",
    newId: "Generate another one",
    hallOfFame: "Global Hall of Fame",
    views: "views"
  }
};
`;

content = content.replace(
  "const FUNNY_TITLES_AR = ['كبير المديرين التنفيذيين للتهرب', 'وزير شؤون النوم', 'عميد السحبات', 'مستشار كبسة معتمد', 'سفير النوايا السيئة'];",
  dictCode + "\nconst FUNNY_TITLES_AR = ['كبير المديرين التنفيذيين للتهرب', 'وزير شؤون النوم', 'عميد السحبات', 'مستشار كبسة معتمد', 'سفير النوايا السيئة'];"
);

// We also need state for social links (multiple) and profile picture
content = content.replace(
  "  const [socialLink, setSocialLink] = useState('');",
  `  const [socialX, setSocialX] = useState('');
  const [socialInsta, setSocialInsta] = useState('');
  const [socialGithub, setSocialGithub] = useState('');
  const [profilePic, setProfilePic] = useState('');`
);

fs.writeFileSync(path, content);
console.log('patched states');
