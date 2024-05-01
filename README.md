# SDU Randevu Yönetim Sistemi

## Kurulum

Bu proje bun ile çalışır ve versiyon 1.1.6 ile test edilmiştir

Öncelikle bun'u kurun:

```bash
curl -fsSl https://bun.sh/install | bash -s "bun-v1.1.6"
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
- PostgreSql veritabanı kullanır. Veritabanı ayarlarını `.env.local` dosyasından yapabilirsiniz.
- Proje ilk çalıştırıldığında veritabanı şemasını oluşturmak için aşağıdaki komutu çalıştırın:
  
  ```bash
  bun run db:generate
  ```

- Sonrada aşağıdaki komutu çalıştırarak veritabanına şemayı yükleyin:

  ```bash
  bun run db:migrate
  ```

#### Prototip atölyesi için A.A.U. tarafından geliştirilmiştir
