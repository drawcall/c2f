const fs = require("fs-extra");
const { promisify } = require("util");

const fsMove = promisify(fs.move);
const fsRemove = promisify(fs.remove);

main();

async function main() {
  await fsRemove("./docs");
  await fsMove("./build", "./docs");
}
