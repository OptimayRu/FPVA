---
title: Глоссарий FPV
description: "Словарь терминов и аббревиатур мира FPV: от режимов полёта и типов дронов до прошивок, протоколов и аккумуляторов."
---

# Глоссарий FPV

В этом словаре собраны все ключевые термины, аббревиатуры и сленговые выражения мира FPV – от первых шагов до профессиональной настройки.

## Основные понятия и режимы полёта

<div id="fpv" class="term-card">
<h4>FPV (First Person View)</h4>
<p>Полёты от первого лица, когда пилот видит изображение с камеры дрона в реальном времени через видеоочки или монитор.</p>
</div>

<div id="acro-mode-rate-mode" class="term-card">
<h4>Acro mode (Rate mode)</h4>
<p>Ручной режим без стабилизации; дрон не возвращается в горизонт автоматически. Основа фристайла и гонок.</p>
</div>

<div id="angle-mode" class="term-card">
<h4>Angle mode</h4>
<p>Стабилизированный режим, в котором стики задают угол наклона, а при отпускании дрон выравнивается по горизонту. Подходит для первых полётов.</p>
</div>

<div id="horizon-mode" class="term-card">
<h4>Horizon mode</h4>
<p>Гибридный режим: при малых отклонениях стиков работает как Angle, при больших – позволяет делать бочки и петли.</p>
</div>

<div id="headless-mode" class="term-card">
<h4>Headless mode</h4>
<p>Режим «безголового» управления, где движение вперёд всегда соответствует направлению от пилота, независимо от ориентации дрона. Новичкам почти не нужен.</p>
</div>

<div id="loiter-mode-poshold" class="term-card">
<h4>Loiter mode (PosHold)</h4>
<p>Режим удержания позиции по GPS (INAV/ArduPilot), дрон зависает на месте без вмешательства пилота.</p>
</div>

<div id="return-to-home-rth" class="term-card">
<h4>Return to Home (RTH)</h4>
<p>Автоматический возврат дрона к точке взлёта по GPS. Обязательная функция для дальних полётов.</p>
</div>

<div id="failsafe" class="term-card">
<h4>Failsafe</h4>
<p>Режим аварийного поведения при потере сигнала управления: дрон может падать, садиться или выполнять RTH в зависимости от настроек.</p>
</div>

## Типы дронов и комплектаций

<div id="rtf-ready-to-fly" class="term-card">
<h4>RTF (Ready To Fly)</h4>
<p>Полностью готовый комплект: дрон, пульт, очки, аккумулятор, зарядка. Достал из коробки – лети.</p>
</div>

<div id="bnf-bind-and-fly" class="term-card">
<h4>BNF (Bind and Fly)</h4>
<p>Дрон без пульта и очков; требуется связать (забиндить) с собственной аппаратурой.</p>
</div>

<div id="pnp-plug-and-play" class="term-card">
<h4>PNP (Plug and Play)</h4>
<p>Дрон без приёмника, пульта и очков; нужно добавить свой приёмник и настроить.</p>
</div>

<div id="arf-almost-ready-to-fly" class="term-card">
<h4>ARF (Almost Ready to Fly)</h4>
<p>Почти готовый набор; как правило не хватает приёмника, аккумулятора или требуется мелкая сборка.</p>
</div>

<div id="tiny-whoop" class="term-card">
<h4>Tiny Whoop</h4>
<p>Класс микро-дронов с защитой пропеллеров для полётов в помещениях и обучения.</p>
</div>

<div id="cinewhoop" class="term-card">
<h4>Cinewhoop</h4>
<p>Коптер с защитой пропеллеров, оптимизированный для плавной кинематографичной съёмки рядом с людьми.</p>
</div>

<div id="long-range-lr" class="term-card">
<h4>Long Range (LR)</h4>
<p>Дроны для дальних полётов, с GPS, мощными передатчиками, Li-Ion аккумуляторами и эффективными моторами.</p>
</div>

<div id="wing-letayushchee-krylo" class="term-card">
<h4>Wing (летающее крыло)</h4>
<p>Самолёт схемы «крыло» для FPV-полётов, используется в дальних миссиях и для фана.</p>
</div>

<div id="hexacopter-octocopter" class="term-card">
<h4>Hexacopter / Octocopter</h4>
<p>Мультироторные платформы с шестью/восемью моторами, используются для тяжёлой съёмки и надёжности.</p>
</div>

## Компоненты дрона (аппаратная часть)

<div id="fc-flight-controller" class="term-card">
<h4>FC (Flight Controller)</h4>
<p>Полётный контроллер, «мозг» дрона с процессором, гироскопом и акселерометром.</p>
</div>

<div id="esc-electronic-speed-controller" class="term-card">
<h4>ESC (Electronic Speed Controller)</h4>
<p>Регулятор оборотов, управляет вращением мотора по командам от полётного контроллера.</p>
</div>

<div id="stack" class="term-card">
<h4>Stack</h4>
<p>Стопка из соединённых плат FC и ESC (обычно через шлейф или контакты).</p>
</div>

<div id="pdb-power-distribution-board" class="term-card">
<h4>PDB (Power Distribution Board)</h4>
<p>Плата распределения питания, сейчас часто интегрирована в ESC.</p>
</div>

<div id="bec-battery-eliminator-circuit" class="term-card">
<h4>BEC (Battery Eliminator Circuit)</h4>
<p>Преобразователь напряжения, подающий стабилизированное питание на FC, приёмник и другую электронику прямо от силовой батареи.</p>
</div>

<div id="vtx-video-transmitter" class="term-card">
<h4>VTX (Video Transmitter)</h4>
<p>Видеопередатчик, транслирует изображение с камеры на очки или монитор.</p>
</div>

<div id="vrx-video-receiver" class="term-card">
<h4>VRX (Video Receiver)</h4>
<p>Видеоприёмник в очках или шлеме, принимающий сигнал от VTX.</p>
</div>

<div id="osd-on-screen-display" class="term-card">
<h4>OSD (On-Screen Display)</h4>
<p>Наложение полётной информации (напряжение, таймер, сила сигнала) прямо на видеокартинку.</p>
</div>

<div id="dvr-digital-video-recorder" class="term-card">
<h4>DVR (Digital Video Recorder)</h4>
<p>Запись видео с приёмника, часто встроена в очки.</p>
</div>

<div id="kamera-fpv" class="term-card">
<h4>Камера FPV</h4>
<p>Камера, устанавливаемая на дрон. Бывает аналоговая (CCD, CMOS) и цифровая (DJI, Walksnail, HDZero).</p>
</div>

<div id="priyomnik-receiver-rx" class="term-card">
<h4>Приёмник (Receiver, Rx)</h4>
<p>Устройство, принимающее сигнал с пульта управления. Основные протоколы: ELRS, Crossfire, FrSky.</p>
</div>

<div id="antenna" class="term-card">
<h4>Антенна</h4>
<p>Излучающий элемент. Для FPV важны:
  <br><strong>CP (Circular Polarized)</strong> – антенна с круговой поляризацией (клевер, патч).
  <br><strong>LP (Linear Polarized)</strong> – линейная поляризация (штыревые антенны).</p>
</div>

<div id="rama" class="term-card">
<h4>Рама</h4>
<p>Каркас дрона, обычно из углепластика, с креплениями для моторов и электроники.</p>
</div>

<div id="motor" class="term-card">
<h4>Мотор</h4>
<p>Бесколлекторный двигатель. Характеризуется размером статора (например 2207), оборотами на вольт (KV) и типом магнитов.</p>
</div>

<div id="propeller-prop" class="term-card">
<h4>Пропеллер (проп)</h4>
<p>Воздушный винт. Основные параметры: диаметр, шаг, количество лопастей.</p>
</div>

## Протоколы управления и видеосвязи

<div id="elrs" class="term-card">
<h4>ELRS (ExpressLRS)</h4>
<p>Открытый протокол управления с рекордной дальностью и низкой задержкой, де-факто стандарт в FPV.</p>
</div>

<div id="crossfire-crsf" class="term-card">
<h4>Crossfire (CRSF)</h4>
<p>Протокол TBS, дальнобойный и надёжный, работает на 868/915 МГц.</p>
</div>

<div id="ghost" class="term-card">
<h4>Ghost</h4>
<p>Протокол от ImmersionRC, лёгкий и быстрый.</p>
</div>

<div id="frsky-accst-access" class="term-card">
<h4>FrSky (ACCST, ACCESS)</h4>
<p>Протоколы бренда FrSky, популярные в прошлом, сейчас реже.</p>
</div>

<div id="ppm-sbus-crsf-ghst" class="term-card">
<h4>PPM, SBUS, CRSF, GHST</h4>
<p>Способы передачи сигнала между приёмником и полётным контроллером. CRSF и GHST самые современные.</p>
</div>

<div id="smartaudio-irc-tramp" class="term-card">
<h4>SmartAudio / IRC Tramp</h4>
<p>Протоколы управления настройками VTX через FC (менять мощность, канал).</p>
</div>

<div id="msp-multiwii-serial-protocol" class="term-card">
<h4>MSP (Multiwii Serial Protocol)</h4>
<p>Протокол общения между Betaflight и внешними устройствами (например, очками DJI).</p>
</div>

<div id="dji-digital-fpv" class="term-card">
<h4>DJI Digital FPV</h4>
<p>Цифровая система от DJI с HD-изображением (O3, O4, Air Unit).</p>
</div>

<div id="walksnail-avatar" class="term-card">
<h4>Walksnail / Avatar</h4>
<p>Цифровая HD-система от Caddx/Walksnail.</p>
</div>

<div id="hdzero" class="term-card">
<h4>HDZero</h4>
<p>Цифровая система с минимальной задержкой, разработанная Divimath.</p>
</div>

<div id="openipc" class="term-card">
<h4>OpenIPC</h4>
<p>Открытая платформа для цифрового FPV на базе камер наблюдения, активно развивается в DIY-сегменте.</p>
</div>

<div id="analog-fpv" class="term-card">
<h4>Analog FPV</h4>
<p>Аналоговая видеосвязь с низким разрешением, но минимальной задержкой и дешевизной.</p>
</div>

## Прошивки и программное обеспечение

<div id="betaflight" class="term-card">
<h4>Betaflight</h4>
<p>Самая популярная прошивка для полётных контроллеров мультироторов, с огромным набором настроек.</p>
</div>

<div id="inav" class="term-card">
<h4>INAV</h4>
<p>Прошивка, ориентированная на GPS-функции, возврат домой, позиционирование, миссии; подходит для самолётов и лонг-рейнджа.</p>
</div>

<div id="ardupilot" class="term-card">
<h4>ArduPilot</h4>
<p>Мощная open-source платформа для автономных полётов, сложной телеметрии и профессиональных задач.</p>
</div>

<div id="emuflight" class="term-card">
<h4>EmuFlight</h4>
<p>Форк Betaflight с улучшенным алгоритмом PID и фильтрацией, популярен в гонках.</p>
</div>

<div id="kiss" class="term-card">
<h4>KISS</h4>
<p>Закрытая экосистема (FC + ESC) с собственной прошивкой и GUI, известна «чистым» управлением и применяется в гонках.</p>
</div>

<div id="flightone-falcox" class="term-card">
<h4>FlightOne FalcoX</h4>
<p>Бывшая коммерческая прошивка для гоночных контроллеров FlightOne, сейчас проект заморожен, но ещё встречается.</p>
</div>

<div id="blheli-s-blheli-32" class="term-card">
<h4>BLHeli_S / BLHeli_32</h4>
<p>Прошивки для ESC с поддержкой протокола DShot и настройками тормоза.</p>
</div>

<div id="bluejay" class="term-card">
<h4>Bluejay</h4>
<p>Открытая прошивка для BLHeli_S ESC, добавляющая телеметрию RPM и музыкальный старт.</p>
</div>

<div id="am32" class="term-card">
<h4>AM32</h4>
<p>Ещё одна открытая альтернатива BLHeli_32, набирающая популярность.</p>
</div>

<div id="dshot-150-300-600-1200" class="term-card">
<h4>DShot (150/300/600/1200)</h4>
<p>Цифровой протокол передачи команд от FC к ESC, заменил аналоговые Oneshot/Multishot.</p>
</div>

<div id="rpm-filter" class="term-card">
<h4>RPM Filter</h4>
<p>Система фильтрации на основе реальных оборотов двигателей, доступна с ESC на Bluejay или BLHeli_32.</p>
</div>

<div id="cli-command-line-interface" class="term-card">
<h4>CLI (Command Line Interface)</h4>
<p>Интерфейс командной строки в Betaflight для тонкой настройки.</p>
</div>

## Настройка и пилотирование

<div id="pid-proportional-integral-derivative" class="term-card">
<h4>PID (Proportional-Integral-Derivative)</h4>
<p>Основные коэффициенты регулятора, отвечающие за стабильность и остроту управления.</p>
</div>

<div id="rates" class="term-card">
<h4>Rates</h4>
<p>Чувствительность и максимальная скорость вращения дрона по осям.</p>
</div>

<div id="expo" class="term-card">
<h4>Expo</h4>
<p>Экспонента, делающая управление мягче в центре стика без изменения максимального отклонения.</p>
</div>

<div id="throttle-limit" class="term-card">
<h4>Throttle limit</h4>
<p>Программное ограничение максимального газа, полезно на старте.</p>
</div>

<div id="throttle-mid-i-expo" class="term-card">
<h4>Throttle mid и expo</h4>
<p>Настройка отклика газа.</p>
</div>

<div id="turtle-mode-flip-over-after-crash" class="term-card">
<h4>Turtle mode (Flip Over After Crash)</h4>
<p>Режим переворота дрона после падения: моторы позволяют перевернуть коптер обратно.</p>
</div>

<div id="arm-zaarmit" class="term-card">
<h4>Arm (заармить)</h4>
<p>Перевести дрон в боевой режим, в котором моторы начинают вращаться и готовы к взлёту.</p>
</div>

<div id="gyro-accelerometer" class="term-card">
<h4>Gyro, Accelerometer</h4>
<p>Датчики, отслеживающие вращение и ускорение. Гироскоп – основной, акселерометр нужен для Angle/Horizon режимов.</p>
</div>

<div id="blackbox" class="term-card">
<h4>Blackbox</h4>
<p>Запись логов полёта для последующего анализа вибраций и настройки фильтров.</p>
</div>

<div id="snr-signal-to-noise-ratio" class="term-card">
<h4>SNR (Signal-to-Noise Ratio)</h4>
<p>Соотношение сигнал/шум в радиоканале, показывает качество связи.</p>
</div>

## Соревнования и сообщество

<div id="multigp" class="term-card">
<h4>MultiGP</h4>
<p>Крупнейшая международная лига FPV-гонок с едиными правилами.</p>
</div>

<div id="drl-drone-racing-league" class="term-card">
<h4>DRL (Drone Racing League)</h4>
<p>Лига профессиональных гонок в закрытых помещениях с унифицированными дронами.</p>
</div>

<div id="dcl-drone-champions-league" class="term-card">
<h4>DCL (Drone Champions League)</h4>
<p>Командные гонки на открытых трассах.</p>
</div>

<div id="splesh-split-s" class="term-card">
<h4>Сплэш (Split-S)</h4>
<p>Фигура, при которой дрон делает полупетлю с переворотом и выходом в горизонтальный полёт.</p>
</div>

<div id="power-loop" class="term-card">
<h4>Power loop</h4>
<p>Полная петля в вертикальной плоскости с продолжением полёта в том же направлении.</p>
</div>

<div id="matty-flip" class="term-card">
<h4>Matty flip</h4>
<p>Трюк, обратный пролёту над объектом: кувырок назад с переворотом, смотря на объект.</p>
</div>

<div id="rubiks-cube-kubik-rubika" class="term-card">
<h4>Rubik’s Cube (Кубик Рубика)</h4>
<p>Комбинация вращений вокруг объекта.</p>
</div>

<div id="gap" class="term-card">
<h4>Gap</h4>
<p>Пролёт в узкое препятствие (ворота, ветки и т.д.).</p>
</div>

<div id="track" class="term-card">
<h4>Track</h4>
<p>Гоночная трасса с воротами и флагами.</p>
</div>

## Аккумуляторы и питание

<div id="lipo-lithium-polymer" class="term-card">
<h4>LiPo (Lithium Polymer)</h4>
<p>Литий-полимерный аккумулятор, основной тип батарей в FPV. Требует бережного обращения.</p>
</div>

<div id="li-ion" class="term-card">
<h4>Li-Ion</h4>
<p>Литий-ионный аккумулятор с высокой ёмкостью, но меньшей токоотдачей; идеален для лонг-рейнджа.</p>
</div>

<div id="hv-high-voltage-lipo" class="term-card">
<h4>HV (High Voltage LiPo)</h4>
<p>Батареи с повышенным напряжением (4.35 В/ячейка вместо 4.2 В).</p>
</div>

<div id="s-cells" class="term-card">
<h4>S (cells)</h4>
<p>Количество ячеек в аккумуляторе (1S ~ 3.7 В номинально). Гоночные обычно 4S или 6S.</p>
</div>

<div id="mah-milliamp-er-chas" class="term-card">
<h4>mAh (миллиампер-час)</h4>
<p>Ёмкость аккумулятора; больше mAh – дольше полёт, но больше вес.</p>
</div>

<div id="c-c-reyting" class="term-card">
<h4>C (C-рейтинг)</h4>
<p>Максимальный ток разряда: ёмкость × C = допустимый ток. Важно для безопасности и производительности.</p>
</div>

<div id="balansirnyy-raz-yom" class="term-card">
<h4>Балансирный разъём</h4>
<p>Штекер для зарядки каждой ячейки отдельно, предотвращает перезаряд.</p>
</div>

<div id="discharge-razryad" class="term-card">
<h4>Discharge (разряд)</h4>
<p>Процесс отдачи энергии, а также режим разряда до напряжения хранения.</p>
</div>

<div id="storage-voltage-napryazhenie-khraneniya" class="term-card">
<h4>Storage voltage (напряжение хранения)</h4>
<p>~3.80–3.85 В на ячейку; оптимальный уровень для длительного хранения LiPo.</p>
</div>

## Инструменты и аксессуары

<div id="payalnaya-stantsiya" class="term-card">
<h4>Паяльная станция</h4>
<p>Основной инструмент для сборки и ремонта.</p>
</div>

<div id="mul-timetr" class="term-card">
<h4>Мультиметр</h4>
<p>Прибор для прозвонки цепей, замера напряжения и поиска коротких замыканий.</p>
</div>

<div id="pintset-olovootsos-fitil" class="term-card">
<h4>Пинцет, оловоотсос, фитиль</h4>
<p>Расходники и вспомогательный инструмент.</p>
</div>

<div id="usb-uart-adapter" class="term-card">
<h4>USB-UART адаптер</h4>
<p>Программатор для перепрошивки приёмников.</p>
</div>

<div id="smoke-stopper-ogranichitel-toka" class="term-card">
<h4>Smoke stopper (ограничитель тока)</h4>
<p>Устройство, предотвращающее сгорание электроники при первом включении.</p>
</div>

<div id="lipuchka-remni" class="term-card">
<h4>Липучка, ремни</h4>
<p>Для крепления аккумулятора к раме.</p>
</div>

::: warning Внимание
Данный глоссарий будет пополняться по мере развития нашей базы знаний.
:::
