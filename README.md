# Guia de ejecucion del proyecto

## Requisitos
- Node.js
- npm
- Java 25
- Maven

---

## Backend (Spring Boot + Maven)

### 1) Compilar
mvn clean install

### 2) Ejecutar
mvn spring-boot:run

El backend debe quedar disponible en:
http://localhost:8080

---

## Frontend (Vite + React)

### 1) Instalar dependencias
npm install

### 2) Ejecutar
npm run dev

El frontend debe quedar disponible en:
http://localhost:5173

---

## Pruebas E2E Frontend (Cucumber + Playwright)

### 1) Asegurate de tener backend y frontend corriendo
- Backend: mvn spring-boot:run
- Frontend: npm run dev

### 2) Ejecutar tests del front (playwright)
npm run test:e2e

### 3) Ejecutar tests del back:
- Darle click a Run all test with coverage
- mvn pitest:mutationCoverage

---

## Notas
- Los tests E2E esperan el frontend en http://localhost:5173 y el backend en http://localhost:8080.
- Si el backend no esta disponible, los tests que validan errores de la API fallaran.
