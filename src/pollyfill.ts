// src/polyfill.ts
if (typeof globalThis.structuredClone !== "function") {
    globalThis.structuredClone = (obj: any) =>
      JSON.parse(JSON.stringify(obj));
  }
  