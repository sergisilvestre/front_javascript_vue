Here's an updated version of your README that includes `user.service.test.ts` and also tidies up a few formatting issues (unclosed code block, inconsistent `docker-compose`/`docker compose`, and test documentation).

````markdown
# Front JavaScript Vue (Nuxt + Docker)

Frontend project based on Nuxt and Docker.

---

## 🚀 Requirements

- Node.js installed (optional if using Docker)
- Docker installed
- Docker Compose installed

---

## 🐳 Build Docker Image

Build the Docker image:

```bash
docker build -t front_javascript_vue .
```

Start the development environment:

```bash
docker compose up -d --build
```

Format the project:

```bash
npx prettier . --write
```

Run Ollama (optional):

```bash
ollama run qwen2.5-coder:3b
```

---

## 🧪 Testing and Verification

To ensure that the application is working correctly, follow these steps:

### Run the application

```bash
docker compose up -d --build
```

### Run the test suite

```bash
npm test
```

or, if using Vitest:

```bash
npx vitest
```

### Available Tests

- `__tests__/auth.service.test.ts` – Tests authentication service functionality.
- `__tests__/user.service.test.ts` – Tests user service functionality.

### Manual Verification

1. Access the application at `http://localhost`.
2. Verify routing works correctly.
3. Verify API communication and data fetching.
4. Check environment variables and configuration.
5. Test edge cases and error handling.
6. Run security checks for common vulnerabilities (e.g. XSS, injection attacks).

---

## 📚 Additional Resources

- https://docs.docker.com/compose/
- https://nuxt.com/docs

---

## 💪 Project Structure

```text
c:/Users/sergi/Documents/projects/front_javascript_vue/
├── app/
│   ├── assets/
│   ├── components/
│   ├── composables/
│   ├── layouts/
│   ├── middleware/
│   ├── pages/
│   ├── services/
│   ├── stores/
│   ├── types/
│   └── utils/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── __tests__/
│   ├── auth.service.test.ts
│   └── user.service.test.ts
├── services/
├── docker-compose.yml
├── Dockerfile
├── jest.config.cjs
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── vitest.config.ts
```
````

This version fixes the Markdown formatting, documents both test files, and updates the project structure to include `user.service.test.ts`.
