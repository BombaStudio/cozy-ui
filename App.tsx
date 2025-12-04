import React, { useState, useEffect, useRef, useMemo } from 'react';
import Cozy from './Cozy';

import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Checkbox } from './components/ui/checkbox';
import { Select } from './components/ui/select';
import { Image } from './components/ui/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/ui/card/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './components/ui/dialog';
import { Check, ArrowRight, Heart, BarChart3, Bell, Moon, Sun, Image as ImageIcon, TrendingUp, TrendingDown } from 'lucide-react';

const App: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Chart Logic
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartHover, setChartHover] = useState<{x: number, y: number, value: number, label: string} | null>(null);

  const chartData = useMemo(() => {
    // Simulated market data points
    return [
      8200, 8240, 8220, 8280, 8350, 8320, 8400, 8450, 8420, 8480, 
      8550, 8500, 8600, 8650, 8620, 8700, 8750, 8720, 8800, 8850,
      8900, 8850, 8950, 9050, 9000, 9100, 9150, 9120, 9250, 9450
    ];
  }, []);

  const chartPoints = useMemo(() => {
    const width = 500;
    const height = 150;
    const min = Math.min(...chartData) * 0.98;
    const max = Math.max(...chartData) * 1.02;
    
    return chartData.map((val, i) => {
      const x = (i / (chartData.length - 1)) * width;
      const normalized = (val - min) / (max - min);
      const y = height - (normalized * height);
      return { x, y, val };
    });
  }, [chartData]);

  const polylinePoints = chartPoints.map(p => `${p.x},${p.y}`).join(' ');
  const areaPoints = `0,150 ${polylinePoints} 500,150`;

  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Calculate SVG X coordinate (0-500)
    const svgX = (x / width) * 500;
    const clampedSvgX = Math.max(0, Math.min(500, svgX));

    // Find closest data point
    const step = 500 / (chartData.length - 1);
    const index = Math.round(clampedSvgX / step);
    
    if (index >= 0 && index < chartPoints.length) {
      setChartHover({
        x: chartPoints[index].x,
        y: chartPoints[index].y,
        value: chartPoints[index].val,
        label: `₺${chartPoints[index].val.toLocaleString()}`
      });
    }
  };

  const handleChartMouseLeave = () => {
    setChartHover(null);
  };

  useEffect(() => {
    // Check system preference on mount if needed, or default to light
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  return (
    <>
      <Cozy className="min-h-screen bg-paper text-ink font-body selection:bg-primary selection:text-white pb-20 transition-colors duration-300">
        {/* Navigation */}
      <nav className="w-full border-b border-line bg-surface/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="#" className="font-hand text-3xl text-primary font-bold tracking-wide hover:rotate-2 transition-transform cursor-pointer">
                CozyUI.
            </a>
            <div className="hidden xl:flex gap-5 font-hand text-xl text-ink items-center">
                <a href="#typography" className="hover:text-primary transition-colors">Yazı</a>
                <a href="#buttons" className="hover:text-primary transition-colors">Buton</a>
                <a href="#cards" className="hover:text-primary transition-colors">Kart</a>
                <a href="#inputs" className="hover:text-primary transition-colors">Girdi</a>
                <a href="#popups" className="hover:text-primary transition-colors">Popup</a>
                <a href="#charts" className="hover:text-primary transition-colors">Grafik</a>
                <a href="#forms" className="hover:text-primary transition-colors">Form</a>
                <a href="#images" className="hover:text-primary transition-colors">Görsel</a>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="text-ink hover:text-primary hover:bg-transparent"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
              </Button>

              <Button size="sm" className="hidden md:inline-flex bg-ink border-ink text-paper hover:bg-primary hover:border-primary hover:text-white">
                  İndir
              </Button>
            </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">

        {/* Hero Section */}
        <section className="text-center space-y-8 pt-10">
            <div className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary font-hand text-lg font-bold border border-secondary/30 rotate-[-2deg]">
                ✨ v2.0 Şimdi Yayında
            </div>
            <h1 className="font-hand text-6xl md:text-7xl text-ink mt-4 leading-tight">
                Dijital dünyaya <br />
                <span className="text-primary underline decoration-wavy decoration-2 underline-offset-8">sıcaklık</span> katın.
            </h1>
            <p className="text-xl text-sub max-w-2xl mx-auto leading-relaxed">
                Modern web için elle çizilmiş hissi veren, samimi ve erişilebilir bileşen kütüphanesi.
            </p>
            <div className="flex justify-center gap-4 mt-8">
                <Button size="lg">Keşfetmeye Başla</Button>
                <Button size="lg" variant="outline">Github</Button>
            </div>
        </section>

        <hr className="border-line border-dashed border-2" />

        {/* 01 Typography */}
        <section id="typography" className="space-y-8 scroll-mt-28">
            <div className="flex items-baseline gap-4 mb-8">
                <h2 className="font-hand text-4xl text-ink">01. Tipografi</h2>
                <span className="text-sub font-hand text-xl">Font Ailesi</span>
            </div>
            
            <Card>
              <CardContent className="space-y-6 pt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <h1>Merhaba Dünya</h1>
                        <h2 className="font-hand text-4xl text-ink">Samimi Tasarımlar</h2>
                        <h3 className="font-hand text-3xl text-ink">UI Bileşenleri</h3>
                    </div>
                    <div className="bg-paper p-6 rounded-xl border border-line transition-colors duration-300">
                        <p className="font-hand text-2xl text-primary mb-2">Patrick Hand</p>
                        <p className="font-body text-lg text-sub leading-relaxed">
                            Başlıklar için kullanılan bu font, tasarıma organik ve insani bir dokunuş katar.
                        </p>
                        <div className="h-4"></div>
                        <p className="font-sans font-bold text-lg text-ink mb-2">Nunito (Body)</p>
                        <p className="font-body text-base text-sub leading-relaxed">
                            Okunabilirlik için gövde metinlerinde Nunito kullanılır. Yumuşak köşeleri genel tasarımla uyum sağlar.
                        </p>
                    </div>
                </div>
              </CardContent>
            </Card>
        </section>

        {/* 02 Buttons */}
        <section id="buttons" className="space-y-8 scroll-mt-28">
            <h2 className="font-hand text-4xl text-ink">02. Butonlar</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="flex flex-col gap-6 p-8">
                    <h3 className="font-hand text-2xl text-sub text-center">Retro / Sert Gölge</h3>
                    <div className="flex flex-col gap-4">
                        <Button className="w-full">Primary Action</Button>
                        <Button variant="secondary" className="w-full">Secondary Action</Button>
                        <Button variant="outline" className="w-full">Outline Style</Button>
                    </div>
                </Card>

                <Card className="flex flex-col gap-6 p-8">
                    <h3 className="font-hand text-2xl text-sub text-center">Modern / Yumuşak</h3>
                    <div className="flex flex-col gap-4">
                        <Button variant="soft" className="w-full">Soft Primary</Button>
                        <Button variant="softSecondary" className="w-full">Soft Secondary</Button>
                        <Button variant="link" className="w-full">Sadece Link Metni</Button>
                    </div>
                </Card>
            </div>
        </section>

        {/* 03 Cards */}
        <section id="cards" className="space-y-8 scroll-mt-28">
            <h2 className="font-hand text-4xl text-ink">03. Kartlar</h2>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="group bg-surface rounded-cozy border border-line shadow-soft overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col h-full">
                    <CardHeader className="h-40 bg-secondary/10 relative overflow-hidden flex items-center justify-center">
                        <Heart className="w-12 h-12 text-secondary/40" />
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col flex-1">
                        <span className="text-xs font-bold tracking-wider text-primary uppercase mb-2 block">Blog</span>
                        <h3 className="font-hand text-2xl mb-2 group-hover:text-primary transition-colors">Minimalizm</h3>
                        <p className="text-sub text-sm leading-relaxed mb-4 flex-1">
                            Sadeleşmek sadece eşyaları azaltmak değil, zihni berraklaştırmaktır.
                        </p>
                        <span className="text-ink font-hand text-lg flex items-center gap-1 w-max group-hover:underline decoration-wavy decoration-primary">
                          Oku <ArrowRight className="w-4 h-4" />
                        </span>
                    </CardContent>
                </Card>

                <Card className="bg-[#FFF8F0] dark:bg-[#2e2a27] rounded-cozy p-8 border-2 border-dashed border-primary/30 flex flex-col justify-center text-center relative h-full transition-colors duration-300">
                    <div className="text-6xl font-hand text-primary/20 absolute top-2 left-4">“</div>
                    <p className="font-hand text-2xl text-ink relative z-10 leading-snug mt-2">
                        Basitlik, karmaşıklığın en son noktasıdır.
                    </p>
                    <div className="mt-4 text-sm font-bold text-sub">- Leonardo da Vinci</div>
                </Card>

                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>Görevler</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 opacity-50">
                            <div className="w-6 h-6 rounded border-2 border-secondary bg-secondary flex items-center justify-center text-white">
                              <Check className="w-4 h-4" />
                            </div>
                            <span className="text-sub line-through">Toplantı notları</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded border-2 border-sub hover:border-primary cursor-pointer transition-colors"></div>
                            <span className="text-ink">React componentleri</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded border-2 border-sub hover:border-primary cursor-pointer transition-colors"></div>
                            <span className="text-ink">Dokümantasyon</span>
                        </li>
                    </ul>
                  </CardContent>
                </Card>
            </div>
        </section>

        {/* 04 Inputs */}
        <section id="inputs" className="space-y-8 scroll-mt-28">
            <h2 className="font-hand text-4xl text-ink">04. Girdiler</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="space-y-6 p-8">
                    <div className="space-y-2">
                        <Label htmlFor="input-default">Standart Input</Label>
                        <Input id="input-default" placeholder="Bir şeyler yazın..." />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="input-error" className="text-destructive">Hatalı Durum</Label>
                        <Input id="input-error" error placeholder="Yanlış format..." defaultValue="hatali@mail" />
                        <p className="text-sm text-destructive font-bold">Lütfen geçerli bir mail girin.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="input-disabled">Devre Dışı</Label>
                        <Input id="input-disabled" disabled placeholder="Buraya yazamazsınız..." />
                    </div>
                </Card>

                <Card className="space-y-6 p-8">
                    <div className="space-y-2">
                        <Label htmlFor="select-demo">Seçim Kutusu</Label>
                        <Select id="select-demo">
                            <option>Seçenek 1</option>
                            <option>Seçenek 2</option>
                            <option>Seçenek 3</option>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="textarea-demo">Metin Alanı</Label>
                        <Textarea id="textarea-demo" placeholder="Uzun bir açıklama giriniz..." rows={3} />
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                        <Checkbox id="terms-demo" />
                        <Label htmlFor="terms-demo" className="text-base cursor-pointer">
                            Şartları okudum ve kabul ediyorum
                        </Label>
                    </div>
                </Card>
            </div>
        </section>

        {/* 05 Popups */}
        <section id="popups" className="space-y-8 scroll-mt-28">
            <h2 className="font-hand text-4xl text-ink">05. Popuplar</h2>
            
            <div className="bg-paper border-2 border-dashed border-line rounded-cozy p-12 text-center space-y-4 transition-colors duration-300">
                <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-hand text-3xl text-ink">Bildirim Modalı</h3>
                <p className="text-sub max-w-md mx-auto">
                    Kullanıcı etkileşimi için özelleştirilmiş, arka planı bulanıklaştıran diyalog pencereleri.
                </p>
                <Button onClick={() => setIsDialogOpen(true)} size="lg" className="mt-4">
                    Örneği Görüntüle
                </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent onClose={() => setIsDialogOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Cozy UI'ya Hoşgeldin! 👋</DialogTitle>
                        <DialogDescription className="mt-2">
                            Bu, tamamen özelleştirilebilir ve erişilebilir bir modal bileşenidir.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                        <div className="bg-paper p-4 rounded-xl border border-line text-sub text-sm transition-colors duration-300">
                            💡 İpucu: Modalı kapatmak için dışarıya tıklayabilir veya sağ üstteki çarpı ikonunu kullanabilirsiniz.
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
                        <Button onClick={() => setIsDialogOpen(false)}>Anlaşıldı</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>

        {/* 06 Charts */}
        <section id="charts" className="space-y-8 scroll-mt-28">
            <h2 className="font-hand text-4xl text-ink">06. Grafikler</h2>
            
            {/* Stock Market Chart - New Addition */}
            <Card className="overflow-hidden">
                <CardHeader className="border-b border-line/50 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <TrendingUp className="w-6 h-6 text-secondary" />
                                Piyasa Hareketleri
                            </CardTitle>
                            <CardDescription>BIST 100 Endeksi - Gerçek Zamanlı Veri (Simülasyon)</CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="font-hand text-2xl text-ink">
                                  {chartHover ? chartHover.label : "9,450.23"}
                                </p>
                                <p className="text-sm font-bold text-secondary flex items-center justify-end gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    %1.24
                                </p>
                            </div>
                            <Button size="sm" variant="outline" className="hidden sm:flex">Detaylar</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                    <div 
                        className="h-[300px] w-full relative cursor-crosshair"
                        ref={chartContainerRef}
                        onMouseMove={handleChartMouseMove}
                        onMouseLeave={handleChartMouseLeave}
                    >
                         {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between text-xs text-sub/40 font-mono pointer-events-none">
                            <div className="border-b border-dashed border-line w-full h-0"></div>
                            <div className="border-b border-dashed border-line w-full h-0"></div>
                            <div className="border-b border-dashed border-line w-full h-0"></div>
                            <div className="border-b border-dashed border-line w-full h-0"></div>
                            <div className="border-b border-dashed border-line w-full h-0"></div>
                        </div>

                        {/* Chart */}
                        <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="stockGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            
                            {/* Area Fill */}
                            <polygon 
                                points={areaPoints} 
                                fill="url(#stockGradient)" 
                            />
                            
                            {/* Line Stroke */}
                            <polyline 
                                points={polylinePoints} 
                                fill="none" 
                                stroke="var(--color-secondary)" 
                                strokeWidth="3" 
                                vectorEffect="non-scaling-stroke"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Hover Effects */}
                            {chartHover && (
                                <g>
                                    {/* Vertical Line */}
                                    <line 
                                        x1={chartHover.x} y1="0" 
                                        x2={chartHover.x} y2="150" 
                                        stroke="var(--color-ink)" 
                                        strokeWidth="1" 
                                        strokeDasharray="4 4"
                                        opacity="0.5"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    
                                    {/* Point */}
                                    <circle 
                                        cx={chartHover.x} cy={chartHover.y} r="6" 
                                        fill="var(--color-paper)" 
                                        stroke="var(--color-secondary)" 
                                        strokeWidth="3" 
                                    />

                                    {/* Tooltip */}
                                    <foreignObject 
                                        x={Math.min(chartHover.x + 10, 400)} 
                                        y={Math.max(chartHover.y - 60, 0)} 
                                        width="120" 
                                        height="50"
                                        style={{ overflow: 'visible' }}
                                    >
                                        <div className="bg-ink text-white text-sm rounded-lg px-3 py-2 font-bold shadow-xl whitespace-nowrap inline-block pointer-events-none">
                                            {chartHover.label}
                                        </div>
                                    </foreignObject>
                                </g>
                            )}
                        </svg>
                    </div>
                    
                    {/* X Axis */}
                    <div className="flex justify-between text-xs text-sub font-mono mt-4 uppercase tracking-wider">
                        <span>09:00</span>
                        <span>11:00</span>
                        <span>13:00</span>
                        <span>15:00</span>
                        <span>17:00</span>
                        <span>18:00</span>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 text-primary" />
                            Haftalık Kahve Tüketimi
                        </CardTitle>
                        <CardDescription>Fincan bazında günlük veriler</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end justify-between h-48 gap-2 pt-4">
                            {[40, 70, 45, 90, 60, 30, 80].map((h, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                    <div className="relative w-full">
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-ink text-paper text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap font-bold">
                                            {h} Fincan
                                        </div>
                                        {/* Bar */}
                                        <div 
                                            className="w-full bg-primary/20 border-2 border-primary rounded-t-lg group-hover:bg-primary/40 transition-all cursor-pointer relative"
                                            style={{ height: `${h * 1.5}px` }}
                                        >
                                            <div className="absolute inset-0 bg-white/30 rounded-t-lg opacity-0 group-hover:opacity-100"></div>
                                        </div>
                                    </div>
                                    <span className="font-hand text-sm text-sub">
                                        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Stat Cards */}
                <div className="space-y-6">
                    <Card className="bg-secondary/10 border-secondary/30">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="font-hand text-xl text-sub">Toplam Kullanıcı</p>
                                <p className="font-hand text-5xl text-ink mt-1">12,450</p>
                            </div>
                            <div className="h-16 w-16 bg-surface rounded-full flex items-center justify-center border-2 border-secondary/30 shadow-sm transition-colors duration-300">
                                <span className="text-2xl">👥</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#FFF8F0] dark:bg-[#2e2a27] border-primary/20 transition-colors duration-300">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="font-hand text-xl text-sub">Mutluluk Oranı</p>
                                <p className="font-hand text-5xl text-ink mt-1">%98</p>
                            </div>
                            <div className="h-16 w-16 bg-surface rounded-full flex items-center justify-center border-2 border-primary/20 shadow-sm transition-colors duration-300">
                                <span className="text-2xl">😊</span>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <div className="bg-surface border-2 border-dashed border-line rounded-cozy p-6 flex items-center justify-center text-sub italic font-hand text-lg transition-colors duration-300">
                        Daha fazla grafik yakında...
                    </div>
                </div>
            </div>
        </section>

        {/* 07 Forms */}
        <section id="forms" className="space-y-8 scroll-mt-28">
            <h2 className="font-hand text-4xl text-ink">07. Formlar</h2>
            
            <Card className="max-w-3xl mx-auto overflow-hidden">
              <div className="bg-primary/5 p-8 text-center border-b border-line">
                  <h3 className="font-hand text-3xl text-ink">Bize Ulaşın</h3>
                  <p className="text-sub mt-2">Projeleriniz için teklif alın veya sadece merhaba deyin.</p>
              </div>
              
              <CardContent className="p-8 md:p-10">
                {formSuccess ? (
                    <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10" />
                        </div>
                        <h4 className="font-hand text-3xl text-ink mb-2">Mesajınız Alındı!</h4>
                        <p className="text-sub">En kısa sürede size geri dönüş yapacağız.</p>
                    </div>
                ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="form-name">Adınız Soyadınız</Label>
                                <Input id="form-name" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="form-email">E-posta Adresiniz</Label>
                                <Input id="form-email" type="email" placeholder="ornek@site.com" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="form-subject">Konu</Label>
                            <Select id="form-subject">
                                <option>Genel Sorular</option>
                                <option>Proje Teklifi</option>
                                <option>Teknik Destek</option>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="form-message">Mesajınız</Label>
                            <Textarea 
                                id="form-message" 
                                placeholder="Size nasıl yardımcı olabiliriz?" 
                                rows={5}
                                required 
                            />
                        </div>

                        <div className="flex items-start gap-3 bg-paper p-4 rounded-xl border border-line transition-colors duration-300">
                            <Checkbox id="form-terms" className="mt-1" required />
                            <Label htmlFor="form-terms" className="text-base cursor-pointer font-body">
                                <span className="font-bold text-ink">Kişisel Verilerin Korunması Kanunu</span> kapsamında verilerimin işlenmesini onaylıyorum.
                            </Label>
                        </div>

                        <Button type="submit" size="lg" className="w-full text-2xl py-8 shadow-hard hover:shadow-hard-hover">
                            Mesajı Gönder 🚀
                        </Button>
                    </form>
                )}
              </CardContent>
            </Card>
        </section>

        {/* 08 Images */}
        <section id="images" className="space-y-8 scroll-mt-28">
            <h2 className="font-hand text-4xl text-ink">08. Görseller</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Variant: Retro */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                         <div className="bg-primary text-white text-xs px-2 py-1 rounded font-bold font-sans">Variant: Retro</div>
                    </div>
                    <Image 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" 
                        alt="Takım Çalışması" 
                        variant="retro"
                    />
                    <p className="text-sub font-hand text-lg">Sert gölge ve kalın kenarlık ile "retro" görünüm.</p>
                </div>

                {/* Variant: Polaroid */}
                <div className="space-y-4 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-2 w-full">
                         <div className="bg-secondary text-white text-xs px-2 py-1 rounded font-bold font-sans">Variant: Polaroid</div>
                    </div>
                    <Image 
                        src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop" 
                        alt="Doğa Yürüyüşü" 
                        variant="polaroid"
                        caption="Orman Gezisi '24"
                    />
                </div>

                 {/* Variant: Default & Circle */}
                 <div className="space-y-8">
                     <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-ink text-white text-xs px-2 py-1 rounded font-bold font-sans">Variant: Default</div>
                        </div>
                        <Image 
                            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2564&auto=format&fit=crop" 
                            alt="Masa Düzeni" 
                        />
                     </div>
                     
                     <div className="flex items-center gap-6">
                         <div className="flex-1">
                             <div className="flex items-center gap-2 mb-2">
                                <div className="bg-sub text-white text-xs px-2 py-1 rounded font-bold font-sans">Variant: Circle</div>
                            </div>
                            <Image 
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" 
                                alt="Profil" 
                                variant="circle"
                                className="w-32 h-32"
                            />
                         </div>
                         <p className="text-sm text-sub">Profil fotoğrafları veya avatarlar için yuvarlak varyant.</p>
                     </div>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-surface border-t border-line py-12 mt-20 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
            <h4 className="font-hand text-3xl text-primary font-bold">CozyUI.</h4>
            <div className="flex justify-center gap-6 text-sub font-hand text-lg">
                <a href="#" className="hover:text-ink">Hakkımızda</a>
                <a href="#" className="hover:text-ink">Lisans</a>
                <a href="#" className="hover:text-ink">Github</a>
                <a href="#" className="hover:text-ink">Twitter</a>
            </div>
            <p className="text-sub text-sm pt-4 border-t border-dashed border-line w-1/2 mx-auto">
                © 2025 NexUI Component Library. Sevgiyle kodlandı.
            </p>
        </div>
      </footer>
      </Cozy>
      
    </>

    
  );
};

export default App;