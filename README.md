# RegBridge - Hospital Management System Mock UI

**AI-Driven Scheduling & Regulatory Compliance Dashboard**

## 📋 Proje Açıklaması

Bu mock UI, FENG 497 Final Raporu'nda açıklanan **RegBridge** sisteminin gerçekleştirilmiş bir versiyonunu göstermektedir. Sistem, hastanelerin kompleks yasal düzenlemeleri AI yardımıyla uygulaması, personel programlaması ve ekipman takibini sağlayan modern bir yönetim sistemidir.

## 🎯 Öne Çıkan Özellikler

### 1. **Uyumlu Personel Programlaması**
- Türk Çalışma Kanunu ve hastane yönetmeliklerine uygun otomatik program oluşturma
- Haftalık 45 saatlik sınırı, günlük 11 saatlik sınırı ve gecelik vardiyaların kontrolü
- Departman bazında personel dağılımı ve dengeleme

### 2. **Gerçek Zamanlı Yasal Uygunluk Kontrol**
- Yürürlükteki 40+ yasal kısıtın takibi
- Uygunluk puanı (98.5% ortalama)
- Çalışan bazında uygunluk detayları

### 3. **RFID Tabanlı Ekipman Takibi**
- Tüm tıbbi ekipmanın gerçek zamanlı konumu ve durumu
- Bakım planlaması ve uyarı sistemi
- Dört kategoride takip: Stabil, Kullanımda, Bakımda

### 4. **Risk Yönetimi ve Uyarılar**
- Gerçek zamanlı tehdit tespiti (video analizi tabanlı)
- Seviyelere ayrılan uyarı sistemi (Kritik, Orta, Düşük)
- Otomatik güvenlik personeli yönlendirmesi

### 5. **Analitik ve Raporlama**
- Uygunluk eğilimleri
- Personel kullanım oranları
- Ekipman durumu istatistikleri
- Performans göstergeler

## 📁 Dosya Yapısı

```
497 mock up/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stillendirmesi
├── script.js           # JavaScript işlevselliği
├── FINAL_REPORT.txt    # Orijinal FENG 497 raporu
└── README.md           # Bu dosya
```

## 🚀 Nasıl Kullanılır

### 1. Dosyaları Açma
Dosyaları bir web tarayıcısında açmak için:

**Seçenek A: Dosyayı Doğrudan Açma**
- `index.html` dosyasına sağ tıklayın
- "Programla Aç" → "Web Tarayıcısı" seçin

**Seçenek B: Yerel Sunucu ile Açma (Önerilen)**
```bash
# Python 3 ile
python -m http.server 8000

# Node.js http-server ile
npx http-server

# Daha sonra tarayıcıda şunu açın:
# http://localhost:8000
```

### 2. Temel İşlemler

**Departman Filtreleme**
- Üst kısımda "Tüm Departmanlar", "Acil", "YBÜ", "Cerrahi" butonlarını kullanın
- Program tablosu seçilen departmana göre güncellenir

**Personel Arama**
- "Personel Uygunluk Detayları" bölümündeki arama kutusunu kullanın
- İsim, unvan veya departmana göre ara

**Ekipman Filtrele**
- RFID Takip bölümündeki dropdown ile ekipman türünü seçin
- Mevcut ekipmanları eşleştir/filtrele

**Program Oluştur**
- Sağ üst köşedeki "Program Oluştur" butonuna tıkla
- Sistem yeni bir uygun program oluşturacak

## 🎨 Tasarım Özellikleri

### Renk Şeması
- **Ana Mavi** (#1e88e5) - Birincil eylemler ve vurgular
- **Yeşil** (#43a047) - Başarı ve uygunluk durumu
- **Turuncu** (#fb8c00) - Uyarılar
- **Kırmızı** (#e53935) - Kritik hatalar
- **Açık Arka Plan** (#f5f7fa) - Ana sayfanın arka planı

### Duyarlı Tasarım
- **Masaüstü**: Tam kenar çubuğu ve detaylı görünüm
- **Tablet**: Optimized grid düzeni
- **Mobil**: Kompakt navigasyon ve yığılmış kartlar

### Animasyonlar
- Yumuşak geçişler ve hover efektleri
- Sayfa yüklemesinde fade-in animasyonları
- Pürüzsüz scrolling deneyimi

## 📊 Veri Yapısı

### Metrikleri Anlamak

1. **Aktif Personel**: Bugün görevde olan personel sayısı
2. **Uygunluk Puanı**: Yasal gerekliliklere uyma yüzdesi
3. **Mevcut Ekipman**: Takip edilen ve operasyonel ekipman
4. **Aktif Uyarılar**: İlgilenilmesi gereken sorunlar

### Yasal Kısıtlamalar

Sistem aşağıdaki ana kısıtlamaları uygular:

**Çalışma Saatleri**
- REQ-TIME-001: Haftalık max 45 saat
- REQ-TIME-002: Günlük max 11 saat
- REQ-TIME-003: Yıllık fazla mesai max 270 saat
- REQ-TIME-004: 7.5 saatten uzun gecelik vardiya yazılı rızadır

**Personel Gereksinimleri**
- REQ-STF-001: Acil Servis 24/7 doktor
- REQ-STF-002: Min 4 uzman doktor
- REQ-STF-003: 4+ eczacı varsa gece vardiyası açık

**Kapasite**
- REQ-CAP-001: YBÜ yatakları ≤ toplam yatakların %30
- REQ-CAP-002: Gözlem yatakları ≤ toplam yatakların %25
- REQ-CAP-003: Ücretsiz yataklar ≥ toplam yatakların %3

## 🔧 Özelleştirme

### Personel Verisi Eklemek
`index.html` dosyasını düzenleyin ve `<tbody>` bölümüne satır ekleyin:

```html
<tr>
    <td>Ad Soyadı</td>
    <td>Ünvan</td>
    <td>Departman</td>
    <td>Saat/45</td>
    <td><span class="status-active">✓ Aktif</span></td>
    <td><span class="compliance-good">%xx</span></td>
</tr>
```

### Renkleri Değiştirmek
`styles.css` dosyasının başındaki `:root` bölümüne bakın:

```css
:root {
    --primary-color: #1e88e5;  /* Buradan değiştirebilirsiniz */
    --secondary-color: #43a047;
    /* ... diğer renkler ... */
}
```

### Yeni Bölüm Eklemek
`index.html` dosyasında `<section>` etiketi ekleyin ve `styles.css` dosyasında stil tanımlayın.

## 💡 JavaScript İşlevleri

Ana kullanılabilir işlevler:

```javascript
// Departmana göre filtrele
RegBridge.filterScheduleByDepartment('er');

// Ekipmana göre filtrele
RegBridge.filterEquipment('Stretchers');

// Uyarı göster
RegBridge.showNotification('İşlem başarılı!', 'success');

// Program oluştur
RegBridge.generateSchedule();

// Performans metriklerini al
RegBridge.performanceMetrics.getComplianceScore();
```

## 📱 Tarayıcı Uyumluluğu

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## ⚙️ Teknik Yığın

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Responsive**: CSS Grid ve Flexbox
- **İçeriksizleştirme**: CSS Custom Properties (Variables)
- **Animasyonlar**: CSS3 Transitions ve Keyframes

## 📝 İncelenen Kaynaklar

Bu mock UI aşağıdaki rapor bölümlerine dayanmaktadır:

1. **Sistem Mimarisi** (Bölüm 4.1)
   - Giriş işlem hatları (Yasal, Duyuş, Lojistik)
   - Çekirdek sistem ve dashboard bağlantıları

2. **Veri Modeli** (Bölüm 4.2)
   - Sınıf diyagramı yapısı
   - Yasal görevler, vardiyalar, ekipman bağlantıları

3. **Yasal Kısıtlamalar** (Bölüm 4.3)
   - 40+ ayıklanmış yasal gereksinim
   - Matematiksel kısıtlamalar

4. **Risk Yönetimi** (Bölüm 3.3)
   - Video tabanlı aggression tespiti
   - Gerçek zamanlı güvenlik yanıt

## 🐛 Sorun Giderme

**Sayfa yüklenmiyorsa:**
- Dosyaların aynı dizinde olduğunu kontrol edin
- Tarayıcı konsolunu açın (F12) ve hataları kontrol edin
- Tarayıcı önbelleğini temizleyin (Ctrl+Shift+Delete)

**Stiller uygulanmıyorsa:**
- CSS dosyasının yüklü olduğunu kontrol edin
- Dosya isminin `styles.css` olduğunu doğrulayın
- Tarayıcıyı yenileyin

**JavaScript işlevleri çalışmıyorsa:**
- Tarayıcı konsolunda hata mesajlarını kontrol edin
- `script.js` dosyasının mevcut olduğunu doğrulayın
- JavaScript konsolunda `RegBridge` nesnesini test edin

## 📚 Ek Kaynaklar

- [FENG 497 Raporu](./FINAL_REPORT.txt) - Tam teknik belgelendirme
- [CSS Grid Rehberi](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [HTML Semantiği](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [JavaScript ES6+](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📄 Lisans ve Bilgiler

- **Proje**: FENG 497 - Capstone Project
- **Üniversite**: İzmir Ekonomi Üniversitesi
- **Fakülte**: Mühendislik Fakültesi
- **Danışman**: Ufuk Çelikkan
- **Yazarlar**: Mehmet Şakir Şeker, Eser Poyraz, Barış Kağan Yılmaz, Emre Ayberk Koçaslan, Pırıl Alyürek, Yavuz Kaan Uzun, Emir Karadere

## 🤝 Katkıda Bulunun

İyileştirme önerileri için lütfen açıklayıcı bir sorun (issue) açın veya bir pull request gönderin.

---

**Geliştirme Tarihi**: Aralık 2024
**Son Güncelleme**: Aralık 25, 2024
**Versiyon**: 1.0.0