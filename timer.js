// Таймер обратного отсчета до 31 мая 2026 года
class CountdownTimer {
    constructor(targetDate, elements) {
        this.targetDate = new Date(targetDate).getTime();
        this.elements = elements;
        this.interval = null;
        
        this.init();
    }
    
    init() {
        this.updateTimer();
        this.interval = setInterval(() => this.updateTimer(), 1000);
    }
    
    updateTimer() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            this.handleTimerEnd();
            return;
        }
        
        // Расчет временных единиц
        const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44));
        const weeks = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        this.updateDisplay(months, weeks, days, hours, minutes, seconds);
    }
    
    updateDisplay(months, weeks, days, hours, minutes, seconds) {
        if (this.elements.months) {
            this.elements.months.textContent = this.formatTime(months);
        }
        if (this.elements.weeks) {
            this.elements.weeks.textContent = this.formatTime(weeks);
        }
        if (this.elements.days) {
            this.elements.days.textContent = this.formatTime(days);
        }
        if (this.elements.hours) {
            this.elements.hours.textContent = this.formatTime(hours);
        }
        if (this.elements.minutes) {
            this.elements.minutes.textContent = this.formatTime(minutes);
        }
        if (this.elements.seconds) {
            this.elements.seconds.textContent = this.formatTime(seconds);
        }
        
        // Обновляем заголовки для склонений
        this.updateLabels(months, weeks, days, hours, minutes);
    }
    
    updateLabels(months, weeks, days, hours, minutes) {
        // Обновляем подписи с правильными склонениями
        const monthLabel = this.getMonthLabel(months);
        const weekLabel = this.getWeekLabel(weeks);
        const dayLabel = this.getDayLabel(days);
        const hourLabel = this.getHourLabel(hours);
        const minuteLabel = this.getMinuteLabel(minutes);
        
        if (this.elements.monthLabel) {
            this.elements.monthLabel.textContent = monthLabel;
        }
        if (this.elements.weekLabel) {
            this.elements.weekLabel.textContent = weekLabel;
        }
        if (this.elements.dayLabel) {
            this.elements.dayLabel.textContent = dayLabel;
        }
        if (this.elements.hourLabel) {
            this.elements.hourLabel.textContent = hourLabel;
        }
        if (this.elements.minuteLabel) {
            this.elements.minuteLabel.textContent = minuteLabel;
        }
    }
    
    getMonthLabel(months) {
        if (months % 10 === 1 && months % 100 !== 11) return 'месяц';
        if ([2, 3, 4].includes(months % 10) && ![12, 13, 14].includes(months % 100)) return 'месяца';
        return 'месяцев';
    }
    
    getWeekLabel(weeks) {
        if (weeks % 10 === 1 && weeks % 100 !== 11) return 'неделя';
        if ([2, 3, 4].includes(weeks % 10) && ![12, 13, 14].includes(weeks % 100)) return 'недели';
        return 'недель';
    }
    
    getDayLabel(days) {
        if (days % 10 === 1 && days % 100 !== 11) return 'день';
        if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return 'дня';
        return 'дней';
    }
    
    getHourLabel(hours) {
        if (hours % 10 === 1 && hours % 100 !== 11) return 'час';
        if ([2, 3, 4].includes(hours % 10) && ![12, 13, 14].includes(hours % 100)) return 'часа';
        return 'часов';
    }
    
    getMinuteLabel(minutes) {
        if (minutes % 10 === 1 && minutes % 100 !== 11) return 'минута';
        if ([2, 3, 4].includes(minutes % 10) && ![12, 13, 14].includes(minutes % 100)) return 'минуты';
        return 'минут';
    }
    
    formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    handleTimerEnd() {
        clearInterval(this.interval);
        
        // Обновляем текст когда таймер закончился
        if (this.elements.months) this.elements.months.textContent = '00';
        if (this.elements.weeks) this.elements.weeks.textContent = '00';
        if (this.elements.days) this.elements.days.textContent = '00';
        if (this.elements.hours) this.elements.hours.textContent = '00';
        if (this.elements.minutes) this.elements.minutes.textContent = '00';
        if (this.elements.seconds) this.elements.seconds.textContent = '00';
        
        // Обновляем заголовки
        if (this.elements.monthLabel) this.elements.monthLabel.textContent = 'месяцев';
        if (this.elements.weekLabel) this.elements.weekLabel.textContent = 'недель';
        if (this.elements.dayLabel) this.elements.dayLabel.textContent = 'дней';
        if (this.elements.hourLabel) this.elements.hourLabel.textContent = 'часов';
        if (this.elements.minuteLabel) this.elements.minuteLabel.textContent = 'минут';
        
        console.log('Таймер завершен! Марафон начался!');
    }
    
    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Инициализация таймера когда DOM загружен
document.addEventListener('DOMContentLoaded', function() {
    // Дата до 31 мая 2026 года
    const targetDate = '2026-05-31T00:00:00';
    
    const timerElements = {
        months: document.getElementById('months'),
        weeks: document.getElementById('weeks'),
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        monthLabel: document.getElementById('month-label'),
        weekLabel: document.getElementById('week-label'),
        dayLabel: document.getElementById('day-label'),
        hourLabel: document.getElementById('hour-label'),
        minuteLabel: document.getElementById('minute-label')
    };
    
    // Проверяем, что основные элементы существуют
    if (timerElements.months && timerElements.weeks && timerElements.days && 
        timerElements.hours && timerElements.minutes) {
        const marathonTimer = new CountdownTimer(targetDate, timerElements);
        
        // Делаем таймер глобально доступным если нужно
        window.marathonTimer = marathonTimer;
    } else {
        console.error('Не все элементы таймера найдены на странице');
    }
});

// Дополнительные функции для работы с таймером
window.TimerUtils = {
    // Функция для установки кастомной даты
    setCustomDate: function(dateString, elements) {
        if (window.marathonTimer) {
            window.marathonTimer.destroy();
        }
        
        const timerElements = elements || {
            months: document.getElementById('months'),
            weeks: document.getElementById('weeks'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        window.marathonTimer = new CountdownTimer(dateString, timerElements);
    },
    
    // Функция для получения оставшегося времени
    getRemainingTime: function() {
        if (!window.marathonTimer) return null;
        
        const now = new Date().getTime();
        const distance = window.marathonTimer.targetDate - now;
        
        if (distance < 0) return { 
            months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 
        };
        
        return {
            months: Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44)),
            weeks: Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7)),
            days: Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
            totalMs: distance
        };
    },
    
    // Функция для получения точной даты окончания
    getTargetDate: function() {
        if (!window.marathonTimer) return null;
        return new Date(window.marathonTimer.targetDate);
    }
};