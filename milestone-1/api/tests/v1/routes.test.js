const request = require("supertest");
const app = require("../../app");

afterAll((done) => {
  app.close(done);
});

describe("GET /healthcheck", () => {
  it("should respond with status 200 and 'UP'", async () => {
    const response = await request(app).get("/api/healthcheck");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "UP" });
  });
});

describe("DELETE /students", () => {
  it("should respond with status 200 and delete all students", async () => {
    const response = await request(app).delete("/api/students");
    expect(response.status).toBe(200);
    expect(response.body.msg).toMatch("Deleted all student records");
  });
});

describe("POST /students", () => {
  it("should respond with status 201 and create a new student", async () => {
    const newStudent = { name: "John", email: "john@example.com" };
    const response = await request(app).post("/api/students").send(newStudent);
    expect(response.status).toBe(201);
    expect(response.body.msg).toMatch(/Created a new student with id \d+/);
  });
});

describe("GET /students", () => {
  it("should respond with status 200 and return a list of students", async () => {
    const response = await request(app).get("/api/students");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("PUT /students/:id", () => {
  it("should respond with status 200 and update a student", async () => {
    const updatedStudent = { email: "updated@example.com" };
    const response = await request(app)
      .put("/api/students/1")
      .send(updatedStudent);
    expect(response.status).toBe(200);
    expect(response.body.msg).toMatch(/Updated student \d+/);
  });
});

describe("DELETE /students/:id", () => {
  it("should respond with status 200 and delete a student", async () => {
    const response = await request(app).delete("/api/students/1");
    expect(response.status).toBe(200);
    expect(response.body.msg).toMatch(/Deleted student \d+/);
  });
});
