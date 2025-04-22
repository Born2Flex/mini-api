import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';

const redisConfig = (config: ConfigService) => ({
  url: config.get<string>('REDIS_URL', 'redis://localhost:6379'),
  password: config.get<string>('REDIS_PASSWORD'),
  tls: config.get<string>('NODE_ENV') === 'production' ? {} : undefined,
});

export const createRedisClient = async (config: ConfigService) => {
  const redisClient = createClient(redisConfig(config));

  redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
  });

  try {
    await redisClient.connect();
    console.log('Connected to Redis successfully');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error;
  }

  return redisClient;
};

export const createRedisStore = async (config: ConfigService) => {
  const redisClient = await createRedisClient(config);
  return new RedisStore({ client: redisClient });
};

export const getSessionConfig = (config: ConfigService, store: RedisStore) => ({
  store,
  secret: config.get<string>('SESSION_SECRET', 'your-secret-key'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.get<string>('NODE_ENV') === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
});
