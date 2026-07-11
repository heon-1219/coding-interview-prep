import { Redis } from "@upstash/redis";

let _client = null;
export function kv() {
  if (_client) return _client;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error("STORAGE_NOT_CONFIGURED");
  }
  _client = new Redis({ url, token });
  return _client;
}

export const stateKey = (email) => `u:${email}:state`;
export const settingsKey = (email) => `u:${email}:settings`;
