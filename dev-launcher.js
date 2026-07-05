const { spawn } = require("child_process");

const child = spawn("npm", ["run", "dev"], {
  stdio: "inherit",
  cwd: __dirname,
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
