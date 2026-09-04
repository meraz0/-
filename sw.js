// === SERVICE WORKER AZAN BACKGROUND ALARM HANDLER ===
let scheduledPrayerAlarms = {};
let azanAlarmConfig = null;

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SCHEDULE_AZAN_ALARMS') {
        scheduledPrayerAlarms = event.data.prayerTimes;
        azanAlarmConfig = event.data.config;
    }
});

// ব্যাকগ্রাউন্ড নোটিফিকেশনে ক্লিক করলে অ্যাপ ওপেন করা
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (let client of clientList) {
                if (client.url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('./index.html');
            }
        })
    );
});