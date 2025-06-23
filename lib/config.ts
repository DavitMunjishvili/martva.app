export const ENV = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? "https://driving-license-exams.fly.dev"
      : "http://localhost:8080",
};
