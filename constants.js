// This file makes the backend self-contained by providing initial data.
// It prevents the server from trying to import files from the frontend.

export const INITIAL_UPGRADES = [
    { id: 'doc1', name: { en: 'Student ID', ua: 'Студентський квиток' }, price: 100, profitPerHour: 10, category: 'Documents', icon: '🎓' },
    { id: 'doc2', name: { en: 'Disability Certificate', ua: 'Довідка про інвалідність' }, price: 1500, profitPerHour: 80, category: 'Documents', icon: '♿' },
    { id: 'doc3', name: { en: 'White Ticket', ua: 'Білий квиток' }, price: 10000, profitPerHour: 500, category: 'Documents', icon: '📄' },
    { id: 'leg1', name: { en: 'Lawyer Consultation', ua: 'Консультація адвоката' }, price: 500, profitPerHour: 25, category: 'Legal', icon: '⚖️' },
    { id: 'leg2', name: { en: 'Open a Fake Company', ua: 'Відкрити фіктивну фірму' }, price: 5000, profitPerHour: 200, category: 'Legal', icon: '🏢' },
    { id: 'life1', name: { en: 'Hide in the Village', ua: 'Сховатись в селі' }, price: 2000, profitPerHour: 100, category: 'Lifestyle', icon: '🛖' },
    { id: 'life2', name: { en: 'Rent a Bunker', ua: 'Орендувати бункер' }, price: 25000, profitPerHour: 1100, category: 'Lifestyle', icon: '🔒' },
    { id: 'spec1', name: { en: 'Border Crossing', ua: 'Перетин кордону' }, price: 100000, profitPerHour: 4000, category: 'Special', icon: '🗺️' },
    { id: 'spec2', name: { en: 'New Identity', ua: 'Нова особистість' }, price: 500000, profitPerHour: 20000, category: 'Special', icon: '🎭' },
];

export const INITIAL_TASKS = [
    { id: 'task1', name: { en: 'Tap 500 times', ua: 'Натисни 500 разів' }, rewardCoins: 1000, rewardStars: 5, requiredTaps: 500 },
    { id: 'task2', name: { en: 'Daily Check-in', ua: 'Щоденний візит' }, rewardCoins: 500, rewardStars: 10, requiredTaps: 1 },
];

export const INITIAL_SPECIAL_TASKS = [
    { id: 'special1', name: { en: 'Join Our Channel', ua: 'Приєднайся до каналу' }, description: { en: 'Get a huge bonus for joining our news channel!', ua: 'Отримай великий бонус за підписку на наш канал новин!' }, type: 'telegram_join', url: 'https://t.me/durov', rewardCoins: 100000, rewardStars: 25, priceStars: 5, isOneTime: true },
    { id: 'special2', name: { en: 'Watch Review', ua: 'Подивись огляд' }, description: { en: 'Watch a video review and get rewarded.', ua: 'Подивись відео-огляд та отримай нагороду.'}, type: 'video_watch', url: 'https://youtube.com', rewardCoins: 50000, rewardStars: 15, priceStars: 0, isOneTime: true },
];

export const INITIAL_BOOSTS = [
    { id: 'boost1', name: { en: 'Full Energy', ua: 'Повна енергія' }, description: { en: 'Instantly refill your energy.', ua: 'Миттєво відновити енергію.' }, icon: '⚡', cost: 10 },
    { id: 'boost2', name: { en: 'Turbo Taps (30s)', ua: 'Турбо-тапи (30с)' }, description: { en: 'Multiply coins per tap for 30 seconds.', ua: 'Помножити монети за тап на 30 секунд.' }, icon: '🔥', cost: 20 },
];

export const REFERRAL_BONUS = 5000;
