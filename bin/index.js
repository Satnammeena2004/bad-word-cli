#!/usr/bin/env node

import { Filter } from "bad-words";
import { Command } from "commander";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import chalk from "chalk";

const filter = new Filter();
const program = new Command();

program
  .name("bad-word-cli")
  .version("0.2.0")
  .description("A CLI tool to detect and clean profane words using the 'bad-words' package.");

// isProfane command
program
  .command("isProfane")
  .alias("isProf")
  .argument("<string>", "The string to check for profanity")
  .option("-e, --example", "Show an example of how to use this command")
  .description("Check if a string contains profanity")
  .action((input, options) => {
    const { example } = options;

    if (example) {
      console.log(chalk.gray(`
🧪 Example:

$ bad-word-cli isProfane "hell"
🚫 ${chalk.red("Profane")}

$ bad-word-cli isProfane "hello"
✅ ${chalk.green("Clean")}
      `));
      return;
    }

    const result = filter.isProfane(input);
    console.log(result ? chalk.red("🚫 Profane") : chalk.green("✅ Clean"));
  });

// clean command
program
  .command("clean")
  .argument("<string>", "The string to clean")
  .option("-a, --add <words...>", "Add custom words to the filter")
  .option("-r, --remove <words...>", "Remove words from the filter")
  .option("-e, --example", "Show an example of how to use this command")
  .description("Clean a string and optionally customize the filter")
  .action((input, options) => {
    const { add, remove, example } = options;

    if (example) {
      console.log(chalk.gray(`
🧪 Example:

$ bad-word-cli clean "assh0le"
🧼 ${chalk.blue("Cleaned: *******")}

$ bad-word-cli clean "badword here" -a badword
🧼 ${chalk.blue("Cleaned: ******* here")}
      `));
      return;
    }

    if (remove?.length) filter.removeWords(...remove);
    if (add?.length) filter.addWords(...add);

    const cleaned = filter.clean(input);
    console.log(`🧼 ${chalk.blue("Cleaned:")} ${cleaned}`);
  });

// file command
program
  .command("file")
  .argument("<filepath>", "Path to the file for cleaning")
  .option("-r, --rewrite", "Overwrite the original file with cleaned content")
  .option("-n, --newname <filename>", "Save cleaned content to a new file")
  .option("-e, --example", "Show an example of how to use this command")
  .description("Clean profanities in a file")
  .action(async (filepath, options) => {
    const { rewrite, newname, example } = options;

    if (example) {
      console.log(chalk.gray(`
🧪 Example:

$ bad-word-cli file ./input.txt -r
🔁 ${chalk.yellow("File rewritten: ./input.txt")}

$ bad-word-cli file ./input.txt -n cleaned.txt
📄 ${chalk.yellow("Cleaned file saved as: cleaned.txt")}
      `));
      return;
    }

    const fullPath = path.resolve(filepath);

    try {
      const content = await readFile(fullPath, "utf-8");
      const cleaned = filter.clean(content);

      if (rewrite) {
        await writeFile(fullPath, cleaned);
        console.log(`🔁 ${chalk.yellow("File rewritten:")} ${fullPath}`);
      } else if (newname) {
        const newFilePath = path.resolve(newname);
        await writeFile(newFilePath, cleaned);
        console.log(`📄 ${chalk.yellow("Cleaned file saved as:")} ${newFilePath}`);
      } else {
        console.log(`${chalk.blue("🧼 Cleaned content:")}\n\n${cleaned}`);
      }
    } catch (error) {
      console.error(chalk.red("❌ Error:"), error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
