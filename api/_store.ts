import type { ReflectionRecord } from "../src/types.js";

const records: ReflectionRecord[] = [];

export function getRecords() {
  return records;
}

export function addRecord(record: ReflectionRecord) {
  if (!records.find(r => r.id === record.id)) {
    records.unshift(record);
  }
}

export function deleteRecord(id: string) {
  const idx = records.findIndex(r => r.id === id);
  if (idx >= 0) {
    records.splice(idx, 1);
  }
}
