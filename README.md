# SDÜ Randevu Yönetim Sistemi

***SDÜ Randevu Yönetim Sistemi, SDÜ bünyesindeki Prototip Atölyesi için geliştirilmiş, typescript ile ve Bun çalışma zamanında çalışacak şekilde yazılmış bir uygulamadır. Bu uygulama ile atölye hizmetlerinden faydalanmak isteyen öğrenciler, öğretim elemanları ve personeller randevu alabilirler.***

## Gerekli yazılımlar

1. PostgreSQL veritabanı (v16.3) [www.postgresql.org](https://www.postgresql.org)
2. Bun çalışma zamanı (v1.1.8) [bun.sh](https://bun.sh)

## Kurulum

Bu proje Bun ile çalışır ve versiyon 1.1.8 ile test edilmiştir.

Öncelikle bun'u kurun:

```bash
curl -fsSl https://bun.sh/install | bash -s "bun-v1.1.8"
```

Sonrada projenin dizinine girip aşağıdaki komutu çalıştırın:

```bash
bun install
```

Kök dizindeki `.env.example` dosyasını `.env.local` olarak kopyalayın ve gerekli ayarları yapın.

Son olarak projeyi çalıştırmak için aşağıdaki komutu çalıştırın:

```bash
bun start
```

### Notlar

- Proje varsayılan olarak `http://localhost:3000` adresinde çalışır.
- PostgreSQL veritabanı kullanır. Veritabanı bağlantı ayarlarını `.env.local` dosyasından yapabilirsiniz.
- JWT ile kimlik doğrulama yapılır. JWT nin koruyucu olabilmesi için `.env.local` dosyasında kırılması çok zor bir `JWT_SECRET` tanımlanmalıdır.
- Drizzle kullanılarak veritabanı şeması oluşturulmuştur. `package.json` dosyasındaki `veritabanı` komutları ile veritabanı işlemleri yapılabilir.
- Geliştirme için VSCode önerilir. `.vscode` dizininde tanımlanmış ayarlar mevcuttur.

#### Dikkat

*Bu yazılım güncel olarak geliştirilme aşamasındadır ve bilinen/bilinmeyen güvenlik açıkları ve/veya optimize olmayan mantıklar içerir. Bu repo dan kod alıp kullanırsanız bunu bilerek yapın.*

##### Bu yazılım MIT lisansı ile lisanslanmıştır, daha fazla bilgi için LICENSE dosyasına bakınız

##### Bu yazılım SDÜ bünyesindeki Prototip Atölyesi için Ali Arda Uzan tarafından 2024 yılında geliştirilmeye başlanmıştır ve halen geliştirilmektedir
