function updateClock() {
    const now = new Date();
    
    // 時區列表
    const timezones = [
        { id: 'newyork', offset: -5 },
        { id: 'london', offset: 0 },
        { id: 'tokyo', offset: 9 },
        { id: 'sydney', offset: 11 },
        { id: 'dubai', offset: 4 },
        { id: 'singapore', offset: 8 },
        { id: 'losangeles', offset: -8 },
        { id: 'hongkong', offset: 8 }
    ];
    
    // 更新每個時鐘
    timezones.forEach(tz => {
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const tzTime = new Date(utc + (3600000 * tz.offset));
        
        const hours = String(tzTime.getHours()).padStart(2, '0');
        const minutes = String(tzTime.getMinutes()).padStart(2, '0');
        const seconds = String(tzTime.getSeconds()).padStart(2, '0');
        
        const element = document.getElementById('clock-' + tz.id);
        if (element) {
            element.textContent = hours + ':' + minutes + ':' + seconds;
        }
    });
    
    // 更新本地時間
    const localHours = String(now.getHours()).padStart(2, '0');
    const localMinutes = String(now.getMinutes()).padStart(2, '0');
    const localSeconds = String(now.getSeconds()).padStart(2, '0');
    
    const localTimeElement = document.getElementById('local-time');
    if (localTimeElement) {
        localTimeElement.textContent = localHours + ':' + localMinutes + ':' + localSeconds;
    }
    
    // 更新日期
    const dateElement = document.getElementById('local-date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// 立即更新一次
updateClock();

// 每秒更新
setInterval(updateClock, 1000);

console.log('Clock started!');
