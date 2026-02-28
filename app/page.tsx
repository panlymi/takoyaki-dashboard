'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Activity,
  CloudRain,
  Clock,
  Wallet,
  MapPin,
  CheckCircle2,
  Info,
  Sun,
  Cloud,
  Flame,
  BadgeAlert,
  BadgeDollarSign
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

export default function TakoyakiDashboard() {
  // --- 1. ADVANCED MATHEMATICAL MODEL: MARGIN PROTECTOR ---
  const [opsData] = useState({
    Cbatter: 18.00,
    Cfilling: 45.00,
    Ctoppings: 22.00,
    Ybatch: 250,
    Cpack: 0.60,
    n: 6,
    Pbox: 8.00
  });

  const calculateMargin = (data: typeof opsData) => {
    const VCbatch = data.Cbatter + data.Cfilling + data.Ctoppings;
    const Cball = VCbatch / data.Ybatch;
    const COGSbox = (Cball * data.n) + data.Cpack;
    const Margin = ((data.Pbox - COGSbox) / data.Pbox) * 100;

    return { VCbatch, Cball, COGSbox, marginPercentage: Margin };
  };

  const metrics = calculateMargin(opsData);
  const marginVal = metrics.marginPercentage;

  let statusColor, statusLabel, marginIcon, alertMessage, alertBg, alertBorder, alertText;

  if (marginVal >= 60) {
    statusColor = 'bg-emerald-500 text-emerald-500 shadow-[0_0_12px_#10b981]';
    statusLabel = 'Sihat (Sangat Untung)';
    marginIcon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />;
    alertMessage = 'Tahniah! Margin melepasi 60%. Anda mengaut keuntungan maksima tanpa menjejaskan kualiti.';
    alertBg = 'bg-emerald-50';
    alertBorder = 'border-emerald-200';
    alertText = 'text-emerald-800';
  } else if (marginVal >= 40 && marginVal < 60) {
    statusColor = 'bg-amber-500 text-amber-500 shadow-[0_0_12px_#f59e0b]';
    statusLabel = 'Amaran (Sederhana)';
    marginIcon = <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />;
    alertMessage = 'Amaran: Harga barang basah sedang meningkat. Margin untung anda mula mengecil. Pantau rapi.';
    alertBg = 'bg-amber-50';
    alertBorder = 'border-amber-200';
    alertText = 'text-amber-800';
  } else {
    statusColor = 'bg-red-500 text-red-500 animate-pulse shadow-[0_0_15px_#ef4444]';
    statusLabel = 'Kritikal (Rugi)';
    marginIcon = <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5 animate-pulse" />;
    alertMessage = 'Kritikal: Margin di bawah 40%! Anda berniaga tanpa untung lepas tolak sewa. Sila naikkan harga set atau cari pembekal sotong/udang yang lebih murah segera.';
    alertBg = 'bg-red-50';
    alertBorder = 'border-red-300';
    alertText = 'text-red-900';
  }


  // --- 2. ADVANCED MATHEMATICAL MODEL: PREP FORECASTER ---
  const [prepConfig] = useState({
    Dbase: 200,      // Baseline demand on a standard day (e.g. 200 takoyaki balls)
    condition: "Hujan Lebat", // Options: "Cerah", "Mendung", "Hujan Lebat"
    impactTime: "5:30 PM",
  });

  const calculatePrepRequirements = (Dbase: number, condition: string) => {
    let Wc = 1.0;
    let weatherIcon = <Sun className="w-6 h-6 text-amber-500" />;
    let impactMessage = "Permintaan dijangka normal mengikut purata biasa.";
    let cardGradient = "from-amber-400 to-orange-500";
    let borderTheme = "border-amber-200";
    let bgTheme = "bg-amber-50";

    if (condition === "Cerah") {
      Wc = 1.2;
      weatherIcon = <Sun className="w-7 h-7 text-amber-500" />;
      impactMessage = "Cuaca sangat baik! Jangkaan pelanggan lebih ramai berjalan di tapak niaga hari ini.";
      cardGradient = "from-orange-500 to-amber-500";
      borderTheme = "border-amber-200";
      bgTheme = "bg-amber-50";
    } else if (condition === "Mendung") {
      Wc = 0.8;
      weatherIcon = <Cloud className="w-7 h-7 text-slate-500" />;
      impactMessage = "Cuaca mendung. Sebahagian pelanggan mungkin memilih untuk bungkus awal sebelum hujan turun.";
      cardGradient = "from-slate-500 to-slate-600";
      borderTheme = "border-slate-200";
      bgTheme = "bg-slate-50";
    } else if (condition === "Hujan Lebat") {
      Wc = 0.5;
      weatherIcon = <CloudRain className="w-7 h-7 text-blue-500" />;
      impactMessage = "Hujan lebat akan menjejaskan kehadiran pelanggan mendadak, terutamanya selepas Asar.";
      cardGradient = "from-blue-600 to-indigo-700";
      borderTheme = "border-blue-200";
      bgTheme = "bg-blue-50";
    }

    const Dadj = Math.round(Dbase * Wc);
    const Bprep = Math.ceil(Dadj / 50);

    return { Wc, Dadj, Bprep, weatherIcon, impactMessage, cardGradient, borderTheme, bgTheme };
  };

  const prepForecast = calculatePrepRequirements(prepConfig.Dbase, prepConfig.condition);


  // --- 3. ADVANCED MATHEMATICAL MODEL: RUSH HOUR TRACKER ---
  const [rushHourData] = useState([
    { time: '4:00', sales: 15 },
    { time: '4:30', sales: 30 },
    { time: '5:00', sales: 65 },
    { time: '5:30', sales: 85 },
    { time: '6:00', sales: 45 },
    { time: '6:30', sales: 30 },
    { time: '7:00', sales: 25 },
    { time: '7:30', sales: 20 },
    { time: '8:00', sales: 40 },
    { time: '8:30', sales: 70 },
    { time: '9:00', sales: 90 },
    { time: '9:30', sales: 60 },
    { time: '10:00', sales: 25 },
  ]);

  const SIMULATED_CURRENT_TIME = "4:45 PM";
  const NEXT_BLOCK_TIME = "5:00";
  const mu_pan = 56;

  const nextBlockData = rushHourData.find(d => d.time === NEXT_BLOCK_TIME);
  const lambda_t = nextBlockData ? nextBlockData.sales : 0;
  const Pan_req = Math.ceil(lambda_t / mu_pan);

  const shouldTriggerSecondPanAlert = Pan_req >= 2 && SIMULATED_CURRENT_TIME === "4:45 PM";


  // --- 4. ADVANCED MATHEMATICAL MODEL: CASH FLOW RUNWAY (Database Simulation) ---
  const [dbDailySales] = useState([120, 85, 40, 150, 90]); // Simulated Daily Sales (RM)
  const [dbExpensesLog] = useState([45, 12, 85.50, 20]); // Simulated Daily Expenses (RM)
  const [dbConstants] = useState({
    Fupcoming: 400.00, // Target RM 400 for rent
  });

  const calculateFinancialContext = (sales: number[], expenses: number[], constants: any, pBox: number) => {
    // 1. Calculate Revenue
    const totalRevenue = sales.reduce((sum, val) => sum + val, 0);
    // 2. Calculate Expenses
    const totalExpenses = expenses.reduce((sum, val) => sum + val, 0);
    // 3. Calculate Cash on Hand (Chand)
    const Chand = totalRevenue - totalExpenses;
    // 4. Calculate Buffer
    const Buffer = Chand - constants.Fupcoming;

    // 5. Dynamic Context Calculation
    let requiredBoxes = 0;
    let isSafe = false;

    if (Buffer >= 0) {
      isSafe = true;
    } else {
      // Buffer is negative, calculate exactly how many more boxes to sell to cover rent
      const deficit = Math.abs(Buffer);
      requiredBoxes = Math.ceil(deficit / pBox);
    }

    return {
      Chand,
      Fupcoming: constants.Fupcoming,
      Buffer,
      isSafe,
      requiredBoxes,
      totalRevenue,
      totalExpenses
    };
  };

  const financeData = calculateFinancialContext(dbDailySales, dbExpensesLog, dbConstants, opsData.Pbox);

  // --- REACT HYDRATION FIX ---
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Calculate generic progress bar % (capping at 100%)
  const runwayPercentage = Math.min((financeData.Chand / financeData.Fupcoming) * 100, 100).toFixed(0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-200 py-4 sm:py-8">
      {/* Mobile App Container */}
      <div className="w-full max-w-md mx-auto min-h-[95vh] sm:rounded-[3rem] bg-white shadow-[0_0_40px_rgba(0,0,0,0.05)] sm:shadow-[0_0_50px_rgba(0,0,0,0.15)] sm:border-[8px] sm:border-slate-800 relative flex flex-col overflow-hidden">

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 shadow-xl -z-0"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 h-7 w-40 bg-slate-800 rounded-b-3xl z-50"></div>

        {/* Header */}
        <header className="px-6 pt-14 pb-12 z-10 relative">
          <div className="flex justify-between items-center mb-1">
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>LiyasZie ChefTako</span>
              <span className="text-3xl animate-bounce drop-shadow-md">🐙</span>
            </h1>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-inner">
              <Activity className="text-white w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-orange-50 font-medium text-sm flex items-center gap-1.5 opacity-90">
              <MapPin className="w-4 h-4" />
              Tonggak 9, Sg. Besar
            </p>
            <p className="text-orange-50/70 font-medium text-[11px] flex items-center gap-1.5 opacity-90 relative">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistem Runcit Harian
              {/* Simulated Current Time Badge for the Demo */}
              <span className="absolute right-0 top-0 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm border border-white/10">
                Jam: {SIMULATED_CURRENT_TIME}
              </span>
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-5 pb-10 space-y-6 z-10 relative bg-slate-50 rounded-t-[2.5rem] -mt-8 pt-8 overflow-y-auto shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">

          {/* COMPONENT 1: ADVANCED MARGIN PROTECTOR */}
          <section className="relative group">
            <div className={`absolute -inset-0.5 rounded-[2rem] blur opacity-40 transition duration-500 ${marginVal >= 60 ? 'bg-emerald-400' :
              marginVal >= 40 ? 'bg-amber-400' :
                'bg-red-500 animate-pulse'
              }`}></div>

            <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 shadow-lg overflow-hidden flex flex-col gap-5">

              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">Kawalan Margin<br /><span className="text-[11px] text-slate-500 font-bold mt-1 inline-block uppercase tracking-wider">Algoritma Masa Nyata</span></h2>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-full border border-slate-100 shadow-sm shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${statusColor}`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${marginVal >= 60 ? 'text-emerald-700' :
                    marginVal >= 40 ? 'text-amber-700' :
                      'text-red-700'
                    }`}>
                    {statusLabel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-100/50 p-3 rounded-2xl border border-slate-200/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Kos 1 Set (COGS)</span>
                    <TrendingDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-2xl font-black text-slate-800 flex items-baseline gap-1">
                    <span className="text-xs font-bold text-slate-400">RM</span>
                    {metrics.COGSbox.toFixed(2)}
                  </div>
                </div>

                <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Harga Jual</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-800 flex items-baseline gap-1">
                    <span className="text-xs font-bold text-emerald-500/70">RM</span>
                    {opsData.Pbox.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex justify-around items-center bg-slate-800 text-slate-300 py-3 px-4 rounded-xl text-[10px] font-medium tracking-wide shadow-inner">
                <div className="flex flex-col items-center">
                  <span className="text-slate-400">Kos Bancuhan</span>
                  <span className="font-bold text-slate-100">RM {metrics.VCbatch.toFixed(2)}</span>
                </div>
                <div className="h-6 w-px bg-slate-600"></div>
                <div className="flex flex-col items-center">
                  <span className="text-slate-400">Kos Sebutir</span>
                  <span className="font-bold text-slate-100">£ {metrics.Cball.toFixed(2)} sen</span>
                </div>
              </div>

              <div className="flex items-end justify-between px-1">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1 block">
                    Peratus Margin Sebenar
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-6xl font-black tracking-tighter ${marginVal >= 60 ? 'text-emerald-500' :
                      marginVal >= 40 ? 'text-amber-500' :
                        'text-red-600'
                      }`}>
                      {marginVal.toFixed(1)}
                    </span>
                    <span className={`text-2xl font-black ${marginVal >= 60 ? 'text-emerald-500/50' :
                      marginVal >= 40 ? 'text-amber-500/50' :
                        'text-red-600/50'
                      }`}>%</span>
                  </div>
                </div>
              </div>

              <div className={`mt-1 flex items-start gap-3 p-3.5 rounded-[1.25rem] border ${alertBg} ${alertBorder}`}>
                {marginIcon}
                <p className={`text-[12px] font-bold leading-relaxed ${alertText}`}>
                  {alertMessage}
                </p>
              </div>

            </div>
          </section>

          {/* COMPONENT 2: WEATHER-ADJUSTED PREP FORECASTER WITH DYNAMIC MATH */}
          <section className="relative group">
            <div className={`absolute -inset-0.5 rounded-[2rem] blur opacity-40 transition duration-500 ${prepConfig.condition === "Hujan Lebat" ? "bg-blue-300" :
              prepConfig.condition === "Mendung" ? "bg-slate-300" :
                "bg-amber-300"
              }`}></div>
            <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 shadow-lg overflow-hidden flex flex-col gap-5">

              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">Ramalan Bancuhan<br /><span className="text-[11px] text-slate-500 font-bold mt-1 inline-block uppercase tracking-wider">Keadaan Cuaca ({prepForecast.Wc}x Multiplier)</span></h2>
                </div>
                <div className={`w-12 h-12 ${prepForecast.bgTheme} rounded-2xl flex justify-center items-center shadow-sm border ${prepForecast.borderTheme} shrink-0`}>
                  {prepForecast.weatherIcon}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-100/50 p-3 rounded-2xl border border-slate-200/60 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Demand</p>
                  <p className="text-2xl font-black text-slate-800">
                    {prepForecast.Dadj} <span className="text-xs font-bold text-slate-400">biji</span>
                  </p>
                  <p className="text-[9px] font-medium text-slate-400 mt-1">(Normal: {prepConfig.Dbase})</p>
                </div>
                <div className="bg-slate-100/50 p-3 rounded-2xl border border-slate-200/60 text-center relative overflow-hidden">
                  {/* Subtle highlight if demand is very low or very high */}
                  {prepForecast.Wc > 1.0 && <div className="absolute inset-0 bg-amber-50 opacity-50 mix-blend-multiply pointer-events-none"></div>}
                  {prepForecast.Wc < 1.0 && <div className="absolute inset-0 bg-blue-50 opacity-50 mix-blend-multiply pointer-events-none"></div>}
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Target Bancuhan</p>
                  <p className="text-2xl font-black text-slate-800">
                    {prepForecast.Bprep} <span className="text-xs font-bold text-slate-400">jug</span>
                  </p>
                  <p className="text-[9px] font-medium text-slate-400 mt-1">@ 50 biji/jug</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-500">Status Semasa:</span>
                <span className="font-extrabold text-slate-800 uppercase">{prepConfig.condition}</span>
              </div>

              <div className={`bg-gradient-to-br ${prepForecast.cardGradient} text-white p-5 rounded-2xl shadow-md relative overflow-hidden`}>
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <p className="text-white/80 text-[10px] font-extrabold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Strategi Operasi
                </p>
                <div className="relative z-10 text-white shadow-sm space-y-2">
                  <p className="font-bold text-sm leading-relaxed border-b border-white/20 pb-2">
                    Siapkan tepat <strong className="text-lg bg-white/20 px-1.5 py-0.5 rounded-md mx-0.5">{prepForecast.Bprep} BATCH</strong> bancuhan untuk elakkan sisa buangan harini.
                  </p>
                  <p className="text-xs font-medium leading-relaxed opacity-95">
                    {prepForecast.impactMessage}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* COMPONENT 3: RUSH HOUR TRACKER WITH DYNAMIC MATH AND ALERTS */}
          <section className="relative group">
            <div className={`absolute -inset-0.5 rounded-[2rem] blur opacity-40 transition duration-500 ${shouldTriggerSecondPanAlert ? 'bg-red-500 animate-pulse' : 'bg-orange-300'
              }`}></div>
            <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 shadow-lg overflow-hidden flex flex-col gap-4">

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">Waktu Puncak<br /><span className="text-[11px] text-slate-500 font-bold mt-1 inline-block uppercase tracking-wider">Kapasiti Kuali • Block: {NEXT_BLOCK_TIME} PM</span></h2>
                </div>
                <div className="flex items-center gap-1.5 bg-orange-50 px-2 py-1 rounded-full border border-orange-100 shadow-sm shrink-0">
                  <Activity className="w-3 h-3 text-orange-600 animate-pulse" />
                  <span className="text-[9px] font-bold tracking-wider text-orange-600 uppercase">Live Tracker</span>
                </div>
              </div>

              {/* DYNAMIC ALERT ENGINE UI */}
              {shouldTriggerSecondPanAlert ? (
                <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-4 rounded-xl shadow-lg border-2 border-red-300 relative overflow-hidden animate-pulse">
                  <div className="absolute right-[-10px] top-[-10px] opacity-20">
                    <Flame className="w-24 h-24" />
                  </div>
                  <div className="relative z-10 flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-extrabold text-sm uppercase tracking-wider mb-1">Start Kuali Kedua Sekarang!</h3>
                      <p className="text-xs font-medium text-red-50 leading-snug">
                        Tempahan {(lambda_t)} biji ({Pan_req} pan diperlukan) untuk setangah jam seterusnya (bermula {NEXT_BLOCK_TIME} PM).
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold text-center">Kapasiti Kuali Normal. <br className="sm:hidden" />(1 Pan / 56 biji maximum per 30-minit).</p>
                </div>
              )}

              <div className="h-44 w-full mt-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rushHourData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} dy={10} interval="preserveStartEnd" minTickGap={20} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} />
                    <Tooltip
                      cursor={{ fill: '#f1f5f9', radius: 4 }}
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                      itemStyle={{ color: '#0f172a', fontWeight: '900' }}
                    />
                    <ReferenceLine y={mu_pan} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={2} label={{ position: 'top', value: '1 Pan Max (56)', fill: '#ef4444', fontSize: 9, fontWeight: 'bold' }} />
                    <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                      {rushHourData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.sales > mu_pan ? '#f97316' : '#cbd5e1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          </section>

          {/* COMPONENT 4: CASH FLOW RUNWAY WITH DYNAMIC REALITY CHECK */}
          <section className="relative group">
            <div className={`absolute -inset-0.5 rounded-[2rem] blur opacity-40 transition duration-500 ${financeData.isSafe ? 'bg-emerald-300' : 'bg-indigo-300'
              }`}></div>
            <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 shadow-lg overflow-hidden flex flex-col gap-4">

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">Misi Aliran Tunai<br /><span className="text-[11px] text-slate-500 font-bold mt-1 inline-block uppercase tracking-wider">Simulasi Profit Harian</span></h2>
                </div>
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex justify-center items-center shadow-sm border border-indigo-100 shrink-0">
                  <Wallet className="w-5 h-5 text-indigo-600" />
                </div>
              </div>

              {/* Data Display */}
              <div className="flex justify-between items-end mb-1">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Cash in Hand (Total: RM {financeData.Chand.toFixed(2)})</p>
                  <p className="text-4xl font-black text-slate-800 tracking-tight">
                    <span className="text-sm text-slate-400 font-bold mr-1">RM</span>
                    {financeData.Chand.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Target Sewa</p>
                  <p className="text-lg font-black text-slate-600">
                    <span className="text-xs text-slate-400 font-bold mr-0.5">RM</span>
                    {financeData.Fupcoming.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Progress Bar with max 100% */}
              <div className="w-full bg-slate-100 rounded-full h-4 mb-2 border border-slate-200/60 overflow-hidden shadow-inner relative">
                {/* Visual marker where the goal line is */}
                <div className="absolute top-0 bottom-0 left-[100%] border-l-2 border-emerald-400 z-10 opacity-50"></div>
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)] relative overflow-hidden ${financeData.isSafe ? 'bg-emerald-500' : 'bg-indigo-500'
                    }`}
                  style={{ width: `${runwayPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 origin-left"></div>
                  {/* Subtle stripe effect for movement */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
                </div>
              </div>

              {/* FINANCIAL REALITY CHECK UI */}
              {financeData.isSafe ? (
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-2xl shadow-md relative overflow-hidden mt-1">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                  <div className="relative z-10 flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-xl shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-50" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[13px] uppercase tracking-wider mb-1 text-emerald-50">Sewa Lulus! Safe Profit:</h3>
                      <p className="text-2xl font-black text-white leading-none">
                        <span className="text-sm font-semibold opacity-80 mr-1">RM</span>
                        {financeData.Buffer.toFixed(2)}
                      </p>
                      <p className="text-[10px] font-medium text-emerald-100 mt-1.5 leading-tight">
                        Target RM {financeData.Fupcoming} berjaya ditutup. Cash RM {financeData.Buffer.toFixed(2)} adalah duit bersih bawa balik.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border-2 border-dashed border-rose-300 p-4 rounded-2xl relative overflow-hidden mt-1 group cursor-pointer hover:bg-rose-100 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-rose-200 p-2 rounded-xl shrink-0 mt-0.5">
                      <BadgeAlert className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[12px] uppercase tracking-wider mb-1 text-rose-800">Defisit Sewa: RM {Math.abs(financeData.Buffer).toFixed(2)}</h3>
                      <p className="text-rose-900 font-bold text-[13px] leading-snug">
                        Jual lagi <span className="text-xl px-1.5 py-0.5 bg-rose-200 text-rose-900 rounded-lg mx-0.5 inline-block -rotate-2 scale-110 shadow-sm transition group-hover:scale-125">{financeData.requiredBoxes} kotak</span> untuk lepas kos sewa harini.
                      </p>
                      <p className="text-[10px] text-rose-600 font-semibold mt-2 uppercase tracking-wide flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Push sales kawkaw!
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}