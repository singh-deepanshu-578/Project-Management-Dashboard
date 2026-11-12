import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "dist");
const port = Number(globalThis.process?.env.PORT) || 4173;

const contentTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
};

function getFilePath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  const relativePath = normalize(pathname).replace(/^([.][.][\\/])+/, "");
  const filePath = join(root, relativePath);

  if (filePath.startsWith(root) && existsSync(filePath) && statSync(filePath).isFile()) {
    return filePath;
  }

  return join(root, "index.html");
}

createServer((request, response) => {
  try {
    const filePath = getFilePath(request.url || "/");
    response.setHeader(
      "Content-Type",
      contentTypes[extname(filePath)] || "application/octet-stream",
    );
    createReadStream(filePath).pipe(response);
  } catch (error) {
    response.statusCode = 500;
    response.end("Unable to serve the application.");
    console.error(error);
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
