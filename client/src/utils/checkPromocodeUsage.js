import FingerprintJS from '@fingerprintjs/fingerprintjs';

const getDeviceId = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
};

export const checkPromoUsage = async (setPromoUsed, setPromoModalOpen) => {
    try {
        const deviceId = await getDeviceId();
        const response = await fetch("http://localhost:5000/api/promocode/check-promocode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ deviceId, promoCodeTitle: "shop10" }),
        });

        const data = await response.json();
        if (data.isUsed) {
            setPromoUsed(true);
        } else {
            setPromoModalOpen(true);
        }
    } catch (error) {
        console.error("Ошибка при проверке промокода:", error);
    }
};

export const checkPromo = (setPromoUsed, setPromoModalOpen) => {
    const promoTimeoutDuration = 180000; // 60 секунд
    const savedStartTime = localStorage.getItem("promoStartTime");

    // Проверяем, был ли таймер запущен
    if (!savedStartTime) {
        // Если таймер ещё не запущен, сохраняем текущее время в localStorage
        const startTime = Date.now();
        localStorage.setItem("promoStartTime", startTime);

        // Запускаем проверку промокода
        const timeout = setTimeout(() => {
            checkPromoUsage(setPromoUsed, setPromoModalOpen);
            localStorage.removeItem("promoStartTime"); // Удаляем запись после срабатывания таймера
        }, promoTimeoutDuration);

        return () => clearTimeout(timeout); // Очищаем таймер при размонтировании
    } else {
        // Если таймер уже запущен, рассчитываем оставшееся время
        const elapsed = Date.now() - parseInt(savedStartTime, 10);
        const remainingTime = promoTimeoutDuration - elapsed;

        if (remainingTime > 0) {
            // Если время ещё не истекло, запускаем таймер с оставшимся временем
            const timeout = setTimeout(() => {
                checkPromoUsage(setPromoUsed, setPromoModalOpen);
                localStorage.removeItem("promoStartTime"); // Удаляем запись после срабатывания таймера
            }, remainingTime);

            return () => clearTimeout(timeout); // Очищаем таймер при размонтировании
        } else {
            // Если время уже истекло, сразу запускаем проверку
            checkPromoUsage(setPromoUsed, setPromoModalOpen);
            localStorage.removeItem("promoStartTime");
        }
    }
}