# Soilless Farming Control API (Spring Boot)

Java 17, Spring Boot 3.3, in-memory H2, Spring Data JPA, Validation, Springdoc OpenAPI.

## Requirements

- JDK 17 or 21
- Apache Maven 3.9+ (`mvn` on PATH)

## Run

```bash
cd backend
mvn spring-boot:run
```

- App: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
- H2 console (dev default profile): `http://localhost:8080/h2` — JDBC URL `jdbc:h2:mem:hydro`, user `sa`, empty password

## CORS

Development allows `http://localhost:5173` and `http://127.0.0.1:5173`.

## Profiles

Default profile uses dev-oriented settings. Tests may use the `test` profile (e.g. `DataSeeder` disabled).

---

## Turkish / Türkçe

Java 17, Spring Boot 3.3, bellek içi H2, Spring Data JPA, Validation, Springdoc OpenAPI.

**Gereksinimler:** JDK 17 veya 21; Maven 3.9+.

**Çalıştırma:** `cd backend` → `mvn spring-boot:run` → uygulama `http://localhost:8080`, Swagger `http://localhost:8080/swagger-ui.html`, OpenAPI `http://localhost:8080/v3/api-docs`. Geliştirme profilinde H2 konsolu `http://localhost:8080/h2` (JDBC: `jdbc:h2:mem:hydro`, kullanıcı `sa`, şifre boş).

**CORS:** `http://localhost:5173` ve `http://127.0.0.1:5173` izinlidir.

**Profiller:** Varsayılan geliştirme ayarları; testlerde `test` profili kullanılabilir.

Monorepo genel talimatlar için depo kökündeki `README.md` dosyasına bakın.
