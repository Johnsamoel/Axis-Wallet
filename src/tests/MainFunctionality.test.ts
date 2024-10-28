import request from 'supertest';
import {app} from '../index'; // Adjust the path as needed

describe('Authentication Routes', () => {
  describe('POST /auth/login', () => {
    it('should return 200 and the user when login is successful', async () => {
      const user = {
        email: 'test.samuel@gmail.com',
        password: 'J@hn4500',
      };
      const response = await request(app).post('/auth/login').send(user);
      expect(response.status).toEqual(200)
    })

    it('should return 400 when credentials are invalid', async () => {
      const user = {
        email: 'invalid.email@gmail.com',
        password: 'W@hn3404',
      };
      const response = await request(app).post('/auth/login').send(user);
      expect(response.status).toEqual(400);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('POST /auth/register', () => {
    it('should return 201 when user is successfully registered', async () => {
      const user = {
        email: `john${Math.floor(Math.random() * 1000)}@gmail.com`,
        password: 'J@hn4500',
        name: 'John Samuel',
      };
      const response = await request(app).post('/auth/register').send(user);
      expect(response.status).toEqual(201);
      expect(response.body.newUser).toBeDefined();
    });

    it('should return 422 when the email is already taken', async () => {
      const user = {
        email: 'john.samuel@gmail.com', // Use an existing email
        password: '123456',
        name: 'John Samuel',
      };
      const response = await request(app).post('/auth/register').send(user);
      expect(response.status).toEqual(422);
    });
  });

  describe('POST /auth/logout', () => {
    it('should return 200 when logout is successful', async () => {
      const response = await request(app).post('/auth/logout');
      expect(response.status).toEqual(200);
      expect(response.body.message).toEqual('Logged out successfully');
    });
  });
});
