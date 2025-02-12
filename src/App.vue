<template>
  <div :class="['container', { 'dark-mode': isDarkMode }]">
    <div class="content-wrapper">
      <!-- Header -->
       <h1 class="h1hello" style="text-align: center;">hello neshat :)</h1>
      <div class="header">
      
        <h1 :class="['title', { 'dark-text': isDarkMode }]">قیمت‌های لحظه‌ای</h1>
        
        <!-- Dark Mode Toggle -->
        <label class="switch">
          <input type="checkbox" v-model="isDarkMode">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Price Cards -->
      <div class="cards-container">
        <!-- Dollar Card -->
        <div :class="['price-card', { 'dark-card': isDarkMode }]">
          <div class="card-content">
            <div :class="['icon-container', { 'dark-icon-bg': isDarkMode }]">
              <svg class="currency-icon">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="currency-info">
              <p :class="['currency-label', { 'dark-text': isDarkMode }]">قیمت دلار</p>
              <p :class="['currency-value', { 'dark-text': isDarkMode }]">
                {{ (dollarPrice).toLocaleString() }} تومان
              </p>
            </div>
          </div>
        </div>

        <!-- Sekeh Card -->
        <div :class="['price-card', 'sekeh-card', { 'dark-sekeh-card': isDarkMode }]">
          <div class="card-content">
            <div :class="['icon-container', 'sekeh-icon', { 'dark-sekeh-icon-bg': isDarkMode }]">
              <svg class="currency-icon">
                <path d="M9 7l4 4m-4-4l4-4m4 4l4 4m-4 4l4-4m-4 4l-4-4m4 4l-4 4m-4-4l-4 4m4-4l-4-4m12 4a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="currency-info">
              <p :class="['currency-label', { 'dark-text': isDarkMode }]">قیمت سکه</p>
              <p :class="['currency-value', { 'dark-text': isDarkMode }]">
                {{ (sekeePrice).toLocaleString() }} تومان
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
      dollarPrice: 0,
      sekeePrice: 0,
      updateInterval: null
    }
  },
  mounted() {
    this.fetchPrices();
    this.updateInterval = setInterval(this.fetchPrices, 5000);
  },
  beforeUnmount() {
    clearInterval(this.updateInterval);
  },
  methods: {
    async fetchPrices() {
      try {
        const response = await fetch('https://one-api.ir/price/?token=152327:676ff9dfbd71c&action=tgju');
        const data = await response.json();

this.dollarPrice = (parseFloat(data.result.currencies.dollar.p.replace(/,/g, '')) / 10).toLocaleString('en-US');
this.sekeePrice = (parseFloat(data.result.coin.sekee.p.replace(/,/g, '')) / 10).toLocaleString('en-US');




      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    }
  }
}
</script>

<style>
/* Base Styles */
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}


@keyframes rotating-shadow {
  0% {
    box-shadow: 0px -15px 40px 10px rgba(25, 37, 38, 0.8);
  }
  25% {
    box-shadow: 15px 0px 40px 10px rgba(25, 38, 39, 0.8);
  }
  50% {
    box-shadow: 0px 15px 40px 10px rgba(24, 39, 40, 0.8);
  }
  75% {
    box-shadow: -15px 0px 40px 10px rgba(25, 47, 47, 0.8);
  }
  100% {
    box-shadow: 0px -15px 40px 10px rgba(24, 39, 39, 0.8);
  }
}

.container {
  min-height: 8%;
  padding: 1rem;
  transition: background-color 0.3s;
  border-radius: 15px;
  border: #1c5343 1px solid;
  animation: rotating-shadow 4s infinite linear;
  


    position: fixed;

    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
 



}







.content-wrapper {
  max-width: 28rem;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #7a7a7a;
  margin: 0;
}

/* Price Cards */
.cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price-card {
  background: #C4DAD2;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 100px;
  flex: 1;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-container {
  background: #16423C;
  padding: 0.75rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.currency-icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: none;
  stroke: white;
}

.currency-info {
  flex: 1;
  min-width: 0;
}

.currency-label {
  font-size: 0.875rem;
  color: #16423C;
  margin: 0 0 0.25rem;
}

.currency-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #16423C;
  margin: 0;
  word-break: break-word;
}

/* Sekeh Card Specific */
.sekeh-card {
  background: #6A9C89;
}

.sekeh-icon {
  background: #16423C;
}

/* Dark Mode Styles */
.dark-mode {
  background-color: #16423C;
  border: #ffffff 1px solid;
}

.dark-text {
  color: #E9EFEC !important;
}

.dark-card {
  background: #2d4a54 !important;
}

.dark-icon-bg {
  background: #6A9C89 !important;
}

.dark-sekeh-card {
  background: #2d4a54 !important;
}

.dark-sekeh-icon-bg {
  background: #919e99 !important;
}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #16423C;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: #6A9C89;
}

input:checked + .slider:before {
  transform: translateX(20px);
}




@keyframes text-fade {
  0%, 100% {
    opacity: 0.6;  /* حداقل شفافیت بیشتر شد */
  }
  50% {
    opacity: 1;  /* روشن‌ترین حالت */
  }
}

@keyframes gradient-text {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.h1hello {
  font-size: 3rem; /* کمی بزرگ‌تر برای تأثیر بهتر */
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  background-image: linear-gradient(90deg, #16423C, #ffffff, #5E7D7D); /* رنگ‌های کمی روشن‌تر */
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-fade 1.5s infinite ease-in-out, gradient-text 3s infinite linear;
}
















/* Responsive Design */
@media (max-width: 1024px) {
  body {
    padding: 10px;
    display: block; /* تغییر از flex به block برای اسکرول بهتر */
  }

  .container {
    position: relative; /* حذف fixed positioning */
    transform: none;
    min-height: auto;
    width: 100%;
    margin: 0;
    padding: 0.5rem;
    animation: none; /* غیرفعال کردن انیمیشن برای عملکرد بهتر موبایل */
  }

  .content-wrapper {
    padding: 0 0.5rem;
    max-width: 100%;
  }

  .h1hello {
    font-size: 2rem !important; /* کاهش سایز فونت */
    line-height: 1.2;
    margin: 0.5rem 0;
  }

  .header {
    flex-direction: column-reverse; /* تغییر چیدمان به عمودی */
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .title {
    font-size: 1rem;
  }

  .price-card {
    padding: 1rem;
    min-height: auto;
  }

  .currency-value {
    font-size: 1rem;
  }

  .currency-icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  .icon-container {
    padding: 0.5rem;
  }

  .card-content {
    gap: 0.75rem;
  }

  /* تنظیمات خاص برای نمایش متن‌های طولانی */
  .currency-value {
    word-break: break-all;
    font-size: 0.9rem;
  }

  /* تنظیمات سوئیچ تاریک */
  .switch {
    transform: scale(0.8);
  }
}
</style>
