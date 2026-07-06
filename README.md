<![CDATA[
# Front JavaScript Vue (Nuxt + Docker)

Frontend project based on Nuxt and Docker.

---

## 🚀 Requirements

- Node.js installed (optional if using Docker)
- Docker installed
- Docker Compose installed

---

## 🐳 Build Docker image

Build the Docker image:

```bash
docker build -t front_javascript_vue .

## 
docker compose up -d --build
```

## 
npx prettier . --write

##
ollama run qwen2.5-coder:3b

### Testing and Verification

To ensure that the application is working correctly, you can follow these steps:

1. **Run Locally**: Use Docker Compose to start your development environment:
   ```bash
   docker-compose up -d --build
   ```

2. **Access the Application**: Once the services are running, access `http://localhost` in a web browser to view your application.

3. **Test Functionality**: Ensure all expected features work as intended, including routing, data fetching, and any user interactions.

4. **Verify Configuration**: Check that all necessary configurations are set correctly, such as environment variables, database connections, and API endpoints.

5. **Handle Edge Cases**: Test edge cases to ensure the application handles unexpected inputs gracefully.

6. **Security Testing**: Run security tests to identify potential vulnerabilities in your application, such as SQL injection or cross-site scripting (XSS).

### Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nuxt.js Documentation](https://nuxtjs.org/)

---


## 💪 Project Structure

Here's an overview of the project structure:

```
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
├── services/
└── nuxt.config.ts
package-lock.json
package.json
README.md
tsconfig.json
vitest.config.ts
__tests__/auth.service.test.ts
docker-compose.yml
dockerfile
jest.config.cjs
]]>