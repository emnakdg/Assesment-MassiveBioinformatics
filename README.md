# FrontEndAssesment-MassiveBioinformatics
Bu proje, Rick and Morty API'si üzerinden karakterleri listeleyen bir **React** uygulamasıdır. Kullanıcılar karakterleri arayabilir, filtreleyebilir, sıralayabilir ve her karakterin detaylarına erişebilirler. Proje, [**GitHub Pages**](https://emnakdg.github.io/FrontEndAssesment-MassiveBioinformatics/) üzerinde barındırılmaktadır.

## Özellikler
* **Karakter Listeleme**: Rick and Morty API'sinden alınan karakterleri listeleme.
* **Arama ve Filtreleme**: Karakterler isme, statüye (Alive, Dead, Unknown) ve türe göre filtrelenebilir.
* **Sıralama**: Karakterler isme ve statüye göre sıralanabilir.
* **Karakter Detay Sayfası**: Her karakterin detaylarıyla birlikte daha fazla bilgisine ulaşılabilir.

## Kurulum
### 1. Projeyi Klonlayın

Projeyi GitHub'dan klonlayarak bilgisayarınıza indirin:
```
git clone https://github.com/emnakdg/FrontEndAssesment-MassiveBioinformatics.git
```

### 2. Bağımlılıkları Yükleyin

Proje bağımlılıklarını yüklemek için terminalde şu komutu çalıştırın:
```
npm start
```
Bu komut, uygulamayı http://localhost:3000 adresinde çalıştıracaktır.

## Kullanılan Teknolojiler
* **React**: Kullanıcı arayüzü için kullanılan JavaScript kütüphanesi.
* **React Router**: Sayfa yönlendirmeleri için kullanıldı. `HashRouter` kullanarak GitHub Pages'e uygun bir yönlendirme yapıldı.
* **Axios**: API'den veri çekmek için kullanılan HTTP istemcisi.
* **gh-pages**: GitHub Pages'e uygulama dağıtımı için kullanıldı.

## Özellik Detayları
### 1. Karakter Listeleme:
Uygulama, [Rick and Morty API](https://rickandmortyapi.com/) üzerinden karakterleri çeker ve kullanıcıya listeler. Sayfada 20 karakter gösterilir, ancak sayfa boyutunu değiştirmek mümkündür.

### 2. Arama ve Filtreleme:
* **Arama**: Kullanıcı, karakter adını arayarak listede filtreleme yapabilir.
* **Filtreleme**: Kullanıcılar karakterleri `Alive`, `Dead`, `Unknown` statülerine göre filtreleyebilir.
* **Türe Göre Filtreleme**: Karakterler `species` (tür) bilgisine göre filtrelenebilir.

### 3. Sıralama:
Kullanıcılar karakter listesini alfabetik olarak **A-Z** veya **Z-A** sıralayabilir. Ayrıca, karakterlerin statülerine göre **Alive**, **Dead**, **Unknown** sıralaması yapılabilir.

### 4. Karakter Detay Sayfası:
Bir karakterin ismine tıklayarak, o karakterin detay sayfasına yönlendirilirsiniz. Detay sayfasında karakterin:

* İsim
* Durum (Status)
* Tür (Species)
* Son Bilinen Yer (Last Known Location)
* Başlangıç Yeri (Origin) gibi bilgileri yer alır.

## GitHub Pages'e Yayınlama
Bu projeyi GitHub Pages'e yayınlamak için şu adımları takip ettik:
1. `gh-pages` Paketi:
* React uygulamamızın derlenip, GitHub Pages'e yüklenmesini sağlamak için `gh-pages` paketini kullandık.

2. `package.json` Güncellemeleri:
* `homepage` alanı, projenin GitHub Pages URL'sini içeriyor ve doğru şekilde ayarlandı.
* `scripts` kısmında, `predeploy` ve `deploy` komutları kullanıldı.
```
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
3. `npm run deploy`:
Bu komut, uygulamayı GitHub Pages'e yükler. GitHub'da **Pages** sekmesinde ilgili ayarlar yapıldığında, uygulama yayına alınır.

## Kullanıcı Arayüzü (UI)
Projede, kullanıcı dostu bir arayüz için modern bir tasarım kullanılmıştır. Arayüzde:
* **Responsive Tasarım**: Masaüstü ve mobil cihazlarda uyumlu çalışacak şekilde tasarlanmıştır.
* **Etkileşimli Butonlar**: Sıralama, filtreleme butonları kullanıcıya kolay bir deneyim sunar.

## Sorun Giderme
* **Boş Sayfa Sorunu**: GitHub Pages'de `react-router-dom` ile yönlendirme sorunları yaşanabilir. Bu durumda `HashRouter` kullanarak problemi çözebilirsiniz.
