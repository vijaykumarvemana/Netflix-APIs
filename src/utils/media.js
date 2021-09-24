import fs from "fs-extra";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const { readJSON, writeJSON } = fs;

const dataFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),"../data");

  console.log("hello data folder:",dataFolderPath)
const mediaJSONPath = join(dataFolderPath, "media.json")

console.log("hello JSON:", mediaJSONPath);
export const readMedia = () => readJSON(mediaJSONPath);
// export const readMediaa = () => {
//     const media = readJSON(mediaJSONPath);
//     console.log(media.imdbID)
// }

export const writeMedia = (content) => writeJSON(mediaJSONPath, content);

