'use client';

import { useEffect, useRef } from 'react';

export default function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: 'BINANCE:BTCUSDT',
        interval: 'D',
        timezone: 'Asia/Seoul',
        theme: 'dark',
        style: '1',
        locale: 'ko',
        enable_publishing: false,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        gridColor: 'rgba(42, 46, 57, 0.06)',
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        calendar: false,
        support_host: 'https://www.tradingview.com'
      });
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" style={{ height: '100%', width: '100%' }}>
      <div ref={containerRef} className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }} />
    </div>
  );
}
