# Book Your Seat 🪑

Aplicație web pentru rezervarea locurilor la birou (desk booking), dezvoltată ca proiect pentru **IT Smart Systems**. Aplicația permite angajaților să vizualizeze birourile disponibile, să primească recomandări inteligente de birou, să consulte condițiile de deplasare (vreme și trafic) și să gestioneze rezervările proprii.

## 📋 Despre proiect

Book Your Seat rezolvă o problemă comună în firmele cu model de lucru hibrid: găsirea și rezervarea unui birou disponibil, fără conflicte, plus planificarea deplasării către sediu pe baza condițiilor reale de vreme și trafic.

Pe lângă fluxul clasic de rezervare, aplicația include o componentă AI cu două roluri:
- **Recomandare de birou** — sugerează un birou potrivit pe baza preferințelor și disponibilității
- **Smart Commute Assistant** — oferă un rezumat clar al condițiilor de deplasare (prognoză meteo, trafic, incidente rutiere), pe baza zonei de plecare, sediului ales și orei estimate de sosire

Modelul AI **nu inventează** date meteo sau de trafic — rolul lui este să interpreteze și să rezume informațiile primite de la furnizori externi, indicând mereu sursa și momentul actualizării. Dacă un serviciu extern e indisponibil, rezervarea manuală rămâne complet funcțională.

## 🛠️ Tech Stack

**Backend**
- Java 21
- Spring Boot 4.1
- Spring Security (autentificare pe bază de sesiune)
- Spring Data MongoDB
- MongoDB Atlas
- BCrypt (criptare parole)
- Maven

**Frontend**
- *(în dezvoltare — Sprint 1-2)*

**Servicii externe**
- Furnizor de vreme *(TBD)*
- Furnizor de rutare/trafic *(TBD)*
- Serviciu AI pentru recomandări și rezumate *(TBD)*

## 📁 Structura proiectului

```
ITSSProject2026/
├── backend/                  # Aplicația Spring Boot
│   ├── src/main/java/com/itsmartsystems/bookyourseat/
│   │   ├── model/            # Entități (User, Desk, Booking...)
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── repository/        # Interfețe MongoRepository
│   │   ├── service/            # Logica de business
│   │   ├── controller/         # Endpoint-uri REST
│   │   ├── config/             # Configurări (Security, PasswordEncoder...)
│   │   └── security/           # Componente de autentificare
│   ├── src/main/resources/
│   │   ├── application.properties.example
│   │   └── application.properties   # (local, ignorat de Git)
│   └── pom.xml
└── frontend/                 # (urmează)
```

## 🚀 Funcționalități curente

- [x] Înregistrare utilizator (`POST /register`), cu criptare BCrypt a parolei
- [x] Autentificare (`POST /login`), pe bază de sesiune (Spring Security)
- [x] Roluri de utilizator: `CEO`, `MANAGER`, `PM`, `DEV`
- [ ] Listare birouri disponibile
- [ ] Creare / vizualizare / anulare rezervări
- [ ] Recomandare AI de birou
- [ ] Smart Commute Assistant (vreme + trafic + incidente)

## 🗺️ Roadmap sprinturi

| Sprint | Temă | Rezultat principal |
|---|---|---|
| Sprint 0 | Project Setup | Backlog, roluri și cazuri de utilizare AI/vreme/trafic clarificate |
| Sprint 1 | UI/UX & Architecture | Prototip navigabil și arhitectură pentru rezervare, AI, vreme, trafic |
| Sprint 2 | Frontend & Backend | Frontend MVP cu date mock; fundație backend |
| Sprint 3 | Integration | Integrare completă cu backend, servicii meteo/trafic și AI |
| Sprint 4 | Booking | Flux complet de rezervare + Smart Commute Assistant funcțional |
| Sprint 5 | Release | Aplicație stabilizată, testată, pregătită pentru demo |

## ⚙️ Configurare locală (backend)

1. Clonează repository-ul:
   ```bash
   git clone https://github.com/Edward11-boop/ITSSProject2026.git
   cd ITSSProject2026/backend
   ```

2. Copiază fișierul de configurare exemplu:
   ```bash
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   ```

3. Completează `application.properties` cu propriile credențiale MongoDB Atlas:
   ```properties
   spring.application.name=book-your-seat
   spring.mongodb.uri=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/bookyourseat?appName=Cluster0
   ```

4. Rulează aplicația:
   ```bash
   ./mvnw spring-boot:run
   ```

5. Aplicația pornește pe `http://localhost:8080`.

## 🧪 Testare API

Endpoint-urile pot fi testate cu Postman:

**Register**
```
POST http://localhost:8080/register
Content-Type: application/json

{
  "name": "Eduard Test",
  "email": "eduard@itsmartsystems.eu",
  "password": "Test@123",
  "role": "DEV"
}
```

**Login**
```
POST http://localhost:8080/login
Content-Type: application/json

{
  "email": "eduard@itsmartsystems.eu",
  "password": "Test@123"
}
```

## 👥 Roluri implicate

Proiectul urmează metodologia **Scrum**, cu structura Jira: Epic → User Story → Task, și include roluri de Project Manager, Business Analyst și echipă de dezvoltare.

*Proiect realizat pentru IT Smart Systems — 2026*
